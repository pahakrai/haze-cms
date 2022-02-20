import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { SubscriptionLogActions } from '../../Redux/SubscriptionLog/actions';

import { SearchButton } from '../../Components/Common/FilterLayout';

class SubscriptionLogSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getSubscriptionLogs, filterValues = {}, searchTerm } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    getSubscriptionLogs({
      refresh: true,
      query: { ...querys, q: searchTerm ? searchTerm : undefined }
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
      getSubscriptionLogs: SubscriptionLogActions.getSubscriptionLogs
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionLogSearchContainer);
