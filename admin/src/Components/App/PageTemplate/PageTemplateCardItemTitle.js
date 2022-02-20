import React from 'react';
import styled from 'styled-components';

import {
  Wrapper as _Wrapper,
  Item as _Item,
  HiddenItem as _HiddenItem
} from './PageTemplateCardItem';

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
      <Item>{intl.formatMessage({ id: 'preview' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_page_status' })}</Item>
    </Wrapper>
  );
};
