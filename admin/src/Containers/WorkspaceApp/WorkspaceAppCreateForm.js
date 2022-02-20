import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { reset } from 'redux-form';
import styled from 'styled-components';
import { Spin } from 'antd';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';
import WorkspaceAppCreateForm from '../../Components/App/WorkspaceApp/WorkspaceAppCreateForm';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { WorkspaceAppActions } from '../../Redux/WorkspaceApp/actions';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class WorkspaceAppCreateFormContainer extends React.PureComponent {
  onSubmit(workspaceApp) {
    const { createWorkspaceApp, currentWorkspace } = this.props;
    workspaceApp.workspace = currentWorkspace && currentWorkspace._id;
    createWorkspaceApp(workspaceApp);
  }

  onSubmitSuccess() {
    const { onSubmitSuccess, updateMode, history, selectedId } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    history.push(`/workspace-app/${selectedId}`);
  }

  onSubmitFail() {}

  getInitialValues = () => {
    return {};
  };
  render() {
    let isLoading = true;
    const { updateMode, locale, intl, workspaceApp, form } = this.props;
    // loading
    if (!updateMode) {
      isLoading = false;
    } else {
      if (workspaceApp) {
        isLoading = false;
      }
    }
    return isLoading ? (
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : (
      <WorkspaceAppCreateForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={this.getInitialValues()}
        updateMode={updateMode}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentWorkspace = getCurrentWorkspace(state);
  const form = FormName.WORKSPACE_APP_CREATE;

  return {
    form,
    locale: state.intl.locale,
    currentWorkspace: currentWorkspace,
    selectedId: state.workspaceApp.selected
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createWorkspaceApp: WorkspaceAppActions.createWorkspaceApp,
      getWorkspaceApps: WorkspaceAppActions.getWorkspaceApps,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceAppCreateFormContainer)
);
