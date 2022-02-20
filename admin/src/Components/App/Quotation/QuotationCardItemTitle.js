import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_quotationNo' })}</Item>
      <Item>{intl.formatMessage({ id: 'date' })}</Item>
      <Item>{intl.formatMessage({ id: 'amount' })}</Item>
      <Item>{intl.formatMessage({ id: 'status' })}</Item>
    </Wrapper>
  );
};
