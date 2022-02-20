import React, { useState } from 'react'
import moment from 'moment'
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'
import styled from 'styled-components'

import CheckboxGroup from '../../../Form/CheckboxGroup'
import Dropdown from '../../../Form/Dropdown'
import TextInput, { TextInputNoField } from '../../../Form/TextInput'
import DatePicker from '../../../Form/DatePicker'
import SelectList from '../../../Form/SelectList'
import Uploader from '../../../Form/Uploader'
import Switch from '../../../Form/Switch'

import Button from '../../../Common/Button'
import H5 from '../../../Common/H5'
import Input from '../../../Common/TextInput'
import Modal from '../../../../Components/Modal'
import Spacer from '../../..//Common/Spacer'
import Label from '../../../Common/Label'

import SelectUser from '../../../../Containers/Form/SelectUser'

const { UserStatus } = Common.status
const { UserType } = Common.type

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-top: 20px;
`

const requirementFieldsValidate = (requirementFields, key) => {
  return requirementFields && requirementFields.find((v) => v && v.data === key)
    ? true
    : false
}

const getText = (intl, currentWorkspaceType) => {
  if (currentWorkspaceType && currentWorkspaceType.type) {
    if (currentWorkspaceType.type === Common.type.WorkspaceType.EDUCATION) {
      return intl.formatMessage({ id: 'display_user_teacher_name' })
    } else if (
      currentWorkspaceType.type === Common.type.WorkspaceType.JOBHUNTING
    ) {
      return intl.formatMessage({ id: 'display_user_company_name' })
    } else if (
      currentWorkspaceType.type === Common.type.WorkspaceType.SHOPPING
    ) {
      return intl.formatMessage({ id: 'display_user_merchant_name' })
    } else {
      return intl.formatMessage({ id: 'display_user_merchant_name' })
    }
  }
}

const GetInputComponent = ({
  intl,
  isUpdateForm,
  initialValues,
  tagProps,
  phoneRegions,
  showStatusDropDown,
  statusText,
  groupOptions,
  showWorkspaceDropDown,
  showWorkspaceReadonly,
  workspaceIds,
  currentWorkspace,
  onConfirmUser,
  languageOptions,
  canSelectLanguage,
  canEditForm,
  activationIssues,
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
}) => {
  const [reasonValue, setReasonValue] = useState([])
  return {
    companyName: currentWorkspaceType
      ? currentWorkspaceType.type === Common.type.WorkspaceType.EDUCATION ||
        currentWorkspaceType.type === Common.type.WorkspaceType.JOBHUNTING ||
        (currentWorkspaceType.type === Common.type.WorkspaceType.SHOPPING && (
          <TextInput
            name="name"
            label={getText(intl, currentWorkspaceType) || ''}
          />
        ))
      : null,
    firstName: (
      <TextInput
        name="firstName"
        label={intl.formatMessage({ id: 'display_user_firstName' })}
      />
    ),
    lastName: (
      <TextInput
        name="lastName"
        label={intl.formatMessage({ id: 'display_user_lastName' })}
      />
    ),
    username: (
      <TextInput
        name="username"
        disabled={isUpdateForm}
        label={intl.formatMessage({ id: 'display_user_username' })}
      />
    ),
    email: (
      <TextInput
        tagProps={
          isUpdateForm
            ? initialValues &&
              initialValues.verified &&
              initialValues.verified.email
              ? tagProps.verified
              : tagProps.unverified
            : false
        }
        name="email"
        disabled={!canEditForm}
        label={intl.formatMessage({ id: 'display_user_email' })}
      />
    ),
    // phoneCode: (
    //   <Dropdown
    //     name="phoneRegionCode"
    //     disabled={!canEditForm}
    //     label={intl.formatMessage({ id: 'display_user_phoneRegionCode' })}
    //     options={phoneRegions.map(({ code }) => ({
    //       label: code,
    //       value: code
    //     }))}
    //   />
    // ),
    phone: (
      <TextInput
        tagProps={
          isUpdateForm
            ? initialValues &&
              initialValues.verified &&
              initialValues.verified.phone
              ? tagProps.verified
              : tagProps.unverified
            : false
        }
        name="phone"
        disabled={!canEditForm}
        label={intl.formatMessage({ id: 'display_user_phone' })}
      />
    ),
    description: (
      <TextInput
        name="description"
        rows="3"
        disabled={!canEditForm}
        label={intl.formatMessage({ id: 'display_user_description' })}
      />
    ),
    statusText: isUpdateForm && showStatusDropDown && (
      <TextInputNoField
        disabled
        value={statusText}
        label={intl.formatMessage({ id: 'display_user_status' })}
      />
    ),
    status: isUpdateForm && showStatusDropDown && (
      <Dropdown
        name="status"
        disabled={isUpdateForm}
        label={intl.formatMessage({ id: 'display_user_status' })}
        options={EcommCommonHelpers.getConstants(
          'status',
          'UserStatus',
          intl.locale
        ).map((userStatus) => ({
          label: userStatus.text,
          value: userStatus.value
        }))}
      />
    ),
    group: isUpdateForm && groupOptions && (
      <SelectList
        label={intl.formatMessage({ id: 'display_user_group' })}
        selectMode="multiple"
        disabled={!canEditForm}
        name="groups"
        oldValues={initialValues ? initialValues.groups || [] : []}
        selects={groupOptions}
      />
    ),
    workspaceSelect: showWorkspaceDropDown && (
      <Dropdown
        name="workspace"
        disabled={!canEditForm}
        label={intl.formatMessage({ id: 'display_user_workspace' })}
        options={workspaceIds}
      />
    ),
    workspaceReadonly: showWorkspaceReadonly && (
      <div>
        <label>Workspace</label>
        <Input
          value={
            currentWorkspace && currentWorkspace[0]
              ? currentWorkspace[0].code
              : ''
          }
          disabled={true}
        />
      </div>
    ),
    ResendConfirmCode: isUpdateForm &&
      initialValues.isVerified === false &&
      initialValues.status === UserStatus.UNACTIVATED && (
        <Button
          onClick={() => {
            // onConfirmUser(initialValues.email, initialValues.userType);
            onConfirmUser({
              type: 'send-verify-pass-code',
              userType: initialValues.userType,
              userId: initialValues._id,
              email: initialValues.email,
              phone: initialValues.phone,
              phoneRegionCode: initialValues.phoneRegionCode
            })
          }}
          type="button"
          disabled={!canEditForm}
          style={{ width: '100%' }}
        >
          {intl.formatMessage({ id: 'display_send_verify_pass_code' })}
        </Button>
      ),
    ConfirmButton: isUpdateForm &&
      initialValues.isVerified &&
      (initialValues.status === UserStatus.LOCKED ||
        initialValues.status === UserStatus.UNACTIVATED) && (
        // <Button
        //   onClick={() => {
        //     onConfirmUser({
        //       type: 'activate-user',
        //       userId: initialValues._id,
        //       userStatus: initialValues.status
        //     });
        //   }}
        //   type="button"
        //   disabled={!canEditForm}
        //   style={{ width: '100%' }}
        // >
        //   {intl.formatMessage({ id: 'display_activate_user' })}
        // </Button>
        <Modal.Button
          modalStyle={{
            content: { width: '90%', minWidth: 50, margin: ' 0 auto' }
          }}
          disabled={!canEditForm}
          style={{ width: '100%' }}
          text={intl.formatMessage({ id: 'display_activate_user' })}
          title={intl.formatMessage({ id: 'display_activate_user' })}
          button={(openModal) => (
            <Button type="button" onClick={openModal} style={{ width: '100%' }}>
              {intl.formatMessage({ id: 'display_activate_user' })}
            </Button>
          )}
          content={(closeModal) => (
            <div>
              <Spacer height={10} />
              <Label>{intl.formatMessage({ id: 'display_remarks' })}</Label>
              <Input rows={6} onChange={(reason) => setReasonValue(reason)} />
              <ButtonGroup>
                <Button.Default
                  onClick={closeModal}
                  style={{ marginBottom: 0 }}
                >
                  {intl.formatMessage({ id: 'cancel' })}
                </Button.Default>
                <Button.Primary
                  onClick={() => {
                    onConfirmUser(
                      {
                        type: 'activate-user',
                        userId: initialValues._id,
                        userStatus: initialValues.status
                      },
                      { reason: reasonValue }
                    )
                    closeModal()
                    setReasonValue('')
                  }}
                  style={{ marginLeft: 15, marginBottom: 0 }}
                >
                  {intl.formatMessage({ id: 'save' })}
                </Button.Primary>
              </ButtonGroup>
            </div>
          )}
        />
      ),
    LockUserButton: isUpdateForm &&
      initialValues.isVerified &&
      initialValues.status === UserStatus.ACTIVE && (
        // <Button
        //   onClick={() => {
        //     // onConfirmUser(initialValues.email, initialValues.userType);
        //     onConfirmUser({
        //       type: 'lock-user',
        //       userId: initialValues._id,
        //       userStatus: initialValues.status
        //     });
        //   }}
        //   type="button"
        //   disabled={!canEditForm}
        //   style={{ width: '100%' }}
        // >
        //   {intl.formatMessage({ id: 'display_lock_user' })}
        // </Button>
        <Modal.Button
          modalStyle={{
            content: { width: '90%', minWidth: 50, margin: ' 0 auto' }
          }}
          disabled={!canEditForm}
          text={intl.formatMessage({ id: 'display_lock_user' })}
          title={intl.formatMessage({ id: 'display_lock_user' })}
          button={(openModal) => (
            <Button type="button" onClick={openModal} style={{ width: '100%' }}>
              {intl.formatMessage({ id: 'display_lock_user' })}
            </Button>
          )}
          content={(closeModal) => (
            <div>
              <Spacer height={10} />
              <Label>{intl.formatMessage({ id: 'display_remarks' })}</Label>
              <Input rows={6} onChange={(reason) => setReasonValue(reason)} />

              <ButtonGroup>
                <Button.Default
                  onClick={closeModal}
                  style={{ marginBottom: 0 }}
                >
                  {intl.formatMessage({ id: 'cancel' })}
                </Button.Default>
                <Button.Primary
                  onClick={() => {
                    onConfirmUser(
                      {
                        type: 'lock-user',
                        userId: initialValues._id,
                        userStatus: initialValues.status
                      },
                      { reason: reasonValue }
                    )
                    closeModal()
                    setReasonValue('')
                  }}
                  style={{ marginLeft: 15, marginBottom: 0 }}
                >
                  {intl.formatMessage({ id: 'save' })}
                </Button.Primary>
              </ButtonGroup>
            </div>
          )}
        />
      ),

    ErrorUser: isUpdateForm &&
      initialValues.isVerified === false &&
      (initialValues.status === UserStatus.ACTIVE ||
        initialValues.status === UserStatus.LOCKED) && (
        <Button
          style={{ width: '100%', color: 'red', cursor: 'unset' }}
          type="button"
        >
          {intl.formatMessage({ id: 'display_error_user' })}
        </Button>
      ),
    UserType: !isUpdateForm && (
      <TextInput
        name="userTypes[0]"
        disabled={true}
        label={intl.formatMessage({ id: 'display_user_type' })}
      />
    ),
    RolesTitle: isUpdateForm && (
      <H5>{intl.formatMessage({ id: 'display_user_roles' })}</H5>
    ),
    RoleList: isUpdateForm && (
      <CheckboxGroup
        disabled={!canEditForm}
        name="groups"
        oldValues={initialValues ? initialValues.groups || [] : []}
        options={groupOptions}
      />
    ),
    JoinTime: isUpdateForm && (
      <H5 style={{ textAlign: 'right' }}>
        {intl.formatMessage({ id: 'display_user_createdAt' })}:
        {moment(initialValues.createdAt).format('DD/MM/YYYY')}
      </H5>
    ),
    languageSelect: (
      <Dropdown
        name="preferences.language"
        disabled={!canEditForm || !canSelectLanguage}
        label={intl.formatMessage({ id: 'language' })}
        options={languageOptions}
      />
    ),
    receiveNotificationSwitch: (
      <Switch
        disabled={!canEditForm}
        name="preferences.receiveNotification"
        label={intl.formatMessage({
          id: 'display_receive_notification'
        })}
      />
    ),
    activationIssues: (
      <TextInput
        name="activationIssues[0].reason"
        disabled={!canEditForm}
        label={intl.formatMessage({ id: 'display_reason' })}
      />
    ),
    avatars: (
      <Uploader
        intl={intl}
        multiple={false}
        name="avatars"
        label={`${intl.formatMessage({
          id: 'display_user_avatar'
        })}`}
        disabled={!canEditForm}
      />
    ),
    userGender: (
      <Dropdown
        name="gender"
        disabled={!canEditForm}
        label={intl.formatMessage({ id: 'display_user_gender' })}
        options={EcommCommonHelpers.getConstants(
          'type',
          'GenderType',
          intl.locale
        ).map((type) => ({
          label: type.text,
          value: type.value
        }))}
      />
    ),
    dob: (
      <DatePicker
        label={intl.formatMessage({
          id: 'display_user_dob'
        })}
        name="dob"
      />
    ),
    memberLevel: hasMember &&
      (userType === UserType.USER || userType === UserType.MEMBER) &&
      userLevels && (
        <Dropdown
          name="memberFields.level"
          disabled={!canEditForm}
          label={intl.formatMessage({ id: 'display_user_level' })}
          options={userLevels
            .filter((v) => v.userType === userType)
            .map((v) => ({
              label: v.name[intl.locale],
              value: v._id
            }))}
        />
      ),
    handledBy: hasMember &&
      requirementFieldsValidate(requirementFields, 'handledBy') && (
        <SelectUser
          label={intl.formatMessage({ id: 'display_member_handle_by' })}
          name="memberFields.meta.handledBy"
          query={{
            userTypes: [Common.type.UserType.PROVIDER],
            statuses: [Common.status.UserStatus.ACTIVE]
          }}
          full
        />
      ),
    phoneRegionCode: (
      <Dropdown
        name="phoneRegionCode"
        disabled={!canEditForm}
        label={intl.formatMessage({ id: 'display_user_phone_region_code' })}
        options={phoneRegionOptions}
      />
    ),
    passcode: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <div>{intl.formatMessage({ id: 'display_user_passcode' })}</div>
          <div>
            <Input value={userPasscode} disabled={true} />
          </div>
        </div>
        <Button
          onClick={() => {
            getUserPasscode(initialValues._id)
          }}
          disabled={getUserPasscodeLoading}
          type="button"
          style={{ margin: '20px 0 0 10px' }}
        >
          {intl.formatMessage({ id: 'display_user_get_passcode' })}
        </Button>
      </div>
    )
  }
}
export default GetInputComponent
