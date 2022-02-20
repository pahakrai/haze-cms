import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from '../Components/Common/Button';
import TextInput from '../Components/Common/TextInput';
import NotificationScheduleDateFilter from '../Components/App/NotificationSchedule/NotificationScheduleDateFilter';
import NotificationScheduleStatusFilter from '../Components/App/NotificationSchedule/NotificationScheduleStatusFilter';
import NotificationScheduleToPeopleFilter from '../Components/App/NotificationSchedule/NotificationScheduleToPeopleFilter';
import NotificationScheduleList from '../Components/App/NotificationSchedule/NotificationScheduleList';
import { NotificationScheduleActions } from '../Redux/NotificationSchedule/actions';
import NotificationScheduleCreateButtonContainer from '../Containers/NotificationSchedule/NotificationScheduleCreateButton';
import { UserActions } from '../Redux/User/actions';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import FilterLayout from '../Components/Common/FilterLayout';
import { AiOutlineSearch } from 'react-icons/ai';

import {
  getNotificationSchedules,
  getSearchUsers,
  getAllUser
} from '../Redux/selectors';

const INITIAL_FILTER_STATE = {
  type: '',
  status: '',
  notificationTime: [null, null]
};

class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: INITIAL_FILTER_STATE,
      keywordValue: '',
      keywordForUserNmae: ''
    };
  }
  componentDidMount() {
    const { fetchNotificationSchedules, query } = this.props;
    fetchNotificationSchedules({ refresh: true, query });
  }

  _onSelectUserChange = keywordForUserNmae => {
    this.setState({
      keywordForUserNmae
    });

    if (keywordForUserNmae.length > 2) {
      this.props.searchUsers(keywordForUserNmae);
    }
  };

  _loadData(refresh = true) {
    const { fetchNotificationSchedules } = this.props;
    const query = this._prepareQuery();
    if (refresh) {
      fetchNotificationSchedules({ refresh: true, query });
    } else {
      fetchNotificationSchedules({ append: true, query });
    }
  }

  _onSearch = () => {
    this._loadData(true);
  };
  onItemClick = _id => {
    const { setSelected, history } = this.props;
    setSelected(_id);
    history.push(`/notification-schedule/${_id}`);
  };

  _onToggle = (_id, value) => {
    const { changeStatus } = this.props;
    changeStatus(_id, value);
  };

  filterNotificationSchedules = (notificationSchedules, searchTerm = '') => {
    return notificationSchedules;
  };

  timeFormat = time => (time ? moment(time).format('YYYY-MM-DD hh:mmZ') : '');
  _prepareQuery = () => {
    // const { keywordValue, filterValue = {}, keywordForUserNmae } = this.state;
    const { keywordValue, filterValue = {} } = this.state;
    // const { allUser } = this.props;
    const { timeFormat } = this;
    const actionTimeAfter = timeFormat(filterValue.notificationTime[0]);
    const actionTimeBefore = timeFormat(filterValue.notificationTime[1]);
    const notificationTime =
      actionTimeAfter || actionTimeBefore
        ? [actionTimeAfter, actionTimeBefore]
        : null;
    // const createdAtAfter = timeFormat(filterValue.createdAt[0]);
    // const createdAtBefore = timeFormat(filterValue.createdAt[1]);
    // const createdAt = [createdAtAfter, createdAtBefore];
    // let keywordForUserId = allUser.filter(
    //   v => v.name === keywordForUserNmae
    // )[0];
    // keywordForUserId = keywordForUserId ? keywordForUserId._id : '';

    const query = {
      q: keywordValue,
      // createdAt,
      statuses: filterValue.status,
      toGroups: filterValue.toGroups
      // isActive: filterValue.isActive
    };

    if (notificationTime) {
      query['createdAtFr'] = notificationTime[0];
      query['createdAtTo'] = notificationTime[1];
    }

    return Object.keys(query).reduce((a, b) => {
      if (query[b] !== '') {
        a = { ...a, [b]: query[b] };
      }
      return a;
    }, {});
  };
  render() {
    const {
      intl,
      pagination,
      selectedId,
      // setSelected,
      searchTerm,
      notificationSchedules,
      user
    } = this.props;
    const {
      // _onSelectUserChange,
      // _onSortBySelectChange,
      filterNotificationSchedules
    } = this;
    const canLoadMore = pagination.page < pagination.totalPages;
    const filteredNotificationSchedules = filterNotificationSchedules(
      notificationSchedules,
      searchTerm
    );
    return (
      <DocumentTitle
        title={intl.formatMessage({ id: 'nav.notificationSchedule' })}
      >
        <ContentContainer>
          <FilterLayout bp={{ xl: 8 }}>
            <FilterLayout.FilterRow>
              <FilterLayout.FilterLabel>
                {intl.formatMessage({ id: 'search' })}:{' '}
              </FilterLayout.FilterLabel>
              <FilterLayout.FilterInput>
                <TextInput
                  value=""
                  onKeyDown={this._onSearchKeyDown}
                  style={{ marginBottom: 10 }}
                  placeholder={intl.formatMessage({
                    id: 'search_placeholder'
                  })}
                  onChange={value => {
                    this.setState({
                      keywordValue: value
                    });
                  }}
                />
              </FilterLayout.FilterInput>
            </FilterLayout.FilterRow>
            <NotificationScheduleStatusFilter
              intl={intl}
              onChanged={value => {
                this.setState({
                  filterValue: value
                });
              }}
            />
            <NotificationScheduleToPeopleFilter
              intl={intl}
              onChanged={value => {
                this.setState({
                  filterValue: value
                });
              }}
            />
            <NotificationScheduleDateFilter
              intl={intl}
              onChanged={value => {
                this.setState({
                  filterValue: value
                });
              }}
            />
            <React.Fragment />
            <FilterLayout.ButtonFloatLayout>
              <FilterLayout.SearchButton onClick={this._onSearch}>
                <AiOutlineSearch />
                {intl.formatMessage({ id: 'search' })}
              </FilterLayout.SearchButton>
            </FilterLayout.ButtonFloatLayout>
            <React.Fragment>
              <FilterLayout.ButtonFloatLayout marginRight={16}>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {intl.formatMessage(
                    {
                      id: 'total_record'
                    },
                    {
                      n: pagination.total
                    }
                  )}
                </span>
                <NotificationScheduleCreateButtonContainer intl={intl} />
              </FilterLayout.ButtonFloatLayout>
              <NotificationScheduleList
                intl={intl}
                pagination={pagination}
                onToggle={this._onToggle}
                // onPageChange={this.onPageChange}
                // onPageSizeChange={this.onPageSizeChange}
                className={'test'}
                currentPage={this.state.currentPage}
                notificationSchedules={filteredNotificationSchedules}
                selected={selectedId}
                onItemClick={this.onItemClick}
                _onSelectUserName={this._onSelectUserName}
                onDeleteClick={notificationSchedule => true}
                user={user}
              />
              {notificationSchedules.length > 0 && (
                <Button
                  type="primary"
                  onClick={() => {
                    this._loadData(false);
                  }}
                  disabled={!canLoadMore}
                >
                  {canLoadMore
                    ? intl.formatMessage({
                        id: 'load_more'
                      })
                    : intl.formatMessage({
                        id: 'load_more'
                      })}
                </Button>
              )}
            </React.Fragment>
          </FilterLayout>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}

const intledPage = injectIntl(Page);
const mapStateToProps = state => ({
  pagination: state.pagination.notificationSchedules,
  notificationSchedules: getNotificationSchedules(state),
  allUser: getAllUser(state),
  selectedId: state.notificationSchedule.selected,
  userSearchResults: getSearchUsers(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelected: NotificationScheduleActions.setSelected,
      changeStatus: NotificationScheduleActions.changeStatus,
      fetchNotificationSchedules:
        NotificationScheduleActions.getNotificationSchedules,
      searchUsers: UserActions.searchUsers
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(intledPage)
);
