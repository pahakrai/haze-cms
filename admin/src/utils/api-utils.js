import { getAPIHeader } from '@golpasal/common/dist/helpers/functions'
import axios from 'axios'
import { compose } from 'recompose'

import TokenManager from '../Lib/Api/tokenManager/CookieTokenManager'

// replace from process env config
const API_URL = process.env.REACT_APP_API_URL
const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchAccessTokenAsync = async (access, refresh) => {
  const data = {
    query: `mutation REFRESH_TOKEN {refreshToken(refreshToken: "${refresh}") {${USER_TOKEN_FIELDS}}}`
  }
  return fetch(API_URL, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`
      // ...getSecurityParams()
    },
    body: JSON.stringify(data)
  })
}

export const refreshToken = async (access, refresh) => {
  let token = undefined
  try {
    if (access && refresh) {
      // const response = await fetchAccessTokenAsync()
      // const token = await response.json().data.token
      // if (!token) {
      //   throw new Error('Refresh token invalid')
      // }
      // if (!isServer()) {
      //   setToken({ refresh_token: refresh, access_token: token })
      // }
    }
  } catch (error) {
    console.info('Try fetch access token by refresh token but:', error)
    if (!isServer()) {
      // logout()
      Router.reload()
    }
  }
  return token
}

const languageInterceptor = (reqContext = {}) => {
  // language header interceptors
  const language = 'en' // getCurrentLanguage()
  return {
    headers: { ...reqContext.headers, 'Accept-Language': language || 'en' }
  }
}

const securityInterceptor = (reqContext = {}) => {
  const tokenManager = new TokenManager()
  const access_token = tokenManager.getAccessToken()
  const apiHeader = getAPIHeader(
    process.env.REACT_APP_WORKSPACE,
    process.env.REACT_APP_WORKSPACE_SECRET
  )
  // security header interceptors
  return {
    headers: {
      workspace: apiHeader.workspace,
      timestamp: apiHeader.timestamp,
      'safe-key': apiHeader['safe-key'],
      ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      ...reqContext.headers
    }
  }
}

const loggerInterceptor = (reqContext = {}) => {
  // logging interceptor on request and response success
  return {
    ...reqContext
  }
}

const errorInterceptor = (reqContext) => {
  // can add interceptor for logging on error
  return {
    ...reqContext,
    requestErrorInterceptors: [...(reqContext.requestErrorInterceptors || [])],
    responseErrorInterceptors: [
      ...(reqContext.responseErrorInterceptors || []),
      async function (error) {
        const originalRequest = error.config
        // if (error.response.status === 403 && !originalRequest._retry) {
        //   originalRequest._retry = true
        //   const access_token = await fetchAccessTokenAsync()
        //   axios.defaults.headers.common['Authorization'] =
        //     'Bearer ' + access_token
        //   return client(originalRequest)
        // }
        return Promise.reject(error)
      }
    ]
  }
}

const apiInterceptors = compose(
  languageInterceptor,
  securityInterceptor,
  loggerInterceptor,
  errorInterceptor
)

const request = async (options) => {
  const interceptors = apiInterceptors(options)

  // Request interceptor for API calls
  client.interceptors.request.use(
    async (config) => {
      config.headers = {
        ...config.headers,
        ...(interceptors?.headers || {})
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

  interceptors?.responseErrorInterceptors?.map((errorInterceptor) => {
    return client.interceptors.response.use((response) => {
      return response
    }, errorInterceptor)
  })
  return client(options)
}

export default request
