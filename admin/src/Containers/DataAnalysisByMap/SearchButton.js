import React, { useCallback } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';

import { SearchButton as SearchButtonComponent } from '../../Components/Common/FilterLayout';

const Button = ({ intl, onSearch, loading }) => {
  return (
    <SearchButton
      onClick={useCallback(() => onSearch(), [onSearch])}
      loading={loading}
      disabled={loading}
    >
      <AiOutlineSearch />
      {intl.formatMessage({
        id: 'search'
      })}
    </SearchButton>
  );
};

const SearchButton = styled(SearchButtonComponent)`
  margin-right: 0px !important;
`;
export default Button;
