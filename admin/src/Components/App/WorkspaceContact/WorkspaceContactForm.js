import React from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import Button from '../../Common/Button';
import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper
} from '../../../Components/App/Form/Wrapper';

import FormName from '../../../Constants/Form';
import * as Regex from '../../../Constants/Regex';
import Card from '../../Common/Card';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import TextInput from '../../Form/TextInput';

const validate = values => {
  const errors = {};
  const websiteValue = /(http|https):\/\/([\w.]+\/?)\S*/;
  const requiredErrorText = <FormattedMessage id={'error.required'} />;
  const addressError = <FormattedMessage id={'error.required'} />;
  if (values.isPrimary === undefined) {
    errors.isPrimary = requiredErrorText;
  }
  const reg = Regex.email;
  if (!reg.test(values.email)) {
    errors.email = <FormattedMessage id={'error.format'} />;
  }
  if (!websiteValue.test(values.website)) {
    errors.website = <FormattedMessage id={'error.format'} />;
  }
  if (
    !values.address ||
    !values.address.geometry ||
    !values.address.geometry.coordinates ||
    !values.address.geometry.coordinates.length ||
    !values.address.properties ||
    !values.address.properties.name
  ) {
    errors.address = addressError;
  }
  return errors;
};

class WorkspaceContactForm extends React.PureComponent {
  renderButtons() {
    const { intl, invalid, pristine, submitting } = this.props;
    const disabled = submitting || pristine || invalid;

    if (this.props.form === FormName.WORKSPACE_UPDATE_CONTACT) {
      return (
        <Button.Primary disabled={disabled} type="submit">
          {intl.formatMessage({
            id: 'update_btn'
          })}
        </Button.Primary>
      );
    }
    return (
      <Button.Primary disabled={disabled} type="submit">
        {intl.formatMessage({
          id: 'add'
        })}
      </Button.Primary>
    );
  }

  render() {
    const {
      intl
      // updateMode,
    } = this.props;

    return (
      <Form>
        <Errors />
        {/* <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'display_contacts' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper> */}
        <Card>
          <RowWrapper>
            <LeftColWrapper xs={12} sm={12} md={6}>
              <TextInput
                label={intl.formatMessage({
                  id: 'display_person'
                })}
                name="name"
              />
              <TextInput
                label={intl.formatMessage({
                  id: 'display_phone'
                })}
                type="number"
                name="phoneNo"
              />
            </LeftColWrapper>
            <RightColWrapper xs={12} sm={12} md={6}>
              <TextInput
                name="email"
                label={intl.formatMessage({
                  id: 'display_email'
                })}
              />
              <TextInput
                name="department"
                label={intl.formatMessage({
                  id: 'display_department'
                })}
              />
            </RightColWrapper>
          </RowWrapper>
        </Card>
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(WorkspaceContactForm);
