import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Slider from 'antd/lib/slider';
import FilterLayout from '../../Components/Common/FilterLayout';

const SiderContaier = styled.div`
  display: flex;
  flex: 1;
`;

class ProductFilter extends PureComponent {
  render() {
    const { intl, filterValues, onChanged } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({
            id: 'product_sku_amount_display'
          })}
          :{' '}
        </FilterLayout.FilterLabel>
        <SiderContaier>
          <Slider
            style={{ width: '100%' }}
            tipFormatter={v => (v === 10050 ? '∞' : `$${v}`)}
            marks={{ 0: '$0', 10050: '∞' }}
            range
            value={[filterValues.priceFr, filterValues.priceTo || 10050]}
            min={0}
            max={10050}
            step={50}
            onChange={v => {
              let priceFr = v[0];
              let priceTo = v[1] === 10050 ? undefined : v[1];
              onChanged({ priceFr, priceTo });
            }}
          />
        </SiderContaier>
      </FilterLayout.FilterRow>
    );
  }
}

export default ProductFilter;
