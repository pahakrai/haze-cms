import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Common, {
  helpers as EcommCommonHelpers
} from '@golpasal/common';
import { Tabs } from 'antd';

import { strIsNumber } from '../../../../../Lib/util';

import { WorkspacePaymentMethodActions } from '../../../../../Redux/WorkspacePaymentMethod/actions';
import { getAllWorkspacePaymentMethods } from '../../../../../Redux/selectors';

import Button from '../../../../Common/Button';
import Loading from '../../../../Common/Loading';
import {
  LeftColWrapper,
  RightColWrapper,
  RowWrapper
} from '../../../../App/Form/Wrapper';

import Errors from '../../../../Form/Errors';
import Dropdown from '../../../../Form/Dropdown';
import DatePicker from '../../../../Form/DatePicker';
import TextInput, { TextInputNoField } from '../../../../Form/TextInput';
import Form from '../../../../Form/Form';
import Uploader from '../../../../Form/Uploader';

const { PaymentTransactionStatus } = Common.status;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 500px;
  border: 1px solid #eee;
  padding: 20px;
  overflow: auto;
`;

const validate = values => {
  const errors = {};
  const gtzeroNumber = <FormattedMessage id={'error.number.gtzero'} />;
  const required = <FormattedMessage id={'error.required'} />;

  if (!values._paymentMethod) {
    errors._paymentMethod = required;
  }
  if (!values.date) {
    errors.date = required;
  }
  if (!values.id) {
    errors.id = required;
  }
  if (values.status === undefined) {
    errors.status = required;
  }
  if (
    !values.amount ||
    !strIsNumber(values.amount + '') ||
    Number(values.amount) <= 0
  ) {
    errors.amount = gtzeroNumber;
  }

  return errors;
};

const OrderPaymentForm = ({
  onSubmit,
  onSubmitSuccess,
  paymentMethods,
  form,
  intl,
  submiting,
  currentWorkspace,
  updateMode,
  initialValues
}) => {
  const readOnly = [
    PaymentTransactionStatus.FAILED,
    PaymentTransactionStatus.SUCCESS
  ].includes(initialValues.status);
  const paymentMethodOptions = [];
  if (paymentMethods) {
    paymentMethods.forEach(v => {
      paymentMethodOptions.push({
        value: v.paymentMethod.code,
        label:
          v.paymentMethod.name && v.paymentMethod.name[intl.locale]
            ? v.paymentMethod.name[intl.locale]
            : ''
      });
    });
  }

  return (
    <Form form={form} onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess}>
      <Loading isLoading={submiting} />
      <Errors />
      <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_order_base' })}
          key="1"
        >
          <Wrapper>
            <RowWrapper>
              <LeftColWrapper xs={12} md={6}>
                <Dropdown
                  name="_paymentMethod"
                  label={intl.formatMessage({
                    id: 'payment_method_display'
                  })}
                  options={paymentMethodOptions}
                  disabled={readOnly}
                />
              </LeftColWrapper>
              <RightColWrapper xs={12} md={6}>
                <Dropdown
                  name="status"
                  label={intl.formatMessage({
                    id: 'payment_status_display'
                  })}
                  options={EcommCommonHelpers.getConstants(
                    'status',
                    'PaymentTransactionStatus',
                    intl.locale
                  ).map(status => ({
                    label: status.text,
                    value: status.value
                  }))}
                  disabled={readOnly}
                />
              </RightColWrapper>
            </RowWrapper>
            <RowWrapper>
              <LeftColWrapper xs={12} md={6}>
                <DatePicker
                  name="date"
                  label={intl.formatMessage({
                    id: 'payment_date_display'
                  })}
                  disabled={readOnly}
                />
              </LeftColWrapper>
              <RightColWrapper xs={12} md={6}>
                <TextInput
                  name="id"
                  disabled={readOnly}
                  label={intl.formatMessage({
                    id: 'payment_transaction_number_display'
                  })}
                />
              </RightColWrapper>
            </RowWrapper>
            <RowWrapper>
              <LeftColWrapper xs={12} md={6}>
                <TextInputNoField
                  label={intl.formatMessage({
                    id: 'currency'
                  })}
                  disabled
                  input={{
                    value: currentWorkspace
                      ? currentWorkspace.defaultCurrency
                      : '-'
                  }}
                />
              </LeftColWrapper>
              <RightColWrapper xs={12} md={6}>
                <TextInput
                  name="amount"
                  label={intl.formatMessage({
                    id: 'amount'
                  })}
                  disabled={readOnly}
                />
              </RightColWrapper>
            </RowWrapper>
            <RowWrapper>
              <LeftColWrapper xs={12} md={6} lg={6}>
                <TextInput
                  rows={4}
                  name="remarks1"
                  disabled={readOnly}
                  label={intl.formatMessage({
                    id: 'display_order_remarks1'
                  })}
                />
              </LeftColWrapper>
              <RightColWrapper xs={12} md={6} lg={6}>
                <TextInput
                  rows={4}
                  name="remarks2"
                  label={intl.formatMessage({
                    id: 'display_order_remarks2'
                  })}
                  disabled={readOnly}
                />
              </RightColWrapper>
            </RowWrapper>
          </Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_order_image' })}
          key="2"
        >
          <Wrapper>
            <Uploader
              intl={intl}
              name="files"
              label={`${intl.formatMessage({
                id: 'display_workspace_logo'
              })}`}
              multiple
            />
          </Wrapper>
        </Tabs.TabPane>
      </Tabs>

      {!readOnly && (
        <ButtonWrapper>
          <Button.Primary type="submit">
            {intl.formatMessage({
              id: updateMode ? 'update_btn' : 'create_btn'
            })}
          </Button.Primary>
        </ButtonWrapper>
      )}
    </Form>
  );
};

const OrderPaymentFormContainer = connect(
  state => ({
    paymentMethods: getAllWorkspacePaymentMethods(state)
  }),
  dispatch =>
    bindActionCreators(
      {
        getAllPaymentMethod:
          WorkspacePaymentMethodActions.getAllWorkspacePaymentMethods
      },
      dispatch
    )
)(({ getAllPaymentMethod, onSubmit, form, initialValues = {}, ...props }) => {
  useEffect(() => {
    getAllPaymentMethod({ isActive: true });
  }, [getAllPaymentMethod]);

  return (
    <OrderPaymentForm
      form={form}
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...props}
    />
  );
});

export default reduxForm({
  validate,
  destroyOnUnmount: true,
  initialValues: {}
})(OrderPaymentFormContainer);
