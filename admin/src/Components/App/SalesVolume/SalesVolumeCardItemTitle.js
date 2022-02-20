import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_month' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_sales_target_amount' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_sales_reached_amount' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_sales_rate' })} </Item>
    </Wrapper>
  );
};
