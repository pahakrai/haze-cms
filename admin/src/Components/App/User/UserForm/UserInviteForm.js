import React from 'react';
import { Col, Row } from 'react-flexa';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import * as UserService from '../../../../Services/APIServices/UserService';

import Errors from '../../../Form/Errors';
import Form from '../../../Form/Form';
// button
import Button from '../../../Common/Button';

import GetInputComponent from './GetInputComponent';

import FormName from '../../../../Constants/Form';
import * as Regex from '../../../../Constants/Regex';

export const validate = (values, { requirementFields }) => {
  const errors = {};
  const reg = Regex.email;
  const required = <FormattedMessage id={'error.required'} />;

  if (!values.email) {
    errors.email = required;
  } else if (!reg.test(values.email)) {
    errors.email = <FormattedMessage id={'error.format'} />;
  }

  return errors;
};

const asyncValidate = async (values, dispatch, formProps, field) => {
  const errors = {};
  if (values.email) {
    const result = await UserService.isDuplicateEmail(values.email, values._id);
    if (String(result.data) === 'true') {
      errors.email = <FormattedMessage id="error.email_has_been_used" />;
    }
  }
  if (Object.keys(errors).length >= 0) {
    throw errors;
  }
};

const UserForm = ({
  asyncValidating,
  canSelectLanguage,
  displaySubmitButtons,
  form,
  fieldControl,
  intl,
  initialValues,
  invalid,
  onSubmit,
  onSubmitSuccess,
  onConfirmUser,
  onClickDelete,
  onSubmitFail = () => true,
  submitting,
  statusText,
  userType,
  upgrade,
  workspaces = [],
  requirementFields
}) => {
  const canEditForm = true;

  const inputComponents = GetInputComponent({
    intl,
    onConfirmUser,
    fieldControl,
    userType,
    canEditForm,
    requirementFields
  });
  return (
    <Form
      name={form}
      onSubmit={(value, ev) => {
        if (ev.target.name && ev.target.name === FormName.CHANGE_PASSWORD) {
          return;
        }
        onSubmit(value);
      }}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      <Row>
        <Col xs={12} sm={12} md={4}>
          {inputComponents.email}
        </Col>
        {/* <Col xs={12} sm={12} md={8}>
            {inputComponents.email}
          </Col>
          <Col xs={12} sm={12} md={8}>
            {inputComponents.email}
          </Col> */}
      </Row>
      <Row justifyContent="center">
        <Button.Primary disabled={submitting || !canEditForm} type="submit">
          <FormattedMessage id="invite_btn" />
        </Button.Primary>
      </Row>
    </Form>
  );
};

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  asyncValidate,
  asyncBlurFields: ['email']
})(UserForm);
