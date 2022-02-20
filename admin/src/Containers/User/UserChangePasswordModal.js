import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { reset } from 'redux-form';
import { toast } from '../../../Lib/Toast';

import Button from '../../Components/Common/Button';
import Modal from '../../Components/Modal';
import ChangePasswordForm from '../../Components/App/ChangePasswordForm';
import { AccountActions } from '../../Redux/Account/actions';
import FormName from '../../Constants/Form';

class ChangePasswordModalContainer extends React.PureComponent {
  onSubmitSuccess = () => {
    toast.success(`Change Password Successfully`);
  };
  onSubmitFail = err => {
    toast.error(`Change Password Failed`);
  };
  onSubmit = form => {
    const { changePassword, selectedId } = this.props;
    changePassword({ password: form.password }, selectedId);
  };
  render() {
    const { onSubmitSuccess, onSubmitFail, onSubmit } = this;
    const { intl } = this.props;
    return (
      <Modal.Button
        text={intl.formatMessage({ id: 'display_btn_change_password' })}
        title={'Change Password Form'}
        afterCloseModal={() => this.props.resetForm(FormName.CHANGE_PASSWORD)}
        button={openModal => (
          <Button
            onClick={() => {
              openModal();
            }}
            type="button"
            style={{ width: '100%' }}
          >
            {intl.formatMessage({ id: 'display_btn_change_password' })}
          </Button>
        )}
        content={closeModal => (
          <ChangePasswordForm
            intl={intl}
            onSubmit={onSubmit}
            onSubmitFail={onSubmitFail}
            updateMode={true}
            onSubmitSuccess={() => {
              onSubmitSuccess();
              closeModal();
            }}
          />
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedId: state.user.selected
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePassword: AccountActions.changePassword,
      resetForm: reset
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModalContainer)
);
