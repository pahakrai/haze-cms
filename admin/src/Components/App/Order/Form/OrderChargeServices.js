import React, { useMemo, useEffect, useState, useCallback } from 'react';
import Common from '@golpasal/common';
import { Field } from 'redux-form';
import { Col } from 'react-flexa';

import PricingService from '../../../../Services/APIServices/PricingService';
import ServiceService from '../../../../Services/APIServices/ServiceService';
import TextInput from '../../../../Components/Form/TextInput';
import ItemsForm from '../../../../Components/Form/ItemsForm';
import Dropdown from '../../../../Components/Form/Dropdown';

import { FieldLabel } from '../../../Form/form.styled';

const { OrderStatus } = Common.status;
const { PriceType } = Common.type;

export const OrderChargeServices = ({
  input,
  intl,
  updateMode,
  formValueStatus
}) => {
  const [options, setOptions] = useState([]);
  const disabled = formValueStatus >= OrderStatus.SHIPPED;
  const empty = disabled && updateMode && (!input.value || !input.value.length);

  useEffect(() => {
    const request = async () => {
      const pricingResult = await PricingService.getPricingServices({
        populates: ['service', 'pricing']
      });
      const result = await ServiceService.getServices({
        isActive: true
      });
      const pricings =
        (pricingResult && pricingResult.ok && pricingResult.data) || [];
      const options = ((result && result.ok && result.data) || []).map(
        service => {
          const pricing = pricings.find(
            v => v && v.service && v.service._id === service._id
          );

          return {
            value: service && service._id,
            label: service && service.name[intl.locale],
            isQuote:
              pricing &&
              pricing.pricing &&
              pricing.pricing.priceType === PriceType.QUOTE,
            amount:
              (pricing &&
                pricing.pricing &&
                pricing &&
                pricing.pricing.amount) ||
              0
          };
        }
      );
      setOptions(options);
    };

    request();
  }, [intl.locale]);
  const onChangeItem = useCallback(
    (index, data) => {
      const items = [...(input.value || [])];
      items[index] = data;
      input.onChange(items);
    },
    [input]
  );

  const itemsFormProps = useMemo(() => {
    const childFields = ({ data, index }) => {
      const option = options.find(v => v.value === data.service);
      return (
        <>
          <Col xs={12} lg={6} gutter={2}>
            <Dropdown
              noLabel
              name={`${input.name}.service`}
              placeholder={intl.formatMessage({ id: 'display_service' })}
              intl={intl}
              options={options}
              input={{
                value: data.service,
                onChange: value => {
                  const opt = options.find(v => v.value === value);
                  onChangeItem(index, {
                    ...data,
                    service: value,
                    value: opt
                      ? opt.isQuote
                        ? data.value || 0
                        : opt.amount
                      : 0
                  });
                }
              }}
              isOptionDisabled={opt => {
                return (
                  input.value &&
                  input.value.length &&
                  input.value.find(v => v.service === opt.value)
                );
              }}
            />
          </Col>
          <Col xs={12} lg={6} gutter={2}>
            <TextInput
              noLabel
              name={`${input.name}[${index}].value`}
              type="number"
              disabled={option ? (option.isQuote ? false : true) : false}
              label={intl.formatMessage({ id: 'amount' })}
            />
          </Col>
        </>
      );
    };
    return {
      contentStyle: { paddingTop: input.value.length > 0 ? 10 : 0 },
      childFields
    };
  }, [input.value, intl, options, input.name, onChangeItem]);

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
  return <Field {...props} component={OrderChargeServices} />;
};
