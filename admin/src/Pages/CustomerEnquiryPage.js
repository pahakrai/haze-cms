import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import CustomerEnquiryListContainer from '../Containers/CustomerEnquiry/CustomerEnquiryList';
import CustomerEnquirySearchButton from '../Containers/CustomerEnquiry/CustomerEnquirySearchButton';
import CustomerEnquiryFollowFilter from '../Containers/CustomerEnquiry/CustomerEnquiryFollowFilter';

import CustomerEnquirySearchInput from '../Containers/CustomerEnquiry/CustomerEnquirySearchInput';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

import { getCurrentWorkspace } from '../Redux/Account/selectors';

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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.customer_enquiry' })}>
      <ContentContainer>
        <FilterLayout>
          <CustomerEnquirySearchInput {...commonFilter} />
          <CustomerEnquiryFollowFilter {...commonFilter} />

          {breakpoint.sm && breakpoint.md && !breakpoint.lg && <div />}
          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}

          <FilterLayout.ButtonFloatLayout>
            <CustomerEnquirySearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <CustomerEnquiryListContainer intl={intl} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentWorkspace: getCurrentWorkspace(state)
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page))
);
