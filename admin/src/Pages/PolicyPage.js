import React, { Fragment, useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';
import PolicySearchInput from '../Containers/Policy/PolicySearchInput';
// import PolicyCreateButton from '../Containers/Policy/PolicyCreateButton';
import PolicySearchButton from '../Containers/Policy/PolicySearchButton';
import PolicyList from '../Containers/Policy/PolicyList';

const ClaimPage = ({ intl, match }) => {
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

  const commonFilterProps = {
    intl,
    filterValues: filterValues,
    onChanged: _onChanged
  };

  return (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.policies' })}>
      <ContentContainer>
        <FilterLayout>
          <PolicySearchInput {...commonFilterProps} />
          {breakpoint.lg && breakpoint.xl && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}
          {breakpoint.md && !breakpoint.xl && breakpoint.lg && <div />}

          <FilterLayout.ButtonFloatLayout>
            <PolicySearchButton {...commonFilterProps} />
          </FilterLayout.ButtonFloatLayout>
          <Fragment>
            {/* <FilterLayout.ButtonFloatLayout marginRight={16}>
              <PolicyCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout> */}
            <PolicyList intl={intl} query={filterValues} />
          </Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

export default withRouter(injectIntl(ClaimPage));
