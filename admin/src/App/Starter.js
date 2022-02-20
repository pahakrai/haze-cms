import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IntlActions } from '../Redux/Intl/actions';
import { AppActions } from '../Redux/App/actions';

class Starter extends React.PureComponent {
  componentDidMount() {
    const {
      locale,
      updateIntl,
      resetOpenedNavItemGroups,
      isSidebarOpen,
      toggleSidebarOpen
    } = this.props;
    updateIntl(locale);
    resetOpenedNavItemGroups(); // reset menu status

    // sidebar state
    if (document.body.offsetWidth > 700) {
      if (!isSidebarOpen) {
        toggleSidebarOpen(true);
      }
    } else {
      if (isSidebarOpen) {
        toggleSidebarOpen(false);
      }
    }
  }
  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale,
  isSidebarOpen: state.app.isSidebarOpen
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateIntl: IntlActions.updateIntl,
      resetOpenedNavItemGroups: AppActions.resetOpenedNavItemGroups,
      toggleSidebarOpen: AppActions.toggleSidebarOpen
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Starter);
