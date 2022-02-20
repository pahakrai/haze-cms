import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';

import { WorkspaceActions } from '../../Redux/Workspace/actions';
const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`;
class WorkspaceSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getWorkspaces, filterValues, searchTerm } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b] !== undefined) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    getWorkspaces({ refresh: true, filterValues: querys, searchTerm });
  };

  render() {
    const { onChanged, intl } = this.props;
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
      getWorkspaces: WorkspaceActions.getWorkspaces
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceSearchContainer);
