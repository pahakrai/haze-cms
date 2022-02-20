import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TagActions } from '../../Redux/Tag/actions';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchButton } from '../../Components/Common/FilterLayout';

class TagSearchButtonContainer extends React.PureComponent {
  onSearch = () => {
    const { getDistinctTags, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});

    const query = { ...querys };

    getDistinctTags({
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
      getDistinctTags: TagActions.getDistinctTags
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagSearchButtonContainer);
