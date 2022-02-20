import React from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Modal from '../../../Components/Modal';
import UserItem from '../../../Components/App/User/UserListItem';
import Spacer from '../../../Components/Common/Spacer';
// Containers
import UserSearch from '../../../Containers/User/UserSearch';
import UserList from '../../../Containers/User/UserList';
// Redux
import { UserActions } from '../../../Redux/User/actions';

const UserProfileParametersModal = ({ closeModal, onChange, type, intl }) => {
  // combination
  const _getParameters = _id => {
    return { _id };
  };
  return (
    <React.Fragment>
      <div>
        <UserSearch userType={type} intl={intl} />
      </div>
      <Spacer height={20} />
      <UserList
        intl={intl}
        userType={type}
        onItemClick={_id => {
          onChange(_getParameters(_id));
          closeModal();
        }}
      />
    </React.Fragment>
  );
};

UserProfileParametersModal.defaultProps = {
  type: 'user',
  closeModal: () => {},
  onChange: () => {},
  intl: {}
};

class UserProfileParameters extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  static defaultProps = {
    value: { _id: null },
    // fetch user Item
    fetchUserItem: () => ({}),
    // _id get user
    user: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value && nextProps.value._id !== prevState.value._id) {
      // update user Item
      if (nextProps.value && nextProps.value._id && nextProps.fetchUserItem)
        nextProps.fetchUserItem(nextProps.value._id);
      return {
        value: nextProps.value
      };
    }
    if (nextProps.user) return null;
  }

  _isEmptyValue = () => {
    const { value } = this.props;
    return !(value && value._id);
  };

  render() {
    const { user, intl } = this.props;
    return (
      <React.Fragment>
        <Modal.Button
          onRef={modalRef => (this.modalRef = modalRef)}
          title={intl.formatMessage({ id: 'display_user' })}
          text={intl.formatMessage({ id: 'display_select' })}
          content={closeModal => (
            <UserProfileParametersModal
              closeModal={closeModal}
              {...this.props}
            />
          )}
        />
        {!this._isEmptyValue() && (
          <UserItem
            user={user}
            onItemClick={() =>
              this.modalRef.openModal && this.modalRef.openModal()
            }
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // value
  user:
    (ownProps.value &&
      ownProps.value._id &&
      state.resources.users[ownProps.value._id]) ||
    {}
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserItem: UserActions.findUserById
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileParameters);
