import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { helpers } from '@golpasal/common';
import queryString from 'query-string';

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

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;

const LinkStyles = {
  width: '100%',
  display: 'table',
  tableLayout: 'fixed',
  marginBottom: '-1px',
  color: 'rgba(0, 0, 0, 0.65)'
};

export class SalesVolumeCardItem extends React.PureComponent {
  render() {
    const { item, intl } = this.props;

    let month = item.month;
    month = month < 10 ? '0' + month : month;

    const time = item.year + '-' + month;
    const amount = item.currency + helpers.formatNumber(item.target);
    const salesAmount = item.currency + helpers.formatNumber(item.salesAmount);

    const achievementRate =
      item.achievementRate > 0
        ? Number(item.achievementRate * 100).toFixed(1)
        : 0;
    let color = '#000';
    if (achievementRate < 80) {
      color = '#ED4700';
    }
    if (achievementRate >= 80 && achievementRate < 100) {
      color = '#FFB800';
    }
    if (achievementRate >= 100) {
      color = '#22AC38';
    }
    // url format
    let url = `/sales-volume`;
    if (item._id && item._id.indexOf('initialValues') !== -1) {
      url = `${url}/create?initialValues=${
        queryString.parse(item._id).initialValues
      }`;
    } else {
      url = `${url}/${item._id}`;
    }
    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles, disabled: true }}
            to={url}
            target="_blank"
          >
            <Item>{time}</Item>
            <Item>{amount}</Item>
            <Item>{salesAmount}</Item>
            <Item
              style={{
                color: color
              }}
            >
              {achievementRate}% &nbsp; &nbsp; &nbsp;
              {achievementRate >= 100 && (
                <img
                  alt=""
                  style={{ width: 25, height: 25 }}
                  src="/images/icons/reach.png"
                />
              )}
            </Item>
          </Link>
        </Wrapper>
        <CardWrapper>
          <Link
            style={{ ...LinkStyles, disabled: true }}
            to={url}
            target="_blank"
          >
            <Label>{intl.formatMessage({ id: 'display_month' })} </Label>
            <LabelField rows={1}>{time}</LabelField>
            <Label>
              {intl.formatMessage({ id: 'display_sales_target_amount' })}{' '}
            </Label>
            <LabelField rows={1}>{amount}</LabelField>
            <Label>
              {intl.formatMessage({ id: 'display_sales_reached_amount' })}{' '}
            </Label>
            <LabelField rows={1}>{salesAmount}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_sales_rate' })} </Label>
            <LabelField rows={1}>{achievementRate}%</LabelField>
          </Link>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default SalesVolumeCardItem;
