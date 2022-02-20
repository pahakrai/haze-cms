import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Row, Col, Slider } from 'antd';
// intl
import Button from '../../Components/Common/Button';
import CategoryDropdown from '../../Components/App/Category/CategoryDropdown';

import Title from '../../Components/Common/H5';

const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
class ProductFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      priceFr: 0
    };
  }
  _onChanged = value => {
    this.setState({ ...value }, () => this.props.onChanged(this.state));
  };
  onClear = () => {
    const { onChanged, onClear } = this.props;
    this.setState({
      category: '',
      _category: undefined,
      priceFr: 0,
      priceTo: undefined
    });
    onClear();
    onChanged({
      _category: undefined,
      category: undefined,
      priceFr: 0,
      priceTo: undefined
    });
  };

  render() {
    const { intl } = this.props;
    const { _category, priceFr, priceTo } = this.state;

    return (
      <Row>
        <Col xs={24} span={8}>
          <Col xs={24} span={8}>
            <FilterLabel>
              {intl.formatMessage({ id: 'categories' })}
            </FilterLabel>
            <CategoryDropdown
              style={{ width: '100%' }}
              value={_category}
              onChange={v =>
                this._onChanged(
                  v
                    ? { _category: v._id, category: v.code }
                    : { _category: undefined, category: undefined }
                )
              }
              multiple={false}
            />
          </Col>
          <Col xs={24} span={8}>
            <FilterLabel>
              {intl.formatMessage({
                id: 'product_sku_discount_amount_display'
              })}
            </FilterLabel>
            <Slider
              tipFormatter={v => (v === 1050 ? '∞' : `$${v}`)}
              marks={{ 0: '$0', 1050: '∞' }}
              range
              value={[priceFr, priceTo || 1050]}
              min={0}
              max={1050}
              step={50}
              onChange={v => {
                let priceFr = v[0];
                let priceTo = v[1] === 1050 ? undefined : v[1];
                this._onChanged({ priceFr, priceTo });
              }}
            />
            <ButtonsContainer>
              <Button.Default
                style={{ borderStyle: 'dashed' }}
                onClick={this.onClear}
              >
                {intl.formatMessage({ id: 'clear_up' })}
              </Button.Default>
            </ButtonsContainer>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default ProductFilter;
