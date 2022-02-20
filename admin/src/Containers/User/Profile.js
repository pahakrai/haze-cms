import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'

import UploadAvatarModalButton from './UploadAvatarModalButton'
import UserForm from './UserForm'
import UserFollow from './UserFollow'
import UserAvatar from './UserAvatar'

// redux
import AccountSelector from '../../Redux/Account/selectors'

import styled from 'styled-components'
import Card from '../../Components/Common/Card'

const UserAvatarWrapper = styled.div`
  margin: 40px 0 60px 0;
  text-align: center;
`
const CardWrapper = styled(Card)`
  margin-top: 0px;
`

class ProfileContainer extends React.PureComponent {
  render() {
    const { userType, userId, intl, ...res } = this.props
    const loading = !userType || !userId
    if (loading) return <div />
    return (
      <CardWrapper>
        <UserAvatarWrapper>
          <UploadAvatarModalButton
            userId={userId}
            intl={intl}
            renderButton={(openModal) => (
              <UserAvatar onClick={openModal} userId={userId} />
            )}
          />
          {[Common.type.UserType.MEMBER, Common.type.UserType.USER].includes(
            userType
          ) && (
            <UserFollow
              userId={userId}
              intl={intl}
              userType={userType}
              {...res}
            />
          )}
        </UserAvatarWrapper>
        <UserForm
          onlyReadStatus
          editOwn
          updateMode
          creditRes={{ canCreate: false, canView: false }}
          userId={userId}
          userType={userType}
          displayActivationIssuesTab={false}
          readOnly
          fieldControl={{
            name: { disabled: false },
            userSubType: { disabled: false }
          }}
          intl={intl}
          {...res}
        />
      </CardWrapper>
    )
  }
}
const mapStateToProps = (state, props) => {
  const currentUser = AccountSelector.getCurrentUser(state)
  return {
    userId: currentUser && currentUser._id,
    userType: currentUser && currentUser.userTypes && currentUser.userTypes[0]
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
