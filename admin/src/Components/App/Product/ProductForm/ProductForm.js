import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Common from '@golpasal/common'
import { Tabs } from 'antd'

import { isMultiLanguageProduct, strIsNumber } from '../../../../Lib/util'

import Button from '../../../Common/Button'
import Title from '../../../Common/Title'
import Errors from '../../../Form/Errors'
import Form from '../../../Form/Form'
import { validateMTField } from '../../../Form/MultiLanguageTextInput'

import { BaseTab, ImageTab, SkuTab, MediaTab, OtherTab } from './FormTabs/'

const { WorkspaceType } = Common.type

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

export const validate = (values) => {
  const errors = {}
  const required = <FormattedMessage id={'error.required'} />
  const gtezeroNumber = <FormattedMessage id={'error.number.gtezero'} />
  const nameError = validateMTField(values.name, isMultiLanguageProduct)
  const descriptionError = validateMTField(
    values.description,
    isMultiLanguageProduct
  )

  if (nameError) {
    errors.name = nameError
  }
  if (descriptionError) {
    errors.description = descriptionError
  }
  if (!values._category || values._category.length === 0) {
    errors._category = required
  }
  if (!values.platformTypes || values.platformTypes.length === 0) {
    errors.platformTypes = required
  }
  if (!values.spec || values.spec.length === 0) {
    errors.spec = required
  }
  if (!values.sku || values.sku.length === 0) {
    errors.sku = required
  }
  if (values.sku && values.sku.length > 0) {
    const skuErrors = []
    values.sku.forEach((v, i) => {
      const amount = v.amount + ''
      const discountAmount = v.discountAmount + ''
      const qty = v.qty + ''

      if (!strIsNumber(amount + '') || Number(amount) < 0) {
        skuErrors[i] = skuErrors[i] || {}
        skuErrors[i].amount = gtezeroNumber
      }

      if (discountAmount) {
        if (!strIsNumber(discountAmount + '') || Number(discountAmount) < 0) {
          skuErrors[i] = skuErrors[i] || {}
          skuErrors[i].discountAmount = gtezeroNumber
        } else if (
          (!skuErrors[i] || !skuErrors[i].amount) &&
          Number(discountAmount) > Number(amount)
        ) {
          skuErrors[i] = skuErrors[i] || {}
          skuErrors[i].discountAmount = (
            <FormattedMessage id={'error.product.discount_amount_lt_amount'} />
          )
        }
      }

      if (!qty || !strIsNumber(qty + '') || Number(qty) < 0) {
        skuErrors[i] = skuErrors[i] || {}
        skuErrors[i].qty = gtezeroNumber
      }
      if (v.idx === undefined) {
        skuErrors[i] = skuErrors[i] || {}
        skuErrors[i].idx = required
      }
      if (!v.code) {
        skuErrors[i] = skuErrors[i] || {}
        skuErrors[i].code = required
      }
      if (!v.currency) {
        skuErrors[i] = skuErrors[i] || {}
        skuErrors[i].currency = required
      }
    })
    if (skuErrors.length > 0) errors.sku = skuErrors
  }
  if (values.mediaList1 && values.mediaList1.length > 0) {
    const mediaList1Errors = []
    values.mediaList1.forEach((v, i) => {
      if (!v.image || (v.image && v.image.length <= 0)) {
        mediaList1Errors[i] = mediaList1Errors[i] || {}
        mediaList1Errors[i].image = required
      }
    })
    if (mediaList1Errors.length > 0) errors.mediaList1 = mediaList1Errors
  }
  if (values.mediaList2 && values.mediaList2.length > 0) {
    const mediaList2Errors = []
    values.mediaList2.forEach((v, i) => {
      if (!v.image || (v.image && v.image.length <= 0)) {
        mediaList2Errors[i] = mediaList2Errors[i] || {}
        mediaList2Errors[i].image = required
      }
    })
    if (mediaList2Errors.length > 0) errors.mediaList2 = mediaList2Errors
  }
  if (values.mediaList3 && values.mediaList3.length > 0) {
    const mediaList3Errors = []
    values.mediaList3.forEach((v, i) => {
      if (!v.image || (v.image && v.image.length <= 0)) {
        mediaList3Errors[i] = mediaList3Errors[i] || {}
        mediaList3Errors[i].image = required
      }
    })
    if (mediaList3Errors.length > 0) errors.mediaList3 = mediaList3Errors
  }

  if (
    values.productionDate &&
    values.productExpiryDate &&
    +new Date(values.productionDate) > +new Date(values.productExpiryDate)
  ) {
    errors.productionDate = (
      <FormattedMessage id={'display_coupon_start_time_gt_end_time'} />
    )
  }

  return errors
}

class ProductForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  }
  state = {
    activeKey: '1'
  }

  renderButtons() {
    const {
      intl,
      pristine,
      submitting,
      updateMode,
      touchAllField,
      formErrors
    } = this.props
    const onSubmit = () => {
      const { activeKey } = this.state
      touchAllField()
      if (formErrors) {
        const keys = Object.keys(formErrors)
        if (
          keys.some((v) => ['name', '_category', 'description'].includes(v))
        ) {
          activeKey !== '1' && this.setState({ activeKey: '1' })
        } else if (keys.some((v) => ['sku', 'spec'].includes(v))) {
          activeKey !== '3' && this.setState({ activeKey: '3' })
        } else if (keys.some((v) => ['platformTypes'].includes(v))) {
          activeKey !== '5' && this.setState({ activeKey: '5' })
        }
      }
    }

    if (updateMode) {
      return (
        <ButtonWrapper>
          <Button.Primary
            disabled={pristine || submitting}
            type="submit"
            onClick={onSubmit}
          >
            {intl.formatMessage({
              id: 'update_btn'
            })}
          </Button.Primary>
        </ButtonWrapper>
      )
    }
    return (
      <ButtonWrapper>
        <Button.Primary disabled={submitting} type="submit" onClick={onSubmit}>
          {intl.formatMessage({
            id: 'create_btn'
          })}
        </Button.Primary>
      </ButtonWrapper>
    )
  }

  getProductTile = () => {
    const { workspaceType, intl } = this.props
    let localKey =
      {
        [WorkspaceType.EDUCATION]: 'product_education_display',
        [WorkspaceType.SHOPPING]: 'product_shopping_display'
      }[workspaceType] || 'product_base_display'
    return intl.formatMessage({ id: localKey })
  }
  render() {
    const {
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true,
      workspaceType,
      productId,
      updateMode,
      productTypes,
      formValuePlaceOfOrigin,
      uploadSpecIcon
    } = this.props

    const skuTab = (
      <SkuTab
        intl={intl}
        workspaceType={workspaceType}
        uploadSpecIcon={uploadSpecIcon}
      />
    )
    const mediaTab = <MediaTab intl={intl} workspaceType={workspaceType} />

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
          tab={intl.formatMessage(
            { id: 'sth_info_display' },
            { name: this.getProductTile() }
          )}
          key="1"
        >
          <FormContent>
            <BaseTab
              intl={intl}
              updateMode={updateMode}
              productTypes={productTypes}
              productId={productId}
              workspaceType={workspaceType}
              formValuePlaceOfOrigin={formValuePlaceOfOrigin}
            />
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage(
            { id: 'sth_image_display' },
            { name: this.getProductTile() }
          )}
          key="2"
        >
          <FormContent>
            <ImageTab intl={intl} />
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage(
            { id: 'sth_detail_display' },
            { name: this.getProductTile() }
          )}
          key="3"
        >
          <FormContent>{skuTab}</FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane tab={intl.formatMessage({ id: 'display_media' })} key="4">
          <FormContent>{mediaTab}</FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane tab={intl.formatMessage({ id: 'other' })} key="5">
          <FormContent>
            <OtherTab
              intl={intl}
              workspaceType={workspaceType}
              formValuePlaceOfOrigin={formValuePlaceOfOrigin}
            />
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
          <Title>{this.getProductTile()}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
          <div style={{ visibility: 'hidden', height: 0, overflow: 'hidden' }}>
            {skuTab}
            {mediaTab}
          </div>
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
  initialValues: {}
})(ProductForm)
