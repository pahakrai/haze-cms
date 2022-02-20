import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_name' })}</Item>
      <Item>{intl.formatMessage({ id: 'categories' })}</Item>
      <Item>{intl.formatMessage({ id: 'product_sku_amount_display' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_platform_types' })}</Item>
      <Item>{intl.formatMessage({ id: 'status' })}</Item>
    </Wrapper>
  );
};
