import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import PageListContainer from '../Containers/PageSection/PageList';
import PageSearchButton from '../Containers/PageSection/PageSearchButton';
import PageSearchInput from '../Containers/PageSection/PageSearchInput';
import PageCreateButton from '../Containers/PageSection/PageCreateButton';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

const Page = ({ intl, isSeo, isSection }) => {
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
  const type = 'content';

  return (
    <DocumentTitle
      title={intl.formatMessage({
        id: isSection ? 'nav.pageSection' : 'nav.pageSeo'
      })}
    >
      <ContentContainer>
        <FilterLayout>
          <PageSearchInput {...commonFilter} />

          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}
          {!breakpoint.xl && breakpoint.lg && <div />}

          <FilterLayout.ButtonFloatLayout>
            <PageSearchButton
              type={type}
              isSection={isSection}
              isSeo={isSeo}
              {...commonFilter}
            />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            {type === 'content' && (
              <FilterLayout.ButtonFloatLayout marginRight={16}>
                <PageCreateButton
                  type={type}
                  intl={intl}
                  isSeo={isSeo}
                  isSection={isSection}
                />
              </FilterLayout.ButtonFloatLayout>
            )}
            <PageListContainer
              type={type}
              intl={intl}
              isSeo={isSeo}
              isSection={isSection}
            />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
