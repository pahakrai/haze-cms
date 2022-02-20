// Base
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete, Empty } from 'antd';
import { FormattedMessage } from 'react-intl';

import { formatUserName } from '../../../Lib/util';
// redux
import { getSearchUsers } from '../../../Redux/selectors';
import { UserActions } from '../../../Redux/User/actions';

const SearchUser = ({
  disabled,
  searchUsers,
  filterUsers,
  onChange,
  userSearchResults,
  showPhone = null
}) => {
  const options =
    userSearchResults &&
    userSearchResults.length &&
    userSearchResults
      .map(user => ({
        value: user._id,
        label: showPhone
          ? `${user.phone} / ${formatUserName(user)}`
          : formatUserName(user)
      }))
      .filter(item => !filterUsers || !filterUsers.some(f => f === item.value));
  return (
    <AutoComplete
      style={{ width: '50%' }}
      options={options}
      onSelect={option => onChange && onChange(option)}
      onSearch={keyword =>
        searchUsers && keyword.length > 2 && searchUsers(keyword)
      }
      allowClear
      placeholder={<FormattedMessage id="display_page.search_user" />}
      disabled={disabled}
      notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    />
  );
};

const mapStateToProps = (state, { input }) => ({
  userSearchResults: getSearchUsers(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchUsers: UserActions.searchUsers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
