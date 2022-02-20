import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AiOutlineSearch } from 'react-icons/ai';

import { ClaimActions } from '../../Redux/Claim/actions';
import { SearchButton } from '../../Components/Common/FilterLayout';

class ClaimSearchButton extends React.PureComponent {
  onSearch = () => {
    const { getClaims, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };
    getClaims({
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
      getClaims: ClaimActions.getClaims
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ClaimSearchButton);
