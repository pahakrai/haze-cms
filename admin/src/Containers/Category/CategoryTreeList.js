import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { CategoryActions } from '../../Redux/Category/actions'
import { getCategoriesForParent } from '../../Redux/selectors'
import CategoryTreeListTemp from './CategoryTreeListTemp'

class _CategoryTreeList extends React.PureComponent {
  componentDidMount() {
    const { parent, fetchCategories, categoryType } = this.props
    const fetchQuery = parent ? { parent } : {}
    fetchCategories({
      ...{ ...fetchQuery, types: [categoryType] },
      populates: []
    })
  }

  render() {
    return <CategoryTreeListTemp {...this.props} />
  }
}

const mapStateToProps = (state, { ancestors = [], parent, categoryType }) => ({
  categories: getCategoriesForParent(state, parent || null, categoryType)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCategories: CategoryActions.getAllCategory
    },
    dispatch
  )
const CategoryTreeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CategoryTreeList)

export default CategoryTreeList
