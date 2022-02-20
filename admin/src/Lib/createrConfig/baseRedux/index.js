const { helper } = require('creater-cli');
const { srcPath: utilSrcPath } = require('../util');
const srcPath = path => utilSrcPath('../' + path);
const { name } = require('../constant');

const schemas = require('./temp/schemas.js');
const resourceReducer = require('./temp/resourceReducer.js');
const errorAction = require('./temp/errorAction.js');
const paginationReducer = require('./temp/paginationReducer.js');
const listenRedux = require('./temp/listenRedux.js');
const selector = require('./temp/selector.js');
const formName = require('./temp/formName.js');

module.exports = {
  config: {
    dir: 'src/Lib/createrConfig/basePage'
  },
  files: [
    {
      path: srcPath('Services/Schemas.js'),
      format: [
        helper.append(schemas.point, {
          index: 1,
          content: schemas.content
        })
      ]
    },
    {
      path: srcPath('Redux/Resources/reducers.js'),
      format: [
        helper.append(resourceReducer.point, {
          index: 1,
          content: resourceReducer.content
        })
      ]
    },
    {
      path: srcPath('Redux/Error/actions.js'),
      format: [
        helper.append(errorAction.point, {
          index: 1,
          content: errorAction.content
        })
      ]
    },
    {
      path: srcPath('Redux/Pagination/reducers.js'),
      format: [
        helper.append(paginationReducer.point, {
          index: 1,
          content: paginationReducer.content
        })
      ]
    },
    {
      path: srcPath('Constants/Form.js'),
      format: [
        helper.append(formName.point, {
          index: 1,
          content: formName.content
        })
      ]
    },
    {
      path: srcPath('Redux/reducers.js'),
      format: [
        helper.append(listenRedux.reducer1.point, {
          index: 1,
          content: listenRedux.reducer1.content
        }),
        helper.append(listenRedux.reducer2.point, {
          index: 1,
          content: listenRedux.reducer2.content
        })
      ]
    },
    {
      path: srcPath('Redux/sagas.js'),
      format: [
        helper.append(listenRedux.saga1.point, {
          index: 1,
          content: listenRedux.saga1.content
        }),
        helper.append(listenRedux.saga2.point, {
          index: 1,
          content: listenRedux.saga2.content
        })
      ]
    },
    {
      path: srcPath('Redux/selectors.js'),
      format: [
        helper.append(selector.hydrate.point, {
          index: 1,
          content: selector.hydrate.content
        }),
        helper.append(selector.selector.point, {
          index: 1,
          content: selector.selector.content
        })
      ]
    },
    {
      path: srcPath(`Services/APIServices/${name.uc}Service.js`),
      content: require('./temp/service').content
    },
    {
      path: srcPath(`Redux/${name.uc}/actions.js`),
      content: require('./temp/actions').content
    },
    {
      path: srcPath(`Redux/${name.uc}/reducers.js`),
      content: require('./temp/reducers').content
    },
    {
      path: srcPath(`Redux/${name.uc}/sagas.js`),
      content: require('./temp/sagas').content
    }
  ]
};
