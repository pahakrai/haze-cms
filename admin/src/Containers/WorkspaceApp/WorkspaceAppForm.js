import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { reset } from 'redux-form';
import styled, { withTheme } from 'styled-components';
import { Spin } from 'antd';
import { formValueSelector } from 'redux-form';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';
import WorkspaceAppForm from '../../Components/App/WorkspaceApp/WorkspaceAppForm';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { WorkspaceAppActions } from '../../Redux/WorkspaceApp/actions';
import { getWorkspaceAppById, getWorkspaceApps } from '../../Redux/selectors';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class WorkspaceAppFormContainer extends React.PureComponent {
  componentDidMount() {
    const { workspaceAppId, getWorkspaceAppById } = this.props;
    if (workspaceAppId) {
      getWorkspaceAppById(workspaceAppId, {
        populates: ['']
      });
    }
  }

  onSubmit(workspaceApp) {
    const {
      createWorkspaceApp,
      updateWorkspaceApp,
      // updateMode,
      currentWorkspace
    } = this.props;

    const fn = Boolean(workspaceApp._id)
      ? updateWorkspaceApp
      : createWorkspaceApp;

    workspaceApp.workspace = currentWorkspace && currentWorkspace._id;
    fn(workspaceApp);
  }

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      // history,
      getWorkspaceApps,
      closeModal
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    closeModal();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }

    getWorkspaceApps({
      query: {},
      refresh: true
    });
  }

  releaseNewVersion = (id, platformType) => {
    const { releaseNewVersion } = this.props;
    releaseNewVersion(id, platformType);
  };

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspaceApp } = this.props;

    return workspaceApp
      ? {
          ...workspaceApp
        }
      : {};
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      locale,
      intl,
      workspaceApp,
      workspaceApps,
      formValueIOSHistory,
      formValueAndroidHistory,
      form,
      theme
    } = this.props;
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
      <WorkspaceAppForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={this.getInitialValues()}
        workspaceApps={workspaceApps}
        workspaceApp={workspaceApp}
        updateMode={updateMode}
        formValueIOSHistory={formValueIOSHistory}
        formValueAndroidHistory={formValueAndroidHistory}
        releaseNewVersion={this.releaseNewVersion}
        theme={theme}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = !!ownProps.workspaceAppId;
  const { WORKSPACE_APP_CREATE, WORKSPACE_APP_UPDATE } = FormName;
  const workspaceApp = getWorkspaceAppById(state, ownProps.workspaceAppId);
  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode ? WORKSPACE_APP_UPDATE : WORKSPACE_APP_CREATE;

  const selector = formValueSelector(form);
  return {
    workspaceApp,
    form,
    workspaceApps: getWorkspaceApps(state),
    locale: state.intl.locale,
    updateMode,
    currentWorkspace: currentWorkspace,
    formValueIOSHistory: selector(state, 'productionIOS.history'),
    formValueAndroidHistory: selector(state, 'productionAndroid.history')
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspaceApps: WorkspaceAppActions.getWorkspaceApps,
      updateWorkspaceApp: WorkspaceAppActions.updateWorkspaceApp,
      createWorkspaceApp: WorkspaceAppActions.createWorkspaceApp,
      getWorkspaceAppById: WorkspaceAppActions.getWorkspaceAppById,
      releaseNewVersion: WorkspaceAppActions.releaseNewVersion,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTheme(WorkspaceAppFormContainer))
);
