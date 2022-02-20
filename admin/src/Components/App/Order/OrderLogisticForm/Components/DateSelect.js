import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import moment from 'moment';
import { FaCalendarAlt, FaAngleDown } from 'react-icons/fa';

import TimePicker from '../../../../Common/TimePicker';

export const Calendar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
  cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
`;

const DateSelectComponent = ({ input, intl, disabled }) => {
  const onChange = value => {
    input.onChange(moment(value).toISOString());
  };
  const content = (
    <Calendar disabled={disabled}>
      <FaCalendarAlt color="#666" size={16} />
      <span
        style={{
          marginLeft: 5,
          position: 'relative',
          top: -2
        }}
      >
        {moment(input.value || '')
          .locale(intl.locale)
          .format('MM/DD/YYYY dddd HH:mm')}
      </span>
      {!disabled && (
        <FaAngleDown color="#666" size={16} style={{ marginLeft: 5 }} />
      )}
    </Calendar>
  );
  return (
    <TimePicker
      customInput={content}
      value={input.value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export const DateSelect = props => {
  return <Field {...props} component={DateSelectComponent} />;
};

export default DateSelect;
