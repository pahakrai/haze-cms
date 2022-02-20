import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import {
  Price,
  Label as Label_,
  ServiceItem
} from '../../../../../Containers/Service/SelectServices';
import TextInput from '../../../../Form/TextInput';

const Contaier = styled(ServiceItem)`
  width: 100%;
  & > div {
    flex: none;
  }
  justify-content: space-between;
  align-items: flex-start;
`;
const Label = styled(Label_)``;
const Comment = styled(Price)`
  word-break: break-all;
  max-width: 200px;
  margin-right: 0px;
`;

const RemarksComponent = ({ input, label, disabled }) => {
  return disabled ? (
    <Contaier>
      <Label>{label}</Label>
      <Comment>{input.value}</Comment>
    </Contaier>
  ) : (
    <>
      <ServiceItem>
        <div style={{ width: '100%' }}>
          <Label>{label}</Label>
          <TextInput noLabel name={input.name} rows={3} placeholder={label} />
        </div>
      </ServiceItem>
    </>
  );
};
export const Remarks = props => {
  return <Field {...props} component={RemarksComponent} />;
};

export default Remarks;
