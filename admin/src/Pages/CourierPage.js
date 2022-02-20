import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import CourierFilter from '../Containers/Courier/CourierFilter';
import CourierListContainer from '../Containers/Courier/CourierList';
import CourierSearchButton from '../Containers/Courier/CourierSearchButton';
import CourierSearchInput from '../Containers/Courier/CourierSearchInput';
import CourierCreateButton from '../Containers/Courier/CourierCreateButton';

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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.couriers' })}>
      <ContentContainer>
        <FilterLayout>
          <CourierSearchInput {...commonFilter} />
          <CourierFilter {...commonFilter} />

          {breakpoint.sm && breakpoint.md && !breakpoint.lg && <div />}
          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}

          <FilterLayout.ButtonFloatLayout>
            <CourierSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <CourierCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <CourierListContainer intl={intl} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
