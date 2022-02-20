import React from 'react';
import { Field } from 'redux-form';
import { Col, Row } from 'react-flexa';
import { Table } from 'antd';
import styled from 'styled-components';

import TextInput from '../../../Common/TextInput';
import { SearchButton } from '../../../Common/FilterLayout';
import Button from '../../../Common/Button';
import ProductService from '../../../../Services/APIServices/ProductService';

const TextInputContaier = styled.div`
  width: calc(100% - 50px);
  display: inline-block;
`;
class SelectProductTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      selectedProducts: [],
      filterValue: {}
    };
  }
  static defaultProps = {
    otherHeaderComp: null,
    data: [],
    rowKey: '_id',
    onSelectChange: selectList => {},
    selectList: []
  };
  static defaultProps = {
    onItemClick: () => true,
    multiple: false,
    pageSize: 10
  };

  async componentDidMount() {
    const { formValueDetail } = this.props;
    const { data } = await ProductService.getProducts({
      populates: ['category', 'specs', 'skus']
    });
    // find selected products
    let selectedId = [];
    let selectedProducts = [];
    formValueDetail.forEach(v => {
      data.forEach(j => {
        if (v._id === j._id) {
          selectedId.push(j._id);
          selectedProducts.push(j);
        }
      });
    });

    this.setState({
      loading: false,
      products: data,
      allProducts: data,
      selectedProducts: selectedProducts,
      selectedRowKeys: selectedId
    });
  }
  onSelectChange = key => {
    const { onItemClick } = this.props;
    const { allProducts } = this.state;
    let result = [];
    key.forEach(item => {
      allProducts.forEach(items => {
        if (items._id === item) {
          result.push(items);
        }
      });
    });
    onItemClick(result);
    this.setState({ selectedProducts: result, selectedRowKeys: key });
  };

  searchProduct = async () => {
    const { filterValue } = this.state;
    this.setState({ loading: true });
    const { data } = await ProductService.getProducts({
      q: filterValue.q
    });

    this.setState({
      loading: false,
      products: data
    });
  };

  render() {
    const { intl, loading, closeModal } = this.props;
    const { selectedRowKeys, products, filterValue } = this.state;
    const columns = [
      {
        title: intl.formatMessage({
          id: 'display_payroll_event_name'
        }),
        render: value => value.name[intl.locale]
      }
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div>
        <Row style={{ paddingBottom: '10px' }}>
          <Col xs={12} sm={8} md={8} lg={8}>
            <TextInputContaier>
              <TextInput
                placeholder={intl.formatMessage({ id: 'search_placeholder' })}
                onChange={v =>
                  this.setState({
                    filterValue: { ...filterValue, q: v }
                  })
                }
              />
            </TextInputContaier>
          </Col>

          <Col xs={12} sm={4} md={4} lg={4}>
            <SearchButton
              style={{ float: 'right' }}
              onClick={() => this.searchProduct()}
            >
              {intl.formatMessage({
                id: 'search'
              })}
            </SearchButton>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Table
              rowSelection={rowSelection}
              rowKey={record => record._id}
              columns={columns}
              dataSource={products}
              loading={loading}
            />
          </Col>
        </Row>
        <Button.Center topMargin={20}>
          <Button.Primary
            onClick={() => {
              const {
                input: { onChange }
              } = this.props;
              const { selectedProducts } = this.state;
              onChange(selectedProducts);
              closeModal();
            }}
          >
            {intl.formatMessage({ id: 'display_confirm' })}
          </Button.Primary>
        </Button.Center>
      </div>
    );
  }
}

export default props => {
  return <Field {...props} component={SelectProductTable} />;
};
