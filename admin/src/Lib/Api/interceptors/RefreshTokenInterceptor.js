import BaseInterceptor from './BaseInterceptor';

class RefreshTokenInterceptor extends BaseInterceptor {
  intercept(data) {
    return data;
  }
  whenError(error) {
    return Promise.reject(error);
  }
}

export default RefreshTokenInterceptor;
