import { create } from 'apisauce'
import Cookies from 'js-cookie'
import moment from 'moment'
import * as Common from '@golpasal/common'

import { appWorkspace, appWorkspaceSecret } from '../util'

import TokenManager from './tokenManager/CookieTokenManager'
import SafeKeyManager from './safeKeyManager'

import LoggerInterceptor from './interceptors/LoggerInterceptor'

const { getAPIHeader } = Common.helpers

export default class Api {
  static locale = Cookies.get('locale') || 'en'
  static setLocale = (locale) => {
    Cookies.set('locale', locale)
    Api.locale = locale
  }
  /**
   *
   * @param {string} baseURL baseURL
   * @param {string} config config
   * @param {object} [config.headers] api headers
   * @param {boolean} [config.debug] api debug mode
   * @param {object} [config.resetToken ={enable:false,api:"token?reset"}] refresh token
   * @param {object} [config.interceptor] interceptors object
   * @param {array} [config.intercecptor.request] request interceptor class
   * @param {array} [config.interceptor.response] response interceptor class
   * @param {string} [config.cookieName ='httpeaceTokenCookie'] token cookie name
   * @param {number} [config.cookieExpire = 365] token expire time (day)
   * @memberof Api
   */

  static unauthorizedRedirect = '/login'

  constructor(baseURL, config = {}) {
    // Save constructor parameters
    this._setConfig({
      ...this._getDefaultConfig(),
      ...config,
      baseURL
    })
    if (!this.tokenManager) {
      this.tokenManager = new TokenManager()
      this.tokenManager._setConfig(this._getConfig())
      this.tokenManager._start()
    }
    this.safeKeyManager = new SafeKeyManager()
    this.requestInterceptors = []
    this.resonseInterceptors = []

    //init api
    this._initApi()
  }
  start() {
    const token = this.tokenManager.getToken()
    this.tokenManager._setToken(token) // Reset on initialization
  }

  getTokenManager() {
    return this.tokenManager
  }
  setTokenManager(tokenManager) {
    this.tokenManager = tokenManager
    this.tokenManager._setConfig(this._getConfig())
    this.tokenManager._start()
    return this
  }
  addRequestInterceptor(func) {
    return this
  }
  addResponseInterceptor(func) {
    return this
  }
  _initApi() {
    const that = this
    const config = this._getConfig()
    this.api = create(config)
    for (const name in this.api) {
      if (this.api.hasOwnProperty(name)) {
        const fn = this.api[name]
        this[name] = fn
      }
    }
    if (config.nonce) {
      this.api.addRequestTransform(config.nonceTransform)
    }

    //default has authorization transform
    this.api.addRequestTransform((request) => {
      // if token exist , need add , for refetchToken
      if (this.tokenManager.getAccessToken()) {
        request.headers['Authorization'] =
          'Bearer ' + this.tokenManager.getAccessToken()
      }
      if (appWorkspace && appWorkspaceSecret) {
        const apiHeader = getAPIHeader(appWorkspace, appWorkspaceSecret)
        request.headers['workspace'] = apiHeader.workspace
        request.headers['timestamp'] = apiHeader.timestamp
        request.headers['safe-key'] = apiHeader['safe-key']
      } else if (this.safeKeyManager.has()) {
        const apiHeader = this.safeKeyManager.get()
        request.headers['workspace'] = apiHeader.workspace
        request.headers['timestamp'] = apiHeader.timestamp
        request.headers['safe-key'] = apiHeader['safe-key']
      }
      request.headers['Accept-Language'] = Api.locale
      request.headers['utcOffset'] = moment().utcOffset()
    })
    this.api.addAsyncResponseTransform(async (response) => {
      const { resetToken } = this._getConfig()
      // for retry request
      const retryRequest = async () => {
        // need add new token, or other
        try {
          const newResponse = await this.api.axiosInstance({
            ...response.config,
            headers: {
              ...response.config.headers,
              // new token
              Authorization: 'Bearer ' + this.tokenManager.getAccessToken()
            },
            __isRetryRequest: true
          })
          // for delete old key
          Object.keys(response).forEach((key) => {
            if (!newResponse.hasOwnProperty(key)) {
              delete response[key]
            }
          })
          // add new key and {ok:true or false}
          return Object.assign(response, newResponse, {
            ok: newResponse.status >= 200 && newResponse.status <= 299
          })
        } catch (error) {
          return response
        }
      }
      // if not auth
      if (!response.ok && response.status === 401) {
        // default not auth
        const handleNotAuth = () => {
          // if not auth ,and window.location  === Api.unauthorizedRedirect
          if (
            Api.unauthorizedRedirect === window.location.pathname ||
            // config not handle status 401
            !!response.config.notRefreshToken
          ) {
            return
          }
          this.tokenManager._clearToken()
          window.location = `${Api.unauthorizedRedirect}?redirect=${window.location.pathname}`
        }
        // if resetToken exist
        if (
          resetToken &&
          response.config.url !== resetToken.api &&
          resetToken.enable &&
          !response.config.isRefreshToken
        ) {
          // if token is not authenticated and we have token and we want to reset token
          // get current token
          const token = this.tokenManager.getToken()
          // using refresh_token, fetch new token
          try {
            const newTokenResponse = await this.api.get(
              resetToken.api,
              {
                refreshToken: token.refresh_token
              },
              {
                isRefreshToken: true,
                refreshResumeConfig: response.config
              }
            )
            if (newTokenResponse.ok) {
              this.tokenManager.setToken(newTokenResponse.data)
              return await retryRequest()
            } else {
              // if refresh token not ok
              return handleNotAuth()
            }
          } catch (error) {
            // if throw error
            return handleNotAuth()
          }
        } else {
          // if not set refresh Token
          return handleNotAuth()
        }
      }
      if (!response.ok) {
        if (response.status === 410) {
          window.location = '/connect-expired'
        } else if (
          !response.config.__isRetryRequest &&
          // config not retry
          !response.config.notRetry
        ) {
          return await retryRequest()
        }
      }
    })
    // in here we should add refresh token transform
    // for each interceptor to append custom interceptor
    const _customInterceptor = this._getConfig().interceptor
    const axiosInterceptors = this.api.axiosInstance.interceptors
    _customInterceptor.request.forEach((RequestInterceptor) => {
      // we should check this is a class and this extends interceptor
      const interceptor = new RequestInterceptor(that._getConfig())
      axiosInterceptors.request.use(
        interceptor.intercept,
        interceptor.whenError
      )
    })
    _customInterceptor.response.forEach((ResponseInterceptor) => {
      const interceptor = new ResponseInterceptor(that._getConfig())
      axiosInterceptors.response.use(
        interceptor.intercept,
        interceptor.whenError
      )
    })
    if (this._getConfig().debug) {
      const requestLogger = new LoggerInterceptor(this._getConfig())
      const responseLogger = new LoggerInterceptor(this._getConfig())
      axiosInterceptors.request.use(
        requestLogger.intercept,
        requestLogger.whenError
      )
      axiosInterceptors.response.use(
        responseLogger.intercept,
        responseLogger.whenError
      )
    }
  }
  _setConfig(config) {
    this.config = config
  }

  _getConfig() {
    return this.config
  }

  _getDefaultConfig() {
    return {
      resetToken: {
        enable: true,
        api: 'auth/refreshToken'
      },
      getToken: {
        enable: false,
        api: 'auth/token'
      },
      headers: {
        Accept: 'application/json',
        appid: process.env.APP_ID || '5aaf6b12ed7dfccb8192e5dc'
      },
      interceptor: {
        request: [],
        response: []
      },
      debug: true,
      cookieName: 'cmTokenCookie',
      cookieExpire: 365,
      nonce: false,
      nonceTransform: () => {}
    }
  }
}
