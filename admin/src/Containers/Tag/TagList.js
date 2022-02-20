import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TagList from '../../Components/App/Tag/TagList';
import { TagActions } from '../../Redux/Tag/actions';
import { getDistinctResults } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class OrderListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchDistinctTags();
  }

  _onLoadMore = () => {
    const { fetchDistinctTags } = this.props;
    fetchDistinctTags();
  };

  fetchDistinctTags(options = {}) {
    const { fetchDistinctTags, filterValues } = this.props;
    fetchDistinctTags({
      ...options,
      query: { ...filterValues, ...(options.query || {}), populates: [] }
    });
  }

  onPageChange = (page, limit) => {
    this.fetchDistinctTags({ query: { page, limit } });
  };

  render() {
    const {
      tags,
      locale,
      intl,
      pagination,
      renderFooter,
      header,
      gutter
    } = this.props;
    const isLoading = pagination.fetching;
    return (
      <TagList
        locale={locale}
        intl={intl}
        isNextPageLoading={pagination.fetching}
        isEnd={pagination.isEnd}
        onLoadMore={this._onLoadMore}
        tags={tags}
        onDeleteClick={expense => true}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
        loading={isLoading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this.onPageChange
        }}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  tags: getDistinctResults(state),
  pagination: state.pagination.tags
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDistinctTags: TagActions.getDistinctTags
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderListContainer)
);
