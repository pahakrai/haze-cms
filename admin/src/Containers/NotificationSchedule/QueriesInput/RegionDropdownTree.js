import React from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// antd
import { TreeSelect } from 'antd';
// Redux Selectors
import { getRegions } from '../../../Redux/selectors';
import { RegionActions } from '../../../Redux/Region/actions';

const TreeNode = TreeSelect.TreeNode;
class RegionDropdownTree extends React.PureComponent {
  static defaultProps = {
    value: '',
    onChange: () => true
  };

  componentDidMount() {
    const { regions, fetchRegions } = this.props;
    if (!regions || (Array.isArray(regions) && !regions.length)) fetchRegions();
  }

  // handle mapRegions = { _id: region }
  _getMapRegions = () => {
    const { regions } = this.props;
    const mapRegions = {};
    regions &&
      Array.isArray(regions) &&
      regions.forEach(item => {
        if (mapRegions[item.parent])
          mapRegions[item.parent] = [...mapRegions[item.parent], item];
        else mapRegions[item.parent] = [item];
      });
    // sort name
    Object.keys(mapRegions).forEach(key => {
      if (mapRegions[key] && Array.isArray(mapRegions[key]))
        mapRegions[key] = mapRegions[key].sort((a, b) => {
          const aTitle = this._getNodeTitle(a);
          const bTitle = this._getNodeTitle(b);
          return (
            typeof bTitle === 'string' &&
            typeof aTitle === 'string' &&
            aTitle.localeCompare(bTitle)
          );
        });
    });
    return mapRegions;
  };

  // Node Title
  _getNodeTitle = item => {
    const {
      intl: { locale = 'en' }
    } = this.props;
    return (
      item &&
      item.name &&
      (item.name[locale] || (Object.keys(item.name).length && item.name[0]))
    );
  };

  // forEach Node
  _getTreeNode = (childArray, mapRegions) =>
    childArray &&
    Array.isArray(childArray) &&
    childArray.map(item => (
      <TreeNode
        value={item._id}
        title={this._getNodeTitle(item)}
        key={item._id}
      >
        {mapRegions &&
          mapRegions[item._id] &&
          this._getTreeNode(mapRegions[item._id], mapRegions)}
      </TreeNode>
    ));

  _onTreeRegions = () => {
    const mapRegions = this._getMapRegions();
    // get ancestor Region
    const ancestorRegion =
      mapRegions[null] &&
      ((Array.isArray(mapRegions[null]) &&
        mapRegions[null].length &&
        mapRegions[null][0]) ||
        mapRegions[null]);
    // render
    return (
      ancestorRegion && (
        <TreeNode
          value={ancestorRegion._id}
          title={this._getNodeTitle(ancestorRegion)}
          key={ancestorRegion._id}
        >
          {this._getTreeNode(mapRegions[ancestorRegion._id], mapRegions)}
        </TreeNode>
      )
    );
  };

  render() {
    const { value, onChange } = this.props;
    // const treeSelectValue =
    //   (value && typeof value == 'string' && value.split(',')) || [];
    return (
      <TreeSelect
        value={value}
        listHeight={400}
        dropdownStyle={{ overflow: 'auto' }}
        multiple
        {...this.props}
        onChange={data => onChange && onChange(data)}
      >
        {this._onTreeRegions()}
      </TreeSelect>
    );
  }
}

const mapStateToProps = state => {
  const regions = getRegions(state);
  return {
    regions:
      regions &&
      ((regions.asMutable && regions.asMutable({ deep: true })) || regions)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRegions: RegionActions.getRegions
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RegionDropdownTree);
