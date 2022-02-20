import React from 'react'
import { Row, Col } from 'react-flexa'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import Button from '../../../../../Common/Button'
import { TextInputNoField } from '../../../../../Form/TextInput'
import { Dropdown } from '../../../../../Form/Dropdown'

import { useSubmitHooks } from '../OrderAddressFormUtils'

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 40px 0 20px 0;
`

export const OrderAddressForm = ({
  values,
  onSubmit,
  onChangeValues,
  errors,
  intl
}) => {
  const { fields } = useSubmitHooks(values, intl)

  return (
    <Row>
      {fields.map(
        (
          {
            name,
            label,
            props: { select, loading, placeholder, grid, ...props } = {}
          },
          index
        ) => {
          const common = {
            key: index,
            label: <FormattedMessage id={label} />,
            intl,
            input: {
              value: values[name],
              onChange: (v) => {
                const newValues = { ...values, [name]: v }
                if (values.country !== newValues.country) {
                  newValues.state = ''
                  newValues.city = ''
                } else if (values.state !== newValues.state) {
                  newValues.city = ''
                }

                onChangeValues(newValues, name)
              }
            },
            meta: { error: errors[name], touched: true },
            placeholder: intl.formatMessage({ id: placeholder || label })
          }
          return (
            <Col xs={12} {...grid} key={index}>
              {!select ? (
                <TextInputNoField {...common} {...props} />
              ) : (
                <Dropdown {...common} disabled={loading} {...props} />
              )}
            </Col>
          )
        }
      )}
      <Col xs={12}>
        <ButtonWrapper>
          <Button.Primary type="button" onClick={onSubmit}>
            {intl.formatMessage({ id: 'save' })}
          </Button.Primary>
        </ButtonWrapper>
      </Col>
    </Row>
  )
}
