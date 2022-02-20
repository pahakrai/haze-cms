import styled from 'styled-components';

import {
  Wrapper as _Wrapper,
  Item as _Item,
  HiddenItem as _HiddenItem
} from './index.js';

export const Wrapper = styled(_Wrapper)`
  border: 1px solid rgba(227, 227, 230, 1);
  background-color: #eff3f6;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const Item = styled(_Item)`
  color: #333333;
  font-weight: 500;
  font-size: 16px;
`;
export const CheckboxItem = styled(_Item)`
  width: 30px;
  padding-left: 10px;
`;

export const HiddenItem = styled(_HiddenItem)`
  font-weight: bold;
`;

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;
