import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import cloneDeep from 'lodash/cloneDeep';
import ObjectID from 'bson-objectid';

const LogisticItemFooter = ({ items, item, i, onChange }) => {
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
          onClick={() => {
            const itemCopy = { ...items[i] };
            const _locToObj = cloneDeep(itemCopy);
            _locToObj.idx = items[i].idx + 1;
            _locToObj._id = new ObjectID().toHexString();
            onChange([...items, { ..._locToObj }]);
          }}
        >
          <MdContentCopy size={25} />
        </span>
        <span
          style={{
            cursor: 'pointer'
          }}
          onClick={childrenItem =>
            onChange(
              items
                .filter(idx => idx.idx !== item.idx)
                .map((idx2, index) => {
                  idx2.idx = index + 1;
                  return idx2;
                })
            )
          }
        >
          <AiOutlineDelete size={25} />
        </span>
      </div>
    </div>
  );
};

export default LogisticItemFooter;
