import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Common, { helpers } from '@golpasal/common'
import cloneDeep from 'lodash/cloneDeep'

import Loading from '../../Components/Common/Loading'
import WorkspaceForm from '../../Components/App/Workspace/WorkspaceForm'

import * as WorkspaceFormUtils from './WorkspaceFormUtils'

const { WorkspaceStatus } = Common.status
const { convertTimeValue } = helpers

class WorkspaceFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  }
  constructor(props) {
    super(props)
    this.state = {
      checkboxValue: undefined
    }
  }
  componentDidMount() {
    WorkspaceFormUtils.componentDidMount(this)
  }
  onSubmit(workspace) {
    WorkspaceFormUtils.onSubmit(workspace, this)
  }

  onSubmitSuccess() {
    WorkspaceFormUtils.onSubmitSuccess(this)
  }

  CheckboxChange = (value) => {
    this.setState({ checkboxValue: value })
  }

  onSubmitFail() {}

  render() {
    let isLoading = true
    let initialValues = {}
    const {
      updateMode,
      workspace,
      locale,
      intl,
      worksapceType,
      currencies,
      workspaceHooks,
      currentUserType,
      workspaceId,
      form,
      secretValueSelector,
      appHook,
      appHookName,
      formValueIntegrations,
      formValueRecruitmentTypes,
      currentUser
    } = this.props
    const { CheckboxChange } = this
    const { checkboxValue } = this.state

    if (workspace && updateMode) {
      isLoading = false
      let setting = Object.assign({}, workspace.setting, {
        logo:
          workspace.setting && workspace.setting.logo
            ? [{ fileMeta: workspace.setting.logo }]
            : [],
        favicon:
          workspace.setting && workspace.setting.favicon
            ? [{ fileMeta: workspace.setting.favicon }]
            : [],
        headerLogo:
          workspace.setting.headerLogo && workspace.setting
            ? [{ fileMeta: workspace.setting.headerLogo }]
            : [],
        loginBackgroundImage:
          workspace.setting.loginBackgroundImage && workspace.setting
            ? [{ fileMeta: workspace.setting.loginBackgroundImage }]
            : []
      })
      workspace.setting = setting
      let cloneWorkspace = cloneDeep(workspace)
      if (cloneWorkspace.integrations) {
        cloneWorkspace.integrations.forEach((item, i) => {
          let hookData = []
          if (item.app !== 'Customize') {
            item.hooks.forEach((items) => {
              hookData.push(items.code)
            })
            if (hookData.length) {
              cloneWorkspace.integrations[i].hooks = hookData
            }
          }
        })
      }
      const notAllowModifyIn =
        workspace &&
        workspace.preferences &&
        workspace.preferences.event &&
        workspace.preferences.event.notAllowModifyIn
      const eventNotAllowModifyIn = notAllowModifyIn && notAllowModifyIn / 60000
      if (notAllowModifyIn) {
        cloneWorkspace.preferences.event.notAllowModifyIn =
          eventNotAllowModifyIn
      }

      if (
        workspace.preferences &&
        workspace.preferences.member &&
        workspace.preferences.member.icon
      ) {
        cloneWorkspace.preferences.member.icon = workspace.preferences.member
          .icon
          ? [{ fileMeta: workspace.preferences.member.icon }]
          : []
      }

      if (
        workspace.preferences &&
        workspace.preferences.merchant &&
        workspace.preferences.merchant.icon
      ) {
        cloneWorkspace.preferences.merchant.icon = [
          { fileMeta: workspace.preferences.merchant.icon }
        ]
      }
      if (
        workspace.preferences &&
        workspace.preferences.receipt &&
        workspace.preferences.receipt.backgroundImage
      ) {
        cloneWorkspace.preferences.receipt.backgroundImage = [
          { fileMeta: workspace.preferences.receipt.backgroundImage }
        ]
      }
      if (
        workspace.preferences &&
        workspace.preferences.receipt &&
        workspace.preferences.receipt.headerImage
      ) {
        cloneWorkspace.preferences.receipt.headerImage = [
          { fileMeta: workspace.preferences.receipt.headerImage }
        ]
      }
      if (
        workspace.preferences &&
        workspace.preferences.receipt &&
        workspace.preferences.receipt.footerImage
      ) {
        cloneWorkspace.preferences.receipt.footerImage = [
          { fileMeta: workspace.preferences.receipt.footerImage }
        ]
      }
      if (workspace?.preferences?.order?.acceptOrderCoolingOffPeriod) {
        cloneWorkspace.preferences.order.acceptOrderCoolingOffPeriod =
          convertTimeValue(
            workspace.preferences.order.acceptOrderCoolingOffPeriod,
            'ms',
            'm'
          )
      }
      initialValues = Object.assign({}, cloneWorkspace)
    }
    if (!updateMode) {
      isLoading = false
    }
    return isLoading ? (
      <Loading />
    ) : (
      <WorkspaceForm
        locale={locale}
        intl={intl}
        images={initialValues ? initialValues.logo : []}
        currencies={currencies}
        workspaceHooks={workspaceHooks}
        updateMode={updateMode}
        form={form}
        worksapceType={worksapceType}
        initialValues={
          updateMode
            ? initialValues
            : {
                status: WorkspaceStatus.INACTIVE,
                logo: [],
                hooks: []
              }
        }
        checkboxValue={checkboxValue}
        checkboxChange={CheckboxChange}
        currentUserType={currentUserType}
        formValueIntegrations={formValueIntegrations}
        formValueRecruitmentTypes={formValueRecruitmentTypes}
        appHook={appHook}
        appHookName={appHookName}
        workspaceId={workspaceId}
        secretValueSelector={secretValueSelector}
        currentUser={currentUser}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    )
  }
}

const mapStateToProps = WorkspaceFormUtils.mapStateToProps

const mapDispatchToProps = WorkspaceFormUtils.mapDispatchToProps

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceFormContainer)
)
