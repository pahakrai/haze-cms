import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import UserLevelListContainer from '../Containers/UserLevel/UserLevelList';
import UserLevelSearchButton from '../Containers/UserLevel/UserLevelSearchButton';
import UserLevelSearchInput from '../Containers/UserLevel/UserLevelSearchInput';
import UserLevelCreateButton from '../Containers/UserLevel/UserLevelCreateButton';
import UserLevelActiveFilter from '../Containers/UserLevel/UserLevelActiveFilter';
import UserLevelTypeFilter from '../Containers/UserLevel/UserLevelTypeFilter';
import UserLevelFilterClear from '../Containers/UserLevel/UserLevelFilterClear';

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

  const _onClear = () => {
    setFilterValues({});
  };

  const commonFilter = {
    intl,
    filterValues: filterValues,
    onChanged: _onChanged,
    onClear: _onClear
  };

  return (
    <DocumentTitle
      title={intl.formatMessage({ id: 'nav.user_level_management' })}
    >
      <ContentContainer>
        <FilterLayout>
          <UserLevelSearchInput {...commonFilter} />
          <UserLevelActiveFilter {...commonFilter} />
          <UserLevelTypeFilter {...commonFilter} />

          {!breakpoint.xl && breakpoint.lg && <div />}
          {!breakpoint.xl && breakpoint.lg && <div />}

          <FilterLayout.ButtonFloatLayout>
            <UserLevelSearchButton {...commonFilter} />
            <UserLevelFilterClear {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <UserLevelCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <UserLevelListContainer intl={intl} header />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
