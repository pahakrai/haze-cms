import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
// intl
import Button from '../../Components/Common/Button';
const ClearButton = styled(Button.Default)`
  margin: 0 0 0px 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class ServiceFilterClear extends PureComponent {
  _onClear = () => {
    const { onChanged, onClear } = this.props;
    onClear();
    onChanged({
      types: '',
      units: '',
      category: '',
      _category: '',
      q: ''
    });
  };

  render() {
    const { intl } = this.props;
    return (
      <ClearButton onClick={this._onClear}>
        <AiOutlineDelete />
        {intl.formatMessage({ id: 'clear_up' })}
      </ClearButton>
    );
  }
}

export default ServiceFilterClear;
