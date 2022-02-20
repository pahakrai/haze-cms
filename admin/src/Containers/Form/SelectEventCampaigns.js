import React from 'react';
import { Select } from 'antd';
import styled, { withTheme } from 'styled-components';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import Loading from 'react-loading';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getSearchEventCampaigns,
  getEventCampaignsByArray
} from '../../Redux/selectors';
import { EventCampaignActions } from '../../Redux/EventCampaign/actions';

import { ErrorMessage } from '../../Components/Form/Errors';
import FieldContainer from '../../Components/Form/FieldContainer';
import {
  FieldLabel,
  HorizontalErrorContainer
} from '../../Components/Form/form.styled';

import { debounce } from './util';

const Option = Select.Option;
const SelectWrapper = styled.div`
  width: 100%;
`;
const LoadingContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LoadingIcon = styled.div`
  margin-left: 5px;
`;

const generateOption = function (selects, locale) {
  const children = [];
  for (const select of selects) {
    select &&
      children.push(
        <Option key={select._id}>
          {select &&
            select.product &&
            select.product.name &&
            select.product.name[locale]}{' '}
          {moment(select.dateFr).format('YYYY/MM/DD') +
            '-' +
            moment(select.dateTo).format('YYYY/MM/DD')}{' '}
          {select.description}
        </Option>
      );
  }
  return children;
};

class _SelectEventCampaignss extends React.PureComponent {
  state = {
    keyword: ''
  };
  constructor(props) {
    super(props);

    this._onSearch = debounce(this._onSearch, 700);
    !props.disabled && this._onSearch();
  }
  valueFormat = () => {
    const {
      input: { value: items }
    } = this.props;
    return items || []; // Array.isArray(items) ? [...items].map(v => v.eventCampaign) : [];
  };
  _onSelect = value => {
    const {
      input: { onChange, value: items }
    } = this.props;

    onChange([...items, value]);
  };
  _onDeselect = value => {
    const {
      input: { onChange, value: items }
    } = this.props;
    onChange(
      (items || []).filter(v => {
        return v !== value;
      })
    );
  };
  _onSearch = keyword => {
    const { query: _query = {} } = this.props;
    const query = {
      ..._query,
      limit: 10,
      populates: ['product', 'productSKU']
    };

    if (keyword && keyword.length > 1) {
      this.props.searchEventCampaigns(keyword, query);
    } else if (keyword === undefined) {
      this.props.searchEventCampaigns(undefined, query);
    }
  };
  _onFocus = () => {
    this._onSearch();
  };
  componentDidUpdate({
    loading: prevLoading,
    disabled: prevDisabled,
    query: prevQuery
  }) {
    const {
      loading,
      disabled,
      query,
      eventCampaignSearchResults,
      setEventCampaignSearchResults
    } = this.props;

    if (prevLoading && !loading) {
      this.setState({ loaded: true });
    }
    if (prevDisabled && !disabled) {
      this._onSearch();
    }
    if (prevQuery !== query && eventCampaignSearchResults.length) {
      setEventCampaignSearchResults([]);
    }
  }

  render() {
    const {
      label,
      meta: { touched, error, warning },
      placeholder,
      eventCampaignSearchResults,
      intl,
      noLabel = false,
      containerStyle = {},
      loading,
      theme,
      disabled,
      valueEventCampaigns
    } = this.props;
    const { loaded } = this.state;
    const { _onSelect, _onDeselect, _onSearch, _onFocus } = this;

    const value = this.valueFormat();
    const children = generateOption(
      eventCampaignSearchResults,
      intl.locale,
      valueEventCampaigns
    );
    return (
      <React.Fragment>
        <FieldContainer style={{ ...styles.container, ...containerStyle }}>
          {!noLabel && <FieldLabel>{label}</FieldLabel>}
          <LoadingContent>
            <SelectWrapper>
              <Select
                disabled={disabled}
                autoClearSearchValue
                mode="multiple"
                size={'default'}
                value={loaded ? value : []}
                placeholder={placeholder || label}
                onSelect={_onSelect}
                onDeselect={_onDeselect}
                onSearch={_onSearch}
                onFocus={_onFocus}
                style={styles.select}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
              >
                {children}
              </Select>
            </SelectWrapper>
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
        <HorizontalErrorContainer />
      </React.Fragment>
    );
  }
}

const styles = {
  select: { width: '100%' },
  container: { overflow: 'hidden', width: '100%' }
};

const mapStateToProps = (state, { input }) => ({
  valueEventCampaigns: getEventCampaignsByArray(state, input.value || []),
  eventCampaignSearchResults: getSearchEventCampaigns(state),
  loading: state.loading.searchEventCampaigns
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchEventCampaigns: EventCampaignActions.searchEventCampaigns,
      setEventCampaignSearchResults: EventCampaignActions.setSearchResults
    },
    dispatch
  );
const SelectEventCampaignss = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SelectEventCampaignss);
export default withTheme(
  injectIntl(props => {
    return <Field {...props} component={SelectEventCampaignss} />;
  })
);
