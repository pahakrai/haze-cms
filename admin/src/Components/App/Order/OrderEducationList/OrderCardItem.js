import React from 'react';
import styled from 'styled-components';
import { helpers } from '@golpasal/common';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Button, Tooltip, Space } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { EyeOutlined, FilePdfOutlined } from '@ant-design/icons';

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

export class OrderCardItem extends React.PureComponent {
  static propTypes = {
    onPdfBtnClick: PropTypes.func,
    onEyeBtnClick: PropTypes.func
  };
  static defaultProps = {
    onPdfBtnClick: () => {},
    onEyeBtnClick: () => {}
  };
  _onPdfBtnClick = () => {
    const { onPdfBtnClick, item } = this.props;
    onPdfBtnClick(item);
  };

  _onEyeBtnClick = () => {
    const { onEyeBtnClick, item } = this.props;
    onEyeBtnClick(item);
  };
  render() {
    const { item = {}, intl } = this.props;

    if (!item) return null;

    const orderNo = item.orderNo;
    const status = helpers.getConstantByValue(
      'status',
      'OrderStatus',
      item.status,
      intl.locale
    );

    const amount = item.charge
      ? getSymbolFromCurrency(item.charge.currency || 'HKD') +
        item.charge.totalAmount
      : '';

    return (
      <React.Fragment>
        <Wrapper>
          <div
            style={{ ...LinkStyles }}
            onClick={() => window.open(`/orders/${item._id}`)}
          >
            <Item>{orderNo}</Item>
            <Item>{moment(item.date).format('YYYY-MM-DD hh:mm')}</Item>
            <Item>{item.client ? item.client.username : ''}</Item>
            <Item>{amount}</Item>
            <Item>{status ? status.text : ''}</Item>
            <ActionsItem>
              <Space size={0}>
                <Tooltip
                  placement="topLeft"
                  title={intl.formatMessage({
                    id: 'display_invoice_download_pdf'
                  })}
                >
                  <Button
                    type="primary"
                    danger
                    icon={<FilePdfOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      this._onPdfBtnClick();
                    }}
                  />
                </Tooltip>
                <Tooltip
                  placement="topLeft"
                  title={intl.formatMessage({
                    id: 'display_invoice_preview'
                  })}
                >
                  <Button
                    type="ghost"
                    icon={<EyeOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      this._onEyeBtnClick();
                    }}
                  />
                </Tooltip>
              </Space>
            </ActionsItem>
          </div>
        </Wrapper>
        <CardWrapper>
          <div
            style={{ ...LinkStyles }}
            onClick={() => window.open(`/orders/${item._id}`)}
          >
            <Label>{intl.formatMessage({ id: 'order_no_display' })}</Label>
            <LabelField rows={1}>{orderNo}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_order_date' })}</Label>
            <LabelField rows={1}>
              {moment(item.date).format('YYYY-MM-DD hh:mm')}
            </LabelField>
            <Label>{intl.formatMessage({ id: 'display_order_sold_to' })}</Label>
            <LabelField rows={1}>
              {item.client ? item.client.username : ''}
            </LabelField>
            <Label>{intl.formatMessage({ id: 'display_order_sum' })}</Label>
            <LabelField rows={1}>{amount}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_order_status' })}</Label>
            <LabelField rows={1}>{status ? status.text : ''}</LabelField>
            <LabelField>
              <Space size={0}>
                <Tooltip
                  placement="topLeft"
                  title={intl.formatMessage({
                    id: 'display_invoice_download_pdf'
                  })}
                >
                  <Button
                    type="primary"
                    danger
                    icon={<FilePdfOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      this._onPdfBtnClick();
                    }}
                  />
                </Tooltip>
                <Tooltip
                  placement="topLeft"
                  title={intl.formatMessage({
                    id: 'display_invoice_preview'
                  })}
                >
                  <Button
                    type="ghost"
                    icon={<EyeOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      this._onEyeBtnClick();
                    }}
                  />
                </Tooltip>
              </Space>
            </LabelField>
          </div>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default OrderCardItem;
