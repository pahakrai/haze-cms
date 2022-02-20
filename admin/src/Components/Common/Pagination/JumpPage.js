import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { FormattedMessage } from 'react-intl';

import Button from '../Button';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Text = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
`;
const Input = styled.input`
  width: 63px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid rgba(151, 151, 151, 1);
  text-align: center;
`;

const ConfirmButton = styled(Button.Primary)`
  margin: 0;
  margin-left: 15px;
  min-width: 50px;
`;

export class JumpPage extends PureComponent {
  constructor() {
    super();

    this.state = {
      value: ''
    };
    this.onConfirm = debounce(this.onConfirm, 200);
  }
  onChange = e => {
    const { onChange } = this.props;
    const value = e.target.value;
    onChange && onChange(value);
    this.setState({
      value
    });
  };
  onConfirm = () => {
    const { onConfirm } = this.props;
    const { value } = this.state;
    onConfirm && onConfirm(value);
  };
  render() {
    const { style } = this.props;

    return (
      <Container style={style}>
        <Text style={{ marginRight: 5 }}>
          <FormattedMessage id="display_pagination_jump" />
        </Text>
        <Input onChange={this.onChange} />
        <Text style={{ marginLeft: 5 }}>
          <FormattedMessage id="display_pagination_page" />
        </Text>
        <ConfirmButton onClick={this.onConfirm}>
          <FormattedMessage id="confirm" />
        </ConfirmButton>
      </Container>
    );
  }
}

export default JumpPage;
