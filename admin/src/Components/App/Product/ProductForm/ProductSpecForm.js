import React, { useCallback } from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'react-flexa'
import ObjectID from 'bson-objectid'
import Common from '@golpasal/common'

import Card from '../../../Common/Card'
import MultiLanguageTags, { ProductSpecEditModal } from './MultiLanguageTags'

import ProductSpecValuesForm from './ProductSpecValuesForm'

const { WorkspaceType } = Common.type
const productSpecNameControl = {
  set: (v, prevValue) => ({
    ...(prevValue || {}),
    _id:
      prevValue && prevValue._id ? prevValue._id : new ObjectID().toHexString(),
    name: v
  }),
  get: (v) => (v && v.name ? v.name : {})
}

const ProductSpecForm = ({
  intl,
  workspaceType,
  uploadSpecIcon,
  input: { value, onChange }
}) => {
  const getProductText = () => {
    let localKey =
      {
        [WorkspaceType.EDUCATION]: 'product_education_display',
        [WorkspaceType.SHOPPING]: 'product_shopping_display'
      }[workspaceType] || 'product_base_display'
    return intl.formatMessage({ id: localKey })
  }
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card.Title style={{ margin: 0 }}>
            {intl.formatMessage(
              { id: 'sth_spec_display' },
              { name: getProductText() }
            )}
          </Card.Title>
        </Col>
      </Row>
      <Card.Content
        style={{
          paddingBottom: 0,
          overflow: 'visible'
        }}
      >
        <MultiLanguageTags
          name="spec"
          placeholder={intl.formatMessage({
            id: 'product_add_spec_placeholder'
          })}
          modal={useCallback(
            (p) => (
              <ProductSpecEditModal uploadSpecIcon={uploadSpecIcon} {...p} />
            ),
            [uploadSpecIcon]
          )}
          // modal={ProductSpecEditModal}
          valueControl={productSpecNameControl}
        />
        <ProductSpecValuesForm
          name="spec"
          valueControl={productSpecNameControl}
        />
      </Card.Content>
    </React.Fragment>
  )
}

export default (props) => {
  return <Field component={ProductSpecForm} {...props} />
}
