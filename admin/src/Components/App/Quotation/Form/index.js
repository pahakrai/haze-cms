import React, { useEffect, useState } from 'react'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { Col, Row } from 'react-flexa'
import { Modal } from 'antd'
import DatePicker from '../../../Form/DatePicker'
import Common, { helpers } from '@golpasal/common'
import { toast } from '../../../../Lib/Toast'
import { FormattedMessage } from 'react-intl'

// import ContentLoader from '../../../Common/ContentLoader';
import Title from '../../../Common/Title'
import _Card from '../../../Common/Card'

import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper
  // ColWrapper
} from '../../Form/Wrapper'
import Errors from '../../../Form/Errors'
import Form from '../../../Form/Form'
import TextInput from '../../../Form/TextInput'
import Dropdown from '../../../Form/Dropdown'

import Button from '../../../Common/Button'
import Checkbox from '../../../Common/Checkbox'
import ContentLoader from '../../../Common/ContentLoader'
import OrderService from '../../../../Services/APIServices/OrderService'
import QuotationService from '../../../../Services/APIServices/QuotationService'
import QuotationSold from '../Form/QuotationSold'
// import QuotationDate from '../Form/QuotationDate';
// import QuotationNumber from '../Form/QuotationNumber';
// import QuotationStatusBar from '../Form/QuotationStatusBar';
import QuotationProducts from '../Form/QuotationProducts'
import QuotationCharge from '../Form/QuotationCharge'
import QuotationChargeServices from '../Form/QuotationChargeServices'
import QuotationChargeOthers from '../Form/QuotationChargeOthers'
import QuotationAddressInput from '../Form/QuotationAddressForm/QuotationAddressInput'

import {
  validate,
  asyncValidate
} from '../../../../Containers/Quotation/QuotationFormUtils'
// import SelectUser from '../../../../Containers/Form/SelectUser';

const { QuotationStatus } = Common.status

const Card = styled(_Card)`
  margin: 10px 0;
`

// const QuotationStatusBarWrapper = styled(Card)`
//   margin-top: 0;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   @media (max-width: 1000px) {
//     flex-direction: column;
//   }
// `;

const DetailInfoWrapper = styled.div``
// const CancelButton = styled.div`
//   cursor: pointer;
//   color: #999;
//   text-decoration-line: underline;
//   margin-right: 30px;
// `;

const QuotationForm = ({
  asyncValidating,
  form,
  intl,
  onSubmit,
  onSubmitSuccess,
  onSubmitFail,
  onCopyRawText,
  disabled,
  formValueAmount,
  currentWorkspace,
  currentWorkspaceType,
  cancelQuotation,
  cancelQuotationLoading,
  initialValues,
  currentUser,
  pristine,
  submitting,
  updateMode,
  updateQuotationStatus,
  quotationId,
  quotation,
  payment,
  convertToOrder,
  updateDefaultAddressloading,
  formValueClient,
  formValueStatus,
  formValueContact,
  formValueBilling,
  formValueChange,
  sameContactChecked,
  setSameContactChecked,
  checkoutLoading,
  touchAllField
}) => {
  const renderButtons = () => {
    const _onSubmit = () => {
      touchAllField()
    }
    const disabledButton = submitting || asyncValidating

    if (updateMode) {
      return (
        <Button.Primary
          disabled={pristine || disabledButton}
          type="submit"
          onClick={_onSubmit}
          style={{ width: '100%' }}
        >
          {intl.formatMessage({
            id: 'quotation_update'
          })}
        </Button.Primary>
      )
    }
    return (
      <Button.Primary
        disabled={disabledButton}
        loading={asyncValidating}
        type="submit"
        onClick={_onSubmit}
        style={{ width: '100%' }}
      >
        {intl.formatMessage({
          id: 'quotation_create'
        })}
      </Button.Primary>
    )
  }

  const confirm = (title, callback) =>
    Modal.confirm({
      title: intl.formatMessage({
        id: title
      }),
      okText: intl.formatMessage({ id: 'display_yes' }),
      cancelText: intl.formatMessage({ id: 'cancel' }),
      onOk: () => {
        callback()
        return Promise.resolve()
      }
    })
  // const renderStatusButton = () => {
  //   /* <Button.Primary onClick={onCopyRawText} type="button">
  //         {intl.formatMessage({
  //           id: 'display_copy_order_raw_text'
  //         })}
  //       </Button.Primary> */
  //   const confirm = (title, callback) =>
  //     Modal.confirm({
  //       title: intl.formatMessage({
  //         id: title
  //       }),
  //       okText: intl.formatMessage({ id: 'display_yes' }),
  //       cancelText: intl.formatMessage({ id: 'cancel' }),
  //       onOk: () => {
  //         callback();
  //         return Promise.resolve();
  //       }
  //     });
  //   const cancel = (
  //     <CancelButton
  //       onClick={() => confirm('msg.update_order_status', cancelQuotation)}
  //     >
  //       {intl.formatMessage({
  //         id: 'display_order_cancel'
  //       })}
  //     </CancelButton>
  //   );
  //   const ship = (
  //     <Button.Primary
  //       margin={false}
  //       type="button"
  //       onClick={() =>
  //         confirm('msg.update_order_status', () =>
  //           updateQuotationStatus(QuotationStatus.SHIPPED)
  //         )
  //       }
  //     >
  //       {intl.formatMessage({
  //         id: 'display_order_ship'
  //       })}
  //     </Button.Primary>
  //   );
  //   const complete = (
  //     <Button.Primary
  //       margin={false}
  //       type="button"
  //       onClick={() =>
  //         confirm('msg.update_order_status', () =>
  //           updateQuotationStatus(QuotationStatus.COMPLETED)
  //         )
  //       }
  //     >
  //       {intl.formatMessage({
  //         id: 'display_order_complete'
  //       })}
  //     </Button.Primary>
  //   );
  //   const checkout = (
  //     <Button.Primary
  //       margin={false}
  //       type="button"
  //       disabled={checkoutLoading}
  //       loading={checkoutLoading}
  //     >
  //       {intl.formatMessage({
  //         id: 'display_copy_checkout_link'
  //       })}
  //     </Button.Primary>
  //   );

  //   switch (formValueStatus) {
  //     case QuotationStatus.PENDING_PAYMENT:
  //       return (
  //         <>
  //           {cancel} {checkout}
  //         </>
  //       );
  //     case QuotationStatus.PREPARE_SHIPMENT:
  //       return (
  //         <>
  //           {cancel} {ship}
  //         </>
  //       );
  //     case QuotationStatus.SHIPPED:
  //       return <>{complete}</>;
  //     case QuotationStatus.COMPLETED:
  //     default:
  //   }
  //   return null;
  // };
  const [values, setValues] = useState()

  useEffect(() => {
    ;(async () => {
      if (quotationId) {
        const { data } = await OrderService.getOrderByQuotationId(quotationId)
        if (data) {
          setValues(data._id)
        }
      }
    })()
  }, [quotationId, values])

  const statusOptions = helpers
    .getConstants('status', 'QuotationStatus', intl.locale)
    .map((status) => ({
      label: status.text,
      value: status.value
    }))
  const quotationForm = (
    <RowWrapper>
      {/* {updateMode && (
        <LeftColWrapper xs={12}>
          <QuotationStatusBarWrapper>
            <QuotationStatusBar
              name="status"
              intl={intl}
              renderStatusButton={renderStatusButton}
            />
          </QuotationStatusBarWrapper>
        </LeftColWrapper>
      )} */}
      <LeftColWrapper xs={12} md={8}>
        <Card style={{ marginTop: 0, paddingLeft: 20 }}>
          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <QuotationSold
                name="workspace"
                intl={intl}
                currentWorkspace={currentWorkspace}
                updateMode={updateMode}
              />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <DatePicker
                label={intl.formatMessage({ id: 'date' })}
                name="quotationDate"
                disabled={
                  quotation && quotation.status === QuotationStatus.CONFIRM
                }
              />
            </Col>
          </Row>

          <DetailInfoWrapper>
            {/* <div style={{ width: '45%' }}>
              <QuotationNumber name="quotationNo" updateMode={updateMode} />
              <QuotationDate name="quotationDate" updateMode={updateMode} />
            </div> */}
            {updateMode && (
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <TextInput
                    name="quotationNo"
                    label={intl.formatMessage({ id: 'display_quotationNo' })}
                    disabled={updateMode}
                  />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Dropdown
                    name="status"
                    label={intl.formatMessage({ id: 'status' })}
                    options={statusOptions}
                    disabled={
                      quotation && quotation.status === QuotationStatus.CONFIRM
                    }
                  />
                </Col>
              </Row>
            )}
            <TextInput
              name="remarks"
              rows={4}
              placeholder=" "
              disabled={
                quotation && quotation.status === QuotationStatus.CONFIRM
              }
              label={intl.formatMessage({ id: 'display_remarks' })}
            />
          </DetailInfoWrapper>
        </Card>
        <Card style={{ paddingBottom: 10, paddingTop: 10 }}>
          <QuotationProducts
            name="details"
            editMode={quotation && quotation.status !== QuotationStatus.CONFIRM}
            intl={intl}
            disabled={quotation && quotation.status === QuotationStatus.CONFIRM}
            formValueStatus={formValueStatus}
            workspaceType={currentWorkspaceType}
          />
        </Card>
      </LeftColWrapper>
      <RightColWrapper xs={12} md={4}>
        <Card style={{ marginTop: 0, minHeight: 147 }}>
          {!updateDefaultAddressloading ? (
            <QuotationAddressInput
              intl={intl}
              updateMode={updateMode}
              name="contactAddress"
              hiddenEditButton={
                quotation && quotation.status === QuotationStatus.CONFIRM
              }
              label={intl.formatMessage({ id: 'order_contact_display' })}
              formValueClient={formValueClient}
            />
          ) : (
            <ContentLoader
              width="100%"
              height={105}
              speed={1.5}
              primaryColor="#f3f3f3"
              secondaryColor="#ececec"
              style={{ width: '100%' }}
            >
              <rect x="0" y="0" rx="0.25" ry="0.25" width="100%" height="17" />
              <rect x="0" y="28" rx="0.25" ry="0.25" width="100%" height="17" />
              <rect x="0" y="56" rx="0.25" ry="0.25" width="100%" height="17" />
              <rect x="0" y="84" rx="0.25" ry="0.25" width="100%" height="17" />
            </ContentLoader>
          )}
          <QuotationAddressInput
            intl={intl}
            updateMode={updateMode}
            disabled={quotation && quotation.status === QuotationStatus.CONFIRM}
            name="billingContact"
            label={intl.formatMessage({ id: 'order_billing_contact_display' })}
            formValueClient={formValueClient}
            hiddenEditButton={
              quotation && quotation.status === QuotationStatus.CONFIRM
            }
            renderRight={
              !updateMode && (
                <Checkbox
                  checked={sameContactChecked}
                  labelIndent={5}
                  containerStyle={{ marginRight: 10 }}
                  onChange={setSameContactChecked}
                  label={intl.formatMessage({
                    id: 'order_same_contact_display'
                  })}
                />
              )
            }
          />
        </Card>
        <Card style={{ marginTop: 0, paddingLeft: 20 }}>
          <QuotationChargeServices
            name="services"
            intl={intl}
            updateMode={updateMode}
            formValueStatus={quotation && quotation.status}
          />
        </Card>
        <Card style={{ paddingBottom: 10, paddingTop: 10 }}>
          <QuotationChargeOthers
            name="charge.others"
            intl={intl}
            updateMode={updateMode}
            formValueStatus={quotation && quotation.status}
          />
        </Card>
        <Card>
          <QuotationCharge
            name="charge"
            form={form}
            intl={intl}
            formValueChange={formValueChange}
            updateMode={updateMode}
          />
          {renderButtons()}
        </Card>
      </RightColWrapper>
    </RowWrapper>
  )
  return (
    <Form
      name={form}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'nav.quotation' })}</Title>
        <Title.Right>
          {quotation && quotation.status === QuotationStatus.CONFIRM && (
            <Button.Success
              margin={false}
              type="button"
              disabled={values}
              onClick={async () =>
                confirm('msg.convert_order', async () => {
                  const contactModel = { ...formValueContact }
                  const billingModel = { ...formValueBilling }
                  delete contactModel._id
                  delete billingModel._id
                  const model = {
                    contactAddress: contactModel,
                    billingContact: billingModel
                  }

                  const { data } = await QuotationService.convertToOrder(
                    quotationId,
                    model
                  )

                  if (data) {
                    setValues(data._id)
                    window.open(`/orders/${data._id}`)
                  } else {
                    toast.error(<FormattedMessage id="updated_failure" />)
                  }
                })
              }
            >
              {intl.formatMessage({
                id: 'display_convert_order'
              })}
            </Button.Success>
          )}
        </Title.Right>
      </Title.Wrapper>
      {quotationForm}
    </Form>
  )
}

export default reduxForm({
  validate,
  asyncValidate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(QuotationForm)
