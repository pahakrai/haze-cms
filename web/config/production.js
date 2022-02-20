var common = require("./common");

var public = {
  ...common.public,
  BASE_API_URL: "https://ecomm-api.golpasal.com",
  API_URL: "https://ecomm-api.golpasal.com/graphql",
  APP_ID: "",
  APP_LOGO: "",
  APP_NAME: "",
  APP_PACKAGE_NAME: "",
  WEB_URL: "http://ecomm-cart.golpasal.com",
  WORKSPACE: "5fd83be73db74d57b304cb82",
  WORKSPACE_SECRET: "cztshIOE"
};
var server = {
  BASE_API_URL: "https://ecomm-api.golpasal.com",
  API_URL: "https://ecomm-api.golpasal.com/graphql",
  PORT: 3601,
  DEV: false
};
module.exports = {
  public,
  server
};
