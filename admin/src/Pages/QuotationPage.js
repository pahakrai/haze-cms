import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import QuotationListContainer from '../Containers/Quotation/QuotationList';
import QuotationSearchButton from '../Containers/Quotation/QuotationSearch';
import QuotationCreateButton from '../Containers/Quotation/QuotationCreateButton';
import QuotationSearchInput from '../Containers/Quotation/QuotationSearchInput';
import QuotationStatusFilter from '../Containers/Quotation/QuotationStatusFilter';

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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.quotation' })}>
      <ContentContainer>
        <FilterLayout>
          <QuotationSearchInput {...commonFilter} />
          <QuotationStatusFilter {...commonFilter} />

          {breakpoint.sm && breakpoint.md && !breakpoint.lg && <div />}
          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}

          <FilterLayout.ButtonFloatLayout>
            <QuotationSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <QuotationCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <QuotationListContainer intl={intl} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
