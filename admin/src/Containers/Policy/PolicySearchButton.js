import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';

import { PolicyActions } from '../../Redux/Policy/actions';
import { SearchButton } from '../../Components/Common/FilterLayout';

class PolicySearchButton extends React.PureComponent {
  onSearch = () => {
    const { getPolicies, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };
    getPolicies({
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
      getPolicies: PolicyActions.getPolicies
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PolicySearchButton);
