import BaseInterceptor from './BaseInterceptor'
class LoggerInterceptor extends BaseInterceptor {
  intercept(config) {
    // if (config.status) console.log(config);
    return config
  }
  whenError(error) {
    return Promise.reject(error)
  }
}
export default LoggerInterceptor
