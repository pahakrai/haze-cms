import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Button from '../../../../Common/Button';
import Error from '../../../../Form/Error';
import styled from 'styled-components';
import ObjectID from 'bson-objectid';

const buttonStyle = {
  height: 42,
  minWidth: 50,
  fontSize: 20,
  lineHeight: '40px',
  margin: 0,
  padding: 0
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 5px;
`;
class CreateLogisticItemButton extends PureComponent {
  render() {
    const {
      input: { value: items = [], onChange }
    } = this.props;
    return (
      <ButtonWrapper>
        <Button
          style={buttonStyle}
          type="button"
          onClick={() =>
            onChange([
              ...items,
              {
                idx: items.length === 0 ? 1 : items.length + 1,
                status: 0,
                _id: new ObjectID().toHexString()
              }
            ])
          }
        >
          +
        </Button>
        <Error touched name="logisticItems" style={{ marginTop: 10 }} />
      </ButtonWrapper>
    );
  }
}

export default props => {
  return <Field component={CreateLogisticItemButton} {...props} />;
};
