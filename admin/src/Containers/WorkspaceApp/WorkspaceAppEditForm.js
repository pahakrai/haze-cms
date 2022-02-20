import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { reset } from 'redux-form';
import styled from 'styled-components';
import { Spin } from 'antd';
import { formValueSelector } from 'redux-form';
import { cloneDeep, hasIn } from 'lodash';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';
import WorkspaceAppEditForm from '../../Components/App/WorkspaceApp/ReleaseButton';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { WorkspaceAppActions } from '../../Redux/WorkspaceApp/actions';
import { getWorkspaceAppById, getWorkspaceApps } from '../../Redux/selectors';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class WorkspaceAppEditFormContainer extends React.PureComponent {
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

  createNewVersion = (id, platformType, value) => {
    const { createNewVersion, workspaceApp } = this.props;

    if (platformType === 'ios' && workspaceApp.productionIOS) {
      value = {
        ...value,
        appId: workspaceApp.productionIOS.appId,
        appIconLink: workspaceApp.productionIOS.appIconLink,
        touchIcon: workspaceApp.productionIOS.touchIcon
      };
    } else if (platformType === 'android' && workspaceApp.productionAndroid) {
      value = {
        ...value,
        appId: workspaceApp.productionAndroid.appId,
        appIconLink: workspaceApp.productionAndroid.appIconLink,
        touchIcon: workspaceApp.productionAndroid.touchIcon
      };
    } else {
      value = {
        ...value,
        appId: null,
        appIconLink: null,
        touchIcon: null
      };
    }
    createNewVersion(id, platformType, value);
  };

  updateNewVersion = (id, platformType, value) => {
    const { updateWorkspaceApp, workspaceApp } = this.props;
    const _workspaceApp = cloneDeep(workspaceApp);
    if (platformType === 'ios') {
      _workspaceApp.productionIOS = {
        ..._workspaceApp.productionIOS,
        appId: value.appId,
        appIconLink: value.appIconLink,
        touchIcon: value.touchIcon
      };
    } else {
      _workspaceApp.productionAndroid = {
        ..._workspaceApp.productionAndroid,
        appId: value.appId,
        appIconLink: value.appIconLink,
        touchIcon: value.touchIcon
      };
    }
    updateWorkspaceApp(_workspaceApp);
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
      formValueIOSHistory,
      formValueAndroidHistory,
      form,
      editType
    } = this.props;

    // loading
    if (!updateMode) {
      isLoading = false;
    } else {
      if (workspaceApp) {
        isLoading = false;
      }
    }
    return !hasIn(workspaceApp, '_id') || isLoading ? (
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : (
      <WorkspaceAppEditForm
        locale={locale}
        intl={intl}
        initialValues={this.getInitialValues()}
        form={form}
        workspaceApp={workspaceApp}
        editType={editType}
        updateMode={updateMode}
        formValueIOSHistory={formValueIOSHistory}
        formValueAndroidHistory={formValueAndroidHistory}
        createNewVersion={this.createNewVersion}
        updateNewVersion={this.updateNewVersion}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = false;
  const { WORKSPACE_APP_CREATE, WORKSPACE_APP_UPDATE } = FormName;
  const workspaceApp = getWorkspaceAppById(
    state,
    // ownProps.workspaceAppId
    ownProps.match.params.workspaceAppId
  );
  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode ? WORKSPACE_APP_UPDATE : WORKSPACE_APP_CREATE;

  const selector = formValueSelector(form);
  return {
    workspaceApp,
    form,
    workspaceApps: getWorkspaceApps(state),
    locale: state.intl.locale,
    updateMode,
    editType: ownProps.editType,
    currentWorkspace: currentWorkspace,
    workspaceAppId: ownProps.match.params.workspaceAppId,
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
      createNewVersion: WorkspaceAppActions.createNewVersion,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceAppEditFormContainer)
);
