import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CategoryActions } from '../../Redux/Category/actions';
import { getCategoriesForParent } from '../../Redux/selectors';
import CategoryTreeListTemp from './CategoryTreeListTemp';

class _CategoryTreeList extends React.PureComponent {
  componentDidMount() {
    const { parent, fetchCategorys } = this.props;
    const fetchQuery = parent ? { parent } : {};
    fetchCategorys({
      ...fetchQuery,
      populates: []
    });
  }

  render() {
    return <CategoryTreeListTemp {...this.props} />;
  }
}

const mapStateToProps = (state, { ancestors = [], parent }) => ({
  categorys: getCategoriesForParent(state, parent || null)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCategorys: CategoryActions.getAllCategory
    },
    dispatch
  );
const CategoryTreeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CategoryTreeList);

export default CategoryTreeList;
