import React from 'react'
import { hasIn } from 'lodash'
import { Tabs, Modal } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'
import { getFormValues, touch as touchFormAction } from 'redux-form'

import { toast } from '../../Lib/Toast'
import UserService from '../../Services/APIServices/UserService'

import { UserActions } from '../../Redux/User/actions'
import { ParamActions } from '../../Redux/Param/actions'
import { WorkspacePhoneRegionActions } from '../../Redux/WorkspacePhoneRegion/actions'
import AccountSelector from '../../Redux/Account/selectors'
import { AccountActions } from '../../Redux/Account/actions'
import { getCurrentWorkspace } from '../../Redux/Account/selectors'
import { PhoneRegionActions } from '../../Redux/PhoneRegion/actions'
import { UserLevelActions } from '../../Redux/UserLevel/actions'
import { CurrencyActions } from '../../Redux/Currency/actions'
import { RegionActions } from '../../Redux/Region/actions'

import Button from '../../Components/Common/Button'
import Loading from '../../Components/Common/Loading'
import H2 from '../../Components/Common/H4'
import UserForm from '../../Components/App/User/UserForm'

import {
  getUserById,
  getLanguages,
  getMemberByUserId,
  getUserLevels,
  getCurrencies,
  getWorkspacePhoneRegions
} from '../../Redux/selectors'

import FormName from '../../Constants/Form'

import * as UserFormUtils from './UserFormUtils'
import UserFormTabs from './UserFormTabs'

const { UserStatus } = Common.status
const { UserType } = Common.type

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 300px;
`
const ErrorWrapper = styled(LoadingWrapper)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 300px;
`

class UserFormContainer extends React.PureComponent {
  state = {
    activeKey: '1',
    requirementFields: [],
    getUserRequirementsLoading: false,
    getUserPasscodeLoading: false,
    userPasscode: '******'
  }
  componentDidMount() {
    const {
      userId,
      getUserProfile,
      getPreferenceLanguage,
      workspaceTypes,
      getUserLevels,
      currencies,
      fetchCurrencies,
      getWorkspacePhoneRegions
    } = this.props
    if (userId) getUserProfile(userId)
    if (getPreferenceLanguage) getPreferenceLanguage()
    if (!workspaceTypes) this.updateRequirementFields()
    getWorkspacePhoneRegions({})
    getUserLevels({
      query: { isActive: true }
    })

    if (!currencies.length) {
      fetchCurrencies()
    }
  }
  componentDidUpdate(prevProps) {
    const {
      // getUserErrors,
      // history,
      userId,
      getUserProfile,
      userType
    } = this.props

    // if (getUserErrors) {
    //   history.push('/error');
    // }

    if (userId && userId !== prevProps.userId) {
      this.setState({ activeKey: '1', userPasscode: '' })
      getUserProfile(userId)
    }
    if (userType !== prevProps.userType) {
      this.updateRequirementFields()
    }
  }

  async updateRequirementFields() {
    const { userType } = this.props
    this.setState({ getUserRequirementsLoading: true })
    if (userType) {
      try {
        const { data } = await UserService.getUserRequirements('meta', userType)
        this.setState({
          requirementFields: data || [],
          getUserRequirementsLoading: false
        })
      } catch (e) {
        this.setState({
          getUserRequirementsLoading: false
        })
      }
    }
  }

  async getUserPasscode(id) {
    const { intl } = this.props
    this.setState({ getUserPasscodeLoading: true })
    const { data } = await UserService.getUserPasscode({ user: id })
    this.setState({
      userPasscode: data.code || '',
      getUserPasscodeLoading: false
    })
    toast.success(intl.formatMessage({ id: 'msg.get_passcode_successful' }))
  }

  onSubmit = () => {
    const { activeKey, requirementFields } = this.state
    const {
      createUser,
      updateUserProfile,
      getRegionById,
      fromValues,
      preferenceFormValues,
      touchFormAction,
      currentWorkspace
    } = this.props
    UserFormUtils.onSubmit(
      {
        activeKey,
        createUser,
        updateUserProfile,
        getRegionById,
        fromValues,
        preferenceFormValues,
        touchFormAction,
        requirementFields,
        currentWorkspace
      },
      this
    )
  }

  onResetPassword = (email) => {
    const { sendResetPasswordEmail } = this.props
    if (email) {
      sendResetPasswordEmail(email)
      toast.success(`Send Reset Password Successfully`)
    }
  }

  onConfirmUser = (data, body) => {
    const { intl } = this.props
    if (data.type === 'send-verify-pass-code') {
      Modal.confirm({
        title: intl.formatMessage({
          id: 'display_send_verify_pass_code_message'
        }),
        okText: intl.formatMessage({ id: 'display_yes' }),
        cancelText: intl.formatMessage({ id: 'cancel' }),
        onOk: () => {
          this.onConfirmOk(data, body)
          return Promise.resolve()
        }
      })
    } else {
      this.onConfirmOk(data, body)
      return Promise.resolve()
    }
  }
  onConfirmOk = (data, body) => {
    const { intl } = this.props
    const { changeUserStatus, sendVerifyPassCode } = this.props
    if (data.type === 'send-verify-pass-code') {
      sendVerifyPassCode(data)
      toast.success(
        intl.formatMessage({ id: 'display_send_verify_pass_code_success' })
      )
    } else if (data.type === 'activate-user') {
      changeUserStatus(
        { userId: data.userId, userStatus: UserStatus.ACTIVE },
        { ...body }
      )
      toast.success(intl.formatMessage({ id: 'display_activate_user_success' }))
    } else if (data.type === 'lock-user') {
      changeUserStatus(
        { userId: data.userId, userStatus: UserStatus.LOCKED },
        { ...body }
      )
      toast.success(intl.formatMessage({ id: 'display_lock_user_success' }))
    }
  }

  onSubmitSuccess = () => {
    const { onSubmitSuccess } = this.props
    onSubmitSuccess && onSubmitSuccess()
  }

  onSubmitFail = () => {}

  getInitialValues = () => {
    const { user, member, updateMode, userType, currentUser } = this.props
    if (user && user.activationIssues) {
      let copyArr = user.activationIssues
      user.activationIssues = Object.assign([], copyArr).reverse()
    }
    const createValue = {
      userTypes: [userType],
      preferences: {
        language:
          process.env.REACT_APP_MULTI_LANGUAGE === 'false'
            ? process.env.REACT_APP_DEFAULT_LANGUAGE
            : '',
        receiveNotification: true
      },
      phoneRegionCode: '+852'
    }

    if (currentUser && currentUser.userType === UserType.USER) {
      createValue.workspace = currentUser.workspace
    }

    return updateMode
      ? {
          ...(user || {}),
          memberFields: {
            gender: member && member.gender,
            age: member && member.age,
            level: member && member.level,
            meta: member && member.meta
          },
          avatars: hasIn(user, 'avatars[0].fileMetaId')
            ? [
                {
                  fileMeta: user.avatars[0].fileMetaId
                }
              ]
            : undefined
        }
      : createValue
  }
  getStatusText = () => {
    const { fromValues, intl } = this.props
    const status = EcommCommonHelpers.getConstantByValue(
      'status',
      'UserStatus',
      fromValues ? fromValues.status : 's',
      intl.locale
    )
    return status ? status.text : ''
  }

  renderError() {
    return (
      <ErrorWrapper>
        <H2>
          <FormattedMessage id="error.user_no_exist" />
        </H2>
      </ErrorWrapper>
    )
  }

  render() {
    const key = this.props.user ? this.props.user._id : 'new'
    const {
      currentWorkspace,
      displayActivationIssuesTab = true,
      fieldControl = {},
      form,
      languages,
      intl,
      member,
      readOnly,
      phoneRegions,
      updateUserProfileLoading,
      userType,
      updateMode,
      getUserErrors,
      hasMember,
      userLevels,
      currencies,
      workspacePhoneRegions
    } = this.props
    const {
      requirementFields,
      getUserRequirementsLoading,
      getUserPasscodeLoading
    } = this.state
    const isLoading = getUserRequirementsLoading
    const initialValues = this.getInitialValues()
    const displaySubmitButtons = !updateMode

    if (getUserErrors) {
      return this.renderError()
    }
    const userForm = (
      <UserForm
        key={key}
        form={form}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        onSubmitSuccess={this.onSubmitSuccess}
        // others
        intl={intl}
        readOnly={readOnly}
        userType={userType}
        languages={languages}
        hasMember={hasMember}
        fieldControl={fieldControl}
        phoneRegions={phoneRegions}
        initialValues={initialValues}
        currentWorkspaceType={currentWorkspace}
        statusText={this.getStatusText()}
        onConfirmUser={this.onConfirmUser}
        onResetPassword={this.onResetPassword}
        requirementFields={requirementFields}
        displaySubmitButtons={displaySubmitButtons}
        canSelectLanguage={process.env.REACT_APP_MULTI_LANGUAGE === 'true'}
        userLevels={userLevels}
        workspacePhoneRegions={workspacePhoneRegions}
        userPasscode={this.state.userPasscode}
        getUserPasscode={(id) => this.getUserPasscode(id)}
        getUserPasscodeLoading={getUserPasscodeLoading}
      />
    )

    if (!updateMode) {
      return userForm
    }
    return isLoading ? (
      <LoadingWrapper>
        <Loading isLoading={isLoading} fill={false} />
      </LoadingWrapper>
    ) : (
      <React.Fragment>
        <Tabs
          type="card"
          className="user-form-tab"
          activeKey={this.state.activeKey}
          onChange={(key) => this.setState({ activeKey: key })}
        >
          <Tabs.TabPane
            style={{ paddingLeft: 15, paddingRight: 15 }}
            tab={intl.formatMessage({ id: 'tab_user_from_base' })}
            key="1"
          >
            {userForm}
          </Tabs.TabPane>
          {UserFormTabs({
            intl,
            updateMode,
            initialValues,
            member,
            currentWorkspace,
            userType,
            displaySubmitButtons,
            displayActivationIssuesTab,
            hasMember,
            userLevels,
            readOnly,
            currencies
          })}
        </Tabs>
        {!['5', '6', '7', '9'].includes(this.state.activeKey) && (
          <Button.Center topMargin>
            <Button.Primary
              type="button"
              onClick={this.onSubmit}
              disabled={updateUserProfileLoading}
            >
              {intl.formatMessage({ id: 'update_btn' })}
            </Button.Primary>
          </Button.Center>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { USER_CREATE, USER_UPDATE, PREFERENCE_UPDATE } = FormName
  const form = ownProps.updateMode ? USER_UPDATE : USER_CREATE
  const member = getMemberByUserId(state, ownProps.userId)
  return {
    form,
    updateUserProfileLoading: state.loading.updateUserProfile,
    fromValues: getFormValues(form)(state),
    preferenceFormValues: getFormValues(PREFERENCE_UPDATE)(state),
    user: getUserById(state, ownProps.userId),
    member: getMemberByUserId(state, ownProps.userId),
    hasMember: Boolean(member),
    userFilters: state.filter.user,
    getUserErrors: state.error.getUser,
    languages: getLanguages(state),
    currentUser: AccountSelector.getCurrentUser(state),
    currentWorkspace: getCurrentWorkspace(state),
    userLevels: getUserLevels(state),
    currencies: getCurrencies(state),
    workspacePhoneRegions: getWorkspacePhoneRegions(state)
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUser: UserActions.updateUser,
      setSelected: UserActions.setSelected,
      getUsers: UserActions.getUsers,
      createUser: UserActions.createUser,
      updateUserProfile: UserActions.updateUserProfile,
      getRegionById: RegionActions.getRegionById,
      sendResetPasswordEmail: AccountActions.sendResetPasswordEmail,
      sendConfirmUserEmail: AccountActions.sendConfirmUserEmail,
      getAllPhoneRegions: PhoneRegionActions.getAllPhoneRegions,
      getUserProfile: UserActions.getUserProfile,
      getPreferenceLanguage: ParamActions.getPreferenceLanguage,
      sendVerifyPassCode: UserActions.sendVerifyPassCode,
      changeUserStatus: UserActions.changeUserStatus,
      getUserLevels: UserLevelActions.getUserLevels,
      fetchCurrencies: CurrencyActions.getCurrencies,
      touchFormAction: touchFormAction,
      getWorkspacePhoneRegions:
        WorkspacePhoneRegionActions.getWorkspacePhoneRegions
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserFormContainer)
)
