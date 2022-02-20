import React, { Fragment, useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import ProductListContainer from '../Containers/Product/ProductList';
import ProductSearchButton from '../Containers/Product/ProductSearchButton';
import ProductSearchInput from '../Containers/Product/ProductSearchInput';
import ProductCreateButton from '../Containers/Product/ProductCreateButton';
import ProductCategoriesFilter from '../Containers/Product/ProductCategoriesFilter';
import ProductAmountFilter from '../Containers/Product/ProductAmountFilter';
import ProductStatusFilter from '../Containers/Product/ProductStatusFilter';
import ProductFilterClear from '../Containers/Product/ProductFilterClear';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

const Page = ({ intl }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [filterValues, setFilterValues] = useState({});
  const breakpoint = useAntdBreakpoint();
  const _onClear = useCallback(() => {
    setSearchTerm(undefined);
  }, []);
  const _onChanged = useCallback(
    value => {
      setFilterValues({
        ...filterValues,
        ...value
      });
    },
    [filterValues]
  );

  const _onSerchInputChanged = useCallback(value => {
    setSearchTerm(value || undefined);
  }, []);

  const query = { ...filterValues, q: searchTerm || undefined };
  const commonFilterProps = {
    intl,
    filterValues: filterValues,
    searchTerm,
    onChanged: _onChanged,
    onClear: _onClear
  };
  return (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.products' })}>
      <ContentContainer>
        <FilterLayout>
          <ProductSearchInput
            {...commonFilterProps}
            query={query}
            onChanged={_onSerchInputChanged}
          />
          <ProductCategoriesFilter {...commonFilterProps} />
          <ProductAmountFilter {...commonFilterProps} />
          <ProductStatusFilter {...commonFilterProps} />
          <></>
          {breakpoint.xl && <></>}
          {breakpoint.xl && <></>}
          <FilterLayout.ButtonFloatLayout>
            <ProductSearchButton
              {...commonFilterProps}
              onChanged={_onSerchInputChanged}
            />
            <ProductFilterClear {...commonFilterProps} />
          </FilterLayout.ButtonFloatLayout>
          <Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <ProductCreateButton {...commonFilterProps} />
            </FilterLayout.ButtonFloatLayout>
            <ProductListContainer intl={intl} query={query} />
          </Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
