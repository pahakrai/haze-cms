import styled from 'styled-components';

import Card from '../../Common/Card';
import Label from '../../Common/Label';

export const LabelField = styled(Label.Field)`
  height: 30px;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 15px 5px;
  border: 1px solid rgba(227, 227, 230, 1);
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const Item = styled.div`
  font-size: ${props => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  ${props => (props.small ? 'width: 50%;' : '')}
  ${props => (props.mid ? 'width: 75%%;' : '')}
  ${props => (props.big ? 'width: 150%;' : '')}
  ${props => (props.nowrap ? 'white-space: nowrap;' : '')}
  ${props => (props.alignLeft ? 'text-align:left;' : '')}
  ${props => (props.padding ? 'padding:0 8px;' : '')}
`;

export const HiddenItem = styled(Item)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;
