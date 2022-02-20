import styled from 'styled-components';

export const Hr = styled.div`
  width: 100%;
  border-top: 1px #e6e6e6 solid;
`;

export const Item = styled.div`
  text-align: center;
  display: table-cell;
  width: ${({ size = 1 }) => 100 * size}%;
  padding: 0 5px;
  font-weight: 600;
  color: #666666;
  font-size: 14px;
`;

export const TitleItemWrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
`;

export const ItemWrapper = styled(TitleItemWrapper)`
  padding-bottom: 0px;
  padding: 0px 5px;
  display: flex;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 5px;
`;
