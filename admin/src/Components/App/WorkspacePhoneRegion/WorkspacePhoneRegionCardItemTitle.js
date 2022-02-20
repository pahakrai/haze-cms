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
      <Item>{intl.formatMessage({ id: 'idx' })} </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_user_phone_region_code'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'actions'
        })}
      </Item>
    </WrapperTitle>
  );
};
