import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductActions } from '../../Redux/Product/actions';
import TextInput from '../../Components/Common/TextInput';
import FilterLayout from '../../Components/Common/FilterLayout';

class ProductSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getProducts, query } = this.props;

    getProducts({
      refresh: true,
      query
    });
  };

  render() {
    const { onChanged, intl, searchTerm } = this.props;
    // search
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'search' })}:{' '}
        </FilterLayout.FilterLabel>
        <FilterLayout.FilterInput>
          <TextInput
            value={searchTerm}
            placeholder="...."
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
      getProducts: ProductActions.getProducts
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearchContainer);
