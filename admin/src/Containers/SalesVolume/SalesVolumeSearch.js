import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { SalesVolumeActions } from '../../Redux/SalesVolume/actions';
import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';

const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`;
class SalesVolumeSearchContainer extends React.PureComponent {
  onSearch = () => {
    const {
      getSalesVolumes,
      filterValues = {},
      onChangeFilterValue,
      searchTerm
    } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    const query = { ...querys, q: searchTerm };
    onChangeFilterValue(query);
    getSalesVolumes({
      query
    });
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
      getSalesVolumes: SalesVolumeActions.getSalesVolumes
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesVolumeSearchContainer);
