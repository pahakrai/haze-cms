import React from 'react';
// Form
import TextInput from '../../../Common/TextInput';

export default {
  screenName: 'post',
  form: ({ parameters, onChange, intl }) => {
    return (
      <TextInput
        placeholder={intl.formatMessage({
          id: 'display_notificationschedule_post_detail'
        })}
        value={parameters ? parameters._id : ''}
        onChange={postId => onChange({ _id: postId })}
      />
    );
  }
};
