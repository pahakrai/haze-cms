import React from 'react';

import FilterLayout from '../../Components/Common/FilterLayout';
import TextInput from '../../Components/Common/TextInput';

class ProductTypeSearchContainer extends React.PureComponent {
  render() {
    const { onChanged, filterValues, intl } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'search' })}:{' '}
        </FilterLayout.FilterLabel>
        <FilterLayout.FilterInput>
          <TextInput
            value={filterValues.q}
            placeholder={intl.formatMessage({ id: 'search_placeholder' })}
            onChange={v => onChanged({ q: v || undefined })}
          />
        </FilterLayout.FilterInput>
      </FilterLayout.FilterRow>
    );
  }
}

export default ProductTypeSearchContainer;
