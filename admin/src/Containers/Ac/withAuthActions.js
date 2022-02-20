import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// lib
import { isAuthenticated } from '../../Lib/Ac';
// Redux
import { AccountActions } from '../../Redux/Account/actions';
import AccountSelector from '../../Redux/Account/selectors';

class AuthComponent extends React.PureComponent {
  static defaultProps = {
    // wrapAuth :{ auth }
    forceWrapAuth: false,
    requestActions: [],
    component: () => <div />
  };

  componentDidMount() {
    const { currentUser, requestActions, getAccountUser } = this.props;
    if (
      !requestActions ||
      !Array.isArray(requestActions) ||
      !requestActions.length
    )
      console.warn('withAuthActions -> requestActions.length null');
    else
      (!currentUser || !currentUser.actions) &&
        getAccountUser &&
        getAccountUser();
  }

  render() {
    const {
      component: ComponentToWrap,
      requestActions,
      currentUser,
      getAccountUser,
      forceWrapAuth,
      ...props
    } = this.props;
    // pass
    const pass =
      !!currentUser && isAuthenticated(currentUser, { requestActions });
    return pass || forceWrapAuth ? (
      // pass or forceWrapAuth
      <ComponentToWrap
        {...(forceWrapAuth
          ? {
              wrapAuth: {
                auth: pass,
                requestActions,
                userActions: !!currentUser && currentUser.actions
              }
            }
          : {})}
        {...props}
      />
    ) : (
      // no pass and no forceWrapAuth
      <div />
    );
  }
}

const AuthCompose = connect(
  state => ({
    currentUser: AccountSelector.getCurrentUser(state)
  }),
  dispatch =>
    bindActionCreators(
      { getAccountUser: AccountActions.getAccountUser },
      dispatch
    )
)(AuthComponent);

// at component eg : some button need action
export default requestActions => ComponentToWrap =>
  !requestActions || !Array.isArray(requestActions) || !requestActions.length
    ? // no actions
      ComponentToWrap
    : // auth actions
      class AuthStrategyComponent extends React.PureComponent {
        render() {
          return (
            <AuthCompose
              {...this.props}
              requestActions={requestActions}
              component={ComponentToWrap}
            />
          );
        }
      };
