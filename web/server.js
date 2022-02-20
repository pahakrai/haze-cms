// server.js
const express = require("express");
const path = require("path");
const next = require("next");
const { parse } = require("url");

const configs = require("./config");
const mpUtils = require("./lib/matchPath");

const DynamicPagePathControl = require("./lib/serverApi/Control/DynamicPagePathControl");
const PageSeoDataControl = require("./lib/serverApi/Control/PageSeoDataControl");
// const expressWorkspaceSeoMeta = require("./lib/serverApi/WorkspaceSeoMeta");

const config = configs[process.env.APP_ENV];

const PORT = config.server.PORT;
const DEV = config.server.DEV;
const app = next({ dev: DEV });
const handle = app.getRequestHandler();

// save path form page api
let dynamicPagePaths = [];
// get dynamic page list from api every minute
DynamicPagePathControl({
  timeInterval: 60 * 1000,
  updated: (newPath) => {
    dynamicPagePaths = newPath;
  }
});
// save seo data form  api
let pageSeoData = [];
// get page seo data from api every minute
PageSeoDataControl({
  timeInterval: 60 * 1000,
  updated: (data) => {
    pageSeoData = data;
  }
});

app.prepare().then(() => {
  // create express instance
  const server = express();
  // config express public path
  server.use(express.static(path.join(__dirname, "/public")));
  // config next generated static file path
  server.use("/_next", express.static(path.join(__dirname, "/.next")));

  // verification file for iOS linking
  server.get("/.well-known/apple-app-site-association", (req, res) => {
    res.status(200).sendFile("apple-app-site-association", {
      root: path.join(__dirname, "well-known"),
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  });

  // verification file for android linking
  server.get("/.well-known/assetlinks.json", (req, res) => {
    res.status(200).sendFile("assetlinks.json", {
      root: path.join(__dirname, "well-known"),
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  });

  // all handler(end)
  server.all("*", async (req, res) => {
    // parse url
    const { pathname, query } = parse(req.url, true);
    // find matched path
    const matchReuslt = mpUtils.matchPath(pathname, dynamicPagePaths);
    if (matchReuslt.matched) {
      // if page path matches, render
      app.render(req, res, "/dynamic-page", { ...matchReuslt, ...query });
    } else {
      // append pageSeo to query
      const pageSeo = pageSeoData.find((v) => pathname === v.path);
      // handle by next route
      handle(req, res, { pathname, query: { ...query, pageSeo } });
    }
  });
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
