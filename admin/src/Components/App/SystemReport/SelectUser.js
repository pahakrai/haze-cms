import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete, Empty } from 'antd';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import Loading from 'react-loading';

// redux
import { getSearchUsers, getResAllUser } from '../../../Redux/selectors';
import { UserActions } from '../../../Redux/User/actions';

import _FieldContainer from '../../../Components/Form/FieldContainer';
import H5 from '../../../Components/Common/H5';
import { debounce } from '../../../Containers/Form/util';

const FieldContainer = styled(_FieldContainer)`
  position: relative;
  z-index: 0;
`;
const LoadingContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LoadingIcon = styled.div`
  margin-left: 5px;
`;

class _SelectUser extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userOptions: [],
      defaultUser: ''
    };

    this._onSearchUser = debounce(this._onSearchUser, 700);
    // this._onSearchUser();
  }

  _onBlur = () => {
    const { allUser } = this.props;
    const { defaultUser } = this.state;
    const currentSelectUser = allUser.find(
      user => user && user._id === defaultUser
    );
    if (currentSelectUser) {
      this.setState({
        displayValue: this.formatOption(currentSelectUser)
      });
    }
  };

  _onSelect = value => {
    const { userSearchResults, defaultValue } = this.props;
    if (value !== defaultValue) {
      this.setState({
        userOptions: (userSearchResults || []).find(v => v._id === value),
        displayValue: value ? value : ''
      });
    }
  };

  _onSearchUser = keywordForUser => {
    const { query: _query = {} } = this.props;
    const query = {
      ..._query,
      limit: 10
    };
    if (keywordForUser && keywordForUser.length > 1) {
      this.props.searchUsers(keywordForUser, query);
    } else if (keywordForUser === undefined) {
      this.props.searchUsers('', query);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const state = {};
    if (prevProps.userSearchResults !== this.props.userSearchResults) {
      state.userOptions = this.props.userSearchResults.map(user => ({
        value: user._id,
        label: this.formatOption(user)
      }));
    }

    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  };
  formatOption = user => {
    const { formatOption } = this.props;
    if (!user) {
      return '';
    }
    return formatOption
      ? formatOption(user) || ' '
      : `${user.phone || ''} / ${user.email || ''}`;
  };

  _onFocus = () => {
    this._onSearchUser();
  };
  render() {
    const {
      label,
      placeholder,
      disabled,
      displayValue,
      containerStyle,
      noLabel,
      loading,
      theme,
      full,
      _onChange,
      userSearchResults
    } = this.props;
    const userOptions = userSearchResults?.map(user => ({
      value: user._id,
      label: this.formatOption(user)
    }));
    const fullStyle = full ? { width: '100%' } : {};

    return (
      <FieldContainer style={Object.assign(fullStyle, containerStyle)}>
        {!noLabel && <H5>{label}</H5>}
        <LoadingContent>
          <AutoComplete
            options={userOptions}
            onSelect={this._onSelect}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            value={displayValue ? displayValue : placeholder}
            onSearch={this._onSearchUser}
            onChange={_onChange}
            allowClear={true}
            style={fullStyle}
            placeholder={<FormattedMessage id="display_select" />}
            disabled={disabled}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          />
          {loading && (
            <LoadingIcon>
              <Loading
                type="spokes"
                color={theme.color.primary}
                height={15}
                width={15}
              />
            </LoadingIcon>
          )}
        </LoadingContent>
      </FieldContainer>
    );
  }
}

const mapStateToProps = state => ({
  allUser: getResAllUser(state),
  userSearchResults: getSearchUsers(state),
  loading: state.loading.searchUsers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchUsers: UserActions.searchUsers,
      findUserById: UserActions.findUserById
    },
    dispatch
  );

export const SelectUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(_SelectUser));
