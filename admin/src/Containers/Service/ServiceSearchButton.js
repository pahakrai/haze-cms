import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { ServiceActions } from '../../Redux/Service/actions';

import { SearchButton } from '../../Components/Common/FilterLayout';

class ServiceSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getServices, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };
    getServices({
      query
    });
  };

  render() {
    const { intl } = this.props;
    return (
      <SearchButton
        style={{ margin: '0 0 10px 8px!important' }}
        onClick={this.onSearch}
      >
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
      getServices: ServiceActions.getServices
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceSearchContainer);
