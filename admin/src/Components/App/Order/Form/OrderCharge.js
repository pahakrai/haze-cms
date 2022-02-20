import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Field, getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import OrderService from '../../../../Services/APIServices/OrderService';
import { ErrorMessage } from '../../../Form/Errors';
import OrderCoupons from './OrderCoupons';
import {
  Conatiner,
  Item,
  RowItem,
  Title,
  Label,
  Value,
  Hr
} from './OrderChargeUtils';

const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;
const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

class DateRecord {
  date = +new Date();
  update(date) {
    this.date = date || +new Date();
  }
  get = () => this.date;
}

const _OrderCharge = props => {
  const {
    input,
    formValue,
    intl,
    updateMode,
    meta,
    getFormTexts
    // formProductError
  } = props;
  const [value, setValue] = useState(input.value);
  const [deductPrice, setDeductPrice] = useState(0);
  const dateRecord = useMemo(() => new DateRecord(), []);
  const texts = getFormTexts();
  const updateCharge = debounce(() => {
    const _date = +new Date();
    const func = async () => {
      dateRecord.update(_date);
      const _formValue = {
        ...formValue,
        product: {
          items:
            (formValue && formValue.product && formValue.product.items) || []
        }
      };
      const charge = _formValue.charge || {};
      const others = (charge.others || []).map(v => ({
        amount: Number(v.amount) || 0
      }));
      const services = (_formValue.services || [])
        .filter(v => v.service)
        .map(v => ({ service: v.service, value: Number(v.value) || 0 }));

      delete _formValue.coupon;
      const { data } =
        (await OrderService.orderCharge({
          ..._formValue,
          others,
          services,
          charge: {
            ...charge,
            others: [],
            services: []
          },
          product: {
            ..._formValue.product,
            items: _formValue.product.items.filter(v => v.productSKU)
          }
        })) || {};
      if (data) {
        if (dateRecord.get() === _date) {
          setValue(data);
        }
      }
    };
    if (
      (formValue && formValue.product && formValue.product.items) ||
      (formValue && formValue.services && formValue.services.length) ||
      (formValue &&
        formValue.charge &&
        formValue.charge.others &&
        formValue.charge.others.length)
    ) {
      func();
    }
  }, 1000);
  /* eslint-disable-next-line */
  useEffect(updateCharge, [
    formValue && formValue.product && formValue.product.items,
    formValue && formValue.coupon,
    formValue && formValue.services,
    formValue && formValue.charge && formValue.charge.others
  ]);
  const onDeductPriceChange = useCallback(price => {
    setDeductPrice(price);
  }, []);
  useEffect(() => {
    if (updateMode && input.value && input.value.coupons) {
      onDeductPriceChange(
        (input.value.coupons[0] && input.value.coupons[0].amount) || 0
      );
    }
  }, [input.value, onDeductPriceChange, updateMode]);

  return (
    <Conatiner>
      <Title>
        <FormattedMessage id="order_total_order_display" />
      </Title>
      <RowItem>
        <Label>{texts.chargeBase}</Label>
        <Value>${value && value.base ? value.base : 0}</Value>
      </RowItem>
      <RowItem>
        <Label>{intl.formatMessage({ id: 'order_service_display' })}</Label>
        <Value>
          $
          {value && value.services && value.services.length
            ? value.services.reduce((serviceAmount, v) => {
                return serviceAmount + Number(v.amount || 0);
              }, 0)
            : 0}
        </Value>
      </RowItem>
      <RowItem>
        <Label>{intl.formatMessage({ id: 'other' })}</Label>
        <Value>
          $
          {value && value.others && value.others.length
            ? value.others.reduce((amount, v) => {
                return amount + Number(v.amount || 0);
              }, 0)
            : 0}
        </Value>
      </RowItem>
      <Item>
        <OrderCoupons
          intl={intl}
          label={intl.formatMessage({ id: 'order_coupon_display' })}
          name="coupon"
          coupons={
            updateMode ? input.value && input.value.coupons : value.coupons
          }
          formValue={formValue}
          amount={value.totalAmount}
          productItems={
            formValue && formValue.product && formValue.product.items
          }
          onDeductPriceChange={onDeductPriceChange}
          updateMode={updateMode}
        />
      </Item>
      <Hr />
      <OrderTotal>
        <Title style={{ marginBottom: 0 }}>
          <FormattedMessage id="order_total_display" />
        </Title>
        <div>
          {value.currency || ''}{' '}
          {value.totalAmount >= deductPrice
            ? value.totalAmount - deductPrice
            : value.totalAmount || 0}
        </div>
      </OrderTotal>
      {meta.error && meta.error.calculation && (
        <ErrorWrapper>
          <ErrorMessage>{meta.error.calculation}</ErrorMessage>
        </ErrorWrapper>
      )}
    </Conatiner>
  );
};

const OrderCharge = connect(
  (state, { formName }) => {
    return {
      formValue: getFormValues(formName)(state),
      formProductError:
        state.form[formName] && state.form[formName].syncErrors
          ? state.form[formName].syncErrors.product
          : undefined
    };
  },
  () => ({})
)(_OrderCharge);

export default props => {
  return <Field {...props} formName={props.form} component={OrderCharge} />;
};
