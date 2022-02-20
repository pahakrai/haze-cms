import React from 'react';

import { Wrapper } from '../ListCard/title';
import { Item } from './PolicyCardItem';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item style={{ textAlign: 'center' }}>
        {intl.formatMessage({ id: 'display_id' })}
      </Item>
      <Item>{intl.formatMessage({ id: 'display_name' })} </Item>
    </Wrapper>
  );
};
