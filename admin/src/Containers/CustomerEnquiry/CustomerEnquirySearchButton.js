import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';

import { SearchButton } from '../../Components/Common/FilterLayout';
import { CustomerEnquiryActions } from '../../Redux/CustomerEnquiry/actions';

class CustomerEnquirySearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getCustomerEnquiries, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };
    getCustomerEnquiries({
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
      getCustomerEnquiries: CustomerEnquiryActions.getCustomerEnquiries
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerEnquirySearchContainer);
