import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';
import { injectIntl } from 'react-intl';
import { MdFilter } from 'react-icons/md';

import H3 from './H3';
import H5 from './H5';
import Hr from './Hr';
import Button from './Button';
import TextInput from './TextInput';
import DatePicker from './DatePicker';

const SearchFilterGroupTitle = styled(H3)`
  font-weight: bold;
`;
const SearchFilterOption = styled(H5)`
  width: 100%;
  cursor: pointer;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
`;
const FilterButton = styled(Button)`
  border: 1px solid transparent;
`;
const Collapsible = styled.div`
  max-height: ${props => (props.displayContent ? '300px' : '0')};
  overflow: hidden;
  // overflow-y: auto;
  transition: max-height 0.5s
    ${props => (props.displayContent ? 'ease-in' : 'ease-out')};
`;
const DateFilterWrapper = styled.div`
  min-height: 400px;
`;

const DateRangeConstant = {
  FROM: 0,
  TO: 1
};
/**
 * search filter type
 */
export const FilterOptionType = {
  // with 2 DatePicker to select date range
  DATE_RANGE: 'date-range',
  // default option, can be single/multiple selection
  DEFAULT: 'default'
};

/**
 * SearchFilter is a youtube-like search filter that let user select the filters
 */
class SearchFilter extends React.PureComponent {
  static propTypes = {
    // if truem no search bar will be displayed
    disableSearchbar: PropTypes.bool,
    // object to define filter options
    searchFilterGroups: PropTypes.arrayOf(
      PropTypes.shape({
        // unique id for search filter
        id: PropTypes.string,
        // display name
        name: PropTypes.string,
        // allow multiple selection or not
        multiple: PropTypes.bool,
        // option type
        type: PropTypes.string,
        // handle other types of filter, need to handle onSelect yourself
        renderOptions: PropTypes.func,
        // options for filter
        options: PropTypes.arrayOf(
          PropTypes.shape({
            // display name
            name: PropTypes.string,
            // value (not displayed)
            value: PropTypes.any
          })
        )
      })
    ),
    // called when your option is not the same as last time
    onOptionChange: PropTypes.func,
    // called when input change
    onSearchTermChange: PropTypes.func
  };
  static defaultProps = {
    disableSearchbar: false,
    searchFilterGroups: [],
    onOptionChange: () => true,
    onSearchTermChange: () => true
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      searchTerm: '',
      displayContent: false
    };
    this.onSearchTermChange = debounce(this.onSearchTermChange, 500);
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state;
    if (prevState.selected !== selected) {
      this.props.onOptionChange(selected);
    }
  }

  getDateValue(position, value) {
    if (position === DateRangeConstant.FROM) {
      return moment(value).startOf('d').toISOString(true);
    }
    return moment(value).endOf('d').toISOString(true);
  }

  /**
   * called when date is selected in date range option
   * @param {string} id unique id of a filter option
   * @param {number} position array position of value, 0 stands for FROM, 1 stands for TO
   * @param {string|Date} value selected date
   */
  onDateRangeSelect(id, position, value) {
    const { selected } = this.state;
    const newSelected = [...selected];
    const oldSelectedIndex = selected.findIndex(s => s.id === id);

    if (oldSelectedIndex < 0) {
      // not selected before, add date to it
      const values = new Array(2);

      values[position] = this.getDateValue(position, value);
      newSelected.push({ id, values });
    } else {
      // selected before, update record
      const values = [...selected[oldSelectedIndex].values];

      values[position] = this.getDateValue(position, value);
      newSelected[oldSelectedIndex].values = values;
    }
    this.setState({ selected: newSelected });
  }

  /**
   * called when an option is clicked, handle select/de-select here
   * @param {Object} searchFilterGroup search filter that is affected
   * @param {any} value value of selected option
   * @param {boolean} isSelected the option is selected already
   */
  onOptionSelect(searchFilterGroup, value, isSelected) {
    const { selected } = this.state;
    const newSelected = [...selected];
    const oldSelectedIndex = selected.findIndex(
      s => s.id === searchFilterGroup.id
    );

    if (isSelected) {
      // de-select value
      newSelected[oldSelectedIndex].values = selected[
        oldSelectedIndex
      ].values.filter(v => v !== value);
    } else if (oldSelectedIndex < 0) {
      // not selected before
      newSelected.push({ id: searchFilterGroup.id, values: [value] });
    } else if (oldSelectedIndex > -1 && searchFilterGroup.multiple) {
      // selected and is multiple value
      newSelected[oldSelectedIndex].values = selected[
        oldSelectedIndex
      ].values.concat([value]);
    } else {
      // selected and is not multiple value, replace existing value
      newSelected[oldSelectedIndex].values = [value];
    }
    this.setState({ selected: newSelected });
  }

  /**
   * Handle user input
   * @param {string} searchTerm user-input query string
   */
  onSearchTermChange(searchTerm) {
    this.setState({ searchTerm });
    this.props.onSearchTermChange(searchTerm);
  }

  /**
   * render filter option
   * @param {Object} searchFilterGroup search filter
   * @param {string} searchFilterGroup.id unique id
   * @param {string} searchFilterGroup.name display name
   * @param {FilterOptionType} searchFilterGroup.optionType filter option type
   * @param {function} searchFilterGroup.renderOptions custom filter
   * @param {boolean} searchFilterGroup.multiple allow multiple selection if type is default
   * @param {array} options option list
   */
  renderOptions(searchFilterGroup) {
    if (searchFilterGroup.renderOptions) {
      return searchFilterGroup.renderOptions();
    }

    switch (searchFilterGroup.optionType) {
      case FilterOptionType.DATE_RANGE:
        const { intl } = this.props;
        return (
          <DateFilterWrapper>
            <DatePicker
              onDayChange={this.onDateRangeSelect.bind(
                this,
                searchFilterGroup.id,
                DateRangeConstant.FROM
              )}
            />
            {intl.formatMessage({ id: 'display_to' })}
            <DatePicker
              onDayChange={this.onDateRangeSelect.bind(
                this,
                searchFilterGroup.id,
                DateRangeConstant.TO
              )}
            />
          </DateFilterWrapper>
        );
      default:
        const { selected } = this.state;
        const selectedOptions = selected.find(
          s => s.id === searchFilterGroup.id
        );

        return searchFilterGroup.options.map(option => {
          const isOptionSelected =
            selectedOptions && selectedOptions.values.includes(option.value);
          return (
            <SearchFilterOption
              key={option.value}
              selected={isOptionSelected}
              onClick={this.onOptionSelect.bind(
                this,
                searchFilterGroup,
                option.value,
                isOptionSelected
              )}
            >
              {option.name}
            </SearchFilterOption>
          );
        });
    }
  }

  render() {
    const { displayContent, searchTerm } = this.state;
    const { disableSearchbar, intl, searchFilterGroups } = this.props;

    return (
      <React.Fragment>
        <Row>
          <Col md={10} sm={12}>
            {!disableSearchbar && (
              <TextInput
                value={searchTerm}
                onChange={this.onSearchTermChange.bind(this)}
                placeholder={intl.formatMessage({ id: 'search_placeholder' })}
              />
            )}
          </Col>
          <Col md={1} sm={0} />
          {searchFilterGroups.length > 0 && (
            <Col md={1}>
              <FilterButton
                onClick={() =>
                  this.setState({ displayContent: !displayContent })
                }
              >
                <MdFilter />
                {intl.formatMessage({ id: 'display_filter' })}
              </FilterButton>
            </Col>
          )}
        </Row>
        <Collapsible displayContent={displayContent}>
          <Row>
            {searchFilterGroups.map((searchFilterGroup, index) => (
              <Col md={2} sm={6} xs={12} key={index}>
                <SearchFilterGroupTitle>
                  {searchFilterGroup.name}
                </SearchFilterGroupTitle>
                <Hr />
                {this.renderOptions(searchFilterGroup)}
              </Col>
            ))}
          </Row>
        </Collapsible>
      </React.Fragment>
    );
  }
}

export default injectIntl(SearchFilter);
