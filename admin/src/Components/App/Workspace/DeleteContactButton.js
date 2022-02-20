import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';

import Button from '../../Common/Button';

class CreateContactButton extends PureComponent {
  render() {
    const {
      input: { value: items = [], onChange },
      i
    } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button.Danger
          style={{
            marginLeft: 25,
            marginBottom: 22,
            fontSize: 14,
            height: 42,
            minWidth: 50,
            lineHeight: '40px',
            margin: 0,
            padding: 0
          }}
          type="button"
          onClick={() => {
            let _arr = cloneDeep(items);
            _arr.splice(i, 1);
            onChange(_arr);
          }}
        >
          x
        </Button.Danger>
      </div>
    );
  }
}

export default props => {
  return <Field component={CreateContactButton} {...props} />;
};
