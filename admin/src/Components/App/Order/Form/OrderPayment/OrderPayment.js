import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Common, { helpers as HelpersCommon } from '@golpasal/common'
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import getSymbolFromCurrency from 'currency-symbol-map'

import FormName from '../../../../../Constants/Form'
import { PaymentActions } from '../../../../../Redux/Payment/actions'
import { getPaymentByOrderId } from '../../../../../Redux/selectors'
import downloadFile from '../../../../../Lib/common/downloadFile'
import Modal from '../../../../Modal'
import Button from '../../../../Common/Button'
import Card from '../../../../Common/Card'
import OrderPaymentForm from './OrderPaymentForm'
import {
  LeftColWrapper,
  RightColWrapper,
  RowWrapper
} from '../../../../App/Form/Wrapper'

const {
  PaymentStatus: StatusPaymentStatus,
  PaymentTransactionStatus,
  OrderStatus
} = Common.status

const Container = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
  margin-bottom: 20px;
`
const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PaymentStatusWrapper = styled.div`
  display: flex;
`
const PaymentStatus = styled.div`
  margin-left: 10px;
  color: ${({ active }) => (active ? '#35dc35' : '#DC143C')};
`
const PaymentList = styled.div``
const PaymentItem = styled(Card)`
  margin-bottom: 10px;
  padding-bottom: 5px;
  cursor: pointer;
`
const PaymentItemLabel = styled.div`
  margin-bottom: 5px;
`
const PaymentItemValue = styled.div`
  display: flex;
  text-indent: 20px;
  margin-bottom: 10px;
`

const OrderPayment = ({
  intl,
  payment,
  createTransaction,
  updateTransaction,
  getPaymentByOrderId,
  orderId,
  currentWorkspace,
  formValueStatus
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [appendFormProps, setAppendFormProps] = useState({})

  const onModalClose = useCallback(() => {
    setModalOpen(false)
    if (appendFormProps.updateMode) {
      setAppendFormProps({})
    }
  }, [setModalOpen, appendFormProps, setAppendFormProps])

  const onItemClick = useCallback(
    (item) => {
      setModalOpen(true)
      setAppendFormProps({
        updateMode: true,
        initialValues: {
          ...item,
          paymentMethod:
            item._paymentMethod && item._paymentMethod._id
              ? item._paymentMethod._id
              : item._paymentMethod,
          files: item.files.map((v) => ({ fileMeta: v }))
        }
      })
    },
    [setModalOpen, setAppendFormProps]
  )

  const onSubmit = useCallback(
    (_values) => {
      let values = cloneDeep(_values)

      const newImages = []
      const fileMetas = []
      values.files.forEach((image) => {
        if (image.fileMeta) {
          if (image.fileMeta._id) {
            fileMetas.push(image.fileMeta._id)
          } else {
            fileMetas.push(image.fileMeta)
          }
        } else {
          newImages.push(image)
        }
      })
      values.files = [...fileMetas]
      values.amount = Number(values.amount)

      if (!values._id) {
        createTransaction(
          { orderId, paymentId: payment?._id },
          values,
          newImages
        )
      } else {
        updateTransaction({ paymentId: payment?._id }, values, newImages)
      }
    },
    [createTransaction, updateTransaction, payment, orderId]
  )
  const onSubmitSuccess = useCallback(() => {
    setModalOpen(false)
    getPaymentByOrderId(orderId)
  }, [getPaymentByOrderId, orderId])

  const renderModalContent = useCallback(
    (closeModal) => {
      const form = !appendFormProps.updateMode
        ? FormName.PAYMENT_TRANSACTION_CREATE
        : FormName.PAYMENT_TRANSACTION_UPDATE

      return (
        <OrderPaymentForm
          key={form}
          intl={intl}
          closeModal={closeModal}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          currentWorkspace={currentWorkspace}
          {...appendFormProps}
          initialValues={
            appendFormProps.updateMode
              ? appendFormProps.initialValues
              : {
                  files: [],
                  status: PaymentTransactionStatus.PENDING
                }
          }
          form={form}
        />
      )
    },
    [intl, onSubmitSuccess, currentWorkspace, appendFormProps, onSubmit]
  )
  const paymentStatusResult = payment
    ? HelpersCommon.getConstantByValue(
        'status',
        'PaymentStatus',
        payment.status,
        intl.locale
      )
    : null

  const _onPdfBtnClick = (v) => {
    const fileUrl = `${process.env.REACT_APP_API_URL}/invoices/${orderId}/download-pdf/${v.receiptNo}`
    downloadFile(fileUrl)
  }
  const transactions = useMemo(
    () =>
      payment?.transactions?.length > 1
        ? [...(payment?.transactions || [])]?.sort(
            (a, b) => +new Date(b.date) - +new Date(a.date)
          )
        : payment?.transactions || [],
    // eslint-disable-next-line
    [payment?.transactions]
  )

  return (
    <Container>
      <ListHeader>
        <PaymentStatusWrapper>
          <FormattedMessage id="payment_status_display" />:{' '}
          <PaymentStatus
            active={payment && payment.status === StatusPaymentStatus.PAID}
          >
            {paymentStatusResult ? paymentStatusResult.text : '-'}
          </PaymentStatus>
        </PaymentStatusWrapper>
        {OrderStatus.CANCELLED !== formValueStatus &&
          payment?.status !== StatusPaymentStatus.PAID && (
            <Button type="button" onClick={() => setModalOpen(true)}>
              <FormattedMessage id="payment_add_display" />
            </Button>
          )}
      </ListHeader>
      <PaymentList>
        {transactions.map((v, index) => {
          const paymentTransactionStatusResult =
            HelpersCommon.getConstantByValue(
              'status',
              'PaymentTransactionStatus',
              v.status,
              intl.locale
            )
          const amount = v
            ? getSymbolFromCurrency(v.currency || 'HKD') + v?.amount
            : ''
          return (
            <PaymentItem key={index} onClick={() => onItemClick(v)}>
              <RowWrapper>
                <RightColWrapper xs={12} md={12} style={{ textAlign: 'end' }}>
                  <Button.Primary
                    margin={false}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      _onPdfBtnClick(v)
                    }}
                  >
                    {intl.formatMessage({
                      id: 'display_invoice_receipt_pdf'
                    })}
                  </Button.Primary>
                </RightColWrapper>
              </RowWrapper>
              <RowWrapper>
                <LeftColWrapper xs={12} md={6}>
                  <PaymentItemLabel>
                    {intl.formatMessage({
                      id: 'display_receiptNo'
                    })}
                  </PaymentItemLabel>

                  <PaymentItemValue>
                    {v.receiptNo ? v.receiptNo : '-'}
                  </PaymentItemValue>

                  <PaymentItemLabel>
                    {intl.formatMessage({
                      id: 'payment_method_display'
                    })}
                  </PaymentItemLabel>
                  <PaymentItemValue>
                    {v.paymentMethod &&
                    v.paymentMethod.name &&
                    v.paymentMethod.name[intl.locale]
                      ? v.paymentMethod.name[intl.locale]
                      : '-'}
                  </PaymentItemValue>
                  <PaymentItemLabel>
                    {intl.formatMessage({
                      id: 'payment_date_display'
                    })}
                  </PaymentItemLabel>
                  <PaymentItemValue>
                    {v.date
                      ? moment(v.date).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </PaymentItemValue>
                </LeftColWrapper>

                <RightColWrapper xs={12} md={6}>
                  <PaymentItemLabel>
                    {intl.formatMessage({
                      id: 'payment_status_display'
                    })}
                  </PaymentItemLabel>
                  <PaymentItemValue>
                    <PaymentStatus
                      style={{ marginLeft: 0 }}
                      active={v.status === PaymentTransactionStatus.SUCCESS}
                    >
                      {paymentTransactionStatusResult
                        ? paymentTransactionStatusResult.text
                        : '-'}
                    </PaymentStatus>
                  </PaymentItemValue>
                  <PaymentItemLabel>
                    {intl.formatMessage({
                      id: 'display_order_sum'
                    })}
                  </PaymentItemLabel>
                  <PaymentItemValue>{amount}</PaymentItemValue>
                  <PaymentItemLabel>
                    {intl.formatMessage({
                      id: 'payment_transaction_number_display'
                    })}
                  </PaymentItemLabel>
                  <PaymentItemValue>{v.id ? v.id : '-'}</PaymentItemValue>
                </RightColWrapper>
              </RowWrapper>

              <PaymentItemLabel>
                {intl.formatMessage({
                  id: 'display_order_remarks1'
                })}
              </PaymentItemLabel>
              <PaymentItemValue>
                {v.remarks1 ? v.remarks1 : '-'}
              </PaymentItemValue>
              <PaymentItemLabel>
                {intl.formatMessage({
                  id: 'display_order_remarks2'
                })}
              </PaymentItemLabel>
              <PaymentItemValue>
                {v.remarks2 ? v.remarks2 : '-'}
              </PaymentItemValue>
            </PaymentItem>
          )
        })}
      </PaymentList>
      <Modal.Default
        shouldOpenModal={modalOpen}
        title={intl.formatMessage({
          id: appendFormProps.updateMode
            ? 'order_payment_detail_display'
            : 'payment_add_display'
        })}
        onModalClose={onModalClose}
        content={renderModalContent}
      />
    </Container>
  )
}

export default connect(
  (state, { orderId }) => ({
    payment: getPaymentByOrderId(state, orderId)
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getPaymentByOrderId: PaymentActions.getPaymentByOrderId,
        createTransaction: PaymentActions.createTransaction,
        updateTransaction: PaymentActions.updateTransaction
      },
      dispatch
    )
)(OrderPayment)
