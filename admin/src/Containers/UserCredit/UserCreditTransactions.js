import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// redux
import { UserCreditActions } from '../../Redux/UserCredit/actions';
import { getUserCredits } from '../../Redux/UserCredit/selectors';
// antd
import { Button } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
// Components
import Modal from '../../Components/Modal';
import UserCreditTransactionsList from '../../Components/App/UserCredit/UserCreditTransactionsList';

class UserCreditTransactionsContainer extends React.PureComponent {
  componentDidMount() {
    const { getUserCredits, userId, amountType } = this.props;
    getUserCredits({ userId, page: 1, amountType }, { refresh: true });
  }

  componentDidUpdate(prevProps) {
    const { getUserCredits, userId, amountType } = this.props;
    if (prevProps.userId !== userId)
      getUserCredits({ userId, page: 1, amountType }, { refresh: true });
  }
  render() {
    const { transactionsList, ...props } = this.props;
    return <UserCreditTransactionsList {...props} options={transactionsList} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionsList: getUserCredits(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserCredits: UserCreditActions.getUserCredits
    },
    dispatch
  );
const ConnectUserCreditTransactions = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCreditTransactionsContainer);

// with model Transactions List
export const UserCreditTransactionsModel = ({ intl, ...props }) => (
  <Modal.Button
    button={openModal => (
      <Button
        size="small"
        type="primary"
        shape="circle"
        icon={<CreditCardOutlined />}
        onClick={() => openModal()}
      />
    )}
    title={intl && intl.formatMessage({ id: 'tab_user_from_credit' })}
    content={closeModal => (
      <ConnectUserCreditTransactions
        {...props}
        intl={intl}
        onSubmitSuccess={closeModal}
      />
    )}
  />
);

export default ConnectUserCreditTransactions;
