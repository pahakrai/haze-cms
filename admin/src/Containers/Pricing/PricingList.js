import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PricingList from '../../Components/App/Pricing/PricingList';
import { PrcingsActions } from '../../Redux/Pricing/actions';
import { getPricings } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';
class PricingListContainer extends React.PureComponent {
  componentDidMount() {
    this.getPricingsList();
  }
  getPricingsList = (query = {}) => {
    const { getPricingsList, querys } = this.props;
    getPricingsList({
      refresh: true,
      filterValues: {
        populates: ['pricing', 'vehicleType', 'regionA', 'regionB'],
        ...querys,
        ...query
      }
    });
  };
  onPageChange = (page, limit) => {
    this.getPricingsList({ page, limit });
  };

  render() {
    const {
      pricings,
      updatePricingsById,
      getPricingsList,
      locale,
      intl,
      pagination,
      vehicleType,
      locFr,
      locTo
    } = this.props;
    return (
      <PricingList
        // initialValues={initialValues}
        locale={locale}
        updatePricingsById={updatePricingsById}
        getPricingsList={getPricingsList}
        intl={intl}
        pricings={pricings}
        vehicleType={vehicleType}
        locTo={locTo}
        locFr={locFr}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this.onPageChange
        }}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    locale: state.intl.locale,
    pricings: getPricings(state),
    pagination: state.pagination.pricings
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPricingsList: PrcingsActions.getPricingsList,
      getPricings: PrcingsActions.getPricings,
      updatePricingsById: PrcingsActions.updatePricingsById
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PricingListContainer)
);
