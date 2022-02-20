import React, { PureComponent } from 'react';
import CategoryDropdown from '../../Components/App/Category/CategoryDropdown';
import FilterLayout from '../../Components/Common/FilterLayout';

class ProductFilter extends PureComponent {
  render() {
    const { intl, filterValues, onChanged } = this.props;

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'categories' })}:{' '}
        </FilterLayout.FilterLabel>
        <CategoryDropdown
          style={{ flex: 1 }}
          value={filterValues._category}
          onChange={v =>
            onChanged({
              _category: v === undefined ? '' : v._id,
              category: v === undefined ? '' : v.code
            })
          }
          multiple={false}
        />
      </FilterLayout.FilterRow>
    );
  }
}

export default ProductFilter;
