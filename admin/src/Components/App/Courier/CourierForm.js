import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-flexa';
import { isMultiLanguageCourier } from '../../../Lib/util';
import * as Regex from '../../../Constants/Regex';

import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import FormName from '../../../Constants/Form';
import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput';
import TextInput from '../../Form/TextInput';
import Checkbox from '../../Form/Checkbox';

const FormContent = styled.div`
  padding: 20px 30px 100px;
  background-color: #fff;
  border-radius: 5px;
`;

const validate = values => {
  const reg = Regex.code;
  const url = Regex.url;
  const errors = {};
  const { name } = values;
  const nameError = validateMTField(name || {}, isMultiLanguageCourier);

  if (nameError) {
    errors.name = nameError;
  }
  if (values.idx && !/^[0-9]+$/.test(values.idx)) {
    errors.idx = <FormattedMessage id={'error.number'} />;
  }
  if (!values.code) {
    errors.code = <FormattedMessage id={'error.required'} />;
  } else if (!reg.test(values.code)) {
    errors.code = <FormattedMessage id={'error.number.en'} />;
  }
  if (!values.url) {
    errors.url = <FormattedMessage id={'error.required'} />;
  } else if (values.url) {
    if (!url.test(values.url)) {
      errors.url = <FormattedMessage id={'error.format'} />;
    }
  }

  return errors;
};

class CourierForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  renderButtons() {
    const { intl, pristine, submitting } = this.props;

    if (this.props.form === FormName.COURIER_UPDATE) {
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
      // initialValues,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true
    } = this.props;
    const inputContent = (
      <FormContent>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
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
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <MultiLanguageTextInput
              intl={intl}
              isMultiLanguage={isMultiLanguageCourier}
              name="name"
              label={intl.formatMessage({
                id: 'display_service_name'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              name="url"
              label={intl.formatMessage({
                id: 'display_url'
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              name="idx"
              type="number"
              label={intl.formatMessage({
                id: 'idx'
              })}
            />
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
          <Title>{intl.formatMessage({ id: 'nav.couriers' })}</Title>
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
})(CourierForm);
