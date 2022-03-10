import React, { PureComponent } from 'react'

import CategoryTreeListItem from './CategoryTreeListItem'
import CategoryTreeListItemAddButton from './CategoryTreeListItemAddButton'

class CategoryTreeList extends PureComponent {
  render() {
    const {
      categories,
      renderItem,
      intl,
      onAddBtnClick,
      onEditBtnClick,
      onItemSwitchToggle,
      withCheckBox,
      onItemCheckboxChange,
      selectItems,
      // parent,
      deleteCategory
    } = this.props
    return (
      <div>
        {/* {parent && (
          <CategoryTreeListItemAddButton intl={intl} onClick={onAddBtnClick} />
        )} */}
        <CategoryTreeListItemAddButton intl={intl} onClick={onAddBtnClick} />
        {Array.isArray(categories) &&
          categories.map((category) => {
            return renderItem ? (
              renderItem(category)
            ) : (
              <CategoryTreeListItem
                key={category._id}
                intl={intl}
                category={category}
                onEditBtnClick={onEditBtnClick}
                onItemSwitchToggle={onItemSwitchToggle}
                checkbox={withCheckBox}
                onItemCheckboxChange={onItemCheckboxChange}
                selectItems={selectItems}
                deleteCategory={deleteCategory}
              />
            )
          })}
      </div>
    )
  }
}

export default CategoryTreeList
