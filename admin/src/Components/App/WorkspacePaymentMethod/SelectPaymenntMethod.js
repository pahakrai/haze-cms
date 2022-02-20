import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';

import Dropdown from '../../Form/Dropdown';
import PaymentMethodService from '../../../Services/APIServices/PaymentMethodService';

const SelectPaymenntMethod = ({
  intl,
  input: { value, onChange, name },
  meta: { touched, error },
  label,
  disabled
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await PaymentMethodService.getPaymentMethods({});
        const result = data.map(v => ({
          label: v.name[intl.locale],
          value: v.code
        }));
        setData(result);
      } catch (e) {}
    };

    if (!data.length) {
      fn();
    }
  }, [intl, data]);

  return (
    <div>
      <Dropdown name={name} label={label} options={data} disabled={disabled} />
    </div>
  );
};

export default props => {
  return <Field {...props} component={SelectPaymenntMethod} />;
};
