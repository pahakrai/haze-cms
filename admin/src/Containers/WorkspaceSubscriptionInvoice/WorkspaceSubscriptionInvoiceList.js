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
import { WorkspaceSubscriptionInvoiceActions } from '../../Redux/WorkspaceSubscriptionInvoice/actions';
import { getWorkspaceSubscriptionInvoices } from '../../Redux/selectors';
import WorkspaceSubscriptionInvoiceList from '../../Components/App/WorkspaceSubscriptionInvoice/WorkspaceSubscriptionInvoiceList';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class WorkspaceSubscriptionInvoiceListContainer extends React.PureComponent {
  static defaultProps = {};
  componentDidMount() {
    const {
      getWorkspaceSubscriptionInvoices,
      workspaceSubscriptionInvoices
    } = this.props;
    if (!workspaceSubscriptionInvoices.length) {
      getWorkspaceSubscriptionInvoices();
    }
  }

  _onItemClick = (item = {}) => {
    const { history } = this.props;
    history.push(`/my-payment-method/${item._id}`);
  };

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      getWorkspaceSubscriptionInvoices
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    getWorkspaceSubscriptionInvoices({
      query: {},
      refresh: true
    });
  }

  onPageChange = (page, limit) => {
    const { getWorkspaceSubscriptionInvoices } = this.props;
    getWorkspaceSubscriptionInvoices({ query: { page, limit } });
  };

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspaceSubscriptionInvoices } = this.props;

    return workspaceSubscriptionInvoices
      ? {
          ...workspaceSubscriptionInvoices
        }
      : {};
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      workspaceSubscriptionInvoices,
      // locale,
      intl,
      // form,
      loading,
      pagination
    } = this.props;
    if (updateMode) {
      isLoading = false;
    }

    return isLoading ? (
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : (
      <WorkspaceSubscriptionInvoiceList
        workspaceSubscriptionInvoices={workspaceSubscriptionInvoices}
        intl={intl}
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = true;
  const {
    WORKSPACE_SUBSCRIPTION_INVOICE_CREATE,
    WORKSPACE_SUBSCRIPTION_INVOICE_UPDATE
  } = FormName;

  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode
    ? WORKSPACE_SUBSCRIPTION_INVOICE_UPDATE
    : WORKSPACE_SUBSCRIPTION_INVOICE_CREATE;

  return {
    form,
    locale: state.intl.locale,
    updateMode,
    workspaceSubscriptionInvoices: getWorkspaceSubscriptionInvoices(state),
    pagination: state.pagination.workspaceSubscriptionInvoices,
    currentWorkspace: currentWorkspace,
    loading: state.loading.getWorkspaceSubscriptionInvoices
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspaceSubscriptionInvoices:
        WorkspaceSubscriptionInvoiceActions.getWorkspaceSubscriptionInvoices,
      updateWorkspaceSubscriptionInvoice:
        WorkspaceSubscriptionInvoiceActions.updateWorkspaceSubscriptionInvoice,
      createWorkspaceSubscriptionInvoice:
        WorkspaceSubscriptionInvoiceActions.createWorkspaceSubscriptionInvoice,
      getWorkspaceSubscriptionInvoiceById:
        WorkspaceSubscriptionInvoiceActions.getWorkspaceSubscriptionInvoiceById,
      setSelected: WorkspaceSubscriptionInvoiceActions.setSelected,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkspaceSubscriptionInvoiceListContainer)
);
