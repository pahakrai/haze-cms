import React from 'react'
import styled from 'styled-components'
// import moment from 'moment';
// import Common from '@golpasal/common';
import AddDeleteButton from '../../../Common/AddDeleteButton'

import Label from '../../../Common/Label'

import Card from '../../../Common/Card'

const LabelField = styled(Label.Field)`
  height: 30px;
`
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  border: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
  @media (max-width: 700px) {
    display: none;
  }
`

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`

export const Item = styled.div`
  font-size: ${(props) => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  cursor: pointer;
`

export const HiddenItem = styled(Item)`
  @media (max-width: ${(props) => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`

export class ProductsCardItem extends React.PureComponent {
  render() {
    const {
      item = {},
      intl,
      onClick,
      _deleteProduct
      // payrollStatus
    } = this.props

    if (!item) {
      return null
    }
    return (
      <React.Fragment>
        <Wrapper>
          <Item onClick={onClick}>{item.name[intl.locale]}</Item>
          <Item>
            <AddDeleteButton
              full
              type="button"
              style={{ margin: '0 auto' }}
              onClick={() => _deleteProduct(item._id)}
            >
              x
            </AddDeleteButton>
          </Item>
        </Wrapper>
        <CardWrapper>
          <Label>
            {intl.formatMessage({ id: 'display_payroll_event_operating' })}
          </Label>
          <LabelField onClick={() => _deleteProduct(item._id)} rows={1}>
            <AddDeleteButton
              full
              type="button"
              style={{ margin: '0 auto' }}
              onClick={() => _deleteProduct(item._id)}
              // disabled={claimStatus !== 0}
            >
              x
            </AddDeleteButton>
          </LabelField>
        </CardWrapper>
      </React.Fragment>
    )
  }
}

export default ProductsCardItem
