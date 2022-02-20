const withPlugins = require("next-compose-plugins");
var configs = require("./config");
var env = process.env.APP_ENV;
var config = configs[env];
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
module.exports = withPlugins([[withBundleAnalyzer({})]], {
  serverRuntimeConfig: config.server,
  publicRuntimeConfig: config.public
});
