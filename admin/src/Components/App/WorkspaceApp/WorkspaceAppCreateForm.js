import React from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';
import { FormattedMessage } from 'react-intl';

import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Card from '../../Common/Card';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import TextInput from '../../Form/TextInput';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const validate = values => {
  const errors = {};
  const required = <FormattedMessage id={'error.required'} />;

  if (!values.name) {
    errors.name = required;
  }
  return errors;
};

class WorkspaceAppCreateForm extends React.PureComponent {
  renderButtons() {
    const { intl, submitting } = this.props;

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
      intl
    } = this.props;
    const inputConent = (
      <React.Fragment>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              name="name"
              label={intl.formatMessage({
                id: 'display_workspace_app_name'
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
          <Title>{intl.formatMessage({ id: 'nav.workspace_app' })}</Title>
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
})(WorkspaceAppCreateForm);
