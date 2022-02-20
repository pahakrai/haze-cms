import React from 'react';
import styled from 'styled-components';

import {
  Wrapper as _Wrapper,
  Item as _Item,
  HiddenItem as _HiddenItem
} from './ProductsCardItem';

export const Wrapper = styled(_Wrapper)`
  border: 1px solid rgba(255, 255, 255, 0);
  @media (max-width: 700px) {
    display: none;
  }
`;
export const Item = styled(_Item)`
  font-weight: bold;
`;

export const HiddenItem = styled(_HiddenItem)`
  font-weight: bold;
`;

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_payroll_event_name' })}</Item>
      {/* <Item>
        {intl.formatMessage({ id: 'display_payroll_timeFr_display' })}
      </Item>
      <Item>
        {intl.formatMessage({ id: 'display_payroll_timeTo_display' })}
      </Item> */}
      <Item>
        {intl.formatMessage({ id: 'display_payroll_event_operating' })}
      </Item>
    </Wrapper>
  );
};
