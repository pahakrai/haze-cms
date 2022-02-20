import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';

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

export const SelectClientAddress = ({
  data,
  client,
  intl,
  onChange,
  onAddButtonClick,
  emptyMessage
}) => {
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
        <Col xs={12} sm={4} key={index}>
          <Card onClick={() => onChange(value)}>
            {addressTexts.map((v, i) => {
              return <AddressText key={i}>{v}</AddressText>;
            })}
          </Card>
        </Col>
      );
    });

  return (
    <Row>
      {emptyMessage ? (
        <Col xs={12} sm={4}>
          <MessageCard>
            <div>{emptyMessage}</div>
          </MessageCard>
        </Col>
      ) : (
        addressList
      )}
      <Col xs={12} sm={4}>
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
};

export default SelectClientAddress;
