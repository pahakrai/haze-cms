import React, { useMemo } from 'react';
import Common from '@golpasal/common';
import { Field } from 'redux-form';

import TextInput from '../../../../Components/Form/TextInput';
import ItemsForm from '../../../../Components/Form/ItemsForm';
import ServiceDropdown from '../../../../Containers/Form/ServiceDropdown';

import { FieldLabel } from '../../../Form/form.styled';

const { QuotationStatus } = Common.status;
export const QuotationChargeServices = ({
  input,
  intl,
  updateMode,
  formValueStatus
}) => {
  const disabled = formValueStatus === QuotationStatus.CONFIRM;
  const empty = disabled && updateMode && (!input.value || !input.value.length);

  const itemsFormProps = useMemo(() => {
    return {
      contentStyle: { paddingTop: input.value.length > 0 ? 10 : 0 },
      childFields: [
        {
          component: ServiceDropdown,
          name: 'service',
          others: {
            noLabel: true,
            placeholder: intl.formatMessage({ id: 'display_service' }),
            intl,
            isOptionDisabled: opt => {
              return (
                input.value &&
                input.value.length &&
                input.value.find(v => v.service === opt.value)
              );
            }
          },
          colProps: {
            xs: 12,
            md: 12,
            lg: 6
          }
        },
        {
          component: TextInput,
          name: 'value',
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
      ]
    };
  }, [input.value, intl]);

  return (
    <div>
      <FieldLabel>{intl.formatMessage({ id: 'display_services' })}</FieldLabel>
      {empty && <div>-</div>}
      <ItemsForm
        noLabel
        name={input.name}
        disabled={disabled}
        hideAdd={disabled}
        dropDisabled
        {...itemsFormProps}
      />
    </div>
  );
};
export default props => {
  return <Field {...props} component={QuotationChargeServices} />;
};
