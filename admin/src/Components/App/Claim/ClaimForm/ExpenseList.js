import React, { useCallback } from 'react';
import { List } from 'antd';
import { FormattedMessage } from 'react-intl';

import Checkbox from '../../../Common/Checkbox';

import ExpenseCard from './ExpenseCard';

const ExpenseList = ({
  expenses,
  selected = [],
  onChange,
  selectAll = true,
  checkBoxOnly,
  loading
}) => {
  const allSelected = selected.length === expenses.length;
  const onItemSelect = useCallback(
    expense => {
      const included = selected.find(v => v._id === expense._id);
      if (included) {
        onChange(selected.filter(v => v !== included));
      } else {
        onChange([...selected, expense]);
      }
    },
    [onChange, selected]
  );
  return (
    <div>
      <div style={{ padding: '0px 0px 20px 20px' }}>
        {selectAll && (
          <Checkbox
            label={<FormattedMessage id="check_all" />}
            disabled={!expenses || !expenses.length}
            checked={allSelected}
            onChange={() => {
              if (!allSelected) {
                onChange(expenses);
              } else {
                onChange([]);
              }
            }}
          />
        )}
      </div>
      <List
        itemLayout="vertical"
        dataSource={expenses}
        loading={loading}
        size="middle"
        split
        renderItem={expense => {
          const active = selected.find(v => v._id === expense._id)
            ? true
            : false;
          return (
            <div key={expense._id} style={{ marginBottom: 8 }}>
              <ExpenseCard
                rowKey={expense._id}
                expense={expense}
                onSelect={onItemSelect}
                selected={active}
                checkBoxOnly={checkBoxOnly}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default ExpenseList;
