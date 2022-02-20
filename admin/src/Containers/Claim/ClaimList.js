import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../Components/Common/Loading';
import ClaimList from '../../Components/App/Claim/ClaimList';

import { ClaimActions } from '../../Redux/Claim/actions';
import { getClaims } from '../../Redux/selectors';

class ClaimListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchClaim({ refresh: true });
  }

  _onLoadMore = () => {
    const { fetchClaim } = this.props;
    fetchClaim({ append: true });
  };

  fetchClaim(options = {}) {
    const { fetchClaim, query } = this.props;
    fetchClaim({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    });
  }

  onPageChange = (page, limit) => {
    this.fetchClaim({ query: { page: Number(page), limit: Number(limit) } });
  };
  render() {
    const isLoading = false;
    const {
      claims,
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
      <ClaimList
        locale={locale}
        intl={intl}
        onLoadMore={this._onLoadMore}
        claims={claims}
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
    claims: getClaims(state),
    pagination: state.pagination.claims
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchClaim: ClaimActions.getClaims
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClaimListContainer)
);
