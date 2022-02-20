import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReportList from '../../Components/App/SystemReport/ReportList';
import { SystemReportActions } from '../../Redux/SystemReport/actions';
import { getSystemReports } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class ReportListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchSystemReports();
  }

  _onLoadMore = () => {
    const { fetchSystemReports } = this.props;
    fetchSystemReports();
  };

  fetchSystemReports(options = {}) {
    const { fetchSystemReports, filterValues } = this.props;
    fetchSystemReports({
      ...options,
      query: { ...filterValues, ...(options.query || {}), populates: [] }
    });
  }

  onPageChange = (page, limit) => {
    this.fetchSystemReports({ query: { page, limit } });
  };

  render() {
    const {
      reports,
      locale,
      intl,
      pagination,
      renderFooter,
      header,
      gutter
    } = this.props;
    const isLoading = pagination.fetching;
    return (
      <ReportList
        locale={locale}
        intl={intl}
        isNextPageLoading={pagination.fetching}
        isEnd={pagination.isEnd}
        onLoadMore={this._onLoadMore}
        reports={reports}
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
  reports: getSystemReports(state),
  pagination: state.pagination.systemReports
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSystemReports: SystemReportActions.getSystemReports
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReportListContainer)
);
