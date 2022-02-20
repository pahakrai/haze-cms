import React from 'react';

import FilterLayout from '../../Components/Common/FilterLayout';
import TextInput from '../../Components/Common/TextInput';

class SearchInput extends React.PureComponent {
  render() {
    const { onChanged, intl, filterValues } = this.props;

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

export default SearchInput;
