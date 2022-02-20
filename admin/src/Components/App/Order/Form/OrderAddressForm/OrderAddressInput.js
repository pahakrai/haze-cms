import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Button as AntdButton } from 'antd';
import { FormattedMessage } from 'react-intl';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';

import { ErrorMessage } from '../../../../Form/Errors';
import FieldContainer from '../../../../Form/FieldContainer';
import { FieldLabel } from '../../../../Form/form.styled';
import { withFormValues } from '../../../../Form/utils';

import { toast } from '../../../../../Lib/Toast';

import OrderAddressFormModal from './OrderAddressFormModal';
import { useRegion } from './OrderAddressFormUtils';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const LabelRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AddressText = styled.div`
  word-break: break-all;
`;

const OrderAddressInput = ({
  input: { value = {}, onChange },
  meta: { touched, error },
  updateMode,
  label,
  intl,
  formValueClient,
  renderRight,
  hiddenEditButton = false,
  disabled,
  pickup,
  formValuesPickupStore,
  formValueChange
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = useCallback(
    (values, _id) => {
      setModalOpen(false);
      onChange(values);
      // store id
      pickup && formValueChange('pickupStore', _id || null);
    },
    [onChange, pickup, formValueChange]
  );
  const onModalClose = useCallback(() => setModalOpen(false), []);

  const { region: country } = useRegion({
    _id: value.country,
    skip: !value.country
  });
  const { region: state } = useRegion({
    _id: value.state,
    skip: !value.state
  });
  const { region: city } = useRegion({
    _id: value.city,
    skip: !value.city
  });

  const addressTexts = useMemo(
    () =>
      [
        value.name &&
          `${intl.formatMessage({ id: 'contact_name_display' })}: ${
            value.name
          }`,
        value.name &&
          [
            country && country.name && country.name[intl.locale],
            state && state.name && state.name[intl.locale],
            city && city.name && city.name[intl.locale]
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
      ].filter(v => v),
    [
      value.name,
      value.address1,
      value.address2,
      value.phone,
      value.postCode,
      intl,
      country,
      state,
      city
    ]
  );

  // copy clipboard
  const contactRef = useRef(null);
  let contactValue = '';
  const copyToClipboard = e => {
    contactRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    toast.success(<FormattedMessage id={'display_copy_success'} />, {
      position: 'top-center',
      autoClose: 1000
    });
  };

  const { name, phone, address1, address2 } = value;
  if (value.name) {
    let address = '';
    if (country && city && state) {
      address = Object.assign(addressTexts, [])[1].replace(/\//g, '-');
    }
    contactValue = `${name}, ${phone ? phone + ',' : ''} ${address}${address1}${
      address2 ? address2 : ''
    }`;
  }

  return (
    <FieldContainer>
      <Content>
        <FieldLabel>{label}</FieldLabel>
        <LabelRight>
          {renderRight}
          {!hiddenEditButton && !disabled && (
            <AntdButton
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
              htmlType="button"
              onClick={() => setModalOpen(true)}
            />
          )}
          {updateMode && (
            <div
              style={{
                marginLeft: 10
              }}
            >
              <AntdButton
                type="primary"
                shape="circle"
                icon={<CopyOutlined />}
                size="small"
                htmlType="button"
                onClick={copyToClipboard}
              />
              <input
                value={contactValue}
                ref={contactRef}
                style={{
                  position: 'absolute',
                  left: '-9999px'
                }}
                onChange={() => null}
              />
            </div>
          )}
        </LabelRight>
      </Content>
      {pickup && formValuesPickupStore && (
        <AddressText>
          {intl.formatMessage({ id: 'display_self_mention' })}
        </AddressText>
      )}
      {addressTexts.map((v, i) => {
        return <AddressText key={i}>{v}</AddressText>;
      })}
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
      <OrderAddressFormModal
        modalOpen={modalOpen}
        onModalClose={onModalClose}
        onSubmit={onSubmit}
        title={label}
        intl={intl}
        formValueClient={formValueClient}
        formValuesPickupStore={formValuesPickupStore}
        pickup={pickup}
      />
    </FieldContainer>
  );
};

export default withFormValues({
  fields: [['pickupStore', 'formValuesPickupStore']]
})(props => {
  return <Field {...props} component={OrderAddressInput} />;
});
