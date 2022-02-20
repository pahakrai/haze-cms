import React from 'react';
import styled from 'styled-components';
// import { hasIn } from 'lodash';

import Label from '../../Common/Label';
import Card from '../../Common/Card';

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

export class PageTemplateCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl, onClick } = this.props;
    if (!item) return null;
    const isActive =
      item.isActive === 'true'
        ? intl.formatMessage({ id: 'display_page_active' })
        : intl.formatMessage({ id: 'display_page_inactive' });
    const preview = item.preview && item.preview.thumbnailUri && (
      <img src={item.preview.thumbnailUri} alt="preview" height={200} />
    );
    return (
      <React.Fragment>
        <Wrapper>
          <Item onClick={onClick}>{preview}</Item>
          <Item onClick={onClick}>{isActive}</Item>
        </Wrapper>
        <CardWrapper>
          <Label>{intl.formatMessage({ id: 'preview' })}</Label>
          <LabelField rows={1}>{preview}</LabelField>
          <Label>{intl.formatMessage({ id: 'display_page_status' })}</Label>
          <LabelField rows={1}>{isActive}</LabelField>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default PageTemplateCardItem;
