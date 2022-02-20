import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Button from '../../Common/Button';
import Error from '../../Form/Error';

const ButtonWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0px 5px'
};

const buttonStyle = {
  height: 42,
  minWidth: 50,
  fontSize: 20,
  lineHeight: '40px',
  margin: '20px 0 0',
  padding: 0
};

class CreateContactButton extends PureComponent {
  render() {
    const {
      input: { value: items = [], onChange }
    } = this.props;
    return (
      <div style={ButtonWrapper}>
        <div>
          <Button
            style={buttonStyle}
            type="button"
            onClick={() =>
              onChange([
                ...items,
                {
                  department: '',
                  email: '',
                  address: '',
                  coordinates: [],
                  name: '',
                  phoneNo: ''
                }
              ])
            }
          >
            +
          </Button>
          <Error touched name="contacts" style={{ marginTop: 10 }} />
        </div>
      </div>
    );
  }
}

export default props => {
  return <Field component={CreateContactButton} {...props} />;
};
