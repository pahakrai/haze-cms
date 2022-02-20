import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { UserSchedulePermissionActions } from '../../Redux/UserSchedulePermission/actions';

import { SearchButton } from '../../Components/Common/FilterLayout';

class UserSchedulePermissionSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getUserSchedulePermissions, filterValues } = this.props;
    const query = Object.keys(filterValues).reduce((a, b) => {
      if (filterValues[b] !== '') {
        a = { ...a, [b]: filterValues[b] };
      }
      return a;
    }, {});

    if (getUserSchedulePermissions)
      getUserSchedulePermissions({ refresh: true, ...query });
  };

  render() {
    const { intl } = this.props;
    return (
      <SearchButton onClick={this.onSearch}>
        <AiOutlineSearch />
        {intl.formatMessage({
          id: 'search'
        })}
      </SearchButton>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserSchedulePermissions:
        UserSchedulePermissionActions.getUserSchedulePermissions
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSchedulePermissionSearchContainer);
