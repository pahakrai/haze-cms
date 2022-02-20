import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Common from '@golpasal/common'

import { UserActions } from '../../Redux/User/actions'

import UserInviteForm from './UserInviteForm'
import withAuthActions from '../../Containers/Ac/withAuthActions'

import Modal from '../../Components/Modal'

import Button from '../../Components/Common/Button'
const withAuthButton = (requestActions) =>
  withAuthActions(requestActions)(
    ({ disabled, updateMode, intl, ...props }) => (
      <Button.Primary disabled={disabled} type="submit" {...props}>
        {intl.formatMessage({ id: 'invite_btn' })}
      </Button.Primary>
    )
  )

const renderAuthButton = ({ userType, ...props }) => {
  let requestActions = []
  switch (userType) {
    case Common.type.UserType.SYSTEM_ADMIN:
      requestActions = ['User:SystemAdmin:Invite']
      break
    case Common.type.UserType.MEMBER:
      requestActions = ['User:Member:Invite']
      break
    case Common.type.UserType.PROVIDER:
      requestActions = ['User:Provider:Invite']
      break
    case Common.type.UserType.USER:
    default:
      requestActions = ['User:Merchant:Invite']
      break
  }
  const Button = withAuthButton(requestActions)
  return <Button {...props} />
}

class UserInviteButtonContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { created } = this.props
    if (created && created !== prevProps.created) {
      const { history, resetCreated, userType } = this.props
      history.push(`/users/` + userType)
      resetCreated()
    }
  }

  render() {
    const { getUsers, intl, userType, userFilters } = this.props
    return (
      <Modal.Button
        button={(openModal) =>
          renderAuthButton({
            userType,
            intl,
            type: 'button',
            onClick: openModal
          })
        }
        text={intl.formatMessage({ id: 'invite_btn' })}
        title={intl.formatMessage({ id: 'invite_btn' })}
        content={(closeModal) => (
          <UserInviteForm
            userType={userType}
            intl={intl}
            onSubmitSuccess={() => {
              closeModal()
              getUsers({
                q: { ...userFilters, userTypes: [userType] },
                refresh: true
              })
            }}
          />
        )}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  created: state.user.created,
  userFilters: state.filter.user
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      resetCreated: () => UserActions.setCreated(null),
      getUsers: UserActions.getUsers
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInviteButtonContainer)
)
