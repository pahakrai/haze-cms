import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formValueSelector, change as formValueChange } from 'redux-form';

export const withFormValues = (options = {}) => Comp =>
  connect(
    (state, { form }) => {
      const newProps = { form };
      const { fields } = options;

      if (form && fields && fields.length) {
        const selector = formValueSelector(form);
        fields.forEach(field => {
          if (Array.isArray(field)) {
            newProps[field[1]] = selector(state, field[0]);
          } else {
            newProps[field] = selector(state, field);
          }
        });
      }
      return newProps;
    },
    dispatch =>
      bindActionCreators(
        {
          formValueChange
        },
        dispatch
      )
  )(({ formValueChange, form, ...props }) => (
    <Comp
      {...props}
      formValueChange={(...args) => formValueChange(form, ...args)}
    />
  ));
