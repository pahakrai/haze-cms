import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import moment from 'moment';

import { Field } from 'redux-form';

import FieldLabel from './FieldLabel';
import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';

class TimeSelect extends PureComponent {
  static propTypes = {
    format: PropTypes.string
  };
  static defaultProps = {
    format: 'HH:mm'
  };

  render() {
    const {
      input: { onChange, value },
      label,
      meta: { touched, error, warning },
      format,
      size
    } = this.props;
    return (
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>
        <div style={{ width: '100%' }}>
          <TimePicker
            style={{ width: '100%' }}
            onChange={(time, timeString) => onChange(timeString)}
            value={moment(value || '00:00', format)}
            format={format}
            size={size}
          />
        </div>
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </FieldContainer>
    );
  }
}

export default props => {
  return <Field {...props} component={TimeSelect} />;
};
