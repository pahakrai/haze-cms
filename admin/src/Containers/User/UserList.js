import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EcommCommonType from '@golpasal/common';

import Loading from '../../Components/Common/Loading';
import UserList from '../../Components/App/User/UserList';
import { UserActions } from '../../Redux/User/actions';
import { MemberActions } from '../../Redux/Member/actions';

import { getMembers, getUsers } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';
import { FilterActions } from '../../Redux/Filter/actions';

const { UserType } = EcommCommonType.type;
class UserListContainer extends React.PureComponent {
  componentDidMount() {
    const {
      match,
      userType,
      setSelected,
      searchFilters,
      resetFilters,
      setFilterOptions,
      userSetResults,
      users
    } = this.props;
    let newSearchFilters = Object.assign({}, searchFilters);
    if (searchFilters && searchFilters.userType !== userType) {
      resetFilters();
      newSearchFilters = {};
      userSetResults([]);
    }
    if (match.params.userId) {
      setSelected(match.params.userId);
    }
    if (
      !(
        users &&
        users.length > 0 &&
        /^\/users\/.+\/:userId$/.test(match.path)
      ) &&
      userType !== UserType.MEMBER
    ) {
      this.fetchUsers({
        q: { ...newSearchFilters },
        refresh: true
      });
    }
    if (userType === UserType.MEMBER) {
      this.fetchMembers({
        query: { ...newSearchFilters },
        refresh: true
      });
    }

    setFilterOptions('userType', userType);
  }

  fetchMembers = query => {
    const { fetchMembers } = this.props;
    fetchMembers(query);
  };
  fetchUsers = query => {
    const { userType, fetchUsers } = this.props;
    fetchUsers(query, userType);
  };
  componentDidUpdate(prevProps) {
    const { searchFilters, userType } = this.props;
    if (
      userType !== prevProps.userType ||
      searchFilters.toString() !== prevProps.searchFilters.toString()
    ) {
      this.onUserTypeChange(prevProps);
    }
  }

  onUserTypeChange = prevProps => {
    const {
      match,
      setSelected,
      searchFilters,
      userType,
      userSetResults
    } = this.props;
    if (match.params.userId) {
      setSelected(match.params.userId);
    }
    if (userType !== prevProps.userType) {
      userSetResults([]);
      this.fetchUsers({ q: { userType }, refresh: true });
      this.fetchMembers({ query: {}, refresh: true });
    } else {
      this.fetchUsers({ q: { ...searchFilters }, refresh: true });
      this.fetchMembers({
        query: { ...searchFilters },
        refresh: true
      });
    }
  };

  _onLoadMore = () => {
    const { match, searchFilters, userType, setSelected } = this.props;
    if (match.params.userId) {
      setSelected(match.params.userId);
    }
    if (userType === UserType.MEMBER) {
      this.fetchMembers({
        query: {
          ...searchFilters
        },
        append: true
      });
    } else {
      this.fetchUsers({
        q: { ...searchFilters },
        append: true
      });
    }
  };
  render() {
    const {
      selectedId,
      setSelected,
      history,
      pagination,
      paginationMembers,
      userType,
      users,
      isNextPageLoading,
      isNextPageMemberLoading,
      intl,
      onItemClick,
      members,
      currentWorkspace
    } = this.props;
    const isLoading = false; // dummy var
    const nowItemClick =
      onItemClick ||
      (_id => {
        setSelected(_id);
        history.push('/users/' + userType?.replace(/_/g, '-') + '/' + _id);
      });

    return isLoading ? (
      <Loading />
    ) : (
      <UserList
        intl={intl}
        isNextPageLoading={isNextPageLoading}
        isNextPageMemberLoading={isNextPageMemberLoading}
        pagination={pagination}
        paginationMembers={paginationMembers}
        userType={userType}
        users={users}
        members={members}
        onLoadMore={this._onLoadMore}
        selected={selectedId}
        currentWorkspace={currentWorkspace}
        onItemClick={user => nowItemClick(user._id)}
        onDeleteClick={user => true}
      />
    );
  }
}
const mapStateToProps = (state, props) => ({
  users: getUsers(state, props.userType),
  members: getMembers(state),
  selectedId: state.user.selected,
  pagination: state.pagination.user,
  paginationMembers: state.pagination.members,
  isNextPageLoading: state.loading.userList,
  isNextPageMemberLoading: state.loading.memberList,
  searchFilters: state.filter.user
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelected: UserActions.setSelected,
      fetchUsers: UserActions.getUsers,
      fetchMembers: MemberActions.getMembers,
      userSetResults: UserActions.setResults,
      resetFilters: FilterActions.reset,
      setFilterOptions: (field, value) =>
        FilterActions.updateFilterField('user', field, value)
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserListContainer)
);
