import React from 'react';
import styled from 'styled-components';

import TextInput from '../../../../Common/TextInput';

export const ITEM_WIDTH = {
  TITLE: '30%',
  ITEM: '30%'
};

export const Container = styled.div`
  font-size: 17px;
  font-weight: 300;
`;
export const Title = styled.div`
  font-size: 24px;
`;
export const Description = styled.div`
  margin-bottom: 30px;
  margin-top: 15px;
`;
export const Hr = styled.div`
  width: 100%;
  border-top: 1px #e6e6e6 solid;
`;
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-top: 20px;
`;
// Language
export const LanguageGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
`;
export const Language = styled.div`
  width: 30%;
  font-weight: 500;
`;
// Option
export const OptionTitle = styled.div``;
export const OptionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  margin-bottom: 10px;
`;
export const OptionItemLabel = styled.div`
  width: ${ITEM_WIDTH.TITLE};
  line-height: 42px;
`;
export const OptionItemInput = styled(({ className, ...p }) => (
  <div className={className}>
    <TextInput {...p} style={{ width: '90%' }} />
  </div>
))`
  width: ${ITEM_WIDTH.ITEM};
`;
