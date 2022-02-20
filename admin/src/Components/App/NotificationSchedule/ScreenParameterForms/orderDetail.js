import React from 'react';
import TextInput from '../../../Common/TextInput';

export default {
  screenName: 'orderDetail',
  form: ({ parameters, onChange, intl }) => {
    return (
      <TextInput
        placeholder={intl.formatMessage({
          id: 'display_notificationschedule_order_detail'
        })}
        value={parameters ? parameters._id : ''}
        onChange={orderId => onChange({ _id: orderId })}
      />
    );
  }
};
