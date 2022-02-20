import React from 'react';
import styled from 'styled-components';

import {
  Wrapper as _Wrapper,
  Item as _Item,
  ActionsItem as _ActionsItem,
  HiddenItem as _HiddenItem
} from './UserGroupCardItem';

export const Wrapper = styled(_Wrapper)`
  border: 1px solid rgba(255, 255, 255, 0);
`;
export const Item = styled(_Item)`
  font-weight: bold;
`;
export const ActionsItem = styled(_ActionsItem)`
  font-weight: bold;
`;
export const HiddenItem = styled(_HiddenItem)`
  font-weight: bold;
`;

export default ({ intl }) => {
  return (
    <Wrapper>
      {/* <Item>
        {intl.formatMessage({
          id: 'display_userGroup_code'
        })}
      </Item> */}
      <Item>
        {intl.formatMessage({
          id: 'display_userGroup_name'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_userGroup_userCount'
        })}
      </Item>
      {/* <Item>
        {intl.formatMessage({
          id: 'display_userGroup_isActive'
        })}
      </Item> */}
      <HiddenItem>
        {intl.formatMessage({
          id: 'display_userGroup_createdAt'
        })}
      </HiddenItem>
      <ActionsItem>
        {intl.formatMessage({
          id: 'actions'
        })}
      </ActionsItem>
    </Wrapper>
  );
};
