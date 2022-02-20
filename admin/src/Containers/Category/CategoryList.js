import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import CategoryList from '../../Components/App/Category/CategoryList';
import { CategoryActions } from '../../Redux/Category/actions';
import { getCategories } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class CategoryListContainer extends React.PureComponent {
  componentDidMount() {
    const { Categorys } = this.props;
    if (!Categorys.length) {
      this.getCategories({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { getCategories } = this.props;
    getCategories({ append: true });
  };

  getCategories(options = { querys: {} }) {
    const { getCategories } = this.props;
    getCategories({
      ...options,
      query: { ...options.querys, populates: [] }
    });
  }

  onItemClick = Category => {
    this.props.history.push(`/categorys/${Category._id}`);
  };

  render() {
    const { onItemClick } = this;
    const isLoading = false;
    const {
      Categorys,
      locale,
      intl,
      pagination: { fetching, isEnd },
      renderFooter,
      header,
      gutter
    } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <CategoryList
        locale={locale}
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        onItemClick={onItemClick}
        Categorys={Categorys}
        // onDeleteClick={expense => true}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  Categorys: getCategories(state),
  pagination: state.pagination.Categorys
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCategories: CategoryActions.getCategories
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer)
);
