import React, { useEffect, useState, useCallback } from 'react';
import Common from '@golpasal/common';
import moment from 'moment';

import { Dropdown } from '../../../../../Form/Dropdown';
import StoreService from '../../../../../../Services/APIServices/StoreService';

const { StoreStatus } = Common.status;

export const OrderStoreSelect = ({ intl, value = '', onChange = () => {} }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const request = async () => {
      const result = await StoreService.getPlaceOrderStores({
        populates: ['address']
      });
      if (result && result.data && result.data.length) {
        setOptions(
          result.data.map(v => {
            const address = v.address || {};
            const label = [
              address.name,
              address.address1,
              address.address2,
              v?.deprecatedDate
                ? `(${intl.formatMessage(
                    { id: 'display_no_longer_provide_service_after' },
                    {
                      date: moment(v.deprecatedDate || '').format('YYYY/MM/DD')
                    }
                  )})`
                : null
            ]
              .filter(v => v)
              .join(' ');

            return {
              value: v._id,
              label,
              store: v
            };
          })
        );
      }
    };
    request();
  }, [intl]);

  const isOptionDisabled = useCallback(v => {
    return [StoreStatus.DEPRECATED, StoreStatus.INACTIVE].includes(
      v.store && v.store.status
    );
  }, []);

  return (
    <Dropdown
      intl={intl}
      input={{ value, onChange }}
      options={options}
      menuPortalTarget={document.body}
      isOptionDisabled={isOptionDisabled}
    />
  );
};

export default OrderStoreSelect;
