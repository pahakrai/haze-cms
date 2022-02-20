import React from 'react';
// , { useState, useEffect, useMemo, useCallback }
import { Field, getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { debounce } from 'lodash';

// import QuotationService from '../../../../Services/APIServices/QuotationService';
// import FormName from '../../../../Constants/Form';
import { ErrorMessage } from '../../../Form/Errors';
// import QuotationCoupons from './QuotationCoupons';
import {
  Conatiner,
  RowItem,
  Title,
  Label,
  Value,
  Hr
} from './QuotationChargeUtils';

const QuotationTotal = styled.div`
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

// class DateRecord {
//   date = +new Date();
//   update(date) {
//     this.date = date || +new Date();
//   }
//   get = () => this.date;
// }

const _QuotationCharge = props => {
  const {
    // input,
    formValue,
    // form,
    // formName,
    intl,
    // onChange,
    // updateMode,
    meta
  } = props;

  const serviceAmount =
    formValue && formValue.services && formValue.services.length
      ? formValue.services.reduce((serviceAmount, v) => {
          return serviceAmount + Number(v.value || 0);
        }, 0)
      : 0;
  const otherAmount =
    formValue &&
    formValue.charge &&
    formValue.charge.others &&
    formValue.charge.others.length
      ? formValue.charge.others.reduce((amount, v) => {
          return amount + Number(v.amount || 0);
        }, 0)
      : 0;
  const productAmount =
    formValue && formValue.details && formValue.details.length
      ? formValue.details.reduce((serviceAmount, v) => {
          return serviceAmount + Number(v.amount || 0);
        }, 0)
      : 0;
  const totalAmount = productAmount + otherAmount + serviceAmount;

  return (
    <Conatiner>
      <Title>
        <FormattedMessage id="order_total_order_display" />
      </Title>
      <RowItem>
        <Label>{intl.formatMessage({ id: 'order_charge_base_display' })}</Label>
        <Value>${productAmount}</Value>
      </RowItem>
      <RowItem>
        <Label>{intl.formatMessage({ id: 'order_service_display' })}</Label>
        <Value>${serviceAmount}</Value>
      </RowItem>
      <RowItem>
        <Label>{intl.formatMessage({ id: 'other' })}</Label>
        <Value>
          $
          {formValue &&
          formValue.charge &&
          formValue.charge.others &&
          formValue.charge.others.length
            ? formValue.charge.others.reduce((amount, v) => {
                return amount + Number(v.amount || 0);
              }, 0)
            : 0}
        </Value>
      </RowItem>

      <Hr />
      <QuotationTotal>
        <Title style={{ marginBottom: 0 }}>
          <FormattedMessage id="order_total_display" />
        </Title>
        <div>
          {formValue.currency || ''} {totalAmount || 0}
        </div>
      </QuotationTotal>
      {meta.error && meta.error.calculation && (
        <ErrorWrapper>
          <ErrorMessage>{meta.error.calculation}</ErrorMessage>
        </ErrorWrapper>
      )}
    </Conatiner>
  );
};

const QuotationCharge = connect(
  (state, { formName }) => {
    return {
      formValue: getFormValues(formName)(state)
    };
  },
  () => ({})
)(_QuotationCharge);

export default props => {
  return <Field {...props} formName={props.form} component={QuotationCharge} />;
};
