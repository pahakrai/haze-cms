import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import Error from './../../Form/Error';
import Button from '../../Common/Button';

const buttonStyle = {
  height: 42,
  minWidth: 50,
  fontSize: 20,
  lineHeight: '40px',
  margin: 0,
  padding: 0
};

class WorkspaceHeaderCreateButton extends PureComponent {
  render() {
    const {
      input: { value: items = [], name, onChange }
    } = this.props;
    return (
      <div>
        <Button
          style={{
            ...buttonStyle,
            marginBottom: 22,
            fontSize: 14
          }}
          type="button"
          onClick={() =>
            onChange([
              ...items,
              {
                value: '',
                key: ''
              }
            ])
          }
        >
          +
        </Button>
        <Error touched name={name} style={{ marginTop: 10 }} />
      </div>
    );
  }
}

export default props => {
  return <Field component={WorkspaceHeaderCreateButton} {...props} />;
};
