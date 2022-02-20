const axios = require("axios");
const getConfig = require("next/config").default;
const { helpers } = require("@golpasal/common");

// runtime
const publicRuntimeConfig =
  (typeof getConfig === "function" &&
    getConfig() &&
    getConfig().publicRuntimeConfig) ||
  {};
const configs = require("../../config");
const public = configs[process.env.APP_ENV].public;

const instance = axios.create({
  baseURL: publicRuntimeConfig.BASE_API_URL || public.BASE_API_URL
});
instance.interceptors.request.use(
  function (config) {
    const apiHeader = helpers.getAPIHeader(
      public.WORKSPACE,
      public.WORKSPACE_SECRET
    );
    config.headers["workspace"] = apiHeader.workspace;
    config.headers["timestamp"] = apiHeader.timestamp;
    config.headers["safe-key"] = apiHeader["safe-key"];
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

module.exports = instance;
