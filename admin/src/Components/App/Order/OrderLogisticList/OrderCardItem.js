import React from 'react';
import styled from 'styled-components';
import { helpers } from '@golpasal/common';
import Common from '@golpasal/common';
import moment from 'moment';
import { hasIn } from 'lodash';
import { Button, Tooltip, Space } from 'antd';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';
import { EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import Checkbox from '../../../Common/Checkbox';
import Label from '../../../Common/Label';
import Card from '../../../Common/Card';
import { formatOptionLabel } from '../../../../Containers/Form/SelectStore';
import { CheckboxItem } from '../../ListCard/title';

const { TravelOrderStatus } = Common.status;
const { OrderLogisticLocationType } = Common.type;

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

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;

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
    const {
      item = {},
      intl,
      currentWorkspace,
      selected,
      changeSelected
    } = this.props;

    if (!item) {
      return null;
    }
    const locale = intl.locale;
    const orderNo = item.orderNo;
    const status = helpers.getConstantByValue(
      'status',
      'TravelOrderStatus',
      item.status,
      intl.locale
    );
    // const orderNo = hasIn(item, `orderNo.${intl.locale}`)
    //   ? item.orderNo[intl.locale]
    //   : '';

    const hasCheckbox =
      item.status <= TravelOrderStatus.DRIVER_ACCEPTED &&
      item.status !== TravelOrderStatus.CANCELLED;
    const hasInvoice = currentWorkspace?.preferences?.order?.hasInvoice;
    const mapType = currentWorkspace?.preferences?.mapType;
    const locationType = currentWorkspace?.preferences?.order?.locationType;
    const isStoreLocationType =
      locationType === OrderLogisticLocationType.STORE;

    const duration = (
      <React.Fragment>
        {item.time &&
          item.time.duration === 0 &&
          intl.formatMessage({
            id: 'display_order_route'
          })}
        {item.time &&
          item.time.duration > 0 &&
          intl.formatMessage({
            id: 'display_order_baozhong'
          })}
        {item.time && item.time.duration
          ? `: ${Number(item.time && item.time.duration) / (3600 * 1000)} hr`
          : ''}
      </React.Fragment>
    );
    const date = moment(item.date).locale(intl.locale).format('MM/DD/YYYY');
    const scheduleTime = item.time
      ? moment(item.time.scheduleTime)
          .locale(intl.locale)
          .format('MM/DD/YYYY dddd HH:mm')
      : '';
    const vehicleType = hasIn(item, `logistic.vehicleType.name.${intl.locale}`)
      ? item.logistic.vehicleType.name[locale]
      : '';
    const amount = item.charge
      ? getSymbolFromCurrency(item.charge.currency || 'HKD') +
        item.charge.totalAmount
      : '';
    let storeTo = item.logistic?.storeTo;
    if (storeTo) {
      storeTo = formatOptionLabel(storeTo, intl);
    }

    let locFr = null;
    let locTo = null;
    if (mapType !== undefined && mapType === Common.type.MapType.GOOGLE_MAP) {
      locFr = hasIn(item, `logistic.locFr.properties.name`)
        ? item.logistic.locFr.properties.name
        : null;

      locTo =
        hasIn(item, 'logistic.locTo.map') && item.logistic
          ? item.logistic.locTo
              .map(v => {
                return hasIn(v, 'properties.name') ? v.properties.name : null;
              })
              .join(', ')
          : '';
    } else {
      const locFrRegions = hasIn(
        item,
        'logistic.locFr.properties.regions.length'
      )
        ? item.logistic.locFr.properties.regions
        : null;
      locFr = hasIn(
        locFrRegions,
        `${locFrRegions && locFrRegions.length - 1}.name.${locale}`
      )
        ? locFrRegions[locFrRegions.length - 1].name[locale]
        : '';
      locTo =
        hasIn(item, 'logistic.locTo.map') && item.logistic
          ? item.logistic.locTo
              .map(v => {
                const regions = hasIn(v, 'properties.regions.length')
                  ? v.properties.regions
                  : null;
                return hasIn(regions, `${regions.length - 1}.name.${locale}`)
                  ? regions[regions.length - 1].name[locale]
                  : '';
              })
              .join(', ')
          : '';
    }

    return (
      <React.Fragment>
        <Wrapper>
          <div style={{ ...LinkStyles }}>
            <CheckboxItem>
              {hasCheckbox && (
                <Checkbox
                  label=" "
                  checked={selected.includes(item._id)}
                  containerStyle={{ display: 'inline-block' }}
                  onChange={e => {
                    e.stopPropagation();
                    changeSelected(item._id);
                  }}
                />
              )}
            </CheckboxItem>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {orderNo}
            </Item>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {date}
            </Item>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {duration}
            </Item>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {vehicleType}
            </Item>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {locFr}
            </Item>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {isStoreLocationType ? storeTo : locTo}
            </Item>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {status ? status.text : '-'}
            </Item>
            <Item onClick={() => window.open(`/orders/${item._id}`)}>
              {amount}
            </Item>
            <Item
              onClick={() => window.open(`/orders/${item._id}`)}
              style={{ width: 180 }}
            >
              {scheduleTime}
            </Item>
            {hasInvoice && (
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
            )}
          </div>
        </Wrapper>
        <CardWrapper>
          <Label>
            {hasCheckbox && (
              <Checkbox
                label=" "
                checked={selected.includes(item._id)}
                containerStyle={{ display: 'inline-block' }}
                onChange={e => {
                  e.stopPropagation();
                  changeSelected(item._id);
                }}
              />
            )}
          </Label>
          <div
            style={{ ...LinkStyles }}
            onClick={() => window.open(`/orders/${item._id}`)}
            // to={`/orders/${item._id}`}
            // target="_blank"
          >
            <Label>{intl.formatMessage({ id: 'order_no_display' })}</Label>
            <LabelField rows={1}>{orderNo}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_order_date' })}</Label>
            <LabelField rows={1}>{date}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_order_type' })}</Label>
            <LabelField rows={1}>{duration}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_vehicle_type' })}</Label>
            <LabelField rows={1}>{vehicleType}</LabelField>
            <Label>
              {intl.formatMessage({ id: 'display_order_location_start' })}
            </Label>
            <LabelField rows={1}>{locFr}</LabelField>
            <Label>
              {intl.formatMessage({
                id: isStoreLocationType
                  ? 'display_order_store_to'
                  : 'display_order_location_end'
              })}
            </Label>
            <LabelField rows={1}>
              {isStoreLocationType ? storeTo : locTo}
            </LabelField>
            <Label>{intl.formatMessage({ id: 'status' })}</Label>
            <LabelField rows={1}>{status ? status.text : ''}</LabelField>
            <Label>
              {intl.formatMessage({ id: 'display_logistic_order_amount' })}
            </Label>
            <LabelField rows={1}>{amount}</LabelField>
            <Label>
              {intl.formatMessage({ id: 'display_order_schedule_time' })}
            </Label>
            <LabelField rows={1}>{scheduleTime}</LabelField>
            <LabelField>
              {!hasInvoice && (
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
              )}
            </LabelField>
          </div>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default OrderCardItem;
