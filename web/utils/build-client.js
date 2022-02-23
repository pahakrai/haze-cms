import axios from 'axios'
import { getAccessTokenFromReq } from '../lib/auth'

export const isServer = () => {
  return typeof window === 'undefined'
}

// NOTE: MOSLTY USED FOR getInitialProps
// IN CASE OF REQUIREMENT OF SERVER RENDERING / CLIENT RENDERING
// BUT MOSTLY FOR SERVER AS OTHER PAGE PROPS ARE MOSTLY SERVER RENDERED
// BUT NOT IN USE BECAUSE OF HEADER ISSUES
const axiosClient = (req = {}) => {
  let client
  if (isServer()) {
    const access_token = getAccessTokenFromReq(req)
    // TODO: from env config
    const BASE_URL_SERVER = process.env.API_BASE_URL
    // we are on the server
    client = axios.create({
      baseURL:
        // replace from env config
        BASE_URL_SERVER,
      headers: { ...req.headers, Authorization: `Bearer ${access_token}` }
    })
  } else {
    // we must be on the browser
    client = axios.create({
      baseUrl: '/'
    })
  }
  return client
}

export default axiosClient
