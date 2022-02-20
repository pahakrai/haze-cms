import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import UserLevelList from '../../Components/App/UserLevel/UserLevelList';
import { UserLevelActions } from '../../Redux/UserLevel/actions';
import { getUserLevels } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class UserLevelListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchUserLevels({ refresh: true });
  }

  _onLoadMore = () => {
    const { fetchUserLevels } = this.props;
    fetchUserLevels({ append: true });
  };

  fetchUserLevels(options = { querys: {} }) {
    const { fetchUserLevels } = this.props;
    fetchUserLevels({
      ...options,
      query: { ...options.querys, populates: [] }
    });
  }

  render() {
    const isLoading = false;
    const {
      userLevels,
      locale,
      intl,
      pagination: { fetching, isEnd },
      renderFooter,
      header,
      gutter
    } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <UserLevelList
        locale={locale}
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        userLevels={userLevels}
        // onDeleteClick={expense => true}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  userLevels: getUserLevels(state),
  pagination: state.pagination.userLevels
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserLevels: UserLevelActions.getUserLevels
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserLevelListContainer)
);
