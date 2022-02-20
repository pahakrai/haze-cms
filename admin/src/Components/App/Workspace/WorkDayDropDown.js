import React from 'react';
import { helpers as EcommCommonHelpers } from '@golpasal/common';
import Dropdown from '../../Form/Dropdown';

const WorkDayDropDown = ({ intl, ...props }) => {
  return (
    <Dropdown
      options={EcommCommonHelpers.getConstants(
        'type',
        'DayOfWeekType',
        intl.locale
      ).map(v => ({
        label: v.text,
        value: v.value
      }))}
      isMulti
      {...props}
    />
  );
};

export default WorkDayDropDown;
