export default class RefreshTokenInterceptor {
  /**
   *
   * @param {object} axiosInstance axiosInstance
   * @param {object} config config
   * @param {string} [config.refreshUrl] refreshTokenUrl
   */
  constructor(axiosInstance, config) {
    this.axiosInstance = axiosInstance;
    this.refreshSubscribers = [];
    this.isRefreshing = false;
    this.setConfig(config);
    this.configInterceptor();
  }
  setConfig(config) {
    this.config = config;
  }
  getConfig() {
    return this.config;
  }
  configInterceptor() {
    const that = this;
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        const {
          config,
          response: { status }
        } = error;
        const originalRequest = config;

        if (status === 498) {
          if (!that.isRefreshing) {
            that.isRefreshing = true;
            this.refreshAccessToken().then(newToken => {
              that.isRefreshing = false;
              that.onRrefreshed(newToken);
            });
          }

          const retryOrigReq = new Promise((resolve, reject) => {
            that.subscribeTokenRefresh(token => {
              // replace the expired token and retry
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(this.axiosInstance(originalRequest));
            });
          });
          return retryOrigReq;
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
  async refreshAccessToken() {}

  subscribeTokenRefresh(cb) {
    this.refreshSubscribers.push(cb);
  }

  onRrefreshed(token) {
    this.refreshSubscribers.map(cb => cb(token));
  }
}
