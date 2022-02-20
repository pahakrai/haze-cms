import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { UserGroupActions } from '../../Redux/UserGroup/actions';

import { SearchButton } from '../../Components/Common/FilterLayout';

class UserGroupSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getUserGroups, filterValues } = this.props;
    const query = Object.keys(filterValues).reduce((a, b) => {
      if (filterValues[b] !== '') {
        a = { ...a, [b]: filterValues[b] };
      }
      return a;
    }, {});

    if (getUserGroups) getUserGroups({ refresh: true, ...query });
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
      getUserGroups: UserGroupActions.getUserGroups
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGroupSearchContainer);
