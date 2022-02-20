import React from 'react';
import Button from '../../Common/Button';
const buttonStyle = {
  height: 42,
  minWidth: 50,
  fontSize: 20,
  lineHeight: '40px',
  margin: 0,
  padding: 0
};

const DeleteButton = ({ onChanged }) => {
  return (
    <Button.Danger
      style={{
        ...buttonStyle,
        marginBottom: 22,
        fontSize: 14
      }}
      type="button"
      onClick={onChanged}
    >
      x
    </Button.Danger>
  );
};

export default DeleteButton;
