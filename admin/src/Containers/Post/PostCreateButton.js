import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { withRouter } from 'react-router-dom';
// auth button
import withAuthActions from '../../Containers/Ac/withAuthActions';
import { CreateButton } from '../../Components/Common/FilterLayout';

class PostCreateButtonContainer extends React.PureComponent {
  _onCreate = () => {
    const { history } = this.props;
    history.push('/posts/create');
  };

  render() {
    const { intl } = this.props;
    return (
      <CreateButton type="button" onClick={this._onCreate}>
        <AiOutlinePlus /> {intl.formatMessage({ id: 'create_btn' })}
      </CreateButton>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withAuthActions(['Post:Create'])(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostCreateButtonContainer)
  )
);
