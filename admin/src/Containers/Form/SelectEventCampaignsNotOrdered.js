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
  getEventCampaignsNotOrdered,
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

const generateOption = function (selects, locale, others) {
  const children = [];
  if (others && others.length) {
    const filters = others.filter(
      other => !selects.find(v => other._id === v._id)
    );
    selects = [...selects, ...filters];
  }
  for (const select of selects) {
    let dateFr = select.eventDate.dateFr;
    let dateTo = select.eventDate.dateTo;
    dateFr = dateFr ? moment(dateFr).format('YYYY/MM/DD') : '';
    dateTo = dateTo ? moment(dateTo).format('YYYY/MM/DD') : '';

    select &&
      children.push(
        <Option key={select._id}>
          {(select &&
            select.product &&
            select.product.name &&
            select.product.name[locale]) ||
            ''}{' '}
          {dateFr + '-' + dateTo} {select.description}
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

    this.state = { keyword: '' };
    this._onSearch = debounce(this._onSearch, 700);
    !props.disabled && this._onSearch();
  }
  valueFormat = () => {
    const {
      input: { value: items }
    } = this.props;
    return items || [];
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

    this.setState({ keyword });
    if (keyword && keyword.length > 1) {
      this.props.getEventCampaignsNotOrdered(keyword, query);
    } else if (keyword === undefined) {
      this.props.getEventCampaignsNotOrdered(undefined, query);
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
      setEventCampaignsNotOrderedResults
    } = this.props;

    if (prevLoading && !loading) {
      this.setState({ loaded: true });
    }
    if (prevDisabled && !disabled) {
      this._onSearch();
    }
    if (prevQuery !== query && eventCampaignSearchResults.length) {
      setEventCampaignsNotOrderedResults([]);
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
    const { loaded, keyword } = this.state;
    const { _onSelect, _onDeselect, _onSearch, _onFocus } = this;

    const value = this.valueFormat();
    const children = generateOption(
      eventCampaignSearchResults,
      intl.locale,
      keyword ? [] : valueEventCampaigns
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
  eventCampaignSearchResults: getEventCampaignsNotOrdered(state),
  loading: state.loading.getEventCampaignsNotOrdered
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEventCampaignsNotOrdered:
        EventCampaignActions.getEventCampaignsNotOrdered,
      setEventCampaignsNotOrderedResults:
        EventCampaignActions.setNotOrderedResults
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
