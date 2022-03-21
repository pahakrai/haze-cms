import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { AccountActions } from '../Redux/Account/actions';
import { hazeApi } from '../Services/APIs'
// import { getAccountUser } from "../Redux/Account/sagas";
class AuthProvider extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    hazeApi.getTokenManager().on('authenticated', this.authenticated)
    hazeApi.getTokenManager().on('unAuthenticated', this.unAuthenticated)
    hazeApi.start()
  }
  authenticated = () => {}
  unAuthenticated = () => {}
  componentWillUnmount() {
    hazeApi.getTokenManager().remove('authenticated', this.authenticated)
    hazeApi.getTokenManager().remove('unAuthenticated', this.unAuthenticated)
  }
  render() {
    return <div>{this.props.children}</div>
  }
}
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)
