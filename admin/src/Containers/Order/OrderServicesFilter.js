import React from 'react';
import { Select } from 'antd';

import FilterLayout from '../../Components/Common/FilterLayout';

const OrderServicesFilter = ({ intl, onChanged, services }) => {
  return (
    <FilterLayout.FilterRow>
      <FilterLayout.FilterLabel>
        {intl.formatMessage({
          id: 'display_service'
        })}
      </FilterLayout.FilterLabel>
      <Select
        mode="multiple"
        style={{ flex: 1 }}
        onChange={service =>
          onChanged({
            services: service === '' ? undefined : service
          })
        }
      >
        {services &&
          services.length > 0 &&
          services.map(item => (
            <Select.Option key={item._id} value={item._id}>
              {item.name[intl.locale]}
            </Select.Option>
          ))}
      </Select>
    </FilterLayout.FilterRow>
  );
};

export default OrderServicesFilter;
