import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cloneDeep from 'lodash/cloneDeep';
import { helpers } from '@golpasal/common';
import FormName from '../../Constants/Form';
import MyWorkspaceForm from '../../Components/App/Workspace/MyWorkspaceForm';

import * as WorkspaceFormUtils from './WorkspaceFormUtils';
const { convertTimeValue } = helpers;

class WorkspaceFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  constructor(props) {
    super(props);
    this.state = {
      checkboxValue: undefined
    };
  }

  componentDidMount() {
    WorkspaceFormUtils.componentDidMount(this);
  }

  onSubmit(workspace) {
    WorkspaceFormUtils.onSubmit(workspace, this);
  }

  onSubmitSuccess() {
    WorkspaceFormUtils.myWorkspace_onSubmitSuccess(this);
  }

  onSubmitFail() {}

  CheckboxChange = value => {
    this.setState({ checkboxValue: value });
  };

  render() {
    let initialValues = {};
    const {
      workspace,
      locale,
      intl,
      updateMode,
      currencies,
      categories,
      currentUserType,
      worksapceType,
      workspaceHooks,
      appHook,
      appHookName,
      formValueIntegrations,
      formValueSetting,
      formValueRecruitmentTypes,
      formValueContacts,
      currentUser,
      workspaceId
    } = this.props;
    const { CheckboxChange } = this;
    const { checkboxValue } = this.state;
    if (workspace) {
      let setting = Object.assign({}, workspace.setting, {
        logo: [{ fileMeta: workspace.setting.logo }],
        favicon: [{ fileMeta: workspace.setting.favicon }],
        headerLogo: [{ fileMeta: workspace.setting.headerLogo }],
        loginBackgroundImage: [
          { fileMeta: workspace.setting.loginBackgroundImage }
        ]
      });
      workspace.setting = setting;
      let cloneWorkspace = cloneDeep(workspace);
      if (cloneWorkspace.integrations) {
        cloneWorkspace.integrations.forEach((item, i) => {
          let hookData = [];
          if (item.app !== 'Customize') {
            item.hooks.forEach(items => {
              hookData.push(items.code);
            });
            if (hookData.length) {
              cloneWorkspace.integrations[i].hooks = hookData;
            }
          }
        });
      }
      const notAllowModifyIn =
        workspace &&
        workspace.preferences &&
        workspace.preferences.event &&
        workspace.preferences.event.notAllowModifyIn;
      const eventNotAllowModifyIn =
        notAllowModifyIn && notAllowModifyIn / 60000;

      if (
        workspace.preferences &&
        workspace.preferences.member &&
        workspace.preferences.member.icon
      ) {
        cloneWorkspace.preferences.member.icon = [
          { fileMeta: workspace.preferences.member.icon }
        ];
      }

      if (
        workspace.preferences &&
        workspace.preferences.merchant &&
        workspace.preferences.merchant.icon
      ) {
        cloneWorkspace.preferences.merchant.icon = [
          { fileMeta: workspace.preferences.merchant.icon }
        ];
      }

      if (
        workspace.preferences &&
        workspace.preferences.receipt &&
        workspace.preferences.receipt.backgroundImage
      ) {
        cloneWorkspace.preferences.receipt.backgroundImage = [
          { fileMeta: workspace.preferences.receipt.backgroundImage }
        ];
      }
      if (
        workspace.preferences &&
        workspace.preferences.receipt &&
        workspace.preferences.receipt.headerImage
      ) {
        cloneWorkspace.preferences.receipt.headerImage = [
          { fileMeta: workspace.preferences.receipt.headerImage }
        ];
      }
      if (
        workspace.preferences &&
        workspace.preferences.receipt &&
        workspace.preferences.receipt.footerImage
      ) {
        cloneWorkspace.preferences.receipt.footerImage = [
          { fileMeta: workspace.preferences.receipt.footerImage }
        ];
      }
      if (notAllowModifyIn) {
        cloneWorkspace.preferences.event.notAllowModifyIn = eventNotAllowModifyIn;
      }
      if (workspace?.preferences?.order?.acceptOrderCoolingOffPeriod) {
        cloneWorkspace.preferences.order.acceptOrderCoolingOffPeriod = convertTimeValue(
          workspace.preferences.order.acceptOrderCoolingOffPeriod,
          'ms',
          'm'
        );
      }
      initialValues = Object.assign({}, cloneWorkspace);
      // initialValues = Object.assign({}, workspace, {
      //   logo: [{ fileMeta: workspace.setting.logo }],
      //   favicon: [{ fileMeta: workspace.setting.favicon }],
      //   headerLogo: [{ fileMeta: workspace.setting.headerLogo }],
      //   loginBackgroundImage: [
      //     { fileMeta: workspace.setting.loginBackgroundImage }
      //   ]
      // });
    }
    // initialValues.contacts = workspace.contacts[0];
    const { WORKSPACE_CREATE, WORKSPACE_UPDATE } = FormName;
    return (
      <MyWorkspaceForm
        locale={locale}
        intl={intl}
        form={updateMode ? WORKSPACE_UPDATE : WORKSPACE_CREATE}
        checkboxValue={checkboxValue}
        checkboxChange={CheckboxChange}
        workspaceHooks={workspaceHooks}
        formValueIntegrations={formValueIntegrations}
        formValueContacts={formValueContacts}
        formValueSetting={formValueSetting}
        formValueRecruitmentTypes={formValueRecruitmentTypes}
        // images={initialValues ? initialValues.logo : []}
        updateMode={updateMode}
        currencies={currencies}
        categories={categories}
        worksapceType={worksapceType}
        initialValues={initialValues}
        currentUserType={currentUserType}
        appHook={appHook}
        appHookName={appHookName}
        currentUser={currentUser}
        workspaceId={workspaceId}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = WorkspaceFormUtils.myWorkspacemapStateToProps;

const mapDispatchToProps = WorkspaceFormUtils.mapDispatchToProps;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceFormContainer)
);
