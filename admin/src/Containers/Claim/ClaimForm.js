import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { destroy } from 'redux-form';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Common from '@golpasal/common';

import ClaimForm from '../../Components/App/Claim/ClaimForm';
import Loading from '../../Components/Common/Loading';
import AccountSelector from '../../Redux/Account/selectors';

import { ClaimActions } from '../../Redux/Claim/actions';
import { getClaimById } from '../../Redux/selectors';
import FormName from '../../Constants/Form';

class ClaimFormContainer extends React.Component {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  constructor() {
    super();
    this.formDate = new Date().toISOString();
  }
  componentDidMount() {
    const { claimId, getClaimById } = this.props;

    if (claimId)
      getClaimById(claimId, {
        populates: ['expenses.order', 'expenses.payer', 'expenses.expenseType']
      });
  }
  componentDidUpdate(prevProps, prevState) {
    const { claimId } = this.props;
    if (prevProps.claimId !== this.props.claimId) {
      getClaimById(claimId, { populates: ['expenses'] });
    }
  }

  onSubmit(claim) {
    const { createClaim, updateClaim } = this.props;
    const fn = claim._id ? updateClaim : createClaim;
    const values = { ...claim };
    values.expenses = (claim?.expenses || []).map(v => v._id);
    if (claim._id) {
      fn(values);
    } else {
      fn(values);
    }
  }

  onSubmitSuccess() {
    const { history, onSubmitSuccess } = this.props;
    onSubmitSuccess && onSubmitSuccess();
    history.push('/claims');
  }

  onSubmitFail() {}

  getInitialValues = () => {
    const { claim, updateMode } = this.props;

    return updateMode
      ? {
          ...claim
        }
      : {
          status: Common.status.ClaimStatus.PENDING,
          date: this.formDate,
          amount: 0,
          deisionDate: this.formDate
        };
  };

  componentWillUnmount() {
    const { form, destroy } = this.props;
    destroy(form);
  }
  render() {
    const key = this.props.claim ? this.props.claim._id : 'new';
    let isLoading = false; // dummy
    const {
      updateMode,
      intl,
      claim,
      form,
      hiddenField,
      currentUser,
      formStatus
    } = this.props;
    if (updateMode && !claim) {
      isLoading = true;
    }
    const initialValues = this.getInitialValues();
    const { _onDeleteClick } = this;
    return isLoading ? (
      <Loading />
    ) : (
      <ClaimForm
        // form props
        key={key}
        form={form}
        updateMode={updateMode}
        onDeleteClick={_onDeleteClick}
        currentUser={currentUser}
        hiddenField={{
          ...hiddenField,
          declineReason:
            !updateMode || formStatus !== Common.status.ClaimStatus.DECLINED,
          claimDate: formStatus !== Common.status.ClaimStatus.CLAIMED,
          rejectDate: formStatus !== Common.status.ClaimStatus.DECLINED
        }}
        initialValues={initialValues}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        // other props
        intl={intl}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { CLAIM_CREATE, CLAIM_UPDATE } = FormName;
  const updateMode = Boolean(ownProps.claimId);
  const form = updateMode ? CLAIM_UPDATE : CLAIM_CREATE;
  const claim = getClaimById(state, ownProps.claimId, { populate: false });
  const selector = formValueSelector(form);

  return {
    form,
    claim,
    updateMode,
    formStatus: selector(state, 'status'),
    locale: state.intl.locale,
    currentUser: AccountSelector.getCurrentUser(state),
    currentUserType: (AccountSelector.getCurrentUser(state) || {}).userType
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createClaim: ClaimActions.createClaim,
      updateClaim: ClaimActions.updateClaim,
      getClaimById: ClaimActions.getClaimById,
      getExamineClaim: ClaimActions.getExamineClaim,
      approveClaim: ClaimActions.approveClaim,
      rejectClaim: ClaimActions.rejectClaim,
      appealClaim: ClaimActions.appealClaim,
      destroy
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClaimFormContainer)
);
