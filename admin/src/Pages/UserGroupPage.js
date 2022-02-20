import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import UserGroupListContainer from '../Containers/UserGroup/UserGroupList';
import UserGroupSearchInput from '../Containers/UserGroup/UserGroupSearchInput';
import UserGroupSearchButton from '../Containers/UserGroup/UserGroupSearchButton';
import UserGroupCreateButton from '../Containers/UserGroup/UserGroupCreateButton';
import UserGroupFilterClear from '../Containers/UserGroup/UserGroupFilterClear';
import UserGroupFilter from '../Containers/UserGroup/UserGroupFilter';

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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.user-groups' })}>
      <ContentContainer>
        <FilterLayout>
          <UserGroupSearchInput {...commonFilter} />
          <UserGroupFilter {...commonFilter} />

          {breakpoint.sm && breakpoint.md && !breakpoint.lg && <div />}
          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}

          <FilterLayout.ButtonFloatLayout>
            <UserGroupSearchButton {...commonFilter} />
            <UserGroupFilterClear {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <UserGroupCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <UserGroupListContainer intl={intl} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default injectIntl(Page);
