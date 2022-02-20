import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withReduxForm } from 'redux-form/es/ReduxFormContext';

export const ErrorMessageSpan = styled.span`
  display: block;
  color: #f31c1c;
  text-align: left;
  font-weight: initial;
`;

class Errors extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  render() {
    const { error } = this.props._reduxForm;
    if (Array.isArray(error)) {
      return error.map((err, errIndex) => (
        <ErrorMessage key={errIndex}>{err}</ErrorMessage>
      ));
    } else if (typeof error === 'object') {
      if (
        error.$$typeof &&
        error.$$typeof.toString() === Symbol('react.element').toString()
      ) {
        return <ErrorMessage>{error}</ErrorMessage>;
      }
      return Object.keys(error).map(key => (
        <ErrorMessage key={key}>{`${key}: ${error[key]}`}</ErrorMessage>
      ));
    } else if (typeof error === 'string') {
      return <ErrorMessage>{error}</ErrorMessage>;
    } else {
      return null;
    }
  }
}

export const ErrorMessage = props => (
  <div className="errorMessage">
    <ErrorMessageSpan {...props} />
  </div>
);
Errors.ErrorMessage = ErrorMessage;

export default withReduxForm(Errors);
