import React, { PureComponent } from 'react';

// import { IoIosRemove, IoIosAdd } from 'react-icons/io';

import styled from 'styled-components';

const Container = styled.div`
  height: 25px;
  border-radius: 14px;
  border: 1.3px solid ${props => props.theme.color.primary};
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 3px;
  cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
`;
const Button = styled.div`
  height: 25px;
  width: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

const Count = styled.div`
  width: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  line-height: 1em;
`;

export class NumberPicker extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultValue = 0 } = props;

    this.state = { value: defaultValue };
  }
  render() {
    const { value } = this.state;
    const { onChange, disabled, min, max, interval = 1 } = this.props;

    return (
      <Container disabled={disabled}>
        <Button
          onClick={
            !disabled
              ? () =>
                  this.setState(
                    ({ value }) => {
                      const newValue = value - interval;

                      return { value: newValue >= min ? newValue : min };
                    },
                    () => {
                      onChange(this.state.value);
                    }
                  )
              : undefined
          }
        >
          -
        </Button>
        <Count>{value}</Count>
        <Button
          onClick={
            !disabled
              ? () =>
                  this.setState(
                    ({ value }) => {
                      const newValue = value + interval;
                      if (newValue < min) {
                        return { value: min };
                      }
                      if (max !== undefined) {
                        return { value: newValue > max ? max : newValue };
                      }
                      return { value: newValue };
                    },
                    () => {
                      onChange(this.state.value);
                    }
                  )
              : undefined
          }
        >
          +
        </Button>
      </Container>
    );
  }
}

export default NumberPicker;
