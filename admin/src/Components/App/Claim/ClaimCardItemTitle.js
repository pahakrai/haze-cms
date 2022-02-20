import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_claim_no' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_expense_user' })}</Item>
      <Item>{intl.formatMessage({ id: 'date' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_expense_amount' })}</Item>
      <Item>{intl.formatMessage({ id: 'status' })}</Item>
    </Wrapper>
  );
};
