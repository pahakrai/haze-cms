var common = require("./common");

var public = {
  ...common.public,
  BASE_API_URL: "https://ecomm-api-testing.golpasal.com",
  API_URL: "https://ecomm-api-testing.golpasal.com/graphql",
  APP_ID: "284882215",
  APP_LOGO:
    "https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg",
  APP_NAME: "Facebook",
  APP_PACKAGE_NAME: "com.facebook.katana",
  WEB_URL: "http://ecomm-cart.golpasal.com",
  WORKSPACE: "5ea95dce2b462f77bf7acc02",
  WORKSPACE_SECRET: "6fHFVbau"
};
var server = {
  BASE_API_URL: "https://ecomm-api-testing.golpasal.com",
  API_URL: "https://ecomm-api-testing.golpasal.com/graphql",
  PORT: 3601,
  DEV: false
};
module.exports = {
  public,
  server
};
