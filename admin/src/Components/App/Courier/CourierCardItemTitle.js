import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_workspace_code' })} </Item>
      <Item>{intl.formatMessage({ id: 'display_name' })} </Item>
      <Item>{intl.formatMessage({ id: 'idx' })} </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_pushnotificationschedule_isActive'
        })}
      </Item>
    </Wrapper>
  );
};
