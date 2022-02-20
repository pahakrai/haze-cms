import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../Components/Common/Loading';
import NotificationScheduleList from '../../Components/App/NotificationSchedule/NotificationScheduleList';
import { NotificationScheduleActions } from '../../Redux/NotificationSchedule/actions';
import { getNotificationSchedules } from '../../Redux/selectors';
import { UserActions } from '../../Redux/User/actions';
import { getUserById } from '../../Redux/selectors';
class NotificationScheduleListContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }
  componentDidMount() {
    const { fetchNotificationSchedules } = this.props;
    fetchNotificationSchedules({ refresh: true });
  }

  filterNotificationSchedules = (notificationSchedules, searchTerm = '') => {
    return notificationSchedules;
  };

  componentDidUpdate(preProps) {
    const { pagination } = this.props;
    if (
      pagination &&
      preProps.pagination &&
      pagination.refreshing !== preProps.pagination.refreshing &&
      pagination.refreshing === true
    ) {
      this.setState({
        currentPage: 0
      });
    }
  }

  onPageChange = page => {
    const { fetchNotificationSchedules } = this.props;
    const { currentPage } = this.state;
    if (page > currentPage) {
      fetchNotificationSchedules({ append: true });
      this.setState({
        currentPage: page
      });
    } else {
      this.setState({
        currentPage: page
      });
    }
  };
  onItemClick = _id => {
    const { setSelected } = this.props;
    setSelected(_id);
    const { history } = this.props;
    history.push(`/notification-schedule/${_id}`);
  };

  onPageSizeChange = pageSize => {
    const { fetchNotificationSchedules } = this.props;
    this.setState({
      currentPage: 0
    });
    fetchNotificationSchedules({ refresh: true, resetLimit: pageSize });
  };

  _onSelectUserName = id => {
    const { allUser } = this.props;
    let keywordForUserName = allUser.filter(v => v._id === id)[0];
    this.setState({
      keywordForUserName
    });
  };

  _loadData(refresh = true) {
    const { fetchNotificationSchedules } = this.props;
    fetchNotificationSchedules({ append: true });
  }

  _onToggle = (_id, value) => {
    const { changeStatus } = this.props;
    changeStatus(_id, value);
  };

  render() {
    const { filterNotificationSchedules } = this;
    const {
      selectedId,
      intl,
      searchTerm,
      notificationSchedules,
      pagination,
      user
    } = this.props;
    let isLoading = false; // dummy var
    const filteredNotificationSchedules = filterNotificationSchedules(
      notificationSchedules,
      searchTerm
    );
    if (!pagination) {
      isLoading = true;
    }
    // const canLoadMore = pagination.page < pagination.totalPages;
    return isLoading ? (
      <Loading />
    ) : (
      <div>
        <NotificationScheduleList
          intl={intl}
          pagination={pagination}
          onToggle={this._onToggle}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          className={'test'}
          currentPage={this.state.currentPage}
          notificationSchedules={filteredNotificationSchedules}
          selected={selectedId}
          onItemClick={this.onItemClick}
          _onSelectUserName={this._onSelectUserName}
          onDeleteClick={notificationSchedule => true}
          user={user}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  pagination: state.pagination.notificationSchedules,
  notificationSchedules: getNotificationSchedules(state),
  selectedId: state.notificationSchedule.selected,
  searchTerm: state.notificationSchedule.searchTerm,
  user: getUserById(state, ownProps._id)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelected: NotificationScheduleActions.setSelected,
      changeStatus: NotificationScheduleActions.changeStatus,
      fetchNotificationSchedules:
        NotificationScheduleActions.getNotificationSchedules,
      searchUsersName: UserActions.searchUsers
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationScheduleListContainer)
);
