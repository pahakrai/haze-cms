import React, { PureComponent } from 'react';

import RegionTreeListItem from './RegionTreeListItem';
import RegionTreeListItemAddButton from './RegionTreeListItemAddButton';

class RegionTreeList extends PureComponent {
  render() {
    const {
      regions,
      renderItem,
      intl,
      onAddBtnClick,
      onEditBtnClick,
      onItemSwitchToggle,
      withCheckBox,
      onItemCheckboxChange,
      selectItems,
      deleteRegion
    } = this.props;

    return (
      <div>
        <RegionTreeListItemAddButton intl={intl} onClick={onAddBtnClick} />
        {Array.isArray(regions) &&
          regions.map(region => {
            return renderItem ? (
              renderItem(region)
            ) : (
              <RegionTreeListItem
                key={region._id}
                intl={intl}
                region={region}
                onEditBtnClick={onEditBtnClick}
                onItemSwitchToggle={onItemSwitchToggle}
                checkbox={withCheckBox}
                onItemCheckboxChange={onItemCheckboxChange}
                selectItems={selectItems}
                deleteRegion={deleteRegion}
              />
            );
          })}
      </div>
    );
  }
}

export default RegionTreeList;
