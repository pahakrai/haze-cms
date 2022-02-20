import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { CategoryActions } from '../../Redux/Category/actions';
import Button from '../../Components/Common/Button';
import TextInput from '../../Components/Common/TextInput';
// import Switch from '../../Components/Common/Switch';

const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

class CategorySearchContainer extends React.PureComponent {
  onSearch = () => {
    const {
      getCategories,
      filterValues = {},
      searchTerm,
      onFilterValueChange
    } = this.props;
    const querys = Object.keys(filterValues).reduce((result, b) => {
      if (filterValues[b]) {
        return { ...result, [b]: filterValues[b] };
      }
      return result;
    }, {});
    onFilterValueChange({ name: searchTerm });
    getCategories({
      ...querys,
      refresh: true,
      name: searchTerm
    });
  };

  render() {
    const { onChanged, intl } = this.props;

    return (
      <React.Fragment>
        <RowContainer>
          <Row type="flex" align="middle">
            <Col span={15}>
              <TextInput
                placeholder={intl.formatMessage({ id: 'search_placeholder' })}
                onChange={onChanged}
                style={{ backgroundColor: '#fff' }}
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
        </RowContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCategories: CategoryActions.getCategories
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySearchContainer);
