import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

import styled from 'styled-components';

import { FilterActions } from '../../Redux/Filter/actions';

import SearchFilter, {
  FilterOptionType
} from '../../Components/Common/SearchFilter';

const NotificationScheduleSearchWrapper = styled.div``;

class NotificationScheduleSearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { intl } = props;
    this.onSearchTermChanged = debounce(this.onSearchTermChanged, 500);
    this.state = {
      deviceRequirements: null,
      searchFilterGroups: [
        {
          id: 'createdAt',
          name: intl.formatMessage({ id: 'display_create_at' }),
          optionType: FilterOptionType.DATE_RANGE
        }
      ]
    };
  }

  componentDidMount() {}

  onSearchOptionChange(filterOptions) {
    const { setFilterOptions } = this.props;
    filterOptions.forEach(filterOption =>
      setFilterOptions(filterOption.id, filterOption.values)
    );
  }

  render() {
    const { searchFilterGroups } = this.state;
    return (
      <NotificationScheduleSearchWrapper>
        <SearchFilter
          onSearchTermChange={this.props.setSearchTerm}
          searchFilterGroups={searchFilterGroups}
          onOptionChange={this.onSearchOptionChange.bind(this)}
        />
      </NotificationScheduleSearchWrapper>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setFilterOptions: (field, value) =>
        FilterActions.updateFilterField('notificationSchedule', field, value),
      setSearchTerm: value =>
        FilterActions.updateFilterField(
          'notificationSchedule',
          'searchTerm',
          value
        )
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScheduleSearchContainer);
