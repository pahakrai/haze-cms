import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
// intl
import Button from '../../Components/Common/Button';
const ClearButton = styled(Button.Default)`
  margin: 0px 8px 0px 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class UserGroupFilterClear extends PureComponent {
  _onChanged = value => {
    this.setState({ ...value }, () => this.props.onChanged(this.state));
  };
  onClear = () => {
    const { onChanged, onClear } = this.props;
    onClear();
    onChanged({
      level: undefined
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

export default UserGroupFilterClear;
