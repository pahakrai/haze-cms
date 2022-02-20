import React from 'react';
import { reduxForm } from 'redux-form';
import { Row, Col } from 'react-flexa';
import { FormattedMessage } from 'react-intl';
// containers
import SelectPolicy from '../../../Containers/Form/UserGroupPolicy/SelectPolicy';
import SelectUserList from '../../../Containers/Form/User/SelectUserList';
// SelectUserList
// components
// import Button from '../../Common/Button';
import Card from '../../Common/Card';
import Title from '../../Common/Title';
import { RowWrapper } from '../Form/Wrapper';
// Form components
import Form from '../../Form/Form';
import Errors from '../../Form/Errors';
// import Dropdown from '../../Form/Dropdown';
// import DatePicker from '../../Form/DatePicker';
import TextInput from '../../Form/TextInput';
// import Switch from '../../Form/Switch';
// Service
import UserGroupService from '../../../Services/APIServices/UserGroupService';
// auth button
import withAuthButton from '../../../Containers/Ac/withAuthButton';
const CreateButton = withAuthButton(['UserGroup:Create']);
const EditButton = withAuthButton(['UserGroup:Edit']);

const validate = values => {
  const errors = {};
  const requiredError = <FormattedMessage id={'error.required'} />;
  // if (!values.code) errors.code = requiredError;
  if (!values.name) errors.name = requiredError;
  // if (!values.userCount) errors.userCount = <FormattedMessage id={'error.required'} />;
  // if (!values.description) errors.description = requiredError;
  // if (!values.permissions) errors.permissions = requiredError;
  return errors;
};

export const asyncValidate = async (values, action, { updateMode }) => {
  const { name } = values;
  const errors = {};
  if (name && !updateMode) {
    // code;
    const result = await UserGroupService.duplicateName(name, values._id);
    if (String(result.data) === 'true') {
      errors.name = <FormattedMessage id={'error.code_exist'} />;
    }
  }
  if (Object.keys(errors).length >= 0) {
    throw errors;
  }
};

const UserGroupForm = ({
  error,
  locale,
  intl,
  form,
  initialValues,
  invalid,
  submitting,
  pristine,
  onSubmit,
  onSubmitSuccess,
  onSubmitFail = () => true,
  updateMode
}) => (
  <Form
    onSubmit={onSubmit}
    onSubmitSuccess={onSubmitSuccess}
    onSubmitFail={onSubmitFail}
  >
    <Title.Wrapper>
      <Title>{intl.formatMessage({ id: 'nav.user-groups' })}</Title>
      <Title.Right>
        {!updateMode && (
          <CreateButton
            intl={intl}
            updateMode={updateMode}
            disabled={updateMode ? pristine || submitting : submitting}
          />
        )}
        {updateMode && (
          <EditButton
            intl={intl}
            updateMode={updateMode}
            disabled={updateMode ? pristine || submitting : submitting}
          />
        )}
      </Title.Right>
    </Title.Wrapper>
    <Errors />
    <RowWrapper>
      <Card.Full>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            {/* <TextInput
              disabled={updateMode}
              name="_id"
              label={intl.formatMessage({
                id: 'display_userGroup_code'
              })}
            /> */}
            <TextInput
              name="name"
              label={intl.formatMessage({
                id: 'display_userGroup_name'
              })}
            />
            {/* <TextInput
              name="description"
              label={intl.formatMessage({
                id: 'display_userGroup_description'
              })}
            /> */}
          </Col>
          {/* <Col xs={12} sm={12} md={12} lg={6}>
            <TextInput
              type="number"
              name="userCount"
              label={intl.formatMessage({
                id: 'display_userGroup_userCount'
              })}
              disabled
            />
            <Switch
              name="isActive"
              label={intl.formatMessage({
                id: 'display_userGroup_isActive'
              })}
            />
          </Col> */}
        </Row>
      </Card.Full>
    </RowWrapper>
    <RowWrapper>
      <Card.Full>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SelectUserList
              intl={intl}
              name="users"
              label={intl.formatMessage({
                id: 'display_userGroup_users'
              })}
            />
          </Col>
        </Row>
      </Card.Full>
    </RowWrapper>
    <RowWrapper>
      <Card.Full>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SelectPolicy
              intl={intl}
              name="policies"
              label={intl.formatMessage({
                id: 'display_userGroup_permissions'
              })}
            />
          </Col>
        </Row>
      </Card.Full>
    </RowWrapper>
  </Form>
);

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  asyncValidate,
  asyncBlurFields: ['name']
})(UserGroupForm);
