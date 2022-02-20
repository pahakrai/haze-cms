import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CategoryActions } from '../../Redux/Category/actions';
import { getCategories } from '../../Redux/selectors';
import CategoryTreeListTemp from './CategoryTreeListTemp';

class _CategoryTreeList extends React.PureComponent {
  componentDidMount() {
    const { parent, fetchCategorys, categorys } = this.props;
    const fetchQuery = parent ? { parent } : {};
    if (!categorys.length)
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
  categorys: getCategories(state)
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
