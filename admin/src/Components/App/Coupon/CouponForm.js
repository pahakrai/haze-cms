import React from 'react'
import { reduxForm } from 'redux-form'
// import { reduxForm, formValueSelector } from 'redux-form';
import styled from 'styled-components'
import * as Common from '@golpasal/common'
import EcommCommonType from '@golpasal/common'
// import moment from 'moment';
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-flexa'
import { Tabs } from 'antd'
import Title from '../../Common/Title'
import Card from '../../Common/Card'
import Button from '../../Common/Button'
import Errors from '../../Form/Errors'
import Error from '../../Form/Error'
import Form from '../../Form/Form'
import Dropdown from '../../Form/Dropdown'
import TextInput from '../../Form/TextInput'
import DatePicker from '../../Form/DatePicker'
import Uploader from '../../Form/Uploader'
import Checkbox from '../../Form/Checkbox'
import CouponService from '../../../Services/APIServices/CouponService'
// import ProductsList from './ProductsList';
import DetailList from './Components/DetailList'
import SelectProducts from './Components/SelectProducts'
const { WorkspaceType, LogicGateType } = EcommCommonType.type

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`

const validate = (
  values,
  { formValueType, formValuePaymentMethodLogic, formValueProductsLogic }
) => {
  const errors = {
    criteria: {
      amount: null,
      paymentMethods: null,
      products: null
    },
    effect: {
      amount: null,
      type: null
    },
    expireAt: null,
    startAt: null
  }
  const criteria = values.criteria || {}
  const effect = values.effect || {}
  if (!values.code) {
    errors.code = <FormattedMessage id={'error.required'} />
  }
  if (!values.perNumber) {
    errors.perNumber = <FormattedMessage id={'error.required'} />
  }
  if (
    values.noOfCoupon &&
    values.noOfCoupon !== undefined &&
    (!/^[0-9]+$/.test(values.noOfCoupon + '') || Number(values.noOfCoupon) <= 0)
  ) {
    errors.noOfCoupon = <FormattedMessage id={'error.number.gtzero'} />
  }
  if (!values.title) {
    errors.title = <FormattedMessage id={'error.required'} />
  }
  if (!values.currency) {
    errors.currency = <FormattedMessage id={'error.required'} />
  }
  if (!values.redeemLimitPerUser) {
    errors.redeemLimitPerUser = <FormattedMessage id={'error.required'} />
  }
  if (!values.noOfCoupon) {
    errors.noOfCoupon = <FormattedMessage id={'error.required'} />
  }
  if (Number(values.redeemLimitPerUser) > Number(values.noOfCoupon)) {
    errors.redeemLimitPerUser = <FormattedMessage id={'error.number.small'} />
  }

  // discount

  if (formValueType === EcommCommonType.type.OrderCreditAmountType.PERCENT) {
    if (Number(effect.amount) > 1) {
      errors.effect.amount = (
        <FormattedMessage id={'error.number.gtzero_less'} />
      )
    }
  }
  if (!effect.type) {
    errors.effect.type = <FormattedMessage id={'error.required'} />
  }
  if (
    Number(effect.amount) > Number(criteria.amount) &&
    formValueType === EcommCommonType.type.OrderCreditAmountType.FIXED
  ) {
    errors.effect.amount = <FormattedMessage id={'error.number.small'} />
  }

  if (!criteria.paymentMethodsLogicGate) {
    errors.criteria.paymentMethodsLogicGate = (
      <FormattedMessage id={'error.required'} />
    )
  }

  if (!criteria.productsLogicGate) {
    errors.criteria.productsLogicGate = (
      <FormattedMessage id={'error.required'} />
    )
  }

  if (formValuePaymentMethodLogic !== LogicGateType.ANY) {
    if (!criteria.paymentMethods || !criteria.paymentMethods.length) {
      errors.criteria.paymentMethods = (
        <FormattedMessage id={'error.required'} />
      )
    }
  }

  if (!criteria.products || !criteria.products.length) {
    if (formValueProductsLogic !== LogicGateType.ANY)
      errors.criteria.products = <FormattedMessage id={'error.required'} />
  }

  if (
    values.expireAt &&
    values.startAt &&
    +new Date(values.startAt) > +new Date(values.expireAt)
  ) {
    errors.startAt = (
      <FormattedMessage id={'display_coupon_start_time_gt_end_time'} />
    )
  }

  return errors
}

const asyncValidate = async (values) => {
  // const isUpdateForm = values._id ? false : true;
  const result = await CouponService.duplicateCode(values.code, values._id)
  if (String(result.data) === 'true') {
    throw Object({ code: 'Code has been used!' })
  }
}
class CouponForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: '1'
    }
  }

  renderButtons() {
    const {
      intl,
      pristine,
      submitting,
      updateMode,
      onCloseButtonClick = () => {}
    } = this.props

    if (updateMode) {
      return (
        <ButtonWrapper>
          <Button.Primary disabled={pristine || submitting} type="submit">
            {intl.formatMessage({
              id: 'update_btn'
            })}
          </Button.Primary>
          <Button.Primary
            type="button"
            style={{ marginLeft: 20 }}
            onClick={onCloseButtonClick}
          >
            {intl.formatMessage({
              id: 'close'
            })}
          </Button.Primary>
        </ButtonWrapper>
      )
    }
    return (
      <ButtonWrapper>
        <Button.Primary disabled={submitting} type="submit">
          {intl.formatMessage({
            id: 'create_btn'
          })}
        </Button.Primary>
      </ButtonWrapper>
    )
  }

  render() {
    const {
      // coupon,
      currencies,
      // workspaces,
      // locale,
      onSubmit,
      // form,
      // initialValues,
      onSubmitSuccess,
      // invalid,
      // submitting,
      // pristine,
      // currentUser,
      paymentMethods,
      onSubmitFail = () => true,
      currentWorkspaceType,
      initialValues,
      // products,
      formValueType,
      formValueProductsLogic,
      formValuePaymentMethodLogic,
      updateMode,
      intl,
      formValueDetail
    } = this.props

    const CurrenciesOption = []
    if (currencies) {
      currencies.forEach((currency) => {
        CurrenciesOption.push({
          label: currency.code,
          value: currency.code
        })
      })
    }
    const paymentMethodOptions = []
    if (paymentMethods) {
      paymentMethods.forEach((v) => {
        paymentMethodOptions.push({
          value: v.code,
          label: v.name && v.name[intl.locale] ? v.name[intl.locale] : ''
        })
      })
    }

    const typeOptions = Common.helpers
      .getConstants('type', 'OrderCreditAmountType', intl.locale)
      .map((type) => ({
        label: type.text,
        value: type.value
      }))
    const paymentMethodsLogicGate = Common.helpers
      .getConstants('type', 'LogicGateType', intl.locale)
      .map((type) => ({
        label: type.text,
        value: type.value
      }))
    const orderCreditTypeOptions = Common.helpers
      .getConstants('type', 'OrderCreditType', intl.locale)
      .map((type) => ({
        label: type.text,
        value: type.value
      }))
    const ProductList = (
      <div>
        <SelectProducts
          intl={intl}
          name="criteria.products"
          currentWorkspaceType={currentWorkspaceType}
          updateMode={updateMode}
          initialValues={initialValues}
          formValueDetail={formValueDetail}
        />
        <DetailList
          intl={intl}
          name="criteria.products"
          formValueDetail={formValueDetail}
        />
      </div>
    )

    const inputConent = (
      <Tabs
        type="card"
        activeKey={this.state.activeKey}
        onChange={(key) => this.setState({ activeKey: key })}
        tabBarStyle={{ marginBottom: 0 }}
        style={{
          overflow: 'visible'
        }}
      >
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_category_base' })}
          key="1"
        >
          <FormContent>
            <>
              <Card.Title style={{ margin: 0 }}>
                {`${intl.formatMessage({
                  id: 'tab_category_base'
                })}`}
              </Card.Title>
            </>
            <br />
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  name="code"
                  label={intl.formatMessage({
                    id: 'display_coupon_code'
                  })}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Checkbox
                  name="isActive"
                  label={intl.formatMessage({
                    id: 'display_pushnotificationschedule_isActive'
                  })}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  name="title"
                  label={intl.formatMessage({
                    id: 'display_coupon_name'
                  })}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  name="currency"
                  label={intl.formatMessage({ id: 'currency' })}
                  options={CurrenciesOption}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <DatePicker
                  label={intl.formatMessage({
                    id: 'display_coupon_applicationTime'
                  })}
                  name="startAt"
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <DatePicker
                  label={intl.formatMessage({ id: 'display_coupon_deadline' })}
                  name="expireAt"
                />
              </Col>
            </Row>
            <TextInput
              name="description"
              label={intl.formatMessage({ id: 'display_coupon_description' })}
              rows={4}
            />

            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Uploader
                  multiple
                  label={intl.formatMessage({ id: 'display_coupon_images' })}
                  fileMaxSize={1050000}
                  intl={intl}
                  name="images"
                  displayFileMetas={false}
                />
              </Col>
            </Row>
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'display_condition' })}
          key="2"
        >
          <FormContent>
            <>
              <Card.Title style={{ margin: 0 }}>
                {`${intl.formatMessage({
                  id: 'display_condition'
                })}`}
              </Card.Title>
            </>
            <br />
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  name="criteria.paymentMethodsLogicGate"
                  label={intl.formatMessage({
                    id: 'display_coupon_payment_method_logic'
                  })}
                  options={paymentMethodsLogicGate}
                />
              </Col>
              {formValuePaymentMethodLogic !== LogicGateType.ANY && (
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Dropdown
                    isMulti
                    name="criteria.paymentMethods"
                    label={intl.formatMessage({
                      id: 'payment_method_display'
                    })}
                    options={paymentMethodOptions}
                  />
                </Col>
              )}
            </Row>

            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  type="number"
                  name="noOfCoupon"
                  label={`${intl.formatMessage({
                    id: 'display_coupon_count'
                  })}`}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  type="number"
                  name="redeemLimitPerUser"
                  label={`${intl.formatMessage({
                    id: 'display_coupon_perUserRedeemLimit'
                  })}`}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  name="criteria.productsLogicGate"
                  label={
                    currentWorkspaceType === WorkspaceType.EDUCATION
                      ? intl.formatMessage({
                          id: 'display_coupon_product_education'
                        })
                      : intl.formatMessage({
                          id: 'display_coupon_product_defualt'
                        })
                  }
                  options={paymentMethodsLogicGate}
                />
              </Col>
              {formValueProductsLogic !== LogicGateType.ANY && (
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Dropdown
                    name="effect.creditType"
                    label={intl.formatMessage({
                      id: 'display_creditType'
                    })}
                    options={orderCreditTypeOptions}
                  />
                </Col>
              )}
            </Row>

            {formValueProductsLogic !== LogicGateType.ANY && ProductList}
            <Error touched name="criteria.products" style={{ marginTop: 10 }} />
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'display_discount_value' })}
          key="3"
        >
          <FormContent>
            <>
              <Card.Title style={{ margin: 0 }}>
                {`${intl.formatMessage({
                  id: 'display_discount_value'
                })}`}
              </Card.Title>
            </>
            <br />
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  name="effect.type"
                  label={intl.formatMessage({
                    id: 'display_coupon_type'
                  })}
                  options={typeOptions}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  type="number"
                  name="criteria.amount"
                  label={intl.formatMessage({
                    id: 'display_full'
                  })}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  type="number"
                  name="effect.amount"
                  label={
                    formValueType ===
                    EcommCommonType.type.OrderCreditAmountType.FIXED
                      ? intl.formatMessage({
                          id: 'display_cut'
                        })
                      : intl.formatMessage({
                          id: 'display_discount'
                        })
                  }
                />
              </Col>
            </Row>
          </FormContent>
        </Tabs.TabPane>
      </Tabs>
    )

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.coupons' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        {inputConent}
      </Form>
    )
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {},
  asyncValidate,
  asyncBlurFields: ['code']
})(CouponForm)
