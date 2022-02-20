import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete, Empty } from 'antd';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

// redux
import {
  getSearchWorkspaceHook,
  getResAllWorkspaceHooks
} from '../../Redux/selectors';
import { getWorkspaceHookByCode } from '../../Redux/WorkspaceHook/selectors';
import { WorkspaceHookActions } from '../../Redux/WorkspaceHook/actions';
import { FieldLabel } from '../../Components/Form/form.styled';
import { ErrorMessage } from '../../Components/Form/Errors';
import _FieldContainer from '../../Components/Form/FieldContainer';

import { debounce } from './util';

const FieldContainer = styled(_FieldContainer)`
  position: relative;
  z-index: 0;
`;

class _SelectCode extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultValue, input, getWorkspaceHookByCode } = this.props;
    if (!defaultValue) {
      getWorkspaceHookByCode(input.value);
    }

    this.state = {
      workspaceHookOptions: [],
      displayValue: '',
      displayValueLocaled: false
    };

    this._onSearchWorkspaceHook = debounce(this._onSearchWorkspaceHook, 700);
    this._onSearchWorkspaceHook();
  }

  _onBlur = () => {
    const { input, allWorkspaceHook } = this.props;
    const currentSelectCode = allWorkspaceHook.find(
      workspaceHook => workspaceHook && workspaceHook.code === input.value
    );
    if (currentSelectCode) {
      this.setState({
        displayValue: this.formatDisplayValue(currentSelectCode)
      });
      input.onBlur(input.value);
    } else {
      input.onBlur('');
    }
  };

  _onSelect = value => {
    const { input } = this.props;
    input.onChange(value ? value : '');
  };

  _onSearchWorkspaceHook = keywordForUser => {
    const { query = {} } = this.props;
    this.setState({
      keywordForUser
    });

    if (keywordForUser && keywordForUser.length > 1) {
      this.props.searchWorkspaceHooks(keywordForUser, query);
    } else if (keywordForUser === undefined) {
      this.props.searchWorkspaceHooks('', query);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      defaultValue,
      defaultWorkspaceHook,
      input,
      getWorkspaceHookByCode,
      workspaceHookSearchResults
    } = this.props;
    const { displayValue, displayValueLocaled } = this.state;
    const state = {};
    if (prevProps.workspaceHookSearchResults !== workspaceHookSearchResults) {
      state.workspaceHookOptions = workspaceHookSearchResults.map(hook => ({
        value: hook.code,
        label: this.formatDisplayValue(hook)
      }));
    }

    if (
      !defaultWorkspaceHook &&
      (!prevProps.input || !prevProps.input.value) &&
      input &&
      input.value
    ) {
      getWorkspaceHookByCode(input.value);
    }

    // !props.defaultValue No default
    // !state.displayValue No choice
    // Update displayValue when defaultWorkspaceHook is updated

    if (
      !defaultValue &&
      !displayValue &&
      defaultWorkspaceHook &&
      !displayValueLocaled &&
      this.formatDisplayValue(defaultWorkspaceHook) !== displayValue
    ) {
      state.displayValueLocaled = true;
      state.displayValue = this.formatDisplayValue(defaultWorkspaceHook);
    }

    // if (prevProps.input.value !== this.props.input.value) {
    //   const user = allWorkspaceHook.find(v => v._id === this.props.input.value);

    //   state.value = user ? user.name : this.props.input.value;
    // }

    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  };

  _onChange = (value, option) => {
    this.setState({ displayValue: value ? option.label : '' });
  };
  formatDisplayValue = workspaceHook => `${workspaceHook.code || ''}`;

  render() {
    const {
      label,
      disabled,
      meta: { touched, error, warning },
      defaultValue,
      containerStyle,
      noLabel
    } = this.props;

    const { workspaceHookOptions, displayValue } = this.state;
    return (
      <FieldContainer style={containerStyle}>
        {!noLabel && <FieldLabel>{label}</FieldLabel>}
        <AutoComplete
          options={workspaceHookOptions}
          onSelect={this._onSelect}
          onBlur={this._onBlur}
          value={displayValue}
          onSearch={this._onSearchWorkspaceHook}
          onChange={this._onChange}
          defaultValue={defaultValue}
          placeholder={<FormattedMessage id="display_find" />}
          disabled={disabled}
          notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        />
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </FieldContainer>
    );
  }
}

const mapStateToProps = (state, { input }) => ({
  allWorkspaceHook: getResAllWorkspaceHooks(state),
  workspaceHookSearchResults: getSearchWorkspaceHook(state),
  defaultWorkspaceHook: getWorkspaceHookByCode(state, input.value)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchWorkspaceHooks: WorkspaceHookActions.searchWorkspaceHooks,
      getWorkspaceHookByCode: WorkspaceHookActions.getWorkspaceHookByCode
    },
    dispatch
  );

export const SelectWorkspaceHookCode = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SelectCode);

export default props => {
  return <Field {...props} component={SelectWorkspaceHookCode} />;
};
