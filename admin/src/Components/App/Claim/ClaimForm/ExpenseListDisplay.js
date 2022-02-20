import React from 'react';
import { Field } from 'redux-form';

import Card from '../../../Common/Card';
import ExpenseList from './ExpenseList';

export const ExpenseListDisplay = ({ input: { value, onChange } }) => {
  return value?.length ? (
    <Card style={{ marginTop: 0 }}>
      <ExpenseList
        expenses={value || []}
        selected={value}
        onChange={onChange}
        checkBoxOnly
      />
    </Card>
  ) : (
    <></>
  );
};

export default props => {
  return <Field {...props} component={ExpenseListDisplay} />;
};
