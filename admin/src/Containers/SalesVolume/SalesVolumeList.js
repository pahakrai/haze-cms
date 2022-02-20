import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import SalesVolumeList from '../../Components/App/SalesVolume/SalesVolumeList';
import Loading from '../../Components/Common/Loading';
import { SalesVolumeActions } from '../../Redux/SalesVolume/actions';
import { getSalesVolumesAllResults } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class SalesVolumeListContainer extends React.PureComponent {
  componentDidMount() {
    const { getSalesVolumesByYear } = this.props;
    const year = moment().year();
    getSalesVolumesByYear({
      year: year
    });
  }

  render() {
    const isLoading = false;
    const {
      intl,
      locale,
      // pagination,
      renderFooter,
      header,
      gutter,
      salesVolumesAll
    } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <SalesVolumeList
        locale={locale}
        intl={intl}
        salesVolumesbyYear={salesVolumesAll}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    locale: state.intl.locale,
    salesVolumesAll: getSalesVolumesAllResults(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSalesVolumesByYear: SalesVolumeActions.getSalesVolumesByYear
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SalesVolumeListContainer)
);
