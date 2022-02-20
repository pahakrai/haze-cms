import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl, hasPricing }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_service_name' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_service_description' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_alias' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_service_type' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_service_unit' })} </Item>
      <Item>{intl.formatMessage({ id: 'categories' })} </Item>
      {hasPricing && (
        <Item>{intl.formatMessage({ id: 'display_cart_price' })} </Item>
      )}
      <Item>{intl.formatMessage({ id: 'status' })} </Item>
      {hasPricing && <Item>{intl.formatMessage({ id: 'actions' })} </Item>}
    </Wrapper>
  );
};
