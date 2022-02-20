import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export default ({ intl }) => {
  return (
    <Wrapper>
      <Item>
        {intl.formatMessage({ id: 'display_customer_enquiry_phone' })}
      </Item>
      <Item>
        {intl.formatMessage({ id: 'display_customer_enquiry_email' })}{' '}
      </Item>
      <Item>
        {intl.formatMessage({ id: 'display_customer_enquiry_search_time' })}{' '}
      </Item>
      <Item>
        {intl.formatMessage({ id: 'display_customer_enquiry_subject' })}{' '}
      </Item>
      <Item>
        {intl.formatMessage({ id: 'display_customer_enquiry_who_follow' })}{' '}
      </Item>
      <Item>
        {intl.formatMessage({ id: 'display_customer_enquiry_follow_time' })}{' '}
      </Item>
      <Item>{intl.formatMessage({ id: 'display_remarks' })} </Item>
      <Item>{intl.formatMessage({ id: 'status' })} </Item>
      <Item>
        {intl.formatMessage({
          id: 'actions'
        })}
      </Item>
    </Wrapper>
  );
};
