import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import SalesVolumeListContainer from '../Containers/SalesVolume/SalesVolumeList';
import SalesVolumeSearchButton from '../Containers/SalesVolume/SalesVolumeSearchButton';
import SalesVolumeCreateButton from '../Containers/SalesVolume/SalesVolumeCreateButton';
import SalesVolumeYearFilter from '../Containers/SalesVolume/SalesVolumeYearFilter';
import SalesVolumeWidget from '../Containers/SalesVolume/SalesVolumeWidget';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';
import Spacer from '../Components/Common/Spacer';

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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.sales_volume' })}>
      <ContentContainer>
        <SalesVolumeWidget intl={intl} />
        <Spacer height={16} />
        <FilterLayout>
          <SalesVolumeYearFilter {...commonFilter} />

          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}
          {!breakpoint.xl && breakpoint.lg && <div />}

          <FilterLayout.ButtonFloatLayout>
            <SalesVolumeSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <SalesVolumeCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <SalesVolumeListContainer intl={intl} query={filterValues} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
