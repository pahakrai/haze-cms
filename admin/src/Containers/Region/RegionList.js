import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import RegionList from '../../Components/App/Region/RegionList';
import { RegionActions } from '../../Redux/Region/actions';
import { getRegions } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class RegionListContainer extends React.PureComponent {
  componentDidMount() {
    const { regions } = this.props;
    if (!regions.length) {
      this.fetchRegions({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { fetchRegions } = this.props;
    fetchRegions({ append: true });
  };

  fetchRegions(options = { querys: {} }) {
    const { fetchRegions } = this.props;
    fetchRegions({
      ...options,
      query: { ...options.querys, populates: [] }
    });
  }

  onItemClick = region => {
    this.props.history.push(`/regions/${region._id}`);
  };

  render() {
    const { onItemClick } = this;
    const isLoading = false;
    const {
      regions,
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
      <RegionList
        locale={locale}
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        onItemClick={onItemClick}
        regions={regions}
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
  regions: getRegions(state),
  pagination: state.pagination.regions
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRegions: RegionActions.getRegions
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegionListContainer)
);
