/* @flow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Common from '@golpasal/common';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Card from '../Components/Common/Card';
import Spacer from '../Components/Common/Spacer';
import UserInviteButton from '../Containers/User/UserInviteButton';

import UserForm from '../Containers/User/UserForm';
import UserSearch from './../Containers/User/UserSearch';
import UserList from './../Containers/User/UserList';
import UserAvatar from '../Containers/User/UserAvatar';
import UploadAvatarModalButton from '../Containers/User/UploadAvatarModalButton';
import UserFollow from '../Containers/User/UserFollow';
import UserTotalNumber from '../Containers/User/UserTotalNumber';
import { getCurrentWorkspace } from '../Redux/Account/selectors';

const { UserType, WorkspaceType } = Common.type;

const UserAvatarWrapper = styled.div`
  margin: 40px 0 60px 0;
`;
const CardWrapper = styled(Card)`
  margin-top: 0px;
`;
const AvatarStyle = {
  height: 200,
  width: 200,
  borderRadius: 100
};

class UserPageComponent extends PureComponent {
  modalButtonRender = openModal => (
    <UserAvatar
      onClick={openModal}
      userId={this.props.userId}
      avatarStyle={AvatarStyle}
    />
  );

  getText = (type, currentWorkspace) => {
    if (type === UserType.USER) {
      return currentWorkspace.type === WorkspaceType.EDUCATION
        ? 'teacher'
        : 'display_payroll_merchant';
    } else if (type === UserType.MEMBER) {
      return currentWorkspace.type === WorkspaceType.EDUCATION
        ? 'student'
        : 'display_payroll_employee';
    } else if (type === UserType.PROVIDER) {
      return 'nav.providers';
    } else if (type === UserType.SYSTEM_ADMIN) {
      return 'nav.system_admin';
    }
  };

  render() {
    const { userId, type, currentWorkspace, intl } = this.props;
    return (
      <DocumentTitle
        title={intl.formatMessage({
          id: this.getText(type, currentWorkspace)
        })}
      >
        <ContentContainer>
          <Row gutter={25}>
            <Col xs={24} sm={24} md={24} lg={8}>
              <CardWrapper style={{ marginTop: 0 }}>
                <Row gutter={10} type="flex" justify="space-between">
                  <Col xs={14} sm={14} md={14} lg={14}>
                    {[UserType.PROVIDER, UserType.SYSTEM_ADMIN].includes(
                      type
                    ) && <UserInviteButton userType={type} intl={intl} />}
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8}>
                    <UserTotalNumber intl={intl} userType={type} />
                  </Col>
                </Row>
                <UserSearch userType={type} intl={intl} />
                <Spacer height={20} />
                <UserList
                  intl={intl}
                  userType={type}
                  currentWorkspace={currentWorkspace}
                />
              </CardWrapper>
            </Col>
            <Col xs={24} sm={24} md={24} lg={16}>
              {userId && (
                <CardWrapper>
                  <UserAvatarWrapper>
                    <UploadAvatarModalButton
                      userId={userId}
                      intl={intl}
                      renderButton={this.modalButtonRender}
                      type={type}
                    />
                    {[UserType.MEMBER, UserType.USER].includes(type) && (
                      <UserFollow userId={userId} userType={type} intl={intl} />
                    )}
                  </UserAvatarWrapper>
                  <UserForm
                    userType={type}
                    intl={intl}
                    updateMode
                    userId={userId}
                  />
                </CardWrapper>
              )}
            </Col>
          </Row>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    currentWorkspace: getCurrentWorkspace(state)
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export const UserPage = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserPageComponent))
);

export const renderTypeUserPage = type => ({ match }) => (
  <UserPage userId={match.params.userId} type={type} />
);
export default UserPage;
