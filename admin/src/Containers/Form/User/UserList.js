import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Time
import moment from 'moment';
// antd
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// list
// import ReactList from 'react-list';
// redux

import { getSearchUserList } from '../../../Redux/selectors';
import { UserActions } from '../../../Redux/User/actions';
import Loading from '../../../Components/Common/Loading';
import UserAvatar from '../../User/UserAvatar';
import { formatUserName } from '../../../Lib/util';
// component
import styled from 'styled-components';

export const List = styled.div`
  width: 100%;
  overflow: auto;
  height: ${props => `${props.height}px`};
  -webkit-overflow-scrolling: touch;
`;

export const ListItem = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ddd;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.div`
  padding: 16px;
  font-size: ${props => props.theme.fonts.size.h5};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  cursor: pointer;
`;

class UserItemContainer extends React.PureComponent {
  componentDidMount() {
    const { userIds, searchUsers } = this.props;
    userIds && userIds.length > 0 && searchUsers('', { _ids: userIds });
  }

  componentDidUpdate(prevProps) {
    const { userIds, searchUsers } = this.props;
    if (userIds !== prevProps.userIds) {
      userIds && userIds.length > 0 && searchUsers('', { _ids: userIds });
    }
  }
  render() {
    const { users, intl, onDelectItem } = this.props;

    return users.map(user =>
      !user ? (
        <Loading key={user._id} />
      ) : (
        <ListItem key={user._id}>
          <Label style={{ width: '20%', textAlign: 'left' }}>
            <UserAvatar
              userId={user}
              avatarStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
                margin: 'initial'
              }}
            />
          </Label>
          <Label style={{ width: '20%', textAlign: 'left' }}>
            {formatUserName(user)}
          </Label>
          <Label style={{ width: '20%', textAlign: 'left' }}>
            {user.phone}
          </Label>
          <Label style={{ width: '40%', textAlign: 'left' }}>
            {moment(user.createdAt).format('YYYY-MM-DD')}
          </Label>
          <Label style={{ textOverflow: 'clip' }}>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() =>
                Modal.confirm({
                  title: intl.formatMessage({
                    id: 'display_del_hint_messages'
                  }),
                  okText: intl.formatMessage({ id: 'display_yes' }),
                  cancelText: intl.formatMessage({ id: 'cancel' }),
                  onOk: () => {
                    onDelectItem && onDelectItem(user._id);
                    return Promise.resolve();
                  }
                })
              }
            />
          </Label>
        </ListItem>
      )
    );
  }
}
const mapStateToProps = state => {
  return {
    users: getSearchUserList(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchUsers: UserActions.searchUserList
    },
    dispatch
  );

// user item title
const UserTitleItem = ({ intl }) => {
  return (
    <ListItem>
      <Label style={{ width: '20%', textAlign: 'left' }}>
        {intl.formatMessage({ id: 'display_user_avatar' })}
      </Label>
      <Label style={{ width: '20%', textAlign: 'left' }}>
        {intl.formatMessage({ id: 'display_user_name' })}
      </Label>
      <Label style={{ width: '20%', textAlign: 'left' }}>
        {intl.formatMessage({ id: 'display_user_phone' })}
      </Label>
      <Label style={{ width: '40%', textAlign: 'left' }}>
        {intl.formatMessage({ id: 'create_time' })}
      </Label>
      <Label style={{ textOverflow: 'clip' }}>
        {intl.formatMessage({ id: 'actions' })}
      </Label>
    </ListItem>
  );
};
export const UserItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserItemContainer);

// user list
export default ({ intl, users, ...props }) => {
  const usersLength = (users && users.length) || 0;
  return (
    <List height={3 < usersLength ? 350 : usersLength * 73 + 60}>
      <UserTitleItem intl={intl} />
      <UserItem intl={intl} userIds={users} {...props} />
    </List>
  );
};
