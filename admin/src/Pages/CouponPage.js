import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import styled from 'styled-components';

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint';

import { CouponActions } from '../Redux/Coupon/actions';
import AccountSelector from '../Redux/Account/selectors';

// import Pagination from '../Components/Common/Pagination';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import CouponListContainer from '../Containers/Coupon/CouponList';
import CouponSearchButton from '../Containers/Coupon/CouponSearch';
// import CouponFilter from '../Containers/Coupon/CouponFilter';
// import SiderLayout from '../Components/Common/SiderLayout';
import FilterLayout from '../Components/Common/FilterLayout';
import CouponCreateButton from '../Containers/Coupon/CouponCreateButton';
import CouponSearchInput from '../Containers/Coupon/CouponSearchInput';
import CouponDateFilter from '../Containers/Coupon/CouponDateFilter';
// const PaginationWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

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
    <DocumentTitle title={intl.formatMessage({ id: 'nav.coupons' })}>
      <ContentContainer>
        <FilterLayout>
          <CouponSearchInput {...commonFilter} />
          <CouponDateFilter {...commonFilter} />

          {breakpoint.sm && breakpoint.md && !breakpoint.lg && <div />}
          {breakpoint.lg && !breakpoint.md && <div />}
          {breakpoint.lg && breakpoint.xl && <div />}

          <FilterLayout.ButtonFloatLayout>
            <CouponSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <CouponCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <CouponListContainer intl={intl} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  );
};

const mapStateToProps = state => ({
  pagination: state.pagination.coupons,
  currentUser: AccountSelector.getCurrentUser(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCoupons: CouponActions.getCoupons
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page));
