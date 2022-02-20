import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { SalesVolumeActions } from '../../Redux/SalesVolume/actions';
import { SearchButton } from '../../Components/Common/FilterLayout';

class SalesVolumeSearchButtonContainer extends React.PureComponent {
  onSearch = () => {
    const { getSalesVolumesByYear, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b] !== undefined || filterValues[b] !== null) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };
    query.year = query.year ? query.year : +new Date().getFullYear();
    getSalesVolumesByYear(query);
  };

  render() {
    const { intl } = this.props;
    return (
      <SearchButton onClick={this.onSearch}>
        <AiOutlineSearch />
        {intl.formatMessage({
          id: 'search'
        })}
      </SearchButton>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSalesVolumes: SalesVolumeActions.getSalesVolumes,
      getSalesVolumesByYear: SalesVolumeActions.getSalesVolumesByYear
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesVolumeSearchButtonContainer);
