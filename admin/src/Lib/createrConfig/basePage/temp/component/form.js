const {
  name: { uc, lc }
} = require('../../../constant');

const e = (module.exports = {});

e.content = `
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

// import { isMultiLanguage${uc} } from '../../../Lib/util';

import Button from '../../Common/Button';
import Title from '../../Common/Title';
import Card from '../../Common/Card';

import { RowWrapper, LeftColWrapper, RightColWrapper } from '../Form/Wrapper';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import TextInput from '../../Form/TextInput';

const ButtonWrapper = styled.div\`
  display: flex;
  flex-direction: row;
  justify-content: center;
\`;

const validate = values => {
  const errors = {};
  const required = <FormattedMessage id={'error.required'} />;

  if (!values.name) {
    errors.name = required;
  }

  return errors;
};

class ${uc}Form extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

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
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true
    } = this.props;

    const inputConent = (
      <RowWrapper>
        <LeftColWrapper xs={12} sm={12} md={6}>
          <TextInput
            name="name"
            label={intl.formatMessage({
              id: 'display_name'
            })}
          />
        </LeftColWrapper>
        <RightColWrapper xs={12} sm={12} md={6} />
      </RowWrapper>
    );

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.${lc}s' })}</Title>
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
})(${uc}Form);
`.replace(/^\s/, '');
