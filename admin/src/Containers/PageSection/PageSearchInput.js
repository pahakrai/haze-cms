import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageActions } from '../../Redux/Page/actions';
import FilterLayout from '../../Components/Common/FilterLayout';
import TextInput from '../../Components/Common/TextInput';

class PageSearchInputContainer extends React.PureComponent {
  onSearch = () => {
    const { getPages, type, filterValues = {}, searchTerm } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b] !== undefined) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    getPages({
      refresh: true,
      query: {
        ...querys,
        type,
        searchTerm,
        populate: 'layout'
      }
    });
  };

  render() {
    const { onChanged, intl } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'search' })}:{' '}
        </FilterLayout.FilterLabel>
        <FilterLayout.FilterInput>
          <TextInput
            placeholder={intl.formatMessage({ id: 'search_placeholder' })}
            onChange={onChanged}
          />
        </FilterLayout.FilterInput>
      </FilterLayout.FilterRow>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPages: PageActions.getPages
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSearchInputContainer);
