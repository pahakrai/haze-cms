import { Api } from '../../Lib/Api';
// import { ApiWorkspaceInterceptor } from '../workspace';

const baseURL = process.env.REACT_APP_API_URL;
const config = {
  resetToken: {
    enable: true,
    api: 'auth/refresh-token'
  },
  interceptor: {
    // request: [ApiWorkspaceInterceptor],
    request: [],
    response: []
  },
  cookieName: `${process.env.REACT_APP_COOKIE_NAME}`,
  headers: {
    platform: 'admin',
    Accept: 'application/json'
  },
  nonce: true
};

export default new Api(baseURL, config);
