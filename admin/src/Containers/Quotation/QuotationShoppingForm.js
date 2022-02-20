import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import Common from '@golpasal/common'
import { change as formValueChange, touch as formTouchAction } from 'redux-form'

import Loading from '../../Components/Common/Loading'
import QuotationDefaultForm from '../../Components/App/Quotation/Form'

import { QuotationActions } from '../../Redux/Quotation/actions'
import { PaymentActions } from '../../Redux/Payment/actions'
import ResourcesActions from '../../Redux/Resources/actions'

import * as QuotationFormUtils from './QuotationFormUtils'

const { QuotationStatus } = Common.status
const { OrderType } = Common.type

class QuotationFormContainer extends React.PureComponent {
  state = {
    updateDefaultAddressloading: false,
    sameContactChecked: false,
    checkoutLoading: false
  }

  componentDidMount() {
    QuotationFormUtils.componentDidMount(this)
  }

  onSubmit = async (quotation) => {
    QuotationFormUtils.onSubmit(quotation, this)
  }

  onSubmitSuccess = () => {
    QuotationFormUtils.onSubmitSuccess(this)
  }

  onSubmitFail = () => {
    QuotationFormUtils.onSubmitFail(this)
  }

  getInitialValues = () => {
    const { quotation, updateMode } = this.props
    const createValue = {
      orderType: OrderType.SHOPPING,
      status: QuotationStatus.DRAFT
    }

    return updateMode
      ? {
          ...QuotationFormUtils.getUpdateModeInitialValues(quotation)
        }
      : createValue
  }

  componentDidUpdate(prevProps) {
    QuotationFormUtils.componentDidUpdate(prevProps, this)
  }

  convertToOrder = (...args) => {
    QuotationFormUtils.convertToOrder(this, ...args)
  }
  onSameContactClick = () => {
    QuotationFormUtils.onSameContactClick(this)
  }

  touchAllField = () => {
    QuotationFormUtils.touchAllField(this)
  }

  render() {
    const {
      updateMode,
      quotation,
      form,
      intl,
      currentWorkspaceType,
      currentUser,
      cancelQuotationLoading,
      currentWorkspace,
      formValueClient,
      formValueStatus,
      formValueBilling,
      formValueContact,
      convertToOrder,
      updateQuotationStatusLoading,
      quotationId,
      payment
    } = this.props
    const { updateDefaultAddressloading, sameContactChecked, checkoutLoading } =
      this.state
    const initialValues = this.getInitialValues()

    const loading = updateMode && !quotation

    return loading ? (
      <Loading isLoading={loading} fill />
    ) : (
      <QuotationDefaultForm
        key={quotation ? quotation._id : 'new'}
        form={form}
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        onSubmitSuccess={this.onSubmitSuccess}
        //  others
        intl={intl}
        quotation={quotation}
        quotationId={quotationId}
        payment={payment}
        updateMode={updateMode}
        currentUser={currentUser}
        formValueClient={formValueClient}
        formValueStatus={formValueStatus}
        formValueBilling={formValueBilling}
        formValueContact={formValueContact}
        currentWorkspace={currentWorkspace}
        currentWorkspaceType={currentWorkspaceType}
        convertToOrder={convertToOrder}
        onCopyRawText={this.onCopyRawText}
        touchAllField={this.touchAllField}
        sameContactChecked={sameContactChecked}
        setSameContactChecked={this.onSameContactClick}
        checkoutLoading={checkoutLoading}
        cancelQuotationLoading={cancelQuotationLoading}
        updateQuotationStatusLoading={updateQuotationStatusLoading}
        updateDefaultAddressloading={updateDefaultAddressloading}
      />
    )
  }
}
const mapStateToProps = QuotationFormUtils.mapStateToProps

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createQuotation: QuotationActions.createQuotation,
      updateQuotation: QuotationActions.updateQuotation,
      cancelQuotation: QuotationActions.cancelQuotation,
      updateOrderStatus: QuotationActions.updateOrderStatus,
      convertToOrder: QuotationActions.convertToOrder,
      getQuotations: QuotationActions.getQuotations,
      getQuotationById: QuotationActions.getQuotationById,
      getPaymentByQuotationId: PaymentActions.getPaymentByQuotationId,
      removeQuotation: ResourcesActions.removeQuotation,
      formValueChange,
      formTouchAction
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(QuotationFormContainer))
