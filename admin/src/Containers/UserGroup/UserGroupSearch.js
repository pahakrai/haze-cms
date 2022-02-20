import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Redux
import { UserGroupActions } from '../../Redux/UserGroup/actions';
// Lib
import { Row, Col } from 'antd';
import styled from 'styled-components';
// Components
import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';

const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`;

class UserGroupSearch extends React.PureComponent {
  onSearch = () => {
    const { getUserGroups, filterValues } = this.props;
    const query = Object.keys(filterValues).reduce((a, b) => {
      if (filterValues[b] !== '') {
        a = { ...a, [b]: filterValues[b] };
      }
      return a;
    }, {});

    if (getUserGroups) getUserGroups({ refresh: true, ...query });
  };

  render() {
    const { intl, onChanged } = this.props;
    return (
      <React.Fragment>
        <Row type="flex" align="middle">
          <Col span={15}>
            <TextInput
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
      getUserGroups: UserGroupActions.getUserGroups
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UserGroupSearch);
