import React from 'react';

import { Wrapper, Item, ActionsItem } from '../../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'order_no_display' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_order_date' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_order_sold_to' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_order_sum' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_order_status' })}</Item>
      <ActionsItem>
        {intl.formatMessage({
          id: 'actions'
        })}
      </ActionsItem>
    </Wrapper>
  );
};
