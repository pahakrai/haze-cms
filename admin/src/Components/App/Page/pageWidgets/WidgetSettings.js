import React from 'react';
import { FormattedMessage } from 'react-intl';

import Service from '../../../../Services/APIServices/EventService';
import { toast } from '../../../../Lib/Toast';

const onSendEmail = params => {
  return new Promise(reslove => {
    Service.self
      .post(`/homes/contact-us-generic`, {
        toEmail: params.toEmail,
        subject: params.title,
        name: params.name || '',
        userEmail: params.email,
        message: params.message || ''
      })
      .then(res => {
        if (res && res.status === 200) {
          toast.success(<FormattedMessage id={'msg.submit_success'} />, {
            position: 'top-right',
            autoClose: 1000
          });
          // browserHistory.push('/contact-success');
          reslove(true);
        } else {
          reslove(false);
        }
      })
      .catch(() => {
        reslove(false);
      });
  });
};
export default {
  contactForm: { onSendEmail },
  button: { defaultBackgroundColor: '#edba37' },
  layoutBuilder: { defaultNewColumnWidth: '20' },
  mediaSlick: {
    customRenderEditorWidgetFormRight: true,
    formModalClassName: 'slick-widget-form-modal'
  },
  introVideoSlide: {
    customRenderEditorWidgetFormRight: true
  }
};
