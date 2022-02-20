import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import SystemReportList from '../../Components/App/SystemReport/SystemReportList';
import { SystemReportActions } from '../../Redux/SystemReport/actions';
import { WorkspaceActions } from '../../Redux/Workspace/actions';
import { CustomerActions } from '../../Redux/Customer/actions';
import { EmployeeActions } from '../../Redux/Employee/actions';
import AccountSelector from '../../Redux/Account/selectors';

import {
  getWorkspaces,
  getCustomers,
  getEmployees,
  getAllVehicleType,
  getReportsWorkspaceAllowToAccess
} from '../../Redux/selectors';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';

import { VehicleTypeActions } from '../../Redux/VehicleType/actions';
import { withRouter } from 'react-router-dom';

class SystemReportListContainer extends React.PureComponent {
  componentDidMount() {
    const {
      systemReports,
      workspaces,
      // customers,
      // fetchCustomers,
      fetchWorkspaces,
      // fetchEmployees,
      // employees,
      getAllVehicleType
      // currentUserWorkspace
    } = this.props;
    if (!workspaces || workspaces.length === 0) fetchWorkspaces();
    // if (!customers || customers.length === 0)
    //   fetchCustomers({ workspace: currentUserWorkspace });
    // if (!employees || employees.length === 0) {
    //   fetchEmployees({ workspace: currentUserWorkspace });
    // }

    if (!systemReports.length) {
      this.fetchSystemReports({ refresh: true });
    }
    getAllVehicleType();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      currentUser,
      currentUserWorkspace,
      fetchEmployees,
      fetchCustomers
    } = this.props;
    if (prevProps.currentUser !== currentUser) {
      this.fetchSystemReports({
        filterValues: {},
        refresh: true
      });
      fetchCustomers({ currentUserWorkspace });
      fetchEmployees({ currentUserWorkspace });
    }
  }

  _onLoadMore = () => {
    const { fetchSystemReports } = this.props;
    fetchSystemReports({ append: true });
  };

  fetchSystemReports(options = { querys: {} }) {
    const { fetchSystemReports, currentUser } = this.props;
    let workspace;
    if (currentUser) {
      if (currentUser.workspace) {
        workspace = currentUser.workspace;
      }
    }
    fetchSystemReports({
      ...options,
      query: { ...options.querys, workspace, populates: [] }
    });
  }

  onItemClick = systemReport => {
    this.props.history.push(`/systemReports/${systemReport._id}`);
  };

  render() {
    const { onItemClick } = this;
    const isLoading = false;
    const {
      systemReports,
      locale,
      intl,
      workspaces,
      customers,
      employees,
      vehicleTypes,
      pagination: { fetching, isEnd },
      renderFooter,
      header,
      gutter,
      getSystemReportByName,
      currentUserWorkspace,
      currentUserType,
      currentWorkspace,
      getSystemReportByParameter
    } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <SystemReportList
        locale={locale}
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        onItemClick={onItemClick}
        systemReports={systemReports}
        workspaces={workspaces}
        currentWorkspace={currentWorkspace}
        currentUserWorkspace={currentUserWorkspace}
        currentUserType={currentUserType}
        customers={customers}
        employees={employees}
        vehicleTypes={vehicleTypes}
        getSystemReportByName={getSystemReportByName}
        getSystemReportByParameter={getSystemReportByParameter}
        // onDeleteClick={expense => true}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl,
  systemReports: getReportsWorkspaceAllowToAccess(state),
  workspaces: getWorkspaces(state),
  customers: getCustomers(state),
  employees: getEmployees(state),
  vehicleTypes: getAllVehicleType(state),
  currentWorkspace: getCurrentWorkspace(state),
  pagination: state.pagination.systemReports,
  currentUser: AccountSelector.getCurrentUser(state),
  currentUserType: (AccountSelector.getCurrentUser(state) || {}).userType,
  currentUserWorkspace: (AccountSelector.getCurrentUser(state) || {}).workspace
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSystemReports: SystemReportActions.getReportsWorkspaceAllowToAccess,
      getSystemReportByParameter:
        SystemReportActions.getSystemReportByParameter,
      fetchWorkspaces: WorkspaceActions.getWorkspaces,
      fetchCustomers: CustomerActions.getCustomersWithAll,
      getAllVehicleType: VehicleTypeActions.getAllVehicleType,
      fetchEmployees: EmployeeActions.getEmployee,
      getSystemReportByName: SystemReportActions.getSystemReportByName
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SystemReportListContainer)
);
