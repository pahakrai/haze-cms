import React from 'react';
import styled from 'styled-components';
import {
  Wrapper,
  Item,
  ActionsItem as _ActionsItem
} from '../../ListCard/title';

export const ActionsItem = styled(_ActionsItem)`
  font-weight: bold;
`;

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
