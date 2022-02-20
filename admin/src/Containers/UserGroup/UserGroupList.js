import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { toast } from '../../Lib/Toast';

import { UserGroupActions } from '../../Redux/UserGroup/actions';
import { getUserGroups } from '../../Redux/UserGroup/selectors';

import UserGroupList from '../../Components/App/UserGroup/UserGroupList';

class UserGroupListContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchUserGroups } = this.props;
    fetchUserGroups && fetchUserGroups({ refresh: true });
  }

  _onLoadMore = () => {
    const { fetchUserGroups } = this.props;
    fetchUserGroups && fetchUserGroups({ append: true });
  };
  _onItemClick = (userGroup = {}) => {
    const { history } = this.props;
    history.push(`user-groups/${userGroup._id}`);
  };
  _onItemDelete = (userGroup = {}) => {
    const { deleteUserGroupById, intl } = this.props;
    if (userGroup && userGroup.userCount > 0) {
      toast.warn(intl.formatMessage({ id: 'Delect_userGroup_Failure' }));
      return;
    }
    if (deleteUserGroupById && userGroup._id)
      deleteUserGroupById(userGroup._id);
  };
  onPageChange = (page, limit) => {
    const { fetchUserGroups } = this.props;
    fetchUserGroups({ query: { page, limit } });
  };

  render() {
    const { intl, userGroups, pagination } = this.props;
    return (
      <UserGroupList
        userGroups={userGroups}
        intl={intl}
        onLoadMore={this._onLoadMore}
        onItemDelete={this._onItemDelete}
        onItemClick={this._onItemClick}
        loading={pagination.fetching}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this.onPageChange
        }}
      />
    );
  }
}
const mapStateToProps = state => ({
  userGroups: getUserGroups(state),
  pagination: state.pagination.userGroups
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserGroups: UserGroupActions.getUserGroups,
      deleteUserGroupById: UserGroupActions.deleteUserGroupById
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserGroupListContainer)
);
