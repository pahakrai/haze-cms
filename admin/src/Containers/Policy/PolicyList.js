import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../Components/Common/Loading';
import PolicyList from '../../Components/App/Policy/PolicyList';

import { PolicyActions } from '../../Redux/Policy/actions';
import { getPolicies } from '../../Redux/selectors';

class PolicyListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchPolicy({ refresh: true });
  }

  _onLoadMore = () => {
    const { fetchPolicy } = this.props;
    fetchPolicy({ append: true });
  };

  fetchPolicy(options = {}) {
    const { fetchPolicy, query } = this.props;
    fetchPolicy({
      ...options,
      query: {
        workspaceAccessFilter: false,
        workspaceTypesFilter: false,
        sort: 'name',
        ...query,
        ...(options.query || {}),
        populates: []
      }
    });
  }

  onPageChange = (page, limit) => {
    this.fetchPolicy({ query: { page: Number(page), limit: Number(limit) } });
  };
  render() {
    const isLoading = false;
    const {
      policies,
      locale,
      intl,
      pagination,
      renderFooter,
      header,
      gutter
    } = this.props;

    return isLoading ? (
      <Loading />
    ) : (
      <PolicyList
        locale={locale}
        intl={intl}
        onLoadMore={this._onLoadMore}
        policies={policies}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
        loading={pagination.fetching}
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
const mapStateToProps = state => {
  return {
    locale: state.intl.locale,
    policies: getPolicies(state),
    pagination: state.pagination.policies
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPolicy: PolicyActions.getPolicies
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PolicyListContainer)
);
