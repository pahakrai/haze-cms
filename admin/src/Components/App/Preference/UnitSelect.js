import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { helpers } from '@golpasal/common';

import { ErrorMessage } from '../../Form/Errors';

const Main = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.div`
  padding: 3px 0;
  display: inline-block;
  font-eight: 600;
  color: #666666;
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
`;
const Button = styled.div`
  padding: 10px 25px 10px 25px;
  background-color: #efefef;
  color: #666;
  cursor: pointer;
  margin-right: 10px;
  text-align: center;
  flex: 1;
  &:last-child {
    margin-right: 0;
  }
`;

const _UnitSelect = ({
  intl,
  input: { onChange },
  meta: { touched, error },
  formValueUnit
}) => {
  const onSelected = value => {
    onChange(value);
  };
  return (
    <Main>
      <Label>
        {intl.formatMessage({ id: 'display_preference_unit_salary_selection' })}
      </Label>
      <Wrapper>
        {helpers
          .getConstants('type', 'WageUnitType', intl.locale)
          .map((v, i) => (
            <Button
              key={v.key}
              onClick={() => onSelected(v.value)}
              style={{
                backgroundColor:
                  formValueUnit === v.value ? '#e5f2ef' : '#efefef'
              }}
            >
              {v.text}
            </Button>
          ))}
      </Wrapper>
      {touched && <ErrorMessage>{error}</ErrorMessage>}
    </Main>
  );
};

export const UnitSelect = props => {
  return <Field component={_UnitSelect} {...props} />;
};
