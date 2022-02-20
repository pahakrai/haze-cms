import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import ProductTypeListContainer from '../Containers/ProductType/ProductTypeList';
import ProductTypeSearchButton from '../Containers/ProductType/ProductTypeSearchButton';
import ProductTypeSearchInput from '../Containers/ProductType/ProductTypeSearchInput';
import ProductTypeCreateButton from '../Containers/ProductType/ProductTypeCreateButton';
import ProductTypeStatusFilter from '../Containers/ProductType/ProductTypeStatusFilter';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

const Page = ({ intl }) => {
  const [filterValues, setFilterValues] = useState({});
  const breakpoint = useAntdBreakpoint();

  const _onChanged = useCallback(
    value => {
      setFilterValues({
        ...filterValues,
        ...value
      });
    },
    [filterValues]
  );

  const commonFilter = {
    intl,
    filterValues: filterValues,
    onChanged: _onChanged
  };

  return (
    <DocumentTitle title={intl.formatMessage({ id: 'display_type' })}>
      <ContentContainer>
        <FilterLayout>
          <ProductTypeSearchInput {...commonFilter} />
          <ProductTypeStatusFilter {...commonFilter} />

          {breakpoint.sm && breakpoint.md && !breakpoint.lg && <div />}
          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}

          <FilterLayout.ButtonFloatLayout>
            <ProductTypeSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <ProductTypeCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <ProductTypeListContainer intl={intl} query={filterValues} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
