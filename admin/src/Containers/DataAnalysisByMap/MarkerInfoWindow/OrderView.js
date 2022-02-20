import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Common from '@golpasal/common';

import Label from '../../../Components/Common/Label';

const { OrderType } = Common.type;
export const OrderView = ({ order }) => {
  const locFr = order?.logistic?.locFr;
  const locTo = order?.logistic?.locTo;
  const date = moment(order?.date).format('YYYY-MM-DD HH:mm:ss');
  const coordinateAccept = order?.logistic?.coordinateAccept?.properties?.name;
  const contactAddress = order?.contactAddress?.properties?.name;
  const acceptTime = order?.logistic?.acceptTime
    ? moment(order?.logistic?.acceptTime).format('YYYY-MM-DD HH:mm:ss')
    : '';

  const isLogistics = order?.orderType === OrderType.LOGISTICS;
  const isShopping = order?.orderType === OrderType.SHOPPING;

  return (
    <div style={{ minWidth: 140, maxWidth: 320 }}>
      <Label>
        <FormattedMessage id="order_no_display" />
      </Label>
      <LabelField>{order?.orderNo}</LabelField>
      <Label>
        <FormattedMessage id="display_order_date" />
      </Label>
      <LabelField>{date}</LabelField>
      <Label>
        <FormattedMessage id="display_order_amount" />
      </Label>
      <LabelField>
        {order?.charge?.currency || ''} {order?.charge?.totalAmount || 0}
      </LabelField>
      {isLogistics && (
        <>
          <Label>
            <FormattedMessage id="display_order_location_start" />
          </Label>
          <LabelField>{locFr?.properties?.name}</LabelField>
          <Label>
            <FormattedMessage id="display_order_location_end" />
          </Label>
          {locTo?.map((v, i) => (
            <LabelField key={i}>{v.properties?.name || ''}</LabelField>
          )) || ''}
          {coordinateAccept && (
            <>
              <Label>
                <FormattedMessage id="display_order_accept_location" />
              </Label>
              <LabelField>{coordinateAccept}</LabelField>
            </>
          )}
          {acceptTime && (
            <>
              <Label>
                <FormattedMessage id="display_order_accept_time" />
              </Label>
              <LabelField>{acceptTime}</LabelField>
            </>
          )}
        </>
      )}
      {isShopping && (
        <>
          <Label>
            <FormattedMessage id="order_shipping_address_display" />
          </Label>
          <LabelField>{contactAddress}</LabelField>
        </>
      )}
    </div>
  );
};

const LabelField = styled(Label.Field)`
  margin: 5px;
`;

export default OrderView;
