import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Redux
import { PostActions } from '../../Redux/Post/actions';
// Lib
import { Row, Col } from 'antd';
import styled from 'styled-components';
// Components
import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';

const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`;

class PostSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getPosts, filterValues, searchTerm } = this.props;
    getPosts({ refresh: true, filterValues, searchTerm });
  };

  render() {
    const { intl, onChanged } = this.props;
    return (
      <Row type="flex" align="middle">
        <Col span={15}>
          <TextInput
            onKeyDown={this._onSearchKeyDown}
            placeholder={intl.formatMessage({ id: 'search_placeholder' })}
            onChange={onChanged}
          />
        </Col>
        <Col offset={1} span={8}>
          <SearchButton onClick={this.onSearch}>
            {intl.formatMessage({
              id: 'search'
            })}
          </SearchButton>
        </Col>
      </Row>
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
