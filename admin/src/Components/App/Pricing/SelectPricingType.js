import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { helpers } from '@golpasal/common';

import Dropdown from '../../Form/Dropdown';
import WorkspacePriceTypeService from '../../../Services/APIServices/WorkspacePriceTypeService';

const SelectPricingType = ({
  intl,
  input: { value, onChange, name },
  meta: { touched, error },
  label,
  disabled
}) => {
  const [data, setData] = useState([]);
  const priceTypes = helpers.getConstants('type', 'PriceType', intl.locale);
  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await WorkspacePriceTypeService.getWorkspacePriceTypes(
          {}
        );
        const priceTypeOptions = priceTypes.filter(item =>
          data.find(v => v.priceType === item.value)
        );
        const result = priceTypeOptions.map(v => ({
          label: v.text,
          value: v.value
        }));
        setData(result);
      } catch (e) {}
    };

    if (!data.length) {
      fn();
    }
  }, [intl, data, priceTypes]);

  return (
    <div>
      <Dropdown name={name} label={label} options={data} disabled={disabled} />
    </div>
  );
};

export default props => {
  return <Field {...props} component={SelectPricingType} />;
};
