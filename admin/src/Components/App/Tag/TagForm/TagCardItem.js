import React from 'react';
import styled from 'styled-components';
import Label from '../../../Common/Label';
import Card from '../../../Common/Card';

const LabelField = styled(Label.Field)`
  height: 30px;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  border: 1px solid #ddd;
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
  cursor: pointer;
`;

export const HiddenItem = styled(Item)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;

export class OrderCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl } = this.props;
    if (!item) {
      return null;
    }
    return (
      <React.Fragment>
        <Wrapper>
          <Item>{item._id}</Item>
          <Item>{item.text}</Item>
          <Item>
            /{item.refType.toLowerCase()}/{item.ref}
          </Item>
        </Wrapper>
        <CardWrapper>
          <Label>ID</Label>
          <LabelField rows={1}>{item._id}</LabelField>
          <Label>{intl.formatMessage({ id: 'display_tag_text' })}</Label>
          <LabelField rows={1}>{item.text}</LabelField>
          <Label>{intl.formatMessage({ id: 'display_tag_link' })}</Label>
          <LabelField rows={1}>
            /{item.refType.toLowerCase()}/{item.ref}
          </LabelField>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default OrderCardItem;
