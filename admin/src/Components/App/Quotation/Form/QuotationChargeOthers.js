import React from 'react';
import Common from '@golpasal/common';
import { Field } from 'redux-form';

import TextInput from '../../../Form/TextInput';
import ItemsForm from '../../../Form/ItemsForm';

import { FieldLabel } from '../../../Form/form.styled';

const { QuotationStatus } = Common.status;
export const QuotationChargeOthers = ({
  input,
  intl,
  updateMode,
  formValueStatus
}) => {
  const disabled = formValueStatus >= QuotationStatus.CONFIRM;
  const empty = disabled && updateMode && (!input.value || !input.value.length);

  return (
    <div>
      <FieldLabel>{intl.formatMessage({ id: 'other' })}</FieldLabel>
      {empty && <div>-</div>}
      <ItemsForm
        noLabel
        name={input.name}
        contentStyle={{ paddingTop: input.value.length ? 10 : 0 }}
        dropDisabled
        disabled={disabled}
        hideAdd={disabled}
        childFields={[
          {
            component: TextInput,
            name: 'description',
            others: {
              noLabel: true,
              placeholder: intl.formatMessage({ id: 'display_description' })
            },
            colProps: {
              xs: 12,
              md: 12,
              lg: 6
            }
          },
          {
            component: TextInput,
            name: 'amount',
            type: 'number',
            others: {
              noLabel: true,
              label: intl.formatMessage({ id: 'amount' })
            },
            colProps: {
              xs: 12,
              md: 12,
              lg: 6
            }
          }
        ]}
      />
    </div>
  );
};
export default props => {
  return <Field {...props} component={QuotationChargeOthers} />;
};
