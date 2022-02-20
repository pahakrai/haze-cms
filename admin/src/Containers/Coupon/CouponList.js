import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Common from '@golpasal/common';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'

import { CouponActions } from '../../Redux/Coupon/actions'
import { getCurrentUser } from '../../Redux/Account/selectors'
import { getCoupons } from '../../Redux/selectors'

import CouponList from '../../Components/App/Coupon/CouponList'

const ListWrapper = styled.div`
  margin-bottom: 12px;
`
const LoadingWarper = styled.div`
  text-align: center;
  margin-top: 12px;
  line-height: 32px;
`

class CouponListContainer extends React.PureComponent {
  componentDidMount() {
    const { coupons } = this.props
    if (!coupons.length) {
      this.fetchCoupon({ refresh: true }, true)
    }
  }

  _onLoadMore = () => {
    const { fetchCoupon } = this.props
    fetchCoupon({ append: true })
  }

  fetchCoupon(options = { querys: {} }) {
    const { fetchCoupon } = this.props
    fetchCoupon({
      ...options,
      query: { ...options.querys, populates: [] }
    })
  }
  // componentDidUpdate(prevProps, prevState) {
  //   const { page, onFetchData } = this.props;

  //   if (page !== prevProps.page && page) {
  //     onFetchData(page);
  //   }
  // }

  render() {
    const isLoading = false
    const {
      coupons,
      locale,
      intl,
      header,
      pagination: { fetching, isEnd }
    } = this.props

    // const isProvider =
    //   currentUser &&
    //   currentUser.userType === Common.type.UserType.PROVIDER;

    return isLoading ? (
      <LoadingWarper>
        {fetching && <Button>{intl.formatMessage({ id: 'loading' })}</Button>}
      </LoadingWarper>
    ) : (
      <ListWrapper>
        <CouponList
          locale={locale}
          intl={intl}
          loading={fetching}
          isEnd={isEnd}
          onLoadMore={this._onLoadMore}
          coupons={coupons}
          // onDeleteClick={expense => true}
          // renderFooter={renderFooter}
          // gutter={gutter}
          header={header}
          // isProvider={isProvider}
        />
      </ListWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  coupons: getCoupons(state),
  pagination: state.pagination.coupons,
  currentUser: getCurrentUser(state)
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCoupon: CouponActions.getCoupons,
      setCouponResults: CouponActions.setResults
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CouponListContainer)
)
