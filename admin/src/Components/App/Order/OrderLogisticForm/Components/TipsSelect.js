import React from 'react';
import { Field } from 'redux-form';
import { FaChevronRight } from 'react-icons/fa';

import {
  ServiceItem,
  Actions,
  Price,
  Label
} from '../../../../../Containers/Service/SelectServices';
import TextInput from '../../../../Form/TextInput';

export const TipsSelectComponent = ({ input, label, disabled }) => {
  return disabled ? (
    <ServiceItem>
      <div>
        <Label>{label}</Label>
      </div>

      <Actions>
        <Price>${input.value}</Price>
        <FaChevronRight size={12} color="#999" />
      </Actions>
    </ServiceItem>
  ) : (
    <>
      <ServiceItem>
        <div style={{ width: '100%' }}>
          <Label>{label}</Label>
          <TextInput
            containerStyle={{ marginBottom: 0 }}
            noLabel
            name={input.name}
            type="number"
            placeholder={label}
          />
        </div>
      </ServiceItem>
    </>
  );
};
export const TipsSelect = props => {
  return <Field {...props} component={TipsSelectComponent} />;
};

export default TipsSelect;
