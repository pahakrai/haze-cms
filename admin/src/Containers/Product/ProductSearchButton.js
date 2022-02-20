import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { ProductActions } from '../../Redux/Product/actions';
import { SearchButton } from '../../Components/Common/FilterLayout';

class ProductSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getProducts, filterValues = {}, searchTerm } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      return { ...result, [b]: filterValues[b] };
    }, {});
    getProducts({
      refresh: true,
      query: { ...querys, q: searchTerm }
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
      getProducts: ProductActions.getProducts
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearchContainer);
