var common = require("./common");

var public = {
  ...common.public,
  BASE_API_URL: "http://localhost:8086",
  API_URL: "http://localhost:8086/graphql",
  APP_ID: "",
  APP_LOGO: "",
  APP_NAME: "",
  APP_PACKAGE_NAME: "",
  WEB_URL: "http://localhost:3601",
  WORKSPACE: "5e9fcae14fc78a87a9bc4c43",
  WORKSPACE_SECRET: "jrrpU4RA"
};
var server = {
  BASE_API_URL: "http://localhost:8086",
  API_URL: "http://localhost:8086/graphql",
  PORT: 3601,
  DEV: true
};
module.exports = {
  public,
  server
};
