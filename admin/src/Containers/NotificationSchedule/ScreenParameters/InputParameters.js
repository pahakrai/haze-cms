import React from 'react';
// styled
import styled from 'styled-components';
// Common
import TextInput from '../../../Components/Common/TextInput';
// form
import FieldLabel from '../../../Components/Form/FieldLabel';

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MarginFieldLabel = styled(FieldLabel)`
  margin-right: 10px;
`;

// { screen: 'SearchResult', lable: 'Filter', parameters: {} } // parameters filter { _id }
// value {}
export default ({
  disabled,
  placeholder,
  value = {},
  key = '_id',
  onChange
}) => {
  const isUseKeyMode = Object.keys(value).length > 0;
  return (
    <RowDiv>
      <MarginFieldLabel>{!isUseKeyMode ? `Filter` : `ID`}：</MarginFieldLabel>
      <TextInput
        disabled={disabled}
        value={isUseKeyMode ? value[key] || '' : JSON.stringify(value)}
        onChange={text => {
          try {
            if (isUseKeyMode) onChange({ [key]: text });
            else onChange(JSON.parse(text));
          } catch (error) {
            onChange({});
          }
        }}
        placeholder={placeholder}
      />
    </RowDiv>
  );
};
