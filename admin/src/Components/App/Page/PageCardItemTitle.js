import React from 'react';
import { isLayoutType } from './Utils';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl, type }) => {
  const isHideSomeField = isLayoutType({ type });
  return (
    <Wrapper>
      {!isHideSomeField && (
        <Item>{intl.formatMessage({ id: 'display_page_path' })}</Item>
      )}
      <Item>{intl.formatMessage({ id: 'display_page_title' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_page_status' })}</Item>
      <Item>{intl.formatMessage({ id: 'display_page_created_at' })}</Item>
    </Wrapper>
  );
};
