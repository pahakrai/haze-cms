const { helper } = require('creater-cli');
const { srcPath: utilSrcPath } = require('../util');
const srcPath = path => utilSrcPath('../' + path);
const {
  name: { uc }
} = require('../constant');

const sitemap = require('./temp/sitemap');

module.exports = {
  config: {
    dir: 'src/Lib/createrConfig/basePage'
  },
  files: [
    {
      path: srcPath('Routes/sitemap/sitemap.js'),
      format: [
        helper.append(sitemap.import.point, {
          index: 1,
          content: sitemap.import.content
        }),
        helper.append(sitemap.router.point, {
          index: 1,
          content: sitemap.router.content
        })
      ]
    },
    {
      path: srcPath('Pages/index.js'),
      format: [
        helper.append(require('./temp/page').point, {
          index: 1,
          content: require('./temp/page').content
        })
      ]
    },
    // Pages
    {
      path: srcPath(`Pages/${uc}FormPage.js`),
      content: require('./temp/formPage').content
    },
    {
      path: srcPath(`Pages/${uc}Page.js`),
      content: require('./temp/indexPage').content
    },
    // Containers
    {
      path: srcPath(`Containers/${uc}/${uc}CreateButton.js`),
      content: require('./temp/container/createButton').content
    },
    {
      path: srcPath(`Containers/${uc}/${uc}Form.js`),
      content: require('./temp/container/form').content
    },
    {
      path: srcPath(`Containers/${uc}/${uc}List.js`),
      content: require('./temp/container/list').content
    },
    {
      path: srcPath(`Containers/${uc}/${uc}Search.js`),
      content: require('./temp/container/search').content
    },
    // Components
    {
      path: srcPath(`Components/App/${uc}/${uc}List.js`),
      content: require('./temp/component/list').content
    },
    {
      path: srcPath(`Components/App/${uc}/${uc}CardItem.js`),
      content: require('./temp/component/cardItem').content
    },
    {
      path: srcPath(`Components/App/${uc}/${uc}CardItemTitle.js`),
      content: require('./temp/component/cardItemTitle').content
    },
    {
      path: srcPath(`Components/App/${uc}/${uc}Form.js`),
      content: require('./temp/component/form').content
    }
  ]
};
