import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { CourierActions } from '../../Redux/Courier/actions';

import { SearchButton } from '../../Components/Common/FilterLayout';

class CourierSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getCouriers, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };
    getCouriers({
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
      getCouriers: CourierActions.getCouriers
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourierSearchContainer);
