import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';
import Common from '@golpasal/common';

import Checkbox from '../../../../../Common/Checkbox';
import Button from '../../../../../Common/Button';
import OrderStoreSelect from './OrderStoreSelect';

export const Card = styled.div`
  height: 190px;
  width: 100%;
  border: 1px solid rgb(149, 149, 149);
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 10px;
  cursor: pointer;
`;
export const MessageCard = styled(Card)`
  font-size: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AddressText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
`;
const DeliveryType = styled.div`
  display: flex;
  align-item: center;
  margin-bottom: 20px;
`;

const { PickUpMethod } = Common.method;

export const SelectClientAddress = ({
  data,
  intl,
  storeValue: _storeValue,
  onChange,
  onStoreChange: _onStoreChange,
  onAddButtonClick,
  rows,
  position = 'order',
  emptyMessage,
  onEditButtonClick,
  pickup
}) => {
  const [storeValue, setStoreValue] = useState([_storeValue]);
  const [deliveryType, setDeliveryType] = useState(
    _storeValue ? PickUpMethod.PICK_UP : PickUpMethod.DELIVERY
  );
  const addressList =
    data &&
    data.length &&
    data.map((value, index) => {
      const addressTexts = [
        value.name &&
          `${intl.formatMessage({ id: 'contact_name_display' })}: ${
            value.name
          }`,

        value.name &&
          [
            value.country &&
              value.country.name &&
              value.country.name[intl.locale],
            value.state && value.state.name && value.state.name[intl.locale],
            value.city && value.city.name && value.city.name[intl.locale]
          ]
            .filter(v => v)
            .join(' / '),
        value.address1 &&
          `${intl.formatMessage({ id: 'display_address_address1' })}: ${
            value.address1
          }`,
        value.address2 &&
          `${intl.formatMessage({ id: 'display_address_address2' })}: ${
            value.address2
          }`,
        value.phone &&
          `${intl.formatMessage({ id: 'display_phone' })}: ${value.phone}`,
        value.postCode &&
          `${intl.formatMessage({ id: 'post_code' })}: ${value.postCode}`
      ].filter(v => v);
      return (
        <Col xs={12} sm={rows ? rows : 4} key={index}>
          <Card
            onClick={() =>
              position === 'user' ? onEditButtonClick(value) : onChange(value)
            }
          >
            {addressTexts.map((v, i) => {
              return <AddressText key={i}>{v}</AddressText>;
            })}
          </Card>
        </Col>
      );
    });

  const memberPosition = (
    <Row>
      <Col xs={12} sm={rows ? rows : 4}>
        <MessageCard onClick={onAddButtonClick}>
          <div>
            {intl.formatMessage({
              id: 'order_modify_address'
            })}
          </div>
        </MessageCard>
      </Col>
      {addressList ? addressList : []}
    </Row>
  );

  const orderPosition = (
    <Row>
      {emptyMessage ? (
        <Col xs={12} sm={rows ? rows : 4}>
          <MessageCard>
            <div>{emptyMessage}</div>
          </MessageCard>
        </Col>
      ) : (
        addressList
      )}
      <Col xs={12} sm={rows ? rows : 4}>
        <MessageCard onClick={onAddButtonClick}>
          <div>
            {intl.formatMessage({
              id: 'order_modify_address'
            })}
          </div>
        </MessageCard>
      </Col>
    </Row>
  );

  const onStoreChange = useCallback((...args) => {
    setStoreValue(args);
  }, []);

  return (
    <>
      {position === 'user' && memberPosition}
      {position === 'order' &&
        (pickup ? (
          <>
            <DeliveryType>
              <Checkbox
                label={intl.formatMessage({
                  id: 'display_home_delivery'
                })}
                checked={deliveryType === PickUpMethod.DELIVERY}
                onChange={() => setDeliveryType(PickUpMethod.DELIVERY)}
              />
              <Checkbox
                containerStyle={{ marginLeft: 20 }}
                label={intl.formatMessage({
                  id: 'display_self_mention'
                })}
                checked={deliveryType === PickUpMethod.PICK_UP}
                onChange={() => setDeliveryType(PickUpMethod.PICK_UP)}
              />
            </DeliveryType>
            {deliveryType === PickUpMethod.DELIVERY && orderPosition}
            {deliveryType === PickUpMethod.PICK_UP && (
              <>
                <OrderStoreSelect
                  intl={intl}
                  value={storeValue && storeValue[0]}
                  onChange={onStoreChange}
                />
                <Button.Center>
                  <Button.Primary
                    disabled={
                      !(storeValue && storeValue[0]) ||
                      (storeValue && storeValue[0]) === _storeValue
                    }
                    onClick={() => {
                      _onStoreChange(...storeValue);
                    }}
                  >
                    {intl.formatMessage({
                      id: 'display_submit'
                    })}
                  </Button.Primary>
                </Button.Center>
              </>
            )}
          </>
        ) : (
          orderPosition
        ))}
    </>
  );
};

export default SelectClientAddress;
