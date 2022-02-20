import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { UserSchedulePermissionActions } from '../../Redux/UserSchedulePermission/actions';
import { getUserSchedulePermissions } from '../../Redux/selectors';

import UserSchedulePermissionList from '../../Components/App/UserSchedulePermission/UserSchedulePermissionList';

class UserSchedulePermissionListContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchUserSchedulePermissions } = this.props;
    fetchUserSchedulePermissions &&
      fetchUserSchedulePermissions({ refresh: true });
  }

  _onLoadMore = () => {
    const { fetchUserSchedulePermissions } = this.props;
    fetchUserSchedulePermissions &&
      fetchUserSchedulePermissions({ append: true });
  };

  onPageChange = (page, limit) => {
    const { fetchUserSchedulePermissions } = this.props;
    fetchUserSchedulePermissions({ query: { page, limit } });
  };

  render() {
    const {
      intl,
      userSchedulePermissions,
      pagination,
      changeUserScheduleStatus,
      userScheduleStatusLoading
    } = this.props;
    return (
      <UserSchedulePermissionList
        userSchedulePermissions={userSchedulePermissions}
        intl={intl}
        onLoadMore={this._onLoadMore}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this.onPageChange
        }}
        userScheduleStatusLoading={userScheduleStatusLoading}
        onItemToggle={changeUserScheduleStatus}
      />
    );
  }
}
const mapStateToProps = state => ({
  userSchedulePermissions: getUserSchedulePermissions(state),
  pagination: state.pagination.userSchedulePermissions,
  userScheduleStatusLoading: state.loading.userScheduleStatusLoading
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserSchedulePermissions:
        UserSchedulePermissionActions.getUserSchedulePermissions,
      changeUserScheduleStatus:
        UserSchedulePermissionActions.changeUserScheduleStatus
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserSchedulePermissionListContainer)
);
