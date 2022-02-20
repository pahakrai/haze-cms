import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { UserLevelActions } from '../../Redux/UserLevel/actions';
import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';

const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`;
class UserLevelSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getUserLevels, filterValues = {}, searchTerm } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      return { ...result, [b]: filterValues[b] };
    }, {});
    getUserLevels({
      refresh: true,
      query: { ...querys, q: searchTerm }
    });
  };

  render() {
    const { onChanged, intl, searchTerm } = this.props;
    return (
      <React.Fragment>
        <Row type="flex" align="middle">
          <Col span={15}>
            <TextInput
              value={searchTerm}
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserLevels: UserLevelActions.getUserLevels
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLevelSearchContainer);
