import React from 'react';
import TextInput from '../../../Common/TextInput';

export default {
  screenName: 'userProfile',
  form: ({ parameters, onChange, intl }) => {
    return (
      <TextInput
        placeholder={intl.formatMessage({
          id: 'display_notificationschedule_user_detail'
        })}
        value={parameters ? parameters._id : ''}
        onChange={userId => onChange({ _id: userId })}
      />
    );
  }
};
