import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import Button from '../../Components/Common/Button';
const ClearButton = styled(Button.Default)`
  margin: 0 0 0px 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class ProductFilter extends PureComponent {
  onClear = () => {
    const { onChanged, onClear } = this.props;
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

    return (
      <ClearButton style={{ borderStyle: 'dashed' }} onClick={this.onClear}>
        <AiOutlineDelete />
        {intl.formatMessage({ id: 'clear_up' })}
      </ClearButton>
    );
  }
}

export default ProductFilter;
