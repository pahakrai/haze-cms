import React from 'react';
import { reduxForm } from 'redux-form';
import { Row, Col } from 'react-flexa';
import styled from 'styled-components';

import TextInput from '../../Form/TextInput';
import Checkbox from '../../Form/Checkbox';
import Form from '../../Form/Form';
import Errors from '../../Form/Errors';
import Uploader from '../../Form/Uploader';
import SelectList from '../../Form/SelectList';
import Card from '../../Common/Card';
import Title from '../../Common/Title';
import Button from '../../Common/Button';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const validate = values => {
  const errors = {};
  return errors;
};

const FileMetaForm = ({
  onSubmit,
  error,
  locale,
  intl,
  form,
  initialValues,
  onSubmitSuccess,
  invalid,
  submitting,
  pristine,
  isUpdateForm,
  onSubmitFail = () => true
}) => {
  const tagSelectOptions = [
    { key: 'tag1', value: 'tag1' },
    { key: 'tag2', value: 'tag2' },
    { key: 'tag3', value: 'tag3' }
  ];
  return (
    <Form
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />

      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'fileMeta.title' })}</Title>
        <Title.Right>
          {isUpdateForm ? (
            <ButtonWrapper>
              <Button.Primary disabled={pristine || submitting} type="submit">
                {intl.formatMessage({
                  id: 'update_btn'
                })}
              </Button.Primary>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <Button.Primary disabled={submitting} type="submit">
                {intl.formatMessage({
                  id: 'create_btn'
                })}
              </Button.Primary>
            </ButtonWrapper>
          )}
        </Title.Right>
      </Title.Wrapper>
      <Row>
        <Col xs={12} sm={6} md={12}>
          <Card>
            <Uploader
              intl={intl}
              multiple={false}
              name="files"
              label={intl.formatMessage({ id: 'label_files' })}
            />
            <TextInput
              disabled
              name="folder"
              label={intl.formatMessage({ id: 'display_file_folder' })}
            />
            <SelectList
              name="tags"
              label={intl.formatMessage({ id: 'display_tags' })}
              selects={tagSelectOptions}
            />
            <Checkbox
              name="isSystemFile"
              label={intl.formatMessage({ id: 'display_file_isSystem_file' })}
            />
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(FileMetaForm);
