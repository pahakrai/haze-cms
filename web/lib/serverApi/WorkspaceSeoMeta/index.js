const cookie = require("cookie");
const axios = require("../../serverApi");
const configs = require("../../../config");
const config = configs[process.env.APP_ENV];
const ENV_WORKSPACE = config.public.WORKSPACE;

// get workspace by env_workspace_id
const getEnvWorkspace = async () => {
  try {
    const response = await axios.get(`/workspaces/${ENV_WORKSPACE}`);
    if (response.status === 200 && response.data) {
      const workspace = response.data;
      // return workspace seoMeta
      return {
        meta: workspace.seoMeta,
        workspace: { name: workspace.name }
      };
    }
    return null;
  } catch (e) {
    console.warn("get env workspace throw error");
  }
  return null;
};
// get current workspace
const getCurrentWorkspace = async (token) => {
  try {
    const response = await axios.get(`/workspaces/current-workspace`, {
      headers: { authorization: `Bearer ${token}` }
    });
    if (response.status === 200 && response.data) {
      const workspace = response.data;
      // return workspace seoMeta
      return {
        meta: workspace.seoMeta,
        workspace: { name: workspace.name }
      };
    }
    return null;
  } catch (e) {
    console.warn("get currrent workspace throw error");
  }
  return null;
};

// req?: IncomingMessage
const getAccessTokenFromReq = (req) => {
  const httpCookie = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  let access_token = "";
  if (httpCookie) {
    access_token = httpCookie.access_token;
  }
  return access_token;
};

// { authorization: `Bearer ${token}` }

const WorkspaceSEOMetaMiddleware = async (req) => {
  try {
    let pageParam = null;
    // const token = getAccessTokenFromReq(req);
    // if (token) {
    // get current workspace
    //   pageParam = await getCurrentWorkspace(token);
    // } else {
    // by workspace id get workspace
    pageParam = await getEnvWorkspace();
    // }
    req.pageParam = pageParam;
  } catch (error) {
    console.log("req set pageParam throw some error");
    req.defaultLocale = "en";
    req.pageParam = {};
  }
};

module.exports = WorkspaceSEOMetaMiddleware;
