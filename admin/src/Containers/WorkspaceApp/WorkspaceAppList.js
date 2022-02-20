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
import WorkspaceAppList from '../../Components/App/WorkspaceApp/WorkspaceAppList';

import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { WorkspaceAppActions } from '../../Redux/WorkspaceApp/actions';
import { getWorkspaceApps } from '../../Redux/selectors';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class WorkspaceAppListContainer extends React.PureComponent {
  static defaultProps = {};
  componentDidMount() {
    const { getWorkspaceApps, workspaceApps } = this.props;
    if (!workspaceApps.length) {
      getWorkspaceApps();
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
    const { onSubmitSuccess, updateMode, getWorkspaceApps } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    getWorkspaceApps({
      query: {},
      refresh: true
    });
  }

  onPageChange = (page, limit) => {
    const { getWorkspaceApps } = this.props;
    getWorkspaceApps({ query: { page, limit } });
  };

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspaceApps } = this.props;

    return workspaceApps
      ? {
          ...workspaceApps
        }
      : {};
  };
  render() {
    let isLoading = true;
    const { updateMode, workspaceApps, intl, loading, pagination } = this.props;
    if (updateMode) {
      isLoading = false;
    }
    return isLoading ? (
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : (
      <WorkspaceAppList
        workspaceApps={workspaceApps}
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
  const { WORKSPACE_APP_CREATE, WORKSPACE_APP_UPDATE } = FormName;

  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode ? WORKSPACE_APP_UPDATE : WORKSPACE_APP_CREATE;

  return {
    form,
    locale: state.intl.locale,
    updateMode,
    workspaceApps: getWorkspaceApps(state),
    pagination: state.pagination.workspaceApps,
    currentWorkspace: currentWorkspace,
    loading: state.loading.getWorkspaceApps
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspaceApps: WorkspaceAppActions.getWorkspaceApps,
      setSelected: WorkspaceAppActions.setSelected,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceAppListContainer)
);
