import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Common, { helpers } from '@golpasal/common';
import { Row, Col } from 'react-flexa';

import Button from '../../../Common/Button';
import Title from '../../../Common/Title';
import Card from '../../../Common/Card';
import Errors from '../../../Form/Errors';
import Form from '../../../Form/Form';
import TextInput from '../../../Form/TextInput';
import Dropdown from '../../../Form/Dropdown';
import DatePicker from '../../../Form/DatePicker';
import SelectUser from '../../../../Containers/Form/SelectUser';
import CurrencyDropdowm from '../../../../Containers/Form/CurrencyDropdowm';

import ExpensesSelectButton from './ExpensesSelectButton';
import ExpenseListDisplay from './ExpenseListDisplay';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ButtonWrapper = styled.div`
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

const validate = values => {
  const errors = {};
  const required = <FormattedMessage id={'error.required'} />;

  if (!values.payee) {
    errors.payee = required;
  }
  if (!values.currency) {
    errors.currency = required;
  }
  if (!values.expenses || !values?.expenses?.length) {
    errors.expenses = <FormattedMessage id="error.pls_select_expense" />;
  }

  return errors;
};

class ClaimForm extends React.Component {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  render() {
    const {
      intl,
      hiddenField = {},
      initialValues,
      updateMode,
      pristine,
      submitting,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true
    } = this.props;
    const claimStatus = initialValues.status;
    // const canEditForm =
    //   editOwn ||
    //   helpers.isAclActionAllow(
    //     ['Claim:Approve' || ' Claim:Decline'],
    //     currentUser.actions
    //   );

    const StatusOption = helpers
      .getConstants('status', 'ClaimStatus', intl.locale)
      .map(status => ({
        label: status.text,
        value: status.value
      }));

    const inputConent = (
      <div>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              name="claimNo"
              label={intl.formatMessage({
                id: 'display_claim_no'
              })}
              disabled
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Dropdown
              disabled
              name="status"
              label={intl.formatMessage({ id: 'display_expense_status' })}
              options={StatusOption}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <SelectUser
              full
              disabled={updateMode}
              name="payee"
              query={{ userTypes: [Common.type.UserType.USER] }}
              label={intl.formatMessage({ id: 'display_expense_user' })}
            />
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <CurrencyDropdowm
                  disabled={
                    updateMode &&
                    claimStatus !== Common.status.ClaimStatus.PENDING
                  }
                  name="currency"
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <TextInput
                  disabled
                  name="amount"
                  type="number"
                  label={intl.formatMessage({ id: 'display_expense_amount' })}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <DatePicker
              disabled={
                updateMode && claimStatus !== Common.status.ClaimStatus.PENDING
              }
              name="date"
              label={intl.formatMessage({ id: 'date' })}
            />
          </Col>
          <Col xs={12} sm={12} md={6}>
            {!hiddenField.rejectDate && (
              <DatePicker
                disabled
                name="deisionDate"
                label={intl.formatMessage({
                  id: 'display_expense_reject_date'
                })}
              />
            )}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={6}>
            {!hiddenField.claimDate && (
              <DatePicker
                disabled
                name="deisionDate"
                label={intl.formatMessage({ id: 'display_expense_claim_date' })}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} />
          <Col xs={12} sm={12} md={6}>
            {updateMode && claimStatus === Common.status.ClaimStatus.DECLINED && (
              <TextInput
                rows={4}
                disabled={claimStatus === Common.status.ClaimStatus.DECLINED}
                name="declineReason"
                label={intl.formatMessage({
                  id: 'display_expense_decline_reason'
                })}
              />
            )}
          </Col>
        </Row>
      </div>
    );

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <div style={{ display: 'flow-root' }}>
          <Title style={{ float: 'left' }}>
            {intl.formatMessage({ id: 'display_claims' })}
          </Title>

          <div style={{ float: 'right' }}>
            <Wrapper>
              <Button.Primary
                style={{ marginLeft: 5 }}
                disabled={pristine || submitting}
                type="submit"
              >
                {updateMode
                  ? intl.formatMessage({
                      id: 'update_btn'
                    })
                  : intl.formatMessage({
                      id: 'add'
                    })}
              </Button.Primary>
            </Wrapper>
          </div>
        </div>
        <Card style={{ marginTop: 0 }}>{inputConent}</Card>
        <Row>
          <Col xs={24} sm={24} md={24}>
            <ExpensesSelectButton
              name="expenses"
              disabled={claimStatus !== Common.status.ClaimStatus.PENDING}
              defaultValue={initialValues.expenses}
            />
          </Col>
        </Row>
        <ExpenseListDisplay name="expenses" />
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(ClaimForm);
