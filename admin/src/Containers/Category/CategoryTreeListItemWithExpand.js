import React from 'react'
import styled from 'styled-components'

import CategoryTreeListItem from '../../Components/App/Category/CategoryTreeListItem'

import CategoryTreeList from './CategoryTreeList'

const ChildWrapper = styled.div`
  margin-left: 40px;
`
class CategoryTreeListItemWithExpand extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      expand: false
    }
  }

  _onItemClick = () => {
    this.setState(({ expand }) => ({
      expand: !expand
    }))
  }

  render() {
    const {
      category,
      intl,
      onItemCheckboxChange,
      selectItems,
      withCheckBox,
      ancestors,
      deleteCategory,
      ...props
    } = this.props
    const mutualProps = { selectItems, withCheckBox, onItemCheckboxChange }
    const { expand } = this.state

    return (
      <React.Fragment>
        <CategoryTreeListItem
          category={category}
          onClick={() => false}
          intl={intl}
          checkbox={withCheckBox}
          deleteCategory={deleteCategory}
          // onClick={this._onItemClick}
          {...mutualProps}
          {...props}
        />
        {expand && ancestors.length < 4 && (
          <ChildWrapper>
            <CategoryTreeList
              intl={intl}
              parent={category._id}
              ancestors={ancestors}
              deleteCategory={deleteCategory}
              {...mutualProps}
            />
          </ChildWrapper>
        )}
      </React.Fragment>
    )
  }
}

export default CategoryTreeListItemWithExpand
