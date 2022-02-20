import React from 'react';
import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map';

import Label from '../../Common/Label';
import Card from '../../Common/Card';
import moment from 'moment';

const LabelField = styled(Label.Field)`
  height: 30px;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  border: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 1000px) {
    display: none;
  }
`;

export const Item = styled.div`
  font-size: ${props => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  cursor: pointer;
`;

export const HiddenItem = styled(Item)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;

export class WorkspaceSubscriptionInvoiceCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl } = this.props;
    if (!item) {
      return null;
    }
    const amount = item
      ? getSymbolFromCurrency(item.currency || 'HKD') + item.amount
      : '';
    const periodFr = item.periodFr
      ? moment(item.periodFr).format('YYYY-MM-DD')
      : '';
    const periodTo = item.periodTo
      ? moment(item.periodTo).format('YYYY-MM-DD')
      : '';
    return (
      <React.Fragment>
        <Wrapper>
          <Item>{item.invoiceNo}</Item>
          <Item>{periodFr}</Item>
          <Item>{periodTo}</Item>
          <Item>{item.amount}</Item>
        </Wrapper>

        <CardWrapper>
          <Label>
            <Item>
              {intl.formatMessage({ id: 'display_subscription_invoice_no' })}{' '}
            </Item>
          </Label>
          <LabelField rows={1}>{item.invoiceNo}</LabelField>

          <Label>
            {intl.formatMessage({
              id: 'display_user_schedule_permission_from'
            })}
          </Label>
          <LabelField rows={1}>{periodFr}</LabelField>
          <Label>
            {intl.formatMessage({ id: 'display_user_schedule_permission_to' })}
          </Label>
          <LabelField rows={1}>{periodTo}</LabelField>
          <Label>{intl.formatMessage({ id: 'amount' })}</Label>
          <LabelField rows={1}>{amount}</LabelField>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default WorkspaceSubscriptionInvoiceCardItem;
