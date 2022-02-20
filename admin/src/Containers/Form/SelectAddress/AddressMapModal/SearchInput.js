import React, { useState, useEffect } from 'react';
import { AutoComplete, Spin, Empty } from 'antd';
import Loading from 'react-loading';
import styled, { withTheme } from 'styled-components';

const LoadingContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LoadingIcon = styled.div`
  margin-left: 5px;
`;
const SearchInput = withTheme(
  ({
    onSearch,
    result,
    value,
    onSelect,
    intl,
    loading,
    searchLoading,
    disabled,
    theme
  }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
      setDisplayValue(value);
    }, [value]);

    return (
      <Spin spinning={loading}>
        <LoadingContent>
          <AutoComplete
            disabled={loading || disabled}
            value={displayValue}
            onChange={setDisplayValue}
            options={result.map(v => ({
              label: v.description,
              value: v.place_id
            }))}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder={intl.formatMessage({
              id: 'display_order_select_detail_address'
            })}
            style={{ width: '100%' }}
          />
          {searchLoading && (
            <LoadingIcon>
              <Loading
                type="spokes"
                color={theme.color.primary}
                height={15}
                width={15}
              />
            </LoadingIcon>
          )}
        </LoadingContent>
      </Spin>
    );
  }
);

export default SearchInput;
