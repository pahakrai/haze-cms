import React from 'react';
import { Field } from 'redux-form';
import TextInput from '../../../Components/Form/TextInput';
import ItemsForm from '../../../Components/Form/ItemsForm';

export const WorkspaceWidgets = ({ input, intl }) => {
  const empty = !input.value || !input.value.length;

  return (
    <div>
      {empty && <div></div>}
      <ItemsForm
        noLabel
        name={input.name}
        notObject={true}
        contentStyle={{ paddingTop: input.value.length ? 10 : 0 }}
        dropDisabled
        childFields={[
          {
            component: TextInput,
            others: {
              noLabel: true,
              intl
            },
            colProps: {
              xs: 12,
              md: 12,
              lg: 12
            }
          }
        ]}
      />
    </div>
  );
};
export default props => {
  return <Field {...props} component={WorkspaceWidgets} />;
};
