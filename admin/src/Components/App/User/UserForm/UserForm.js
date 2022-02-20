import React from 'react'
import { Col, Row } from 'react-flexa'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'

import { store } from '../../../../Redux'
import * as UserService from '../../../../Services/APIServices/UserService'
import FormName from '../../../../Constants/Form'
import * as Regex from '../../../../Constants/Regex'

import Errors from '../../../Form/Errors'
import Form from '../../../Form/Form'
// button
import Button from '../../../Common/Button'
import withAuthButton from '../../../../Containers/Ac/withAuthButton'

import GetInputComponent from './GetInputComponent'

// const { UserGroup } = Common.group;
const { UserType } = Common.type

// auth button
const MemberEditButton = withAuthButton(['Member:Edit'])
const ProviderEditButton = withAuthButton(['Provider:Edit'])
const UserEditButton = withAuthButton(['User:Edit'])

export const validate = (values, { requirementFields }) => {
  const errors = {}
  const reg = Regex.email
  const phoneReg = Regex.getPhoneText
  const required = <FormattedMessage id={'error.required'} />
  // const memberFields = values.memberFields || {};
  // const meta = memberFields.meta || {};
  // const isRFRequired = key => {
  //   return requirementFields &&
  //     requirementFields.find(v => v && v.data === key && v.required)
  //     ? true
  //     : false;
  // };

  if (!values.email) {
    errors.email = required
  } else if (!reg.test(values.email)) {
    errors.email = <FormattedMessage id={'error.format'} />
  }

  if (!values.username) {
    errors.username = required
  } else if (values.username.length < 1 || values.username.length > 20) {
    errors.username = <FormattedMessage id={'error.username.length'} />
  }

  if (!values.phone) {
    errors.phone = required
  } else if (!phoneReg(values.phoneRegionCode).test(values.phone)) {
    errors.phone = <FormattedMessage id="error.phone.format" />
  }
  if (!values.userTypes) {
    errors.userTypes = required
  }
  // if (isRFRequired('handledBy') && (!meta || !meta.handledBy)) {
  //   errors.memberFields = errors.memberFields || {};
  //   errors.memberFields.meta = errors.memberFields.meta || {};
  //   errors.memberFields.meta.handledBy = required;
  // }

  // if (!values.preferences || !values.preferences.language) {
  //   errors.preferences = errors.preferences || {};
  //   errors.preferences.language = required
  // }
  // if (!values.preferences || values.preferences.receiveNotification === null) {
  //   errors.preferences = errors.preferences || {};
  //   errors.preferences.receiveNotification = (
  //     <FormattedMessage id={'error.required'} />
  //   );
  // }
  return errors
}

const asyncValidate = async (values, dispatch, formProps, field) => {
  const errors = {}
  if (values.email) {
    const result = await UserService.isDuplicateEmail(values.email, values._id)
    if (String(result.data) === 'true') {
      errors.email = <FormattedMessage id="error.email_has_been_used" />
    }
  }
  if (values.phone) {
    const result = await UserService.isDuplicatePhone(values.phone, values._id)

    if (String(result.data) === 'true') {
      errors.phone = <FormattedMessage id="error.phone_has_been_used" />
    }
  }
  if (values.username) {
    const result = await UserService.isDuplicateUsername(
      values.username,
      values._id
    )
    if (String(result.data) === 'true') {
      errors.username = 'Username has been used!'
    }
  }
  if (Object.keys(errors).length >= 0) {
    throw errors
  }
}

const UserForm = ({
  asyncValidating,
  canSelectLanguage,
  displaySubmitButtons,
  form,
  fieldControl,
  hasMember,
  hasMerchant,
  intl,
  initialValues,
  currentWorkspaceType,
  invalid,
  languages,
  onSubmit,
  onSubmitSuccess,
  onResetPassword,
  onConfirmUser,
  onClickDelete,
  onSubmitFail = () => true,
  pristine,
  phoneRegions,
  readOnly,
  submitting,
  statusText,
  userType,
  upgrade,
  workspaces = [],
  requirementFields,
  userLevels,
  workspacePhoneRegions,
  getUserPasscodeLoading,
  getUserPasscode,
  userPasscode
}) => {
  const isUpdateForm = form === FormName.USER_UPDATE
  const canEditForm = !readOnly
  // get user （ history ）
  const currentState = store.getState()
  const { userId: loggedUserId } = currentState.app
  const user = loggedUserId && currentState.resources.users[loggedUserId]

  const userStatusOptions = EcommCommonHelpers.getConstants(
    'status',
    'UserStatus',
    intl.locale
  ).map((userStatus) => ({
    label: userStatus.text,
    value: userStatus.value
  }))
  let workspaceIds = workspaces.reduce((wsIds, workspace) => {
    wsIds.push({ label: workspace.code, value: workspace._id })
    return wsIds
  }, [])
  const languageOptions = [...languages].map(({ _id, name }) => ({
    label: name[intl.locale],
    value: _id
  }))

  const showStatusDropDown = (user.userTypes || []).includes(UserType.PROVIDER)
  const showWorkspaceDropDown =
    user.userTypes.includes(UserType.PROVIDER) &&
    canEditForm &&
    ![UserType.PROVIDER, UserType.MEMBER].some((u) =>
      (initialValues.userTypes || []).includes(u)
    )
  const showWorkspaceReadonly =
    !showWorkspaceDropDown &&
    ![UserType.PROVIDER, UserType.MEMBER].some((u) =>
      (initialValues.userTypes || []).includes(u)
    )

  const currentWorkspace = [...workspaces].filter(
    (workspace) => workspace._id === initialValues.workspace
  )

  const tagProps = {
    verified: {
      name: intl.formatMessage({ id: 'display_user_verified' }),
      color: 'green',
      style: { marginLeft: 5 }
    },
    unverified: {
      name: intl.formatMessage({ id: 'display_user_unverified' }),
      color: '#8C8C8C',
      style: { marginLeft: 5 }
    }
  }

  const phoneRegionOptions = workspacePhoneRegions.map((v) => ({
    label: v.phoneRegion.code,
    value: v.phoneRegion.code
  }))

  const inputComponents = GetInputComponent({
    intl,
    isUpdateForm,
    initialValues,
    tagProps,
    phoneRegions,
    showStatusDropDown,
    userStatusOptions,
    showWorkspaceDropDown,
    showWorkspaceReadonly,
    workspaceIds,
    currentWorkspace,
    onConfirmUser,
    canSelectLanguage,
    languageOptions,
    canEditForm,
    statusText,
    fieldControl,
    userType,
    requirementFields,
    hasMember,
    hasMerchant,
    userLevels,
    phoneRegionOptions,
    currentWorkspaceType,
    getUserPasscodeLoading,
    getUserPasscode,
    userPasscode
  })
  return (
    <Form
      name={form}
      onSubmit={(value, ev) => {
        if (ev.target.name && ev.target.name === FormName.CHANGE_PASSWORD) {
          return
        }
        onSubmit(value)
      }}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      {!isUpdateForm ? (
        <Row>
          <Col xs={12} sm={12} md={4}>
            {inputComponents.UserType}
          </Col>
          <Col xs={12} sm={12} md={8}>
            {inputComponents.firstName}
            {inputComponents.lastName}
          </Col>
          <Col xs={12} sm={12} md={8}>
            {inputComponents.username}
            {inputComponents.phone}
            {inputComponents.email}
            {/* {inputComponents.description}
            {inputComponents.status} */}
            {/* {inputComponents.workspaceSelect}
            {inputComponents.workspaceReadonly} */}
            {/* {inputComponents.languageSelect}
            {inputComponents.receiveNotificationSwitch} */}
          </Col>
        </Row>
      ) : (
        <React.Fragment>
          <Row>
            <Col xs={12}>{inputComponents.JoinTime}</Col>
            <Col xs={12}>{inputComponents.companyName}</Col>
            <Col xs={6}>{inputComponents.firstName}</Col>
            <Col xs={6}>{inputComponents.lastName}</Col>
            <Col xs={6}>{inputComponents.username}</Col>
            <Col xs={6}>{inputComponents.passcode}</Col>
            <Col xs={4}>{inputComponents.phoneRegionCode}</Col>
            <Col xs={8}>{inputComponents.phone}</Col>
            <Col xs={6}>{inputComponents.dob}</Col>
            <Col xs={6}>{inputComponents.userGender}</Col>
            <Col xs={12}>
              {inputComponents.email}
              {inputComponents.memberLevel}
              {inputComponents.handledBy}
              {inputComponents.statusText}
              {inputComponents.ResendConfirmCode}
              {inputComponents.ConfirmButton}
              {inputComponents.LockUserButton}
              {inputComponents.ErrorUser}
              {/* {inputComponents.activationIssues} */}
              {/* <Row alignItems="center"> */}
              {/* <Col xs={6}>{inputComponents.phoneCode}</Col> */}
              {/* </Row> */}
              {/* {inputComponents.group} */}
              {/* {inputComponents.languageSelect} */}
            </Col>
            {/* <Col xs={12} md={6}> */}
            {/* {inputComponents.avatars} */}
            {/* {inputComponents.description}
              {inputComponents.workspaceSelect}
              {inputComponents.workspaceReadonly}
              {inputComponents.receiveNotificationSwitch} */}
            {/* </Col> */}
          </Row>
        </React.Fragment>
      )}
      {displaySubmitButtons && (
        <Row justifyContent="center">
          {/* auth button */}
          {!isUpdateForm && (
            <Button.Primary disabled={submitting || !canEditForm} type="submit">
              <FormattedMessage id="nav.create" />
            </Button.Primary>
          )}
          {isUpdateForm &&
            initialValues.userTypes.includes(UserType.MEMBER) && (
              <MemberEditButton
                disabled={submitting || !canEditForm}
                updateMode={isUpdateForm}
                intl={intl}
              />
            )}
          {isUpdateForm && initialValues.userTypes.includes(UserType.USER) && (
            <UserEditButton
              disabled={submitting || !canEditForm}
              updateMode={isUpdateForm}
              intl={intl}
            />
          )}
          {isUpdateForm &&
            initialValues.userTypes.includes(UserType.PROVIDER) && (
              <ProviderEditButton
                disabled={submitting || !canEditForm}
                updateMode={isUpdateForm}
                intl={intl}
              />
            )}
        </Row>
      )}
    </Form>
  )
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  asyncValidate,
  asyncBlurFields: ['email', 'phone', 'username']
})(UserForm)
