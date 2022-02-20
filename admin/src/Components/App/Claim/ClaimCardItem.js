import React, { useCallback } from 'react';
import moment from 'moment';
import { helpers } from '@golpasal/common';

import styled from 'styled-components';
import Label from '../../Common/Label';
import Card from '../../Common/Card';

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
  @media (max-width: 700px) {
    display: none;
  }
`;

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 700px) {
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

export const ClaimCardItem = ({ item = {}, intl, onClick: _onClick }) => {
  const onClick = useCallback(() => {
    _onClick && _onClick(item);
  }, [_onClick, item]);

  if (!item) {
    return null;
  }

  const status = helpers.getConstantByValue(
    'status',
    'ClaimStatus',
    item.status,
    intl.locale
  );
  const payeeName = item.payee && item.payee.name;
  const amount = `${item.currency} ` + helpers.formatMoney(item.amount);
  const date = item.date ? moment(item.date).format('YYYY-MM-DD') : '-';

  return (
    <React.Fragment>
      <Wrapper>
        <Item onClick={onClick}>{item.claimNo}</Item>
        <Item onClick={onClick}>{payeeName}</Item>
        <Item onClick={onClick}>{date}</Item>
        <Item onClick={onClick}>{amount}</Item>
        <Item onClick={onClick}>{!status ? '-' : status.text}</Item>
      </Wrapper>
      <CardWrapper>
        <Label>{intl.formatMessage({ id: 'display_claim_no' })}</Label>
        <LabelField rows={1}>{item.claimNo}</LabelField>
        <Label>{intl.formatMessage({ id: 'display_expense_user' })}</Label>
        <LabelField rows={1}>{payeeName}</LabelField>
        <Label>{intl.formatMessage({ id: 'date' })}</Label>
        <LabelField rows={1}>{date}</LabelField>
        <Label>{intl.formatMessage({ id: 'display_expense_amount' })}</Label>
        <LabelField rows={1}>{amount}</LabelField>
        <Label>{intl.formatMessage({ id: 'status' })}</Label>
        <LabelField rows={1}>{!status ? '-' : status.text}</LabelField>
      </CardWrapper>
    </React.Fragment>
  );
};

export default ClaimCardItem;
