import React from 'react';
import { FormattedMessage } from 'react-intl';

import SelectStore from '../../../../../Containers/Form/SelectStore';

export const OrderStore = () => {
  return (
    <>
      <SelectStore
        name="logistic.storeTo"
        label={<FormattedMessage id="display_order_store_to" />}
      />
    </>
  );
};

export default OrderStore;
