import React from 'react';
import { Field } from 'redux-form';
import FieldContainer from './FieldContainer';
import styled from 'styled-components';
import SSwitch from '../Common/Switch';
import { ErrorMessage } from './Errors';

import {
  HorizontalContainerWrapper,
  HorizontalFieldLabel,
  HorizontalContainer,
  FieldLabel,
  HorizontalErrorContainer
} from './form.styled';

const MarginFieldLabel = styled(FieldLabel)`
  margin-bottom: 10px;
  font-weight: 600;
  color: #666666;
  font-size: ${props => props.theme.fonts.size.h5};
`;

function Switch({
  input,
  label,
  noLabel,
  disabled,
  horizontal = false,
  meta: { touched, error, warning },
  ...props
}) {
  let Container = horizontal ? HorizontalContainer : FieldContainer;
  let Label = horizontal ? HorizontalFieldLabel : MarginFieldLabel;
  const errorMessage =
    touched &&
    ((error && <ErrorMessage>{error}</ErrorMessage>) ||
      (warning && <ErrorMessage>{warning}</ErrorMessage>));

  const labelComponent = !noLabel && <Label>{label}</Label>;

  return (
    <HorizontalContainerWrapper>
      <Container>
        {labelComponent}
        <SSwitch
          disabled={disabled}
          {...input}
          value={Boolean(input.value)}
          onToggle={input.onChange}
          {...props}
        />
      </Container>
      {horizontal && (
        <HorizontalErrorContainer leftComponent={labelComponent}>
          {errorMessage}
        </HorizontalErrorContainer>
      )}
    </HorizontalContainerWrapper>
  );
}

export default props => {
  return <Field {...props} component={Switch} />;
};
