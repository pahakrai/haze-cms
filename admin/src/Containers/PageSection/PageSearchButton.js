import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageActions } from '../../Redux/Page/actions';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchButton } from '../../Components/Common/FilterLayout';

class PageSearchContainer extends React.PureComponent {
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
        isSection: true,
        populate: 'layout'
      }
    });
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
      getPages: PageActions.getPages
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSearchContainer);
