import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { SystemReportActions } from '../../Redux/SystemReport/actions';

import { SearchButton } from '../../Components/Common/FilterLayout';

class ReportSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getSystemReports, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };
    getSystemReports({
      query
    });
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
      getSystemReports: SystemReportActions.getSystemReports
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportSearchContainer);
