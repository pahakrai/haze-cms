import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../Components/Common/Loading';
import ServiceList from '../../Components/App/Service/ServiceList';

import { ServiceActions } from '../../Redux/Service/actions';
import { ServiceTypeActions } from '../../Redux/ServiceType/actions';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import {
  getServices,
  getServiceTypesByWorkspaceType
} from '../../Redux/selectors';

class ServiceListContainer extends React.PureComponent {
  componentDidMount() {
    const { getServiceTypesByWorkspaceType } = this.props;
    this.fetchService({ refresh: true });
    getServiceTypesByWorkspaceType({});
  }

  _onLoadMore = () => {
    const { fetchService } = this.props;
    fetchService({ append: true });
  };

  fetchService(options = {}) {
    const { fetchService, query } = this.props;
    fetchService({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    });
  }

  onPageChange = (page, limit) => {
    this.fetchService({ query: { page: Number(page), limit: Number(limit) } });
  };
  onItemClick = item => {
    window.open(`/service/${item._id}`);
  };

  render() {
    const isLoading = false;
    const {
      services,
      serviceTypes,
      currentWorkspace,
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
      <ServiceList
        locale={locale}
        intl={intl}
        serviceTypes={serviceTypes}
        isNextPageLoading={pagination.fetching}
        isEnd={pagination.isEnd}
        onLoadMore={this._onLoadMore}
        onItemClick={this.onItemClick}
        services={services}
        currentWorkspace={currentWorkspace}
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
    services: getServices(state),
    serviceTypes: getServiceTypesByWorkspaceType(state),
    pagination: state.pagination.services,
    currentWorkspace: getCurrentWorkspace(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchService: ServiceActions.getServices,
      getServiceTypesByWorkspaceType:
        ServiceTypeActions.getServiceTypesByWorkspaceType
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceListContainer)
);
