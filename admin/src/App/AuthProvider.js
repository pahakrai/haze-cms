import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { AccountActions } from '../Redux/Account/actions';
import { ecommApi } from '../Services/APIs';
// import { getAccountUser } from "../Redux/Account/sagas";
class AuthProvider extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    ecommApi.getTokenManager().on('authenticated', this.authenticated);
    ecommApi.getTokenManager().on('unAuthenticated', this.unAuthenticated);
    ecommApi.start();
  }
  authenticated = () => {};
  unAuthenticated = () => {};
  componentWillUnmount() {
    ecommApi.getTokenManager().remove('authenticated', this.authenticated);
    ecommApi.getTokenManager().remove('unAuthenticated', this.unAuthenticated);
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
