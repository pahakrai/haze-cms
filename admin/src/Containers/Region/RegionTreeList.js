import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RegionActions } from '../../Redux/Region/actions';
import { getRegionsByParent } from '../../Redux/selectors';
import RegionTreeListTemp from './RegionTreeListTemp';

class _RegionTreeList extends React.PureComponent {
  componentDidMount() {
    const { parent, fetchRegions } = this.props;
    const fetchQuery = parent ? { parent } : {};

    fetchRegions({
      ...fetchQuery,
      populates: []
    });
  }

  render() {
    return <RegionTreeListTemp {...this.props} />;
  }
}

const mapStateToProps = (state, { ancestors = [], parent }) => ({
  regions: getRegionsByParent(state, parent || null)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRegions: RegionActions.getAllRegion
    },
    dispatch
  );
const RegionTreeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RegionTreeList);

export default RegionTreeList;
