import React from 'react';
// import Common from '@golpasal/common';
import { Field } from 'redux-form';

import TextInput from '../../../../../Components/Form/TextInput';
import ItemsForm from '../../../../../Components/Form/ItemsForm';
import DatePicker from '../../../../../Components/Form/DatePicker';

// import { FieldLabel } from '../../../../Form/form.styled';

// const { OrderStatus } = Common.status;
export const TrackingLogServices = ({
  input,
  intl,
  updateMode
  // formValueStatus
}) => {
  // const disabled = formValueStatus >= OrderStatus.SHIPPED;
  const empty = updateMode && (!input.value || !input.value.length);

  return (
    <div>
      {/* <FieldLabel>{intl.formatMessage({ id: 'nav.log' })}</FieldLabel> */}
      {empty && <div>-</div>}
      <ItemsForm
        label={intl.formatMessage({ id: 'nav.log' })}
        dropDisabled
        disabled={updateMode}
        hideAdd={updateMode}
        name={input.name}
        marginTop={30}
        contentStyle={{ paddingTop: input.value.length ? 10 : 0 }}
        childFields={[
          {
            component: DatePicker,
            name: 'time',
            others: {
              // noLabel: true,
              placeholder: intl.formatMessage({ id: 'date' }),
              label: intl.formatMessage({ id: 'date' })
            },
            colProps: {
              xs: 12,
              md: 6,
              lg: 6
            }
          },
          {
            component: TextInput,
            name: 'remarks',
            others: {
              // noLabel: true,
              label: intl.formatMessage({ id: 'display_order_remarks' }),
              placeholder: intl.formatMessage({ id: 'display_order_remarks' })
            },
            colProps: {
              xs: 12,
              md: 6,
              lg: 6
            }
          }
        ]}
      />
    </div>
  );
};
export default props => {
  return <Field {...props} component={TrackingLogServices} />;
};
