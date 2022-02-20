import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Modal from '../../../../../Modal';
import Loading from '../../../../../Common/Loading';
import AddressService from '../../../../../../Services/APIServices/AddressService';
import MemberService from '../../../../../../Services/APIServices/MemberService';

import { OrderAddressForm, SelectClientAddress } from '.';

const LoadingWarper = styled.div`
  text-align: center;
  margin-top: 12px;
  line-height: 32px;
`;

const WarningMessage = styled.div`
  color: #bbb;
`;

const MODAL_TYPE = {
  SELECT_TYPE: 'SELECT_TYPE',
  SELECT: 'SELECT',
  FORM: 'FORM'
};
const INIT_TYPE = MODAL_TYPE.SELECT;

const validate = (values: any) => {
  const errors: any = {};
  const required = <FormattedMessage id="error.required" />;
  if (!values.name) {
    errors.name = required;
  }
  if (!values.country) {
    errors.country = required;
  }
  if (!values.state) {
    errors.state = required;
  }
  if (!values.city) {
    errors.city = required;
  }
  if (!values.address1) {
    errors.address1 = required;
  }
  if (!values.phone) {
    errors.phone = required;
  }
  if (values.phone && !/^\d{8}$/.test(values.phone + '')) {
    errors.phone = (
      <FormattedMessage id="error.phone.length" values={{ number: 8 }} />
    );
  }
  return errors;
};

export const AddressFormModal = ({
  modalOpen,
  onModalClose,
  onSubmit,
  addressId,
  title,
  values: initValues,
  intl,
  formValueClient,
  formValuesPickupStore,
  pickup
}: AddressFormModalProps) => {
  const [addressLoading, setAddressLoading] = useState(false);
  const [modalType, setModalType] = useState(INIT_TYPE);
  const [addressData, setAddressData] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initValues || {});

  // init form
  useEffect(() => {
    setValues(initValues || {});
    setErrors({});
    modalOpen && setModalType(INIT_TYPE);
  }, [initValues, modalOpen]);

  //get client  address
  useEffect(() => {
    const updateClientAddress = async () => {
      let memberId = '';
      setAddressLoading(true);
      const membersData = await MemberService.getMembers({
        user: formValueClient
      });
      if (membersData && membersData.data && membersData.data[0]) {
        memberId = membersData.data[0]._id;
      }
      const data = await AddressService.getAddresss({
        refType: 'Members',
        ref: memberId,
        populates: ['country', 'state', 'city']
      });
      if (data && data.data && data.data.length) {
        setAddressData(data.data);
      } else {
        setAddressData([]);
      }
      setAddressLoading(false);
    };
    formValueClient && modalOpen && updateClientAddress();
  }, [formValueClient, modalOpen]);

  //  select actions
  const onSelectDone = value => {
    const _value = {
      ...value,
      country: value && value.country && value.country._id,
      state: value && value.state && value.state._id,
      city: value && value.city && value.city._id
    };
    delete _value._id;
    onSubmit(_value);
  };

  //  form actions
  const _onModalClose = () => {
    setValues(initValues || {});
    onModalClose && onModalClose();
  };
  const onChangeValues = useCallback(
    (_values, key) => {
      const newValues = { ..._values };
      setValues(newValues);
      if (key) {
        const _errors = validate(newValues);
        setErrors({ ...errors, [key]: _errors[key] });
      }
    },
    [errors]
  );
  const _onFormSubmit = useCallback(() => {
    const submit = () => {
      const _errors = validate(values);
      setErrors(_errors);
      if (Object.keys(_errors).length > 0) {
        return;
      }
      onSubmit({ ...values });
    };
    submit();
  }, [values, onSubmit]);

  const headerButtons = useMemo(
    () =>
      modalType !== INIT_TYPE
        ? [
            {
              label: intl.formatMessage({ id: 'back' }),
              onClick: () => {
                setModalType(INIT_TYPE);
                setValues({});
              }
            }
          ]
        : [],
    [modalType, intl]
  );

  const onStoreChange = useCallback(
    (value, item) => {
      const address = (item && item.store && item.store.address) || {};
      const _value = {
        name: address && address.name,
        address1: address && address.address1,
        address2: address && address.address2,
        phone: address && address.phone,
        country: address && address.country,
        state: address && address.state,
        city: address && address.city,
        postCode: address && address.postCode
      };
      onSubmit(_value, value);
    },
    [onSubmit]
  );
  // const disabledSelectAddress =
  //   !formValueClient || !addressData || !addressData.length;

  return (
    <Modal.Default
      shouldOpenModal={modalOpen}
      title={
        title ||
        intl.formatMessage({
          id: 'address'
        })
      }
      headerButtons={headerButtons}
      onModalClose={_onModalClose}
      content={closeModal =>
        addressLoading ? (
          <LoadingWarper>
            <Loading isLoading={addressLoading} fill={false} />
          </LoadingWarper>
        ) : (
          <div>
            {modalType === INIT_TYPE && (
              <SelectClientAddress
                intl={intl}
                data={addressData}
                client={formValueClient}
                onChange={onSelectDone}
                storeValue={formValuesPickupStore}
                onStoreChange={onStoreChange}
                pickup={pickup}
                emptyMessage={
                  !formValueClient ? (
                    <WarningMessage>
                      {intl.formatMessage({
                        id: 'order_pls_select_client_first'
                      })}
                    </WarningMessage>
                  ) : !addressData || !addressData.length ? (
                    <WarningMessage>
                      {intl.formatMessage({
                        id: 'order_current_client_no_address'
                      })}
                    </WarningMessage>
                  ) : null
                }
                onAddButtonClick={() => setModalType(MODAL_TYPE.FORM)}
              />
            )}
            {modalType === MODAL_TYPE.FORM && (
              <OrderAddressForm
                intl={intl}
                values={values}
                onSubmit={_onFormSubmit}
                onChangeValues={onChangeValues}
                errors={errors}
              />
            )}
          </div>
        )
      }
    />
  );
};

export default AddressFormModal;
