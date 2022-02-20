import React from 'react';
import { connect } from 'react-redux';
import { toast } from '../../Lib/Toast';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Spin } from 'antd';
import { reset } from 'redux-form';

import FormName from '../../Constants/Form';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { WorkspacePaymentMethodActions } from '../../Redux/WorkspacePaymentMethod/actions';
import { getWorkspacePaymentMethods } from '../../Redux/selectors';
import WorkspacePaymentMethodList from '../../Components/App/WorkspacePaymentMethod/WorkspacePaymentMethodList';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class MyWorkspacePaymentMethodListContainer extends React.PureComponent {
  static defaultProps = {};
  componentDidMount() {
    const { getWorkspacePaymentMethods, workspacePaymentMethods } = this.props;
    if (!workspacePaymentMethods.length) {
      getWorkspacePaymentMethods();
    }
  }

  _onItemDelete = id => {
    const { deleteWorkspacePaymentMethod } = this.props;
    deleteWorkspacePaymentMethod(id);
  };

  _onItemSwitchToggle = (id, value) => {
    const { toggleActive } = this.props;
    toggleActive(id, value);
  };

  _onItemClick = (item = {}) => {
    const { history } = this.props;
    history.push(`/my-payment-method/${item._id}`);
  };

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      history,
      getWorkspacePaymentMethods
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    history.push('/my-payment-method');
    getWorkspacePaymentMethods({
      query: {},
      refresh: true
    });
  }

  onPageChange = (page, limit) => {
    const { getWorkspacePaymentMethods } = this.props;
    getWorkspacePaymentMethods({ query: { page, limit } });
  };

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspacePaymentMethods } = this.props;

    return workspacePaymentMethods
      ? {
          ...workspacePaymentMethods
        }
      : {};
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      workspacePaymentMethods,
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
      <WorkspacePaymentMethodList
        workspacePaymentMethods={workspacePaymentMethods}
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
        onItemToggle={this._onItemSwitchToggle}
        onItemDelete={this._onItemDelete}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = true;
  const {
    WORKSPACE_PAYMENT_METHOD_CREATE,
    WORKSPACE_PAYMENT_METHOD_UPDATE
  } = FormName;

  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode
    ? WORKSPACE_PAYMENT_METHOD_UPDATE
    : WORKSPACE_PAYMENT_METHOD_CREATE;

  return {
    form,
    locale: state.intl.locale,
    updateMode,
    workspacePaymentMethods: getWorkspacePaymentMethods(state),
    pagination: state.pagination.workspacePaymentMethods,
    currentWorkspace: currentWorkspace,
    loading: state.loading.getWorkspacePaymentMethods
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspacePaymentMethods:
        WorkspacePaymentMethodActions.getWorkspacePaymentMethods,
      updateWorkspacePaymentMethod:
        WorkspacePaymentMethodActions.updateWorkspacePaymentMethod,
      createWorkspacePaymentMethod:
        WorkspacePaymentMethodActions.createWorkspacePaymentMethod,
      getWorkspacePaymentMethodById:
        WorkspacePaymentMethodActions.getWorkspacePaymentMethodById,
      toggleActive: WorkspacePaymentMethodActions.toggleActive,
      deleteWorkspacePaymentMethod:
        WorkspacePaymentMethodActions.deleteWorkspacePaymentMethod,
      setSelected: WorkspacePaymentMethodActions.setSelected,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyWorkspacePaymentMethodListContainer)
);
