import React from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Title from '../../../Common/Title';
import Card from '../../../Common/Card';
import Button from '../../../Common/Button';
import Errors from '../../../Form/Errors';
import Form from '../../../Form/Form';
import TextInput from '../../../Form/TextInput';
import CommonConstantsSelect from '../../../Form/CommonConstantsSelect';
import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper
} from '../../Form/Wrapper';

import WorkspaceAccess from './WorkspaceAccess';

const validate = values => {
  const errors = {};

  return errors;
};
export const PolicyForm = ({
  onSubmit,
  onSubmitSuccess,
  onSubmitFail,
  submitting,
  pristine,
  updateMode
}) => {
  const intl = useIntl();

  return (
    <Form
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      <div style={{ display: 'flow-root' }}>
        <Title style={{ float: 'left' }}>
          {intl.formatMessage({ id: 'nav.policies' })}
        </Title>

        <div style={{ float: 'right' }}>
          <Wrapper>
            <Button.Primary
              style={{ marginLeft: 5 }}
              disabled={pristine || submitting}
              type="submit"
            >
              {updateMode
                ? intl.formatMessage({
                    id: 'update_btn'
                  })
                : intl.formatMessage({
                    id: 'create_btn'
                  })}
            </Button.Primary>
          </Wrapper>
        </div>
      </div>
      <Card style={{ marginTop: 0 }}>
        <RowWrapper>
          <LeftColWrapper xs={12} md={6}>
            <TextInput
              name="name"
              label={intl.formatMessage({
                id: 'display_name'
              })}
              disabled={updateMode}
            />
          </LeftColWrapper>
          <RightColWrapper xs={12} md={6}>
            <CommonConstantsSelect
              name="workspaceTypes"
              label={intl.formatMessage({
                id: 'display_policy_workspace_type'
              })}
              isMulti
              category="type"
              type="WorkspaceType"
            />
          </RightColWrapper>
        </RowWrapper>
        <WorkspaceAccess
          name="workspaceAccess"
          label={intl.formatMessage({
            id: 'display_policy_workspace'
          })}
        />
      </Card>
    </Form>
  );
};

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ButtonWrapper = styled.div`
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(PolicyForm);
