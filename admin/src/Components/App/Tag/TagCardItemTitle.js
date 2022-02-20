import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>{intl.formatMessage({ id: 'display_tag_text' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_tag_count' })}</Item>
      <Item>{intl.formatMessage({ id: 'label_images' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_tag_action' })}</Item>
    </Wrapper>
  );
};
