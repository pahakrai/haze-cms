import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

import FilterLayout from '../../Components/Common/FilterLayout';
import AnalyticsService from '../../Services/APIServices/AnalyticsService';

const WidgetFilter = ({ intl, onChange, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const req = async () => {
      try {
        const data = await AnalyticsService.getDashboardData({
          widgetType: 'map'
        });

        setOptions(
          data.data.map(v => ({
            text: v?.title?.[intl.locale],
            value: v?._id,
            ...v
          }))
        );
      } catch (e) {}
    };
    req();
  }, [intl.locale]);

  return (
    <FilterLayout.FilterRow>
      <FilterLayout.FilterLabel>
        {intl.formatMessage({
          id: 'display_data_type'
        })}
      </FilterLayout.FilterLabel>
      <Select
        style={{ flex: 1 }}
        value={value?._id}
        onChange={value => {
          onChange({
            widget: options.find(v => v._id === value)
          });
        }}
      >
        {options.map(item => (
          <Select.Option key={item.value} value={item.value}>
            {item.text}
          </Select.Option>
        ))}
      </Select>
    </FilterLayout.FilterRow>
  );
};

export default WidgetFilter;
