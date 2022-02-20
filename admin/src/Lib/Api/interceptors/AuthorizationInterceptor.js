import BaseInterceptor from './BaseInterceptor';

class AuthorizationInterceptor extends BaseInterceptor {
  constructor(tokenManager, config) {
    super(config);
  }
  intercept(config) {
    // add token in header
  }
  whenError(error) {}
}
export default AuthorizationInterceptor;
