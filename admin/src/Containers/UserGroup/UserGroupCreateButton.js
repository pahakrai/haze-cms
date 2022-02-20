import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { withRouter } from 'react-router-dom';

// auth button
import withAuthButton from '../../Containers/Ac/withAuthButton';
import { CreateButton } from '../../Components/Common/FilterLayout';

const Button = withAuthButton(['UserGroup:Create']);

class UserGroupCreateButton extends React.PureComponent {
  _onCreate = () => {
    const { history } = this.props;
    history.push('/user-groups/create');
  };

  render() {
    const { intl } = this.props;
    return (
      <Button
        intl={intl}
        onClick={this._onCreate}
        component={CreateButton}
        type="button"
      >
        <AiOutlinePlus />{' '}
      </Button>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserGroupCreateButton)
);
