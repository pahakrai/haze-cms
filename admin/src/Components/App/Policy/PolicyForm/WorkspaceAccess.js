import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import {
  HorizontalContainer,
  HorizontalErrorContainer,
  HorizontalFieldLabel,
  FieldLabel,
  HorizontalContainerWrapper
} from '../../../Form/form.styled';
import FieldContainer from '../../../Form/FieldContainer';
import { ErrorMessage } from '../../../Form/Errors';
import SelectWorkspaceWithModal from '../../../../Containers/Form/SelectWorkspaceWithModal';

const SelectInput = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 6px 10px;
  line-height: 30px;
  border: 1px solid rgba(224, 224, 224, 1);
  width: 100%;
  height: 42px;
  ${props => (props.placeholder ? ' color: #777 ;' : '')}
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const WorkspaceAccess = ({
  input: { value, name },
  label,
  noLabel,
  meta: { touched, error, warning },
  horizontal,
  labelStyle,
  containerStyle,
  placeholder
}) => {
  let Container = FieldContainer;
  let Label = FieldLabel;
  const labelComponent = !noLabel ? (
    <Label style={labelStyle}>{label}</Label>
  ) : null;
  const errorMessage =
    touched &&
    ((error && <ErrorMessage>{error}</ErrorMessage>) ||
      (warning && <ErrorMessage>{warning}</ErrorMessage>));

  if (horizontal) {
    Container = HorizontalContainer;
    Label = HorizontalFieldLabel;
  }
  const display = value?.map?.(v => v?.name).join('、') || '';

  return (
    <SelectWorkspaceWithModal
      name={name}
      multiple
      modalTitle={label}
      control={{ set: v => v, get: v => v._id }}
    >
      {() => (
        <HorizontalContainerWrapper
          horizontal={horizontal}
          style={horizontal ? containerStyle : undefined}
        >
          <Container
            style={horizontal ? undefined : containerStyle}
            error={Boolean(errorMessage)}
          >
            {labelComponent}
            <SelectInput placeholder={!display}>
              {display || placeholder || label}
            </SelectInput>
            {!horizontal && errorMessage}
          </Container>
          <HorizontalErrorContainer leftComponent={labelComponent}>
            {horizontal && errorMessage}
          </HorizontalErrorContainer>
        </HorizontalContainerWrapper>
      )}
    </SelectWorkspaceWithModal>
  );
};

export default props => {
  return <Field component={WorkspaceAccess} {...props} />;
};
