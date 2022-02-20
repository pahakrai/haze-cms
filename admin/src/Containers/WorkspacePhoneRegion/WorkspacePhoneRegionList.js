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
import { WorkspacePhoneRegionActions } from '../../Redux/WorkspacePhoneRegion/actions';
import { getWorkspacePhoneRegions } from '../../Redux/selectors';
import WorkspacePhoneRegionList from '../../Components/App/WorkspacePhoneRegion/WorkspacePhoneRegionList';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class MyWorkspacePhoneRegionListContainer extends React.PureComponent {
  static defaultProps = {};
  componentDidMount() {
    const { getWorkspacePhoneRegions, workspacePhoneRegions } = this.props;
    if (!workspacePhoneRegions.length) {
      getWorkspacePhoneRegions();
    }
  }

  _onItemDelete = id => {
    const { deleteWorkspacePhoneRegion } = this.props;
    deleteWorkspacePhoneRegion(id);
  };

  _onItemClick = (item = {}) => {
    const { history } = this.props;
    history.push(`/my-payment-method/${item._id}`);
  };

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      getWorkspacePhoneRegions
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    getWorkspacePhoneRegions({
      query: {},
      refresh: true
    });
  }

  onPageChange = (page, limit) => {
    const { getWorkspacePhoneRegions } = this.props;
    getWorkspacePhoneRegions({ query: { page, limit } });
  };

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspacePhoneRegions } = this.props;

    return workspacePhoneRegions
      ? {
          ...workspacePhoneRegions
        }
      : {};
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      workspacePhoneRegions,
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
      <WorkspacePhoneRegionList
        workspacePhoneRegions={workspacePhoneRegions}
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
    workspacePhoneRegions: getWorkspacePhoneRegions(state),
    pagination: state.pagination.workspacePhoneRegions,
    currentWorkspace: currentWorkspace,
    loading: state.loading.getWorkspacePhoneRegions
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspacePhoneRegions:
        WorkspacePhoneRegionActions.getWorkspacePhoneRegions,
      updateWorkspacePhoneRegion:
        WorkspacePhoneRegionActions.updateWorkspacePhoneRegion,
      createWorkspacePhoneRegion:
        WorkspacePhoneRegionActions.createWorkspacePhoneRegion,
      getWorkspacePhoneRegionById:
        WorkspacePhoneRegionActions.getWorkspacePhoneRegionById,
      toggleActive: WorkspacePhoneRegionActions.toggleActive,
      deleteWorkspacePhoneRegion:
        WorkspacePhoneRegionActions.deleteWorkspacePhoneRegion,
      setSelected: WorkspacePhoneRegionActions.setSelected,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyWorkspacePhoneRegionListContainer)
);
