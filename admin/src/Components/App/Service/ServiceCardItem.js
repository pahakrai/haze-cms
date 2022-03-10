import React from 'react'
import { helpers } from '@golpasal/common'
import getSymbolFromCurrency from 'currency-symbol-map'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Label from '../../Common/Label'
import Card from '../../Common/Card'
import hasIn from 'lodash/hasIn'
import { Button as AndButton } from 'antd'
import Modal from '../../../Components/Modal'

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

export const ActionsItem = styled(Item)`
  min-width: 94px;
`

export class TunnelCardItem extends React.PureComponent {
  render() {
    const { item, intl, serviceTypes, onClick } = this.props
    const category = hasIn(item, `category.name[${intl.locale}]`)
      ? item.category.name[intl.locale]
      : ''

    let showType
    if (serviceTypes.length > 0) {
      const data = serviceTypes.find((v) => v.type === item.type)
      showType = data ? data.name : ''
    }

    const unitObject = helpers.getConstantByValue(
      'unit',
      'ServiceUnit',
      item.unit,
      intl.locale
    )
    // const type = typeObject && typeObject.text ? typeObject.text : '';
    const unit = unitObject && unitObject.text ? unitObject.text : ''

    // const price = item?.pricingService?.pricing?.amount
    //   ? getSymbolFromCurrency(
    //       item?.pricingService?.pricing?.currency || 'HKD'
    //     ) + item?.pricingService?.pricing?.amount
    //   : '(N/A)'

    return (
      <React.Fragment>
        <Wrapper>
          <Item onClick={onClick}>{item.name[intl.locale]}</Item>
          <Item onClick={onClick}>{item.description[intl.locale]}</Item>
          <Item onClick={onClick}>{item.alias}</Item>
          <Item onClick={onClick}>{showType}</Item>
          <Item onClick={onClick}>{unit}</Item>
          <Item onClick={onClick}>{category}</Item>
          <Item onClick={onClick}>
            {item.isActive
              ? intl.formatMessage({ id: 'display_active' })
              : intl.formatMessage({ id: 'display_inactive' })}
          </Item>
        </Wrapper>
        <CardWrapper>
          <Link to={`/service/${item._id}`} target="_blank">
            <Label>{intl.formatMessage({ id: 'display_service_name' })} </Label>
            <LabelField rows={1}>{item.name[intl.locale]}</LabelField>

            <Label>
              {intl.formatMessage({ id: 'display_service_description' })}
            </Label>
            <LabelField rows={1}>{item.description[intl.locale]}</LabelField>

            <Label>{intl.formatMessage({ id: 'display_alias' })} </Label>
            <LabelField rows={1}>{item.alias}</LabelField>

            <Label>{intl.formatMessage({ id: 'display_service_type' })} </Label>
            <LabelField rows={1}>{showType}</LabelField>

            <Label>{intl.formatMessage({ id: 'display_service_unit' })} </Label>
            <LabelField rows={1}>{unit}</LabelField>
            <Label>{intl.formatMessage({ id: 'categories' })} </Label>
            <LabelField rows={1}>{category}</LabelField>
            <Label>{intl.formatMessage({ id: 'status' })} </Label>
            <LabelField rows={1}>
              {item.isActive
                ? intl.formatMessage({ id: 'display_active' })
                : intl.formatMessage({ id: 'display_inactive' })}
            </LabelField>
          </Link>
        </CardWrapper>
      </React.Fragment>
    )
  }
}

export default TunnelCardItem
