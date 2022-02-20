import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Spin } from 'antd';
import { reset } from 'redux-form';
import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { WorkspaceSubscriptionActions } from '../../Redux/WorkspaceSubscription/actions';
import { WorkspaceSubscriptionPlanActions } from '../../Redux/WorkspaceSubscriptionPlan/actions';
import {
  getWorkspaceSubscriptions,
  getAllWorkspaceSubscriptionPlans
} from '../../Redux/selectors';
import WorkspaceSubscriptionList from '../../Components/App/WorkspaceSubscription/WorkspaceSubscriptionList';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class MyWorkspaceSubscriptionListContainer extends React.PureComponent {
  static defaultProps = {};
  componentDidMount() {
    const {
      getWorkspaceSubscriptions,
      getAllWorkspaceSubscriptionPlans
    } = this.props;

    getWorkspaceSubscriptions();
    getAllWorkspaceSubscriptionPlans();
  }

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      getWorkspaceSubscriptions
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    getWorkspaceSubscriptions({
      query: {},
      refresh: true
    });
  }

  onPageChange = (page, limit) => {
    const { getWorkspaceSubscriptions } = this.props;
    getWorkspaceSubscriptions({ query: { page, limit } });
  };

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspaceSubscriptions } = this.props;

    return workspaceSubscriptions
      ? {
          ...workspaceSubscriptions
        }
      : {};
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      workspaceSubscriptions,
      workspaceSubscriptionPlans,
      // locale,
      intl,
      // form,
      loading,
      pagination,
      currentWorkspace,
      onClick,
      updateWorkspaceSubscription
    } = this.props;
    if (updateMode) {
      isLoading = false;
    }
    return isLoading ? (
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : workspaceSubscriptions.length > 0 ? (
      <WorkspaceSubscriptionList
        workspaceSubscriptions={workspaceSubscriptions}
        workspaceSubscriptionPlans={workspaceSubscriptionPlans}
        intl={intl}
        currentWorkspace={currentWorkspace}
        onClick={onClick}
        updateWorkspaceSubscription={updateWorkspaceSubscription}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this.onPageChange
        }}
        loading={loading}
        onItemClick={this._onItemClick}
      />
    ) : (
      intl.formatMessage({ id: 'display_workspace_app_history_not_data' })
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = true;
  const {
    WORKSPACE_SUBSCRIPTION_CREATE,
    WORKSPACE_SUBSCRIPTION_UPDATE
  } = FormName;

  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode
    ? WORKSPACE_SUBSCRIPTION_UPDATE
    : WORKSPACE_SUBSCRIPTION_CREATE;

  return {
    form,
    locale: state.intl.locale,
    updateMode,
    workspaceSubscriptions: getWorkspaceSubscriptions(state),
    workspaceSubscriptionPlans: getAllWorkspaceSubscriptionPlans(state),
    pagination: state.pagination.workspaceSubscriptions,
    currentWorkspace: currentWorkspace
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspaceSubscriptions:
        WorkspaceSubscriptionActions.getWorkspaceSubscriptions,
      getAllWorkspaceSubscriptionPlans:
        WorkspaceSubscriptionPlanActions.getAllWorkspaceSubscriptionPlans,
      updateWorkspaceSubscription:
        WorkspaceSubscriptionActions.updateWorkspaceSubscription,
      setSelected: WorkspaceSubscriptionActions.setSelected,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyWorkspaceSubscriptionListContainer)
);
