import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageActions } from '../../Redux/Page/actions';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchButton } from '../../Components/Common/FilterLayout';

class PageSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getPages, type, isTemplate, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = {
      ...querys,
      type,
      isTemplate,
      isSection: false,
      isSeo: false,
      isSystem: false,
      populate: 'layout'
    };
    getPages({
      query
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
