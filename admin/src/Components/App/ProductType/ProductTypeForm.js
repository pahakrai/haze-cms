import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-flexa';
import { isMultiLanguageProductType } from '../../../Lib/util';
import { helpers } from '@golpasal/common';

import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import Dropdown from '../../Form/Dropdown';
import Uploader from '../../Form/Uploader';
import FormName from '../../../Constants/Form';
import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput';
import TextInput from '../../Form/TextInput';

const FormContent = styled.div`
  padding: 20px 30px 100px;
  background-color: #fff;
  border-radius: 5px;
`;

const validate = values => {
  const errors = {};
  const { name } = values;
  const nameError = validateMTField(name || {}, isMultiLanguageProductType);

  if (nameError) {
    errors.name = nameError;
  }

  return errors;
};

class ProductTypeForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  renderButtons() {
    const { intl, pristine, submitting } = this.props;

    if (this.props.form === FormName.PRODUCT_TYPE_UPDATE) {
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
            <MultiLanguageTextInput
              intl={intl}
              isMultiLanguage={isMultiLanguageProductType}
              name="name"
              label={intl.formatMessage({
                id: 'display_name'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Dropdown
              label={intl.formatMessage({
                id: 'status'
              })}
              name="status"
              options={helpers
                .getConstants('status', 'ProductTypeStatus', intl.locale)
                .map(status => ({
                  label: status.text,
                  value: status.value
                }))}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <MultiLanguageTextInput
              intl={intl}
              isMultiLanguage={isMultiLanguageProductType}
              name="description"
              label={intl.formatMessage({
                id: 'display_description'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              name="content"
              rows={4}
              label={intl.formatMessage({
                id: 'display_content'
              })}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Uploader
              multiple
              label={intl.formatMessage({ id: 'display_coupon_images' })}
              fileMaxSize={1050000}
              intl={intl}
              name="images"
              displayFileMetas={false}
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
          <Title>{intl.formatMessage({ id: 'display_type' })}</Title>
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
})(ProductTypeForm);
