import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { CategoryActions } from '../../Redux/Category/actions'
import { getCategories } from '../../Redux/selectors'
import CategoryTreeListTemp from './CategoryTreeListTemp'

class _CategoryTreeList extends React.PureComponent {
  componentDidMount() {
    const { parent, fetchCategories, categories, categoryType } = this.props
    const fetchQuery = parent ? { parent } : {}
    if (!categories.length)
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
  categories: getCategories(state)
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
