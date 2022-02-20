import React from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';
import { FormattedMessage } from 'react-intl';

import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Errors from '../../Form/Errors';
import TextInput from '../../Form/TextInput';
import Form from '../../Form/Form';
import PhoneRegion from './PhoneRegion';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`;

const validate = (values, { workspacePhoneRegions }) => {
  const errors = {};
  if (!values.phoneRegion) {
    errors.phoneRegion = <FormattedMessage id={'error.required'} />;
  }
  if (!values.idx) {
    errors.idx = <FormattedMessage id={'error.required'} />;
  }
  if (values.phoneRegion) {
    const redundant = workspacePhoneRegions.filter(
      v => v.phoneRegion._id === values.phoneRegion[0]
    );
    if (redundant.length) {
      errors.phoneRegion = (
        <FormattedMessage id={'error.phone_region_duplicate'} />
      );
    }
  }
  return errors;
};

class WorkspacePhoneRegionForm extends React.PureComponent {
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
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true,
      intl,
      formValuePhoneRegion
    } = this.props;

    const inputConent = (
      <React.Fragment>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6} style={{ minHeight: 200 }}>
            <PhoneRegion
              intl={intl}
              name="phoneRegion"
              defaultValue={formValuePhoneRegion}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              type="number"
              name="idx"
              label={intl.formatMessage({
                id: 'idx'
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
          <Title>
            {intl.formatMessage({ id: 'display_user_phone_region_code' })}
          </Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        <FormContent>{inputConent}</FormContent>
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(WorkspacePhoneRegionForm);
