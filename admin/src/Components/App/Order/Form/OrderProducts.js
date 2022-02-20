import React, { useCallback, Fragment, useMemo } from 'react'
import { Field } from 'redux-form'
import { List } from 'antd'
import styled from 'styled-components'
import Common from '@golpasal/common'

import Error from '../../../../Components/Form/Error'
import { FieldLabel } from '../../../../Components/Form/form.styled'

import Button from '../../../../Components/Common/Button'

import OrderProductInput from './OrderProductInput'
import { ProductItem, ProductActions, Hr } from './OrderProducts.styled'

const { WorkspaceType } = Common.type

export const ListFooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const OrderProductsField = ({
  input,
  intl,
  workspaceType,
  editMode = true,
  form,
  isQuotation,
  formValueStatus
}) => {
  const options = useMemo(
    () => (input.value && input.value.length > 0 ? input.value : []),
    [input.value]
  )

  const getProductText = useCallback(() => {
    let localKey =
      {
        [WorkspaceType.EDUCATION]: 'product_education_display'
      }[workspaceType] || 'product_base_display'
    return intl.formatMessage({ id: localKey })
  }, [intl, workspaceType])

  const onAdd = useCallback(() => {
    input.onChange([...options, { qty: 1 }])
  }, [options, input])
  const onDelete = useCallback(
    (index) => {
      input.onChange(options.filter((v, i) => i !== index))
    },
    [options, input]
  )
  const renderItem = useCallback(
    (item, index) => {
      const lastItem = options.length - 1 === index && editMode

      return (
        <Fragment key={index}>
          <ProductItem style={{ marginBottom: lastItem ? 7 : 14 }}>
            <OrderProductInput
              intl={intl}
              data={item}
              name={`${input.name}[${index}]`}
              editMode={editMode}
              onChange={(data) => {
                const newValues = [...options]
                newValues[index] = {
                  ...(options[index] || {}),
                  ...data
                }
                input.onChange(newValues)
              }}
              productText={getProductText()}
              isQuotation={isQuotation}
              formValueStatus={formValueStatus}
            />
            {editMode && (
              <ProductActions>
                <Button.Danger
                  style={{
                    height: 42,
                    minWidth: 50,
                    fontSize: 14,
                    lineHeight: '40px',
                    margin: 0,
                    padding: 0,
                    marginLeft: 10
                  }}
                  type="button"
                  onClick={() => onDelete(index)}
                >
                  x
                </Button.Danger>
              </ProductActions>
            )}
          </ProductItem>
          {lastItem && <Hr style={{ marginBottom: 7 }} />}
        </Fragment>
      )
    },
    [
      options,
      editMode,
      intl,
      input,
      getProductText,
      onDelete,
      formValueStatus,
      isQuotation
    ]
  )

  return (
    <Fragment>
      <FieldLabel>{getProductText()}</FieldLabel>
      {options && options.length > 0 && (
        <List dataSource={options} renderItem={renderItem} />
      )}
      <ListFooterWrapper>
        <div>
          <Error name={input.name} touched />
        </div>
        {editMode && (
          <Button
            style={{
              minWidth: 50,
              height: 42,
              alignSelf: 'flex-end'
            }}
            type="button"
            onClick={onAdd}
          >
            +
          </Button>
        )}
      </ListFooterWrapper>
    </Fragment>
  )
}

export default (props) => {
  return <Field {...props} component={OrderProductsField} />
}
