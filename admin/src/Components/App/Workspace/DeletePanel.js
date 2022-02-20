import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import cloneDeep from 'lodash/cloneDeep';

import Button from '../../Common/Button';

const buttonStyle = {
  height: 42,
  minWidth: 50,
  fontSize: 20,
  lineHeight: '40px',
  margin: 0,
  padding: 0
};

const DeletePanel = ({ name, items, i, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div>
        <span
          style={{
            cursor: 'pointer'
          }}
        >
          <Button
            style={{
              ...buttonStyle,
              fontSize: 14
            }}
            type="button"
            onClick={() => {
              let cloneItem = cloneDeep(items);
              cloneItem.splice(i, 1);
              onChange(cloneItem);
            }}
          >
            <AiOutlineDelete size={25} />
          </Button>
        </span>
      </div>
    </div>
  );
};

export default DeletePanel;
