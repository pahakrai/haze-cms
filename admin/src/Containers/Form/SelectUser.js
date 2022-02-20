import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete, Empty } from 'antd';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import Loading from 'react-loading';

// redux
import {
  getSearchUsers,
  getResAllUser,
  getUserById
} from '../../Redux/selectors';
import { UserActions } from '../../Redux/User/actions';

import { FieldLabel } from '../../Components/Form/form.styled';
import { ErrorMessage } from '../../Components/Form/Errors';
import _FieldContainer from '../../Components/Form/FieldContainer';

import { debounce } from './util';

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
    const { defaultValue, input, findUserById } = this.props;

    if (!defaultValue) {
      input.value && findUserById(input.value);
    }

    this.state = {
      userOptions: [],
      displayValue: ''
    };

    this._onSearchUser = debounce(this._onSearchUser, 700);
    // this._onSearchUser();
  }

  _onBlur = () => {
    const { input, allUser } = this.props;
    const currentSelectUser = allUser.find(
      user => user && user._id === input.value
    );
    if (currentSelectUser) {
      this.setState({
        displayValue: this.formatOption(currentSelectUser)
      });
      input.onBlur(input.value);
    } else {
      input.onBlur('');
    }
  };

  _onSelect = value => {
    const { input, userSearchResults } = this.props;

    if (value !== input.value) {
      input.onChange(
        value ? value : '',
        (userSearchResults || []).find(v => v._id === value)
      );
    }
  };

  _onSearchUser = keywordForUser => {
    const { query: _query = {} } = this.props;
    const query = {
      ..._query,
      limit: 10
    };
    this.setState({
      keywordForUser
    });

    if (keywordForUser && keywordForUser.length > 1) {
      this.props.searchUsers(keywordForUser, query);
    } else if (keywordForUser === undefined) {
      this.props.searchUsers('', query);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { defaultValue, defaultUser, input, findUserById } = this.props;
    const { displayValue } = this.state;
    const state = {};

    if (prevProps.userSearchResults !== this.props.userSearchResults) {
      state.userOptions = this.props.userSearchResults.map(user => ({
        value: user._id,
        label: this.formatOption(user)
      }));
    }

    if (
      !defaultUser &&
      (!prevProps.input || !prevProps.input.value) &&
      input &&
      input.value
    ) {
      findUserById(input.value);
    }

    // !props.defaultValue No default
    // !state.displayValue No choice
    // Update displayValue when defaultUser is updated
    if (
      !defaultValue &&
      !displayValue &&
      defaultUser !== prevProps.defaultUser
    ) {
      if (defaultUser) {
        state.displayValue = this.formatOption(defaultUser);
      }
    }

    // clear
    if (prevProps.input.value !== input.value && !input.value) {
      state.displayValue = '';
    }

    // if (prevProps.input.value !== this.props.input.value) {
    //   const user = allUser.find(v => v._id === this.props.input.value);

    //   state.value = user ? user.name : this.props.input.value;
    // }

    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  };

  _onChange = (value, option) => {
    this.setState({
      displayValue: value ? option.label : ''
    });
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
      meta: { touched, error, warning },
      defaultValue,
      containerStyle,
      noLabel,
      loading,
      theme,
      full,
      filterUsers
    } = this.props;

    const { userOptions, displayValue } = this.state;
    const fullStyle = full ? { width: '100%' } : {};

    return (
      <FieldContainer style={Object.assign(fullStyle, containerStyle)}>
        {!noLabel && <FieldLabel>{label}</FieldLabel>}
        <LoadingContent>
          <AutoComplete
            options={userOptions.filter(
              item => !filterUsers || !filterUsers.some(f => f === item.value)
            )}
            onSelect={this._onSelect}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            value={displayValue}
            onSearch={this._onSearchUser}
            onChange={this._onChange}
            defaultValue={defaultValue}
            style={fullStyle}
            placeholder={
              placeholder ||
              label || <FormattedMessage id="display_page.search_user" />
            }
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
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </FieldContainer>
    );
  }
}

const mapStateToProps = (state, { input }) => ({
  allUser: getResAllUser(state),
  userSearchResults: getSearchUsers(state),
  defaultUser: getUserById(state, input.value),
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

export default props => {
  return <Field {...props} component={SelectUser} />;
};
