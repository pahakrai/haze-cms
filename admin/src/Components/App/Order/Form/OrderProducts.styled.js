import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 10px 5px;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const Item = styled.div`
  font-size: ${props => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: ${({ size = 1 }) => 100 * size}%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
`;

export const ActionsItem = styled(Item)`
  width: 50px;
`;

export const HeaderWrapper = styled(Wrapper)`
  border: 1px solid rgba(255, 255, 255, 0);
  @media (max-width: 700px) {
    display: none;
  }
`;
export const HeaderItem = styled(Item)`
  font-weight: bold;
`;
export const ProductItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  @media (max-width: 380px) {
    flex-direction: column;
  }
`;
export const ProductImage = styled.div`
  width: 100%;
  height: 230px;
  width: 230px;
  margin-right: 20px;
  @media (max-width: 380px) {
    max-width: unset;
  }
`;
export const ProductContent = styled.div`
  flex: 1;
`;
export const ProductContentItem = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const ProductActions = styled.div`
  min-width: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
`;
