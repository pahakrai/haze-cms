import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Button from '../../Common/Button';

const buttonStyle = {
  height: 42,
  minWidth: 50,
  fontSize: 20,
  lineHeight: '40px',
  marginTop: 15,
  padding: 0
};

const ButtonWrapper = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  padding: '0 5px'
};

class createButton extends PureComponent {
  render() {
    const {
      input: { value: items = [], onChange }
    } = this.props;
    return (
      <div style={ButtonWrapper}>
        <Button
          style={buttonStyle}
          type="button"
          onClick={() =>
            onChange([
              ...items,
              {
                app: 'Customize',
                hooks: [{ code: '', url: '', method: '', headers: [] }]
              }
            ])
          }
        >
          +
        </Button>
      </div>
    );
  }
}

export default props => {
  return <Field component={createButton} {...props} />;
};
