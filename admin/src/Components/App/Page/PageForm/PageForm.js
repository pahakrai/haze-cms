import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import PageService from '../../../../Services/APIServices/PageService';

import Button from '../../../Common/Button';
import Title from '../../../Common/Title';
import Card from '../../../Common/Card';
import StepLine from '../../../Common/StepLine';

import Errors from '../../../Form/Errors';
import Form from '../../../Form/Form';

import { SelectTemplateStep, InputsStep } from './PageFormSteps';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const validate = (values, { type }) => {
  const errors = {};
  const required = <FormattedMessage id={'error.required'} />;
  if (!values.path) {
    errors.path = required;
  } else if (!/^\/.*/.test(values.path)) {
    errors.path = <FormattedMessage id={'display_page_path_format_error'} />;
  }
  return errors;
};

const asyncValidate = async (values, props, { intl }) => {
  // const isUpdateForm = values._id ? false : true;
  const result = await PageService.duplicatePath(values._id, values.path);
  if (result.data.duplicate === true) {
    throw Object({
      path: intl.formatMessage({
        id: 'error.route_exist'
      })
    });
  }
};
class PageForm extends React.Component {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };
  state = { step: 0 };
  renderButtons() {
    const { step } = this.state;
    const {
      intl,
      pristine,
      submitting,
      updateMode,
      isTemplate,
      isSection,
      isSeo
    } = this.props;

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
    if (isTemplate || isSection || isSeo) {
      return (
        <Button.Primary disabled={submitting} type="submit">
          {intl.formatMessage({
            id: 'add'
          })}
        </Button.Primary>
      );
    }

    return (
      <ButtonWrapper>
        {!isTemplate && !isSection && !isSeo && (
          <Button.Primary
            style={{ marginRight: 15 }}
            type="button"
            onClick={() => this.setState({ step: step === 0 ? 1 : 0 })}
          >
            {intl.formatMessage({
              id: step === 0 ? 'display_next_step' : 'display_prev_step'
            })}
          </Button.Primary>
        )}
        {step === 1 && (
          <Button.Primary disabled={submitting} type="submit">
            {intl.formatMessage({
              id: 'add'
            })}
          </Button.Primary>
        )}
      </ButtonWrapper>
    );
  }

  render() {
    const { step } = this.state;
    const {
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true,
      isTemplate,
      isSection,
      isSeo,
      updateMode
    } = this.props;
    const inputConent =
      !updateMode && !isTemplate ? (
        <React.Fragment>
          <Card style={{ marginTop: 0, marginBottom: 7 }}>
            <StepLine
              stepOptions={[
                {
                  value: 0,
                  label: (
                    <FormattedMessage id="display_select_page_template_title" />
                  )
                },
                { value: 1, label: <FormattedMessage id="other" /> }
              ]}
              value={step}
            />
          </Card>
          <Card style={{ marginTop: 0 }}>
            {step === 0 && <SelectTemplateStep {...this.props} />}
            {step === 1 && <InputsStep {...this.props} />}
          </Card>
        </React.Fragment>
      ) : (
        <Card>
          <InputsStep {...this.props} />
        </Card>
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
            {intl.formatMessage({
              id: isTemplate
                ? 'nav.pageTemplates'
                : isSection
                ? 'nav.pageSection'
                : isSeo
                ? 'nav.pageSeo'
                : 'nav.pages'
            })}
          </Title>
          {(isSeo || isTemplate || isSection) && (
            <Title.Right>{this.renderButtons()}</Title.Right>
          )}
        </Title.Wrapper>
        {!updateMode && (isSection || isSeo) ? (
          <Card>
            <InputsStep {...this.props} />
          </Card>
        ) : (
          inputConent
        )}
        {!isSeo && !isTemplate && !isSection && this.renderButtons()}
      </Form>
    );
  }
}

export default reduxForm({
  validate,
  // enableReinitialize: true,
  destroyOnUnmount: true,
  initialValues: {},
  asyncValidate,
  asyncBlurFields: ['path']
})(PageForm);
