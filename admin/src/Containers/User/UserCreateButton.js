import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'
import { UserActions } from '../../Redux/User/actions'
// import AccountSelector from '../../Redux/Account/selectors';
import Modal from '../../Components/Modal'
import UserForm from './UserForm'
import { withRouter } from 'react-router-dom'
// auth button
import withAuthButton from '../../Containers/Ac/withAuthButton'
const renderAuthButton = ({ userType, ...props }) => {
  let requestActions = []
  switch (userType) {
    case Common.type.UserType.MEMBER:
      requestActions = ['Member:Create']
      break
    case Common.type.UserType.PROVIDER:
      requestActions = ['Provider:Create']
      break
    case Common.type.UserType.USER:
    default:
      requestActions = ['User:Create']
      break
  }
  const Button = withAuthButton(requestActions)
  return <Button {...props} />
}

class UserCreateButtonContainer extends React.PureComponent {
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
    // const disabled =
    //   userType === 'provider' &&
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
        text={intl.formatMessage({ id: 'create_btn' })}
        title={'User Form'}
        content={(closeModal) => (
          <UserForm
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
  // user: AccountSelector.getCurrentUser(state),
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
  connect(mapStateToProps, mapDispatchToProps)(UserCreateButtonContainer)
)
