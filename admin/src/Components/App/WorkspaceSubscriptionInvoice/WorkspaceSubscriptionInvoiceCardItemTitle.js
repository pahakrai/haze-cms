import React from 'react';
import styled from 'styled-components';

import { Wrapper, Item } from '../ListCard/title';

export const WrapperTitle = styled(Wrapper)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

export default ({ intl }) => {
  return (
    <WrapperTitle>
      <Item>
        {intl.formatMessage({ id: 'display_subscription_invoice_no' })}{' '}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_user_schedule_permission_from'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_user_schedule_permission_to'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'amount'
        })}
      </Item>
    </WrapperTitle>
  );
};
