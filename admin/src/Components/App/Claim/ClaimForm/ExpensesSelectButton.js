import React, { useState, useEffect, useMemo } from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import Modal from '../../../Modal';
import Button from '../../../Common/Button';
import { ErrorMessage } from '../../../Form/Errors';
import ExpenseService from '../../../../Services/APIServices/ExpenseService';

import ExpenseList from './ExpenseList';

const ExpensesSelectButton = ({
  disabled,
  input,
  meta: { touched, error },
  defaultValue
}) => {
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { expenses, loading } = useExpenses(modalOpen);

  const onDone = () => {
    input.onChange([...selected, ...(input.value || [])]);
  };

  useEffect(() => {
    !modalOpen && setSelected([]);
  }, [modalOpen]);

  const expenseListData = useMemo(() => {
    const inputValue = input.value || [];
    const filterValues = (defaultValue || []).filter(
      x => !expenses.find(v => v._id === x._id)
    );
    return [...filterValues, ...expenses].filter(
      expense => !inputValue.find(v => v._id === expense._id)
    );
  }, [expenses, input.value, defaultValue]);

  return (
    <>
      <Modal.Button
        disabled={disabled}
        modalStyle={{
          content: { width: '90%', margin: ' 0 auto' }
        }}
        inline
        text={<FormattedMessage id="display_select_expense" />}
        title={<FormattedMessage id="display_select_expense" />}
        content={() => (
          <ExpenseList
            loading={loading}
            expenses={expenseListData}
            selected={selected}
            onChange={setSelected}
          />
        )}
        onModalStateChange={setModalOpen}
        footer={({ closeModal }) => (
          <Button.Center>
            <Button.Primary
              disabled={expenseListData.length === 0}
              onClick={() => {
                closeModal();
                onDone();
              }}
            >
              <FormattedMessage id="display_confirm" />
            </Button.Primary>
          </Button.Center>
        )}
      />
      {touched && error && (
        <ErrorMessage style={{ marginTop: -10 }}>{error}</ErrorMessage>
      )}
    </>
  );
};

const useExpenses = modalOpen => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const req = async () => {
      try {
        setLoading(true);
        const result = await ExpenseService.getUnClaimExpenses({
          populates: ['payer', 'expenseType', 'order']
        });
        const data = Array.isArray(result?.data) ? [...result.data] : [];
        setExpenses(data);
      } catch (e) {
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };
    modalOpen && req();
  }, [modalOpen]);

  return { expenses, loading };
};

export default props => {
  return <Field {...props} component={ExpensesSelectButton} />;
};
