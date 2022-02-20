import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { ProductActions } from '../../Redux/Product/actions';
import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';

const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`;
class ProductSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getProducts, filterValues = {}, searchTerm } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      return { ...result, [b]: filterValues[b] };
    }, {});
    getProducts({
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
      getProducts: ProductActions.getProducts
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearchContainer);
