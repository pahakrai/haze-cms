import React from 'react'
import { Tabs } from 'antd'

import Common from '@golpasal/common'

import UserCredit from '../UserCredit/UserCredit'
import PreferenceForm from '../Preference/PreferenceForm'
import ActivationIssues from '../ActivationIssues/ActivationIssues'
import AddressList from './Address/AddressList'

const { UserType } = Common.type

export default ({
  intl,
  updateMode,
  initialValues,
  member,
  currentWorkspace,
  userType,
  displayActivationIssuesTab,
  hasMember,
  currencies
}) => {
  const displayCreditTab =
    updateMode &&
    initialValues &&
    initialValues._id &&
    [UserType.USER, UserType.MEMBER].includes(userType)

  const displayPreferenceTab =
    updateMode &&
    initialValues &&
    initialValues._id &&
    hasMember &&
    [UserType.MEMBER].includes(userType)

  const isConsumeCredit = currentWorkspace?.preferences?.order?.consumeCredit
  return [
    displayCreditTab && isConsumeCredit && (
      <Tabs.TabPane
        style={{ paddingLeft: 15, paddingRight: 15 }}
        tab={intl.formatMessage({ id: 'tab_user_from_credit_point' })}
        key="6"
      >
        <UserCredit
          userId={initialValues && initialValues._id}
          intl={intl}
          amountType={Common.type.AmountType.POINT}
        />
      </Tabs.TabPane>
    ),
    displayActivationIssuesTab && (
      <Tabs.TabPane
        style={{ paddingLeft: 15, paddingRight: 15 }}
        tab={intl.formatMessage({
          id: 'tab_user_from_activation_issues'
        })}
        key="7"
      >
        <ActivationIssues intl={intl} initialValues={initialValues} />
      </Tabs.TabPane>
    ),
    displayPreferenceTab && (
      <Tabs.TabPane
        style={{ paddingLeft: 15, paddingRight: 15 }}
        tab={intl.formatMessage({
          id: 'tab_user_from_preference'
        })}
        key="8"
      >
        <PreferenceForm
          intl={intl}
          memberId={member._id}
          initialValues={initialValues}
          currentWorkspace={currentWorkspace}
          currencies={currencies}
        />
      </Tabs.TabPane>
    ),
    displayPreferenceTab && (
      <Tabs.TabPane
        style={{ paddingLeft: 15, paddingRight: 15 }}
        tab={intl.formatMessage({
          id: 'tab_user_from_address'
        })}
        key="9"
      >
        <AddressList intl={intl} memberId={member._id} />
      </Tabs.TabPane>
    )
  ]
}
