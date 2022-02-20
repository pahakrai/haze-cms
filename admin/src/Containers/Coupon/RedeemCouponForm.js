import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import Common from '@golpasal/common'
import { FormattedMessage } from 'react-intl'

import { toast } from '../../Lib/Toast'
import CouponForm from '../../Components/App/Coupon/RedeemCouponForm'
import Loading from '../../Components/Common/Loading'
import { UserCouponActions } from '../../Redux/UserCoupon/actions'
import AccountSelector from '../../Redux/Account/selectors'

import FormName from '../../Constants/Form'
import { reset } from 'redux-form'

class RedeemCouponFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  }
  componentDidUpdate(nextProps) {
    if (nextProps.error) {
      nextProps.history.push('/user-coupons')
    }
  }
  onSubmit(coupon) {
    const { redeemCouponByCode } = this.props
    const fn = redeemCouponByCode

    fn(coupon.code)
  }

  onSubmitSuccess() {
    // const { onSubmitSuccess, history } = this.props;
    const { onSubmitSuccess } = this.props

    onSubmitSuccess && onSubmitSuccess()
  }

  onSubmitFail() {
    const { updateMode } = this.props

    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    )
  }
  getInitialCoupon = () => {
    const { coupon } = this.props
    return coupon
      ? {
          ...coupon,
          images: Array.isArray(coupon.images)
            ? coupon.images.map((v) => ({ fileMeta: v }))
            : [],
          icon: coupon.icon ? [{ fileMeta: coupon.icon }] : [],
          qrCode: coupon.qrCode ? [{ fileMeta: coupon.qrCode }] : [],
          workspace:
            coupon.workspace && coupon.workspace._id
              ? coupon.workspace._id
              : coupon.workspace
        }
      : {
          discount: {
            isRange: false
          },
          type: Common.type.CouponFormat.QRCODE
          // status: -1
        }
  }

  render() {
    const key = this.props.coupon ? this.props.coupon._id : 'new'
    const isLoading = false // dummy
    const {
      coupon,
      updateMode,
      locale,
      intl,
      currencies,
      workspaces,
      currency,
      currentUser,
      form,
      formValueIsRange,
      formValueUnit
    } = this.props
    const initialCoupon = this.getInitialCoupon()
    return isLoading ? (
      <Loading />
    ) : (
      <CouponForm
        locale={locale}
        intl={intl}
        key={key}
        currency={currency}
        workspaces={workspaces}
        currentUser={currentUser}
        updateMode={updateMode}
        coupon={coupon}
        images={initialCoupon ? initialCoupon.icon : []}
        currencies={currencies}
        formValueIsRange={formValueIsRange}
        formValueUnit={formValueUnit}
        // form
        form={form}
        initialValues={initialCoupon} //need to use common
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { REDEEM_COUPON } = FormName
  const form = REDEEM_COUPON

  return {
    locale: state.intl.locale,
    form,
    currentUser: AccountSelector.getCurrentUser(state)
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      redeemCouponByCode: UserCouponActions.redeemCouponByCode,
      reset: reset
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RedeemCouponFormContainer)
)
