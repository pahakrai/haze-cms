import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'device.name' })} </Item>
      <Item>{intl.formatMessage({ id: 'device.type' })} </Item>
      <Item>{intl.formatMessage({ id: 'device.create_time' })} </Item>
      <Item>{intl.formatMessage({ id: 'device.last_time_inline' })} </Item>
      <Item>{intl.formatMessage({ id: 'device.whether_online' })} </Item>
      <Item>{intl.formatMessage({ id: 'device.status' })} </Item>
      <Item>{intl.formatMessage({ id: 'actions' })} </Item>
    </Wrapper>
  );
};
