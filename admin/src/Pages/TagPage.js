import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import TagSearchInput from '../Containers/Tag/TagSearchInput';
import TagSearchButton from '../Containers/Tag/TagSearchButton';
import TagListContainer from '../Containers/Tag/TagList';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.tag' })}>
      <ContentContainer>
        <FilterLayout>
          <TagSearchInput {...commonFilter} />

          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}
          {!breakpoint.xl && breakpoint.lg && <div />}

          <FilterLayout.ButtonFloatLayout>
            <TagSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <TagListContainer intl={intl} filterValues={filterValues} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
