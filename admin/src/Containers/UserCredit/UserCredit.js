import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
// common
import Common from '@golpasal/common'
// antd
// styled
import styled from 'styled-components'
// Components
import Spacer from '../../Components/Common/Spacer'
import FieldContainer from '../../Components/Form/FieldContainer'
import { UserCreditActions } from '../../Redux/UserCredit/actions'
import FieldLabel from '../../Components/Form/FieldLabel'
import UserCreditTransactionForm from './UserCreditTransactionForm'
import Modal from '../../Components/Modal'

// UserCredit Transaction form
import { UserCreditTransactionFormModel } from './UserCreditTransactionForm'
import UserCreditTransactions from './UserCreditTransactions'

const { AmountType } = Common.type

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  justify-content: ${(props) =>
    !props.useJustify ? 'space-between' : 'flex-start'};
`

class UserCreditContainer extends React.PureComponent {
  state = {
    creditId: '',
    formModalOpen: false
  }
  _getLabel = () => {
    const { intl, lable } = this.props
    return lable || intl.formatMessage({ id: 'create_btn' })
  }

  _onCreditTransactionSubmitSuccess = () => {
    const { getUserCredits, userId, amountType } = this.props
    getUserCredits({ userId, amountType }, { refresh: true })
  }

  onPageChange = (page, limit) => {
    const { getUserCredits, userId } = this.props
    getUserCredits({ userId, page, limit }, { refresh: true })
  }
  _onItemClick = (id) => {
    this.setState({
      creditId: id,
      formModalOpen: true
    })
  }

  render() {
    const { userId, intl, loading, pagination, amountType } = this.props
    const { creditId, formModalOpen } = this.state

    return (
      <FieldContainer>
        {/* credit list */}
        <React.Fragment>
          <Row marginBottom={10} useJustify>
            <FieldLabel>{this._getLabel()}</FieldLabel>
            <Spacer width={10} />
            <UserCreditTransactionFormModel
              onSubmitSuccess={this._onCreditTransactionSubmitSuccess}
              amountType={amountType}
              {...this.props}
            />
          </Row>
          <Modal.Default
            shouldOpenModal={formModalOpen}
            title={intl.formatMessage({
              id:
                AmountType.POINT === amountType
                  ? 'display_user_credit_view_point'
                  : 'display_user_credit_view_cash'
            })}
            onModalClose={() => this.setState({ formModalOpen: false })}
            content={(closeModal) =>
              creditId && (
                <UserCreditTransactionForm
                  intl={intl}
                  userCreditId={creditId}
                  amountType={amountType}
                  onSubmitSuccess={() => {
                    closeModal && closeModal()
                    this._onCreditTransactionSubmitSuccess()
                  }}
                />
              )
            }
          />
          <UserCreditTransactions
            userId={userId}
            intl={intl}
            amountType={amountType}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              showQuickJumper: true,
              total: pagination.total,
              onChange: this.onPageChange
            }}
            loading={loading}
            onItemClick={this._onItemClick}
          />
        </React.Fragment>
      </FieldContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pagination: state.pagination.userCredits,
    loading: state.loading.getUserCredits
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserCredits: UserCreditActions.getUserCredits
    },
    dispatch
  )
export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(UserCreditContainer)
)
