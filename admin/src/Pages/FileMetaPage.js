import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';
import FileMetaListContainer from '../Containers/FileMeta/FileMetaList';

import FileMetaSearchInput from '../Containers/FileMeta/FileMetaSearchInput';
import FileMetaIsSystemFilter from '../Containers/FileMeta/FileMetaIsSystemFilter';
import FileMetaSortFilter from '../Containers/FileMeta/FileMetaSortFilter';
import FileMetaSearchButton from '../Containers/FileMeta/FileMetaSearchButton';
import FileMetaCreateButton from '../Containers/FileMeta/FileMetaCreateButton';

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
    <DocumentTitle title={intl.formatMessage({ id: 'fileMeta.title' })}>
      <ContentContainer>
        <FilterLayout>
          <FileMetaSearchInput {...commonFilter} />
          <FileMetaIsSystemFilter {...commonFilter} />
          <FileMetaSortFilter {...commonFilter} />

          {!breakpoint.xl && breakpoint.lg && <div />}
          {!breakpoint.xl && breakpoint.lg && <div />}

          <FilterLayout.ButtonFloatLayout>
            <FileMetaSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <FileMetaCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <FileMetaListContainer intl={intl} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
