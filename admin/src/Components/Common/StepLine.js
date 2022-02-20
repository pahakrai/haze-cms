import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
  position: relative;
}
`;
const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  padding: 0 57px;
  z-index: 0;
  top: 18px;
`;
const StepNumberShadowContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 80px;
`;
const StepNumberShadow = styled.div`
  border-radius: 30px;
  padding: 7px;
  background-color: ${({ active, theme }) =>
    active ? theme.color.primaryDark : 'rgba(79, 114, 143, 0.3)'};
`;
const StepNumber = styled.div`
  border-radius: 30px;
  height: 30px;
  width: 30px;
  background-color: ${({ active, theme }) =>
    active ? theme.color.primary : 'rgba(79, 114, 143, 1)'};
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  font-weight: 200;
  color: #fff;
`;
const StepNumberText = styled.div`
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  font-weight: 200;
  color: rgba(79, 114, 143, 1);
`;
const StatusLine = styled.div`
  height: 6px;
  width: ${({ width }) => width}%;
  background-color: ${({ active, theme }) =>
    active ? theme.color.primary : '#eee'};
`;
export class StepLine extends PureComponent {
  render() {
    const { stepOptions, value, style } = this.props;

    return (
      <Wrapper style={style}>
        <Container>
          {stepOptions.map((v, i) => {
            const active = value >= v.value;
            return (
              <div key={i}>
                <StepNumberShadowContainer>
                  <StepNumberShadow active={active}>
                    <StepNumber active={active}>{i + 1}</StepNumber>
                  </StepNumberShadow>
                </StepNumberShadowContainer>
                <StepNumberText>{v.label}</StepNumberText>
              </div>
            );
          })}
        </Container>
        <LineContainer>
          {Array(stepOptions.length - 1)
            .fill('')
            .map((v, index) => {
              const active = value >= stepOptions[index + 1][0];
              return (
                <StatusLine
                  key={index}
                  active={active}
                  width={100 / (stepOptions.length - 1)}
                />
              );
            })}
        </LineContainer>
      </Wrapper>
    );
  }
}

export default StepLine;
