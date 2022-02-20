import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from '../../../Lib/Toast';
import { UserActions } from '../../Redux/User/actions';

import Button from '../../Components/Common/Button';
import Modal from '../../Components/Modal';

class UserDeleteButtonContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { userDeleted } = this.props;

    if (userDeleted && userDeleted !== prevProps.userDeleted) {
      const { resetUserDeleted, history } = this.props;
      toast.success('Delete User Successfully');
      resetUserDeleted();
      history.push('/users');
    }
  }
  render() {
    const { userId, deleteUser } = this.props;
    return (
      <Modal.Button
        type="button"
        title={'Delete User'}
        button={openModal => (
          <Button.Danger onClick={openModal} type="button">
            Delete User
          </Button.Danger>
        )}
        content={closeModal => (
          <Button.Danger
            onClick={() => {
              deleteUser(userId);
              closeModal();
            }}
          >
            Delete
          </Button.Danger>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  userDeleted: state.user.deleted
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteUser: UserActions.deleteUser,
      resetUserDeleted: () => UserActions.setDeleted(null)
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDeleteButtonContainer)
);
