import deepDiff from 'deep-diff';
import isEqual from 'lodash/isEqual';
// page = {
//     // current version (publish action)
//     version: {type: Number, required: true},
//     // current page data (publish action) v6 => v3(edit) => (new v4 or [v7 = diff(v6 and v3(edit))] ?)(remove v4,v5,v6)
//     content: {type: SchemaTypes.Mixed, required: true},
//     // diff (save action) (jump action (merge diff))
//     // find newest version content => create next node
//     diffNodes: [
//       {
//         version: {type: Number, required: true},
//         up: {type: SchemaTypes.Mixed},
//         down: {type: SchemaTypes.Mixed}
//       }
//     ],
// }

// diffNodes get maxVersion
export const getMaxVersion = (currentVersion, diffNodes) => {
  if (!diffNodes || !diffNodes.length) return currentVersion;
  const sortDiffNodes = diffNodes.sort((a, d) => a.version - d.version);
  const maxVersion = sortDiffNodes[sortDiffNodes.length - 1].version;
  return maxVersion;
};

// source                 page.content
// currentVersion         page.version
// targeVersion           select diff node version
// diffNodes              page.diffNodes
export const getSourceByDiffNode = (
  source,
  currentVersion,
  targeVersion,
  diffNodes
) => {
  if (currentVersion === targeVersion) return Object.assign({}, source);
  if (targeVersion > currentVersion) {
    // targeVersion > currentVersion => targeVersion .... v.. v... currentVersion (need merge up)
    const mergeDiffNode = diffNodes
      .filter(d => d.version > currentVersion && d.version <= targeVersion)
      .sort((a, d) => a.version - d.version);
    let mergeSource = {
      layout: JSON.parse(JSON.stringify(source.layout)),
      widgets: JSON.parse(JSON.stringify(source.widgets))
    };
    let currentSource = source;
    let dffNode = mergeDiffNode.shift();
    while (dffNode) {
      const { layout: diffUpLayout, widgets: diffUpWidgets } = dffNode.up;
      for (let i = 0; i < diffUpLayout.length; i++) {
        deepDiff.applyChange(
          mergeSource.layout,
          currentSource.layout,
          diffUpLayout[i]
        );
      }
      for (let j = 0; j < diffUpWidgets.length; j++) {
        deepDiff.applyChange(
          mergeSource.widgets,
          currentSource.widgets,
          diffUpWidgets[j]
        );
      }
      // mergeSource and currentSource exchange
      const exchangeSource = mergeSource;
      mergeSource = {
        layout: JSON.parse(JSON.stringify(exchangeSource.layout)),
        widgets: JSON.parse(JSON.stringify(exchangeSource.widgets))
      };
      currentSource = exchangeSource;
      // get next diffNode
      dffNode = mergeDiffNode.shift();
    }
    return { ...source, ...mergeSource };
  }
  if (targeVersion < currentVersion) {
    // currentVersion > targeVersion  => currentVersion .... v.. v... targeVersion (need merge down)
    const mergeDiffNode = diffNodes
      .filter(d => d.version <= currentVersion && d.version > targeVersion)
      .sort((a, d) => d.version - a.version);
    let mergeSource = {
      layout: JSON.parse(JSON.stringify(source.layout)),
      widgets: JSON.parse(JSON.stringify(source.widgets))
    };
    let currentSource = source;
    let dffNode = mergeDiffNode.shift();
    while (dffNode) {
      const { layout: diffDownLayout, widgets: diffDownWidgets } = dffNode.down;
      for (let i = 0; i < diffDownLayout.length; i++) {
        deepDiff.applyChange(
          mergeSource.layout,
          currentSource.layout,
          diffDownLayout[i]
        );
      }
      for (let j = 0; j < diffDownWidgets.length; j++) {
        deepDiff.applyChange(
          mergeSource.widgets,
          currentSource.widgets,
          diffDownWidgets[j]
        );
      }
      // mergeSource and currentSource exchange
      const exchangeSource = mergeSource;
      mergeSource = {
        layout: JSON.parse(JSON.stringify(exchangeSource.layout)),
        widgets: JSON.parse(JSON.stringify(exchangeSource.widgets))
      };
      currentSource = exchangeSource;
      // get next diffNode
      dffNode = mergeDiffNode.shift();
    }
    return { ...source, ...mergeSource };
  }
};

// source                 page.content
// changedSource          edited page.content
export const isDiff = (source, changedSource) =>
  !isEqual(source, changedSource);
// source                 page.content
// changedSource          edited page.content
// version                page.version
// diffNodes              page.diffNodes
export const getNewestSource = (source, currentVersion, diffNodes = []) => {
  const maxVersion = getMaxVersion(currentVersion, diffNodes);
  // if maxVersion === currentVersion , now source is newest !
  if (maxVersion === currentVersion) return Object.assign({}, source);
  // get currentVersion and maxVersion for diffNode
  return getSourceByDiffNode(source, currentVersion, maxVersion, diffNodes);
};

// source                 page.content
// changedSource          edited page.content
// version                page.version
// diffNodes              page.diffNodes
export const getNewDiffNode = (
  source,
  changedSource,
  currentVersion,
  diffNodes = []
) => {
  // by version get newest source
  const newestNodeSource = getNewestSource(source, currentVersion, diffNodes);
  const maxVersion = getMaxVersion(currentVersion, diffNodes);
  const diffUpLayout = deepDiff.diff(
    newestNodeSource.layout,
    changedSource.layout
  );
  const diffUpWidgets = deepDiff.diff(
    newestNodeSource.widgets,
    changedSource.widgets
  );
  const diffDownLayout = deepDiff.diff(
    changedSource.layout,
    newestNodeSource.layout
  );
  const diffDownWidgets = deepDiff.diff(
    changedSource.widgets,
    newestNodeSource.widgets
  );
  return {
    version: maxVersion + 1,
    date: new Date(),
    up: { layout: diffUpLayout || [], widgets: diffUpWidgets || [] },
    down: { layout: diffDownLayout || [], widgets: diffDownWidgets || [] }
  };
};
