import React from 'react';
import orderDetail from './orderDetail';
import userDetail from './userDetail';
import postDetail from './postDetail';

const screenParameterForms = {
  [orderDetail.screenName]: orderDetail.form,
  [userDetail.screenName]: userDetail.form,
  [postDetail.screenName]: postDetail.form
};
export const ScreenParameterForm = ({
  screenName,
  parameters,
  onChange,
  intl
}) => {
  if (!screenName) {
    return <div />;
  } else {
    if (!screenParameterForms[screenName]) {
      return <div />;
    } else {
      const SPFComp = screenParameterForms[screenName];
      return (
        <SPFComp parameters={parameters} onChange={onChange} intl={intl} />
      );
    }
  }
};
export default screenParameterForms;
