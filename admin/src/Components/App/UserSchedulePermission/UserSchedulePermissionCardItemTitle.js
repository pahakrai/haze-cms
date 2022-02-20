import React from 'react';
import styled from 'styled-components';

import {
  Wrapper as _Wrapper,
  Item as _Item,
  ActionsItem as _ActionsItem,
  HiddenItem as _HiddenItem
} from './UserSchedulePermissionCardItem';

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
      <Item>
        {intl.formatMessage({
          id: 'display_user_schedule_permission_user'
        })}
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
      <HiddenItem>
        {intl.formatMessage({
          id: 'display_user_schedule_permission_status'
        })}
      </HiddenItem>
      <ActionsItem>
        {intl.formatMessage({
          id: 'confirm'
        })}
      </ActionsItem>
    </Wrapper>
  );
};
