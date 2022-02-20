import React from 'react';
import styled from 'styled-components';

import { Wrapper, Item, ActionsItem } from '../ListCard/title';

export const WrapperTitle = styled(Wrapper)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

export default ({ intl }) => {
  return (
    <WrapperTitle>
      <Item>
        {intl.formatMessage({
          id: 'display_url'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'payment_method_display'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_platform'
        })}
      </Item>
      <ActionsItem>
        {intl.formatMessage({
          id: 'actions'
        })}
      </ActionsItem>
    </WrapperTitle>
  );
};
