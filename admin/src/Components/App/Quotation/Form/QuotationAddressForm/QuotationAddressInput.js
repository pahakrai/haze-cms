import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Button as AntdButton } from 'antd';
import { FormattedMessage } from 'react-intl';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';

import { ErrorMessage } from '../../../../Form/Errors';
import FieldContainer from '../../../../Form/FieldContainer';
import { FieldLabel } from '../../../../Form/form.styled';

import { toast } from '../../../../../Lib/Toast';

import QuotationAddressFormModal from './QuotationAddressFormModal';
import { useRegion } from './QuotationAddressFormUtils';

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

const QuotationAddressInput = ({
  input: { value = {}, onChange },
  meta: { touched, error },
  updateMode,
  label,
  intl,
  formValueClient,
  renderRight,
  hiddenEditButton = false
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = useCallback(
    values => {
      setModalOpen(false);
      onChange(values);
    },
    [onChange]
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
          {!hiddenEditButton && (
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
              />
            </div>
          )}
        </LabelRight>
      </Content>
      {addressTexts.map((v, i) => {
        return <AddressText key={i}>{v}</AddressText>;
      })}
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
      <QuotationAddressFormModal
        modalOpen={modalOpen}
        onModalClose={onModalClose}
        onSubmit={onSubmit}
        title={label}
        // values={value}
        intl={intl}
        formValueClient={formValueClient}
      />
    </FieldContainer>
  );
};

export default props => {
  return <Field {...props} component={QuotationAddressInput} />;
};
