import React, { useMemo } from 'react';
import { helpers } from '@golpasal/common';
import { useIntl } from 'react-intl';

import Dropdown from './Dropdown';

export const CommonConstantSelect = ({ category, type, ...res }) => {
  const locale = useIntl().locale;
  const options = useMemo(
    () =>
      type && category
        ? helpers.getConstants(category, type, locale).map(item => ({
            label: item.text,
            value: item.value
          }))
        : [],
    [category, type, locale]
  );

  return <Dropdown options={options} {...res} />;
};

export default CommonConstantSelect;
