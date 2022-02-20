import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'react-flexa'
import Common from '@golpasal/common'

import Card from '../../../Common/Card'
import Dropdown from '../../../Form/Dropdown'
import FormTextInput from '../../../Form/TextInput'
import DatePicker from '../../../Form/DatePicker'
import { FieldLabel } from '../../../Form/form.styled'

import CurrencyDropdowm from '../../../../Containers/Form/CurrencyDropdowm'

import ProductSkuImageInput from './ProductSkuImageInput'

const { WorkspaceType } = Common.type
const IDX_OPTIONS = Array(99)
  .fill('')
  .map((v, i) => ({ label: i + 1, value: i + 1 }))
const TextInput = (() => {
  const inputProps = { style: { minWidth: 50 } }
  return (props) => <FormTextInput {...props} inputProps={inputProps} />
})()

class ProductSkuForm extends PureComponent {
  formatSpecTitles = () => {
    const {
      productSpecInput: { value: productSpecInputValue },
      input: { value: items },
      intl
    } = this.props
    const haveSpec = (id) =>
      items.find((v) => v && v.specs && v.specs.find((v) => v.spec === id))
    return Array.isArray(productSpecInputValue)
      ? productSpecInputValue
          .filter((v) => v && v.name && v.name[intl.locale] && haveSpec(v._id))
          .map((v) => v.name[intl.locale])
      : []
  }

  formatSpecValueName = (id) => {
    const {
      productSpecInput: { value: productSpecInputValue },
      intl
    } = this.props
    let name = '-'
    let title = '-'
    if (Array.isArray(productSpecInputValue)) {
      for (let i = 0; i < productSpecInputValue.length; i++) {
        const item = productSpecInputValue[i]
        const value =
          item && item.values && item.values.find
            ? item.values.find((v) => v._id === id)
            : null
        if (value) {
          name =
            value.name && value.name[intl.locale]
              ? value.name[intl.locale]
              : '-'
          title = item.name[intl.locale]
          break
        }
      }
    }
    return {
      title,
      name
    }
  }

  renderSpecs = (item) => {
    const {
      productSpecInput: { value: productSpecInputValue }
    } = this.props
    return Array.isArray(productSpecInputValue)
      ? productSpecInputValue
          .map((productSpec) => {
            const v = Array.isArray(item.specs)
              ? item.specs.find((_v) => _v.spec === productSpec._id)
              : null
            if (v) {
              const res = this.formatSpecValueName(v.value)
              return `${res.title}: ${res.name} `
            }
            return ''
          })
          .filter((v) => v)
          .join('、')
      : null
  }
  getProductText = () => {
    const { workspaceType, intl } = this.props
    let localKey =
      {
        [WorkspaceType.EDUCATION]: 'product_education_display',
        [WorkspaceType.SHOPPING]: 'product_shopping_display'
      }[workspaceType] || 'product_base_display'
    return intl.formatMessage({ id: localKey })
  }

  getEventText = () => {
    const { workspaceType, intl } = this.props
    const localKey =
      {
        [WorkspaceType.EDUCATION]: 'event_education_display'
      }[workspaceType] || 'event_campaign_base_display'
    return intl.formatMessage({ id: localKey })
  }
  render() {
    const {
      intl,
      input: { value: items, name }
    } = this.props

    return (
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card.Title style={{ margin: 0 }}>
              {intl.formatMessage(
                { id: 'sth_detail_display' },
                { name: this.getProductText() }
              )}
            </Card.Title>
          </Col>
        </Row>

        {Array.isArray(items)
          ? items.map((v, index) => {
              return (
                <Card.Content
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    overflow: 'visible',
                    marginTop: 20
                  }}
                  key={index}
                >
                  <Content
                    intl={intl}
                    getProductText={this.getProductText()}
                    getEventText={this.getEventText()}
                    name={`${name}[${index}]`}
                    specTitles={this.formatSpecTitles()}
                    renderSpecs={this.renderSpecs(v)}
                  />
                </Card.Content>
              )
            })
          : null}
      </React.Fragment>
    )
  }
}

const Content = ({
  intl,
  getProductText,
  getEventText,
  name,
  specTitles,
  renderSpecs
}) => {
  return (
    <div style={{ borderBottom: '1px solid #e6e6e6' }}>
      <Row>
        <Col xs={6} sm={6} md={3} lg={3}>
          <ProductSkuImageInput name={`${name}.image`} />
        </Col>

        <Col xs={6} sm={6} md={9} lg={9}>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <TextInput
                name={`${name}.code`}
                label={intl.formatMessage(
                  { id: 'product_sku_sth_code_display' },
                  { name: getProductText }
                )}
              />
            </Col>
            <Col xs={12} sm={12} md={8} lg={8}>
              <FieldLabel>
                {intl.formatMessage(
                  { id: 'sth_spec_display' },
                  { name: getProductText }
                )}
              </FieldLabel>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  padding: '6px 10px',
                  lineHeight: '30px'
                }}
              >
                {renderSpecs}
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={4} lg={4}>
              <CurrencyDropdowm
                name={`${name}.currency`}
                label={intl.formatMessage({ id: 'currency' })}
              />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <TextInput
                name={`${name}.amount`}
                label={intl.formatMessage({ id: 'product_sku_amount_display' })}
              />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <TextInput
                fieldName={name}
                name={`${name}.discountAmount`}
                label={intl.formatMessage({
                  id: 'product_sku_discount_amount_display'
                })}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={4} lg={4}>
              <TextInput
                name={`${name}.qty`}
                label={intl.formatMessage({ id: 'product_sku_qty_display' })}
              />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <DatePicker
                name={`${name}.expiryDate`}
                label={intl.formatMessage({
                  id: 'product_sku_expiryDate_display'
                })}
              />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <Dropdown
                name={`${name}.idx`}
                options={IDX_OPTIONS}
                label={intl.formatMessage({ id: 'idx' })}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={4} lg={4}>
              <Dropdown
                name={`${name}.validateInventory`}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'display_yes'
                    }),
                    value: true
                  },
                  {
                    label: intl.formatMessage({
                      id: 'display_no'
                    }),
                    value: false
                  }
                ]}
                label={intl.formatMessage({
                  id: 'product_sku_validate_inventory_display'
                })}
              />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <Dropdown
                name={`${name}.isQuote`}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'display_yes'
                    }),
                    value: true
                  },
                  {
                    label: intl.formatMessage({
                      id: 'display_no'
                    }),
                    value: false
                  }
                ]}
                label={intl.formatMessage({
                  id: 'display_is_quote'
                })}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const ProductSkuFormField = ({ input, skuFieldName, ...props }) => {
  return (
    <Field
      productSpecInput={input}
      component={ProductSkuForm}
      {...props}
      name={skuFieldName}
    />
  )
}

export default (props) => {
  return (
    <Field
      component={ProductSkuFormField}
      {...props}
      name="spec"
      skuFieldName={props.name}
    />
  )
}
