import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import EcommCommonType from '@golpasal/common';
import Dropdown from '../../../../Common/Dropdown';

import RegionService from '../../../../../Services/APIServices/RegionService';

const Label = styled.div`
  font-weight: 600;
  color: #666666;
  font-size: 14px;
  padding: 3px 0;
`;
const { WorkspaceType } = EcommCommonType.type;
const PlaceOfRegion = ({
  intl,
  formValuePlaceOfOrigin,
  workspaceType,
  input: { onChange }
}) => {
  const [country, setCountry] = useState([]);
  const [formValue, setFormValue] = useState(null);

  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await RegionService.getRegions({
          subTypes: ['country']
        });

        if (formValuePlaceOfOrigin) {
          const res = data.filter(v => v._id === formValuePlaceOfOrigin)[0];
          setFormValue({
            label: res.name[intl.locale],
            value: res._id
          });
        }
        setCountry(data);
      } catch (e) {}
    };

    if (!country.length) {
      fn();
    }
  }, [intl, formValuePlaceOfOrigin, country]);

  return (
    <>
      <Label>
        {intl.formatMessage({
          id:
            workspaceType === WorkspaceType.EDUCATION
              ? 'calendar_country'
              : 'display_place_of_origin'
        })}
      </Label>

      <Dropdown
        placeholder={intl.formatMessage({ id: 'display_select' })}
        options={country.map(v => ({
          label: v.name[intl.locale],
          value: v._id
        }))}
        value={formValue}
        onChange={i => {
          onChange(i.value);
          setFormValue({
            label: i.label,
            value: i.value
          });
        }}
      />
    </>
  );
};

export default props => {
  return <Field {...props} component={PlaceOfRegion} />;
};
