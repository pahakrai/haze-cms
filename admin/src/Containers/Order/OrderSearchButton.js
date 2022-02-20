import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { OrderActions } from '../../Redux/Order/actions';
import { SearchButton } from '../../Components/Common/FilterLayout';

class OrderSearchContainer extends React.PureComponent {
  onSearch = () => {
    const {
      getOrders,
      filterValues = {},
      searchTerm,
      workspaceType
    } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys, q: searchTerm, orderType: workspaceType };
    getOrders({
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
      getOrders: OrderActions.getOrders
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSearchContainer);
