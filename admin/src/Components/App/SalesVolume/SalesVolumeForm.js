import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-flexa';

import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import * as Regex from '../../../Constants/Regex';
import TextInput from '../../Form/TextInput';
import Dropdown from '../../Form/Dropdown';

const FormContent = styled.div`
  padding: 20px 30px 100px;
  background-color: #fff;
  border-radius: 5px;
`;

const validate = values => {
  const reg = Regex.dateYears;
  const errors = {};
  if (!values.amount) {
    errors.amount = <FormattedMessage id={'error.required'} />;
  }
  if (!values.time) {
    errors.time = <FormattedMessage id={'error.required'} />;
  } else if (!reg.test(values.time)) {
    errors.time = <FormattedMessage id={'error.time_format'} />;
  }
  if (!values.currency) {
    errors.currency = <FormattedMessage id={'error.required'} />;
  }
  return errors;
};

class SalesVolumeForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  renderButtons() {
    const { intl, pristine, updateMode, submitting } = this.props;

    if (updateMode) {
      return (
        <Button.Primary disabled={pristine || submitting} type="submit">
          {intl.formatMessage({
            id: 'update_btn'
          })}
        </Button.Primary>
      );
    }
    return (
      <Button.Primary disabled={submitting} type="submit">
        {intl.formatMessage({
          id: 'add'
        })}
      </Button.Primary>
    );
  }

  render() {
    const {
      intl,
      form,
      currencies,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true
    } = this.props;
    const CurrenciesOption = [];
    if (currencies) {
      currencies.forEach(currency => {
        CurrenciesOption.push({
          label: currency.code,
          value: currency.code
        });
      });
    }
    const inputContent = (
      <FormContent>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              name="time"
              placeholder="YYYY-MM"
              label={intl.formatMessage({
                id: 'display_month'
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <TextInput
                  name="amount"
                  type="number"
                  label={intl.formatMessage({
                    id: 'amount'
                  })}
                />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Dropdown
                  name="currency"
                  label={intl.formatMessage({ id: 'currency' })}
                  options={CurrenciesOption}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </FormContent>
    );
    return (
      <Form
        form={form}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.sales_volume' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        {inputContent}
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(SalesVolumeForm);
