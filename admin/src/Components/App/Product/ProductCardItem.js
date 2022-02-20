import React, { useMemo } from 'react';
import styled from 'styled-components';
import { hasIn } from 'lodash';
import { helpers } from '@golpasal/common';
import { Link } from 'react-router-dom';

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

const LinkStyles = {
  width: '100%',
  display: 'table',
  tableLayout: 'fixed',
  marginBottom: '-1px',
  color: 'rgba(0, 0, 0, 0.65)'
};

export const ProductCardItem = ({ item = {}, intl }) => {
  const platformTypes = useMemo(() => {
    const platformTypeOptions = helpers
      .getConstants('type', 'PlatformType', intl.locale)
      .map(type => ({
        label: type.text,
        value: type.value
      }));
    return platformTypeOptions
      .filter(
        v =>
          item &&
          item.platformTypes &&
          [...item.platformTypes].find(_v => _v === v.value)
      )
      .map(v => v && v.label)
      .join('、');
  }, [intl.locale, item]);
  if (!item) {
    return null;
  }
  const name = hasIn(item, `name.${intl.locale}`) ? item.name[intl.locale] : '';
  const category = hasIn(item, `category.name[${intl.locale}]`)
    ? item.category.name[intl.locale]
    : '';
  const priceRange = hasIn(item, `priceRange`)
    ? item.priceRange
    : { min: 0, max: 0 };
  const status = helpers.getConstantByValue(
    'status',
    'ProductStatus',
    item.status,
    intl.locale
  );

  return (
    <React.Fragment>
      <Wrapper>
        <Link
          style={{ ...LinkStyles }}
          to={`/products/${item._id}`}
          target="_blank"
        >
          <Item>{name}</Item>
          <Item>{category}</Item>
          <Item>
            ${priceRange.min || 0} ~ ${priceRange.max || 0}
          </Item>
          <Item>{platformTypes}</Item>
          <Item>{status ? status.text : ''}</Item>
        </Link>
      </Wrapper>
      <CardWrapper>
        <Link
          style={{ ...LinkStyles }}
          to={`/products/${item._id}`}
          target="_blank"
        >
          <Label>{intl.formatMessage({ id: 'display_name' })}</Label>
          <LabelField rows={1}>{name}</LabelField>
          <Label>{intl.formatMessage({ id: 'categories' })}</Label>
          <LabelField rows={1}>{category}</LabelField>
          <Label>
            {intl.formatMessage({ id: 'product_sku_discount_amount_display' })}
          </Label>
          <LabelField rows={1}>
            ${priceRange.min || 0} ~ ${priceRange.max || 0}
          </LabelField>
          <Label>{intl.formatMessage({ id: 'display_platform_types' })}</Label>
          <LabelField rows={1}>{platformTypes}</LabelField>
          <Label>{intl.formatMessage({ id: 'status' })}</Label>
          <LabelField rows={1}>{status ? status.text : ''}</LabelField>
        </Link>
      </CardWrapper>
    </React.Fragment>
  );
};
export default ProductCardItem;
