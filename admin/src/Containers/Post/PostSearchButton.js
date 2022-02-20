import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
// Components
import { AiOutlineSearch } from 'react-icons/ai';
// Redux
import { PostActions } from '../../Redux/Post/actions';
import Button from '../../Components/Common/Button';

const SearchButton = styled(Button.Primary)`
  margin: 0 0 0px 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class PostSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getPosts, filterValues = {} } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys };

    getPosts({
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
      getPosts: PostActions.getPosts
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSearchContainer);
