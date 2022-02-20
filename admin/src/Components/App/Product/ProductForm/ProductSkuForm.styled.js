import styled from 'styled-components';

export const Hr = styled.div`
  width: 100%;
  border-top: 1px #e6e6e6 solid;
`;

export const Item = styled.div`
  text-align: center;
  display: table-cell;
  width: ${({ size = 1 }) => 100 * size}%;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  padding: 0 5px;
`;

export const TitleItemWrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  border-bottom: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
`;

export const ItemWrapper = styled(TitleItemWrapper)`
  padding-bottom: 0px;
`;
