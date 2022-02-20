import React from 'react';
// import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-flexa';
import { helpers as EcommCommonHelpers } from '@golpasal/common';
import { isMultiLanguageUserLevel } from '../../../Lib/util';
import Card from '../../Common/Card';
import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Dropdown from '../../Form/Dropdown';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import FormName from '../../../Constants/Form';
import Checkbox from '../../Form/Checkbox';
import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput';

const validate = (values, { currentUserType }) => {
  const errors = {};

  const nameError = validateMTField(
    values.name || {},
    isMultiLanguageUserLevel
  );

  if (!values.userType) {
    errors.userType = <FormattedMessage id={'error.required'} />;
  }
  if (nameError) {
    errors.name = nameError;
  }

  return errors;
};
class UserLevelForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const hasDefaultValue = props.initialValues.contacts;
    this.state = {
      hasDefaultValue,
      activeKey: '1'
    };
  }

  renderButtons() {
    const { intl, invalid, pristine, submitting } = this.props;
    if (this.props.form === FormName.USER_LEVEL_UPDATE) {
      return (
        <Button.Primary
          disabled={invalid || pristine || submitting}
          type="submit"
        >
          {intl.formatMessage({
            id: 'update_btn'
          })}
        </Button.Primary>
      );
    }
    return (
      <Button.Primary disabled={invalid || submitting} type="submit">
        {intl.formatMessage({
          id: 'add'
        })}
      </Button.Primary>
    );
  }

  render() {
    const {
      intl,
      // images,
      onSubmit,
      onSubmitSuccess,
      // updateMode,
      onSubmitFail = () => true
      // userLevelId
      // initialValues
      // form
    } = this.props;

    const userTypeOption = EcommCommonHelpers.getConstants(
      'type',
      'UserType',
      intl.locale
    ).map(UserType => ({
      label: UserType.text,
      value: UserType.value
    }));

    const inputConent = (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <MultiLanguageTextInput
              intl={intl}
              isMultiLanguage={isMultiLanguageUserLevel}
              name="name"
              label={intl.formatMessage({
                id: 'display_name'
              })}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <Checkbox
              name="isActive"
              labelIndent={3}
              style={{ marginBottom: 0 }}
              label={intl.formatMessage({
                id: 'display_pushnotificationschedule_isActive'
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <Dropdown
              name="userType"
              label={intl.formatMessage({
                id: 'display_type'
              })}
              options={userTypeOption}
            />
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
        <Title.Wrapper>
          <Title>
            {intl.formatMessage({ id: 'nav.user_level_management' })}
          </Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        <Card style={{ marginTop: 0 }}>{inputConent}</Card>
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(UserLevelForm);
