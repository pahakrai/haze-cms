import React from 'react';
import { IoIosAdd } from 'react-icons/io';
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

const PanelFooter = ({ name, items, i, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '2px solid #ececec',
        marginTop: '20px'
      }}
    >
      <div style={{ paddingTop: '15px' }}>
        <span
          style={{
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          <Button
            style={{
              ...buttonStyle,
              marginLeft: 5,
              marginBottom: 22,
              fontSize: 14
            }}
            type="button"
            onClick={() => {
              let cloneItem = cloneDeep(items);
              cloneItem[i].hooks.push({
                code: '',
                method: '',
                url: '',
                headers: []
              });
              onChange(cloneItem);
            }}
          >
            <IoIosAdd size={25} />
          </Button>
        </span>
      </div>
    </div>
  );
};

export default PanelFooter;
