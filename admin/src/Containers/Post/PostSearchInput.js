import React from 'react';

import FilterLayout from '../../Components/Common/FilterLayout';
import TextInput from '../../Components/Common/TextInput';

class PostSearchContainer extends React.PureComponent {
  render() {
    const { intl, onChanged } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'search' })}:{' '}
        </FilterLayout.FilterLabel>
        <FilterLayout.FilterInput>
          <TextInput
            placeholder={intl.formatMessage({ id: 'search_placeholder' })}
            onChange={v => onChanged({ searchTerm: v || undefined })}
          />
        </FilterLayout.FilterInput>
      </FilterLayout.FilterRow>
    );
  }
}

export default PostSearchContainer;
