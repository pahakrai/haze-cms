import React from 'react';
import Select from 'react-select';

const DayOptions = Array.from({ length: 31 }).map((v, k) => ({
  label: `${k + 1}`,
  value: k + 1
}));

export default ({ input, label, placeholder, onChange, value, ...props }) => (
  <Select
    value={
      value && Array.isArray(value)
        ? value.map(v => DayOptions.find(item => item.value === v))
        : DayOptions.find(item => item.value === value)
    }
    options={DayOptions}
    onChange={onChange}
    placeholder={placeholder}
    {...props}
  />
);
