import React from 'react';
import { Field } from 'redux-form';

import DropdownTreeView from '../DropdownTree';
import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';
import { FieldLabel } from './form.styled';

const DropdownTree = props => {
  const {
    categories,
    input,
    label,
    intl,
    meta: { touched, error, warning },
    ...otherProps
  } = props;
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <div>
        {categories && categories.length > 0 ? (
          <DropdownTreeView
            input={input}
            categories={categories}
            placeholder={label}
            intl={intl}
            {...otherProps}
          />
        ) : null}
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </div>
    </FieldContainer>
  );
};

export default props => {
  return <Field {...props} component={DropdownTree} />;
};
