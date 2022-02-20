import React from 'react';
import Select from 'react-select';

const WeekOptions = {
  en: [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
    { label: 'Sunday', value: 7 }
  ],
  'zh-hk': [
    { label: '星期一', value: 1 },
    { label: '星期二', value: 2 },
    { label: '星期三', value: 3 },
    { label: '星期四', value: 4 },
    { label: '星期五', value: 5 },
    { label: '星期六', value: 6 },
    { label: '星期天', value: 7 }
  ],
  'zh-cn': [
    { label: '星期一', value: 1 },
    { label: '星期二', value: 2 },
    { label: '星期三', value: 3 },
    { label: '星期四', value: 4 },
    { label: '星期五', value: 5 },
    { label: '星期六', value: 6 },
    { label: '星期天', value: 7 }
  ]
};

export default ({
  onChange,
  value,
  input,
  locale = 'en',
  label,
  placeholder,
  ...props
}) => {
  return (
    <Select
      value={
        value && Array.isArray(value)
          ? value.map(v => WeekOptions[locale].find(item => item.value === v))
          : WeekOptions[locale].find(item => item.value === value)
      }
      options={WeekOptions[locale]}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};
