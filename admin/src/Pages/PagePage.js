import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import PageListContainer from '../Containers/Page/PageList';
import PageSearchButton from '../Containers/Page/PageSearchButton';
import PageSearchInput from '../Containers/Page/PageSearchInput';
import PageCreateButton from '../Containers/Page/PageCreateButton';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

const Page = ({ intl, isTemplate }) => {
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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.gang' })}>
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
              isTemplate={isTemplate}
              {...commonFilter}
            />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            {type === 'content' && (
              <FilterLayout.ButtonFloatLayout marginRight={16}>
                <PageCreateButton
                  type={type}
                  intl={intl}
                  isTemplate={isTemplate}
                />
              </FilterLayout.ButtonFloatLayout>
            )}
            <PageListContainer
              type={type}
              intl={intl}
              isTemplate={isTemplate}
            />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
