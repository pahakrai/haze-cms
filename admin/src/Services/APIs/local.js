import { Api } from '../../Lib/Api';
const baseURL = process.env.REACT_APP_API_URL;
const config = {};
export default new Api(baseURL, config);
