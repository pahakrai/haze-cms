import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// form
import { formValueSelector, change as changeFormValue } from 'redux-form'
// common
import Common from '@golpasal/common'
// antd
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { toast } from '../../Lib/Toast'

// redux
import { UserCreditActions } from '../../Redux/UserCredit/actions'
import { getCurrencies } from '../../Redux/selectors'
import { CurrencyActions } from '../../Redux/Currency/actions'

import { getUserCreditByUId } from '../../Redux/UserCredit/selectors'
// Constants
import FormName from '../../Constants/Form'
// Components
import Modal from '../../Components/Modal'
import UserCreditTransactionForm from '../../Components/App/UserCredit/UserCreditTransactionForm'

const { TransactionType, AmountType } = Common.type

class _UserCreditTransactionFormContainer extends React.PureComponent {
  componentDidMount() {
    const { getCurrencies, currencies, userCreditId, getUserCreditByUId } =
      this.props
    userCreditId && getUserCreditByUId(userCreditId)
    ;(!currencies || currencies.length === 0) && getCurrencies()
  }
  _onSubmit = (fromValue) => {
    const { userId, createUserCredit, updateMode, userCreditId } = this.props
    const credit = { ...fromValue }
    credit.amount = Number(fromValue.amount)
    if (userId && !userCreditId && !updateMode && createUserCredit) {
      createUserCredit({ user: userId, ...credit })
    }
  }
  componentDidUpdate(prevProps) {
    const { formValueAmountType, formName, changeFormValue } = this.props

    if (prevProps.formValueAmountType !== formValueAmountType) {
      if (formValueAmountType === AmountType.CASH) {
        changeFormValue(formName, 'currency', 'HKD')
      } else {
        changeFormValue(formName, 'currency', null)
      }
    }
  }

  _onSubmitSuccess = () => {
    const { onSubmitSuccess, intl, updateMode } = this.props
    if (!updateMode) {
      toast.success(intl && intl.formatMessage({ id: 'created_successfully' }))
    } else {
      toast.success(intl && intl.formatMessage({ id: 'updated_successfully' }))
    }
    if (onSubmitSuccess) onSubmitSuccess()
  }

  render() {
    const {
      initialValues,
      formName,
      intl,
      updateMode,
      currencies,
      formValueAmountType,
      amountType
    } = this.props

    return (
      <UserCreditTransactionForm
        currencies={currencies}
        initialValues={initialValues}
        intl={intl}
        form={formName}
        updateMode={updateMode}
        amountType={amountType}
        formValueAmountType={formValueAmountType}
        onSubmit={this._onSubmit}
        onSubmitSuccess={this._onSubmitSuccess}
      />
    )
  }
}

const mapStateToProps = (state, { userCreditId, amountType }) => {
  const { USER_CREDIT_TRANSACTIONS_UPDATE, USER_CREDIT_TRANSACTIONS_CREATE } =
    FormName
  const formName = userCreditId
    ? USER_CREDIT_TRANSACTIONS_UPDATE
    : USER_CREDIT_TRANSACTIONS_CREATE
  const _formValueSelector = formValueSelector(formName)
  const userCredit = getUserCreditByUId(state, userCreditId)
  return {
    initialValues: userCredit
      ? {
          ...userCredit,
          description: userCredit.description ? userCredit.description : ' '
        }
      : {
          amountType: amountType,
          transactionType: TransactionType.IN
        },
    currencies: getCurrencies(state),
    updateMode: !!userCreditId,
    formName,
    formValueAmountType: _formValueSelector(state, 'amountType')
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserCreditByUId: UserCreditActions.getUserCreditByUId,
      createUserCredit: UserCreditActions.createUserCredit,
      getCurrencies: CurrencyActions.getCurrencies,
      changeFormValue
    },
    dispatch
  )
const UserCreditTransactionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserCreditTransactionFormContainer)

// with model create UserCreditTransaction Form
export const UserCreditTransactionFormModel = ({
  intl,
  onSubmitSuccess,
  amountType,
  ...props
}) => (
  <Modal.Button
    button={(openModal) => (
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="small"
        onClick={() => openModal()}
      />
    )}
    title={
      intl &&
      intl.formatMessage({
        id:
          AmountType.POINT === amountType
            ? 'display_user_credit_create_point'
            : 'display_user_credit_create_cash'
      })
    }
    content={(closeModal) => (
      <UserCreditTransactionFormContainer
        {...props}
        amountType={amountType}
        intl={intl}
        onSubmitSuccess={() => {
          closeModal && closeModal()
          onSubmitSuccess && onSubmitSuccess()
        }}
      />
    )}
  />
)

export default UserCreditTransactionFormContainer
