import React, { useState, useCallback, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import { toast } from '../../../Lib/Toast';
import Modal from '../../../Components/Modal';
import AddressService from '../../../Services/APIServices/AddressService';
import {
  OrderAddressForm,
  SelectClientAddress
} from '../../../Components/App/Order/Form/OrderAddressForm/OrderAddressFormModal/index';

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
  if (values.phone && !/^\d{1,8}$/.test(values.phone + '')) {
    errors.phone = <FormattedMessage id="error.phone.format" />;
  }
  return errors;
};

export const AddressFormModal = ({
  onSubmit,
  address,
  title,
  values: initValues,
  intl,
  memberId
}: AddressFormModalProps) => {
  const [modalType] = useState(INIT_TYPE);
  const [addressData, setAddressData] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initValues || {});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const updateClientAddress = async () => {
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
    };
    memberId && updateClientAddress();
  }, [memberId]);

  //  select actions
  const onSelectDone = value => {
    const _value = {
      ...value,
      country: value && value.country && value.country._id,
      state: value && value.state && value.state._id,
      city: value && value.city && value.city._id
    };
    delete _value._id;
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

  const _onSubmit = useCallback(async () => {
    const submit = async () => {
      const _errors = validate(values);
      setErrors(_errors);
      if (Object.keys(_errors).length > 0) {
        return;
      }

      let addressItem;
      if (!values._id) {
        addressItem = await AddressService.createAddress({
          ...values,
          refType: 'Members',
          ref: memberId
        });
      } else {
        addressItem = await AddressService.updateAddress({
          ...values,
          refType: 'Members',
          ref: memberId
        });
      }
      if (!addressItem && !addressItem.data) {
        setModalOpen(true);
        toast.error(
          <FormattedMessage
            id={values._id ? 'updated_failure' : 'created_failure'}
          />
        );
      }
      toast.success(
        <FormattedMessage
          id={values._id ? 'updated_successfully' : 'created_successfully'}
        />
      );
      setModalOpen(false);
      onChangeValues({}, {});
      const dataMembers = await AddressService.getAddresss({
        refType: 'Members',
        ref: memberId,
        populates: ['country', 'state', 'city']
      });
      if (dataMembers && dataMembers.data && dataMembers.data.length) {
        setAddressData(dataMembers.data);
      } else {
        setAddressData([]);
      }
      // onSubmit({ ...values, refType: 'Members', ref: memberId });
    };
    submit();
  }, [values, onChangeValues, memberId]);

  // const disabledSelectAddress =
  //   !memberId || !addressData || !addressData.length;
  const onModalClose = useCallback(() => {
    setModalOpen(false);
    onChangeValues({}, {});
  }, [setModalOpen, onChangeValues]);

  const onEditButtonClick = useCallback(value => {
    setModalOpen(true);
    const newValues = {
      ...value,
      country: value && value.country && value.country._id,
      state: value && value.state && value.state._id,
      city: value && value.city && value.city._id
    };
    setValues(newValues);
  }, []);

  return (
    <div>
      {modalType === INIT_TYPE && (
        <SelectClientAddress
          intl={intl}
          data={addressData}
          client={memberId}
          onChange={onSelectDone}
          rows={6}
          position="user"
          emptyMessage={null}
          onEditButtonClick={onEditButtonClick}
          onAddButtonClick={() => setModalOpen(true)}
        />
      )}
      <Modal.Default
        shouldOpenModal={modalOpen}
        title={intl.formatMessage({
          id: 'address'
        })}
        onModalClose={onModalClose}
        content={closeModal => {
          return (
            <OrderAddressForm
              intl={intl}
              values={values}
              onSubmit={_onSubmit}
              onChangeValues={onChangeValues}
              errors={errors}
            />
          );
        }}
      />
    </div>
  );
};

export default AddressFormModal;
