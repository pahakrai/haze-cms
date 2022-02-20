import styled from 'styled-components';

import { FieldLabel } from '../../../Form/form.styled';

export const Conatiner = styled.div`
  font-weight: 500;
  font-size: 15px;
`;
export const Item = styled.div`
  margin-bottom: 10px;
`;
export const RowItem = styled(Item)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;
export const Label = styled(FieldLabel)`
  margin-bottom: 5px;
`;
export const Value = styled.div`
  text-indent: 15px;
`;
export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
`;
