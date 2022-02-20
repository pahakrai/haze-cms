import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import SelectMultiPage from '../../../Containers/Form/SelectMultiPage';

import Button from '../../Common/Button';
import Title from '../../Common/Title';
import Card from '../../Common/Card';

import { RowWrapper, LeftColWrapper, RightColWrapper } from '../Form/Wrapper';
import Uploader from '../../Form/Uploader';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import Dropdown from '../../Form/Dropdown';

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

class PageTemplateForm extends React.PureComponent {
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
            id: 'add'
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
      onSubmitFail = () => true,
      currentLocation
    } = this.props;
    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.pageTemplates' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>

        <RowWrapper>
          <LeftColWrapper xs={12} sm={12} md={6} lg={4}>
            <Card style={{ marginTop: 0 }}>
              <Uploader
                intl={intl}
                uploadReview
                supportLink
                multiple={false}
                name="preview"
                label={`${intl.formatMessage({ id: 'label_images' })}`}
              />
            </Card>
          </LeftColWrapper>
          <RightColWrapper xs={12} sm={12} md={6} lg={8}>
            <Card style={{ marginTop: 0 }}>
              <RowWrapper>
                <LeftColWrapper xs={12} sm={12} md={6}>
                  <Dropdown
                    name="isActive"
                    label={intl.formatMessage({
                      id: 'display_page_status'
                    })}
                    options={[
                      {
                        label: intl.formatMessage({
                          id: 'display_page_active'
                        }),
                        value: 'true'
                      },
                      {
                        label: intl.formatMessage({
                          id: 'display_page_inactive'
                        }),
                        value: 'false'
                      }
                    ]}
                  />
                </LeftColWrapper>
                <RightColWrapper xs={12} sm={12} md={6}>
                  <SelectMultiPage
                    searchOpts={{
                      type: 'content',
                      populate: 'layout',
                      isSystem: true
                    }}
                    toRedirect={defaultLink =>
                      `${defaultLink}?redirect=${
                        currentLocation || '/page-templates'
                      }`
                    }
                    tips={intl.formatMessage({ id: 'display_template_tips' })}
                    label={intl.formatMessage({ id: 'display_template' })}
                    intl={intl}
                    isMulti={false}
                    name="page"
                  />
                </RightColWrapper>
              </RowWrapper>
            </Card>
          </RightColWrapper>
        </RowWrapper>
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(PageTemplateForm);
