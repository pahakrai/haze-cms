import React from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
// import { helpers } from '@golpasal/common';
import { Row, Col } from 'react-flexa';
import { FormattedMessage } from 'react-intl';
import Checkbox from '../../Form/Checkbox';
import { strIsNumber } from '../../../Lib/util';
import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Errors from '../../Form/Errors';
import DatePicker from '../../Form/DatePicker';
import Form from '../../Form/Form';
import TextInput from '../../Form/TextInput';
import Dropdown from '../../Form/Dropdown';
import CurrencyDropdowm from '../../../Containers/Form/CurrencyDropdowm';
import SelectPricingType from './SelectPricingType';
import PricingService from '../../../Services/APIServices/PricingService';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const validate = values => {
  const errors = { vehicleType: null };
  const gtzeroNumber = <FormattedMessage id={'error.number.gtzero'} />;
  const required = <FormattedMessage id={'error.required'} />;

  if (!values.priceType) {
    errors.priceType = required;
  }

  if (!values.code) {
    errors.code = required;
  }

  if (!values.vehicleType) {
    errors.vehicleType = required;
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

const asyncValidate = async values => {
  const errors = {};
  const result = await PricingService.duplicateVehicleType(
    values.vehicleType,
    values.tunnelId,
    values._id
  );
  if (String(result.data) === 'true') {
    errors.vehicleType = (
      <FormattedMessage id="error.vehicle_type_has_been_used" />
    );
  }

  if (Object.keys(errors).length >= 0) {
    throw errors;
  }
};

class PrcingsForm extends React.PureComponent {
  renderButtons() {
    const { intl, pristine, submitting, updateMode } = this.props;

    if (updateMode) {
      return (
        <ButtonWrapper>
          <Button.Primary disabled={pristine || submitting} type="submit">
            {intl.formatMessage({
              id: 'update_btn'
            })}
          </Button.Primary>
        </ButtonWrapper>
      );
    }
    return (
      <ButtonWrapper>
        <Button.Primary disabled={submitting} type="submit">
          {intl.formatMessage({
            id: 'create_btn'
          })}
        </Button.Primary>
      </ButtonWrapper>
    );
  }

  render() {
    const {
      // workspaces,
      // locale,
      onSubmit,
      vehicleTypes,
      // form,
      // initialValues,
      onSubmitSuccess,
      tunnelId,
      onSubmitFail = () => true,
      intl
    } = this.props;

    const VehicleTypesOption = [];
    if (vehicleTypes) {
      vehicleTypes.forEach((type, i) => {
        VehicleTypesOption.push({
          label: type.name ? type.name[intl.locale] : '',
          value: type._id
        });
      });
    }
    const inputConent = (
      <React.Fragment>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              intl={intl}
              name="code"
              label={intl.formatMessage({
                id: 'display_workspace_code'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Checkbox
              name="isActive"
              label={intl.formatMessage({
                id: 'display_pushnotificationschedule_isActive'
              })}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextInput
              name="description"
              rows={4}
              label={intl.formatMessage({
                id: 'display_description'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <SelectPricingType
              intl={intl}
              label={intl.formatMessage({
                id: 'display_type'
              })}
              name="priceType"
            />
          </Col>
          {tunnelId && (
            <Col xs={12} sm={6} md={6} lg={6}>
              <Dropdown
                name="vehicleType"
                label={intl.formatMessage({ id: 'display_vehicle_type' })}
                options={VehicleTypesOption}
              />
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <CurrencyDropdowm
              name="currency"
              label={intl.formatMessage({
                id: 'currency'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              type="number"
              name="amount"
              label={intl.formatMessage({
                id: 'amount'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <DatePicker
              name="effectiveDateFr"
              label={intl.formatMessage({
                id: 'display_coupon_applicationTime'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <DatePicker
              name="effectiveDateTo"
              label={intl.formatMessage({
                id: 'display_coupon_deadline'
              })}
            />
          </Col>
        </Row>
      </React.Fragment>
    );

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'display_cart_price' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        <div>{inputConent}</div>
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {},
  asyncValidate,
  asyncChangeFields: ['vehicleType']
})(PrcingsForm);
