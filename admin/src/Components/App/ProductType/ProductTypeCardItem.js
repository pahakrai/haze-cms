import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Label from '../../Common/Label';
import Card from '../../Common/Card';
import hasIn from 'lodash/hasIn';
import { helpers } from '@golpasal/common';
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

const LinkStyles = {
  width: '100%',
  display: 'table',
  tableLayout: 'fixed',
  marginBottom: '-1px',
  color: 'rgba(0, 0, 0, 0.65)'
};

export class ProductTypeCardItem extends React.PureComponent {
  render() {
    const { item, intl } = this.props;
    const name = hasIn(item, `name.${intl.locale}`)
      ? item.name[intl.locale]
      : '';
    const description = hasIn(item, `description.${intl.locale}`)
      ? item.description[intl.locale]
      : '';
    const status = helpers.getConstantByValue(
      'status',
      'ProductTypeStatus',
      item.status,
      intl.locale
    );
    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/productTypes/${item._id}`}
            target="_blank"
          >
            <Item>{name}</Item>
            <Item>{description}</Item>
            <Item>{item.content}</Item>
            <Item>{status ? status.text : ''}</Item>
          </Link>
        </Wrapper>

        <CardWrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/productTypes/${item._id}`}
            target="_blank"
          >
            <Label>{intl.formatMessage({ id: 'display_name' })} </Label>
            <LabelField rows={1}>{name}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_description' })} </Label>
            <LabelField rows={1}>{description}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_content' })} </Label>
            <LabelField rows={1}>{item.content}</LabelField>
            <Label>{intl.formatMessage({ id: 'status' })}</Label>
            <LabelField rows={1}>{status ? status.text : ''}</LabelField>
          </Link>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default ProductTypeCardItem;
