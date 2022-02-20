import styled from 'styled-components';

export default styled.div`
  height: 60px;
  background-color: ${props => props.theme.color.contentBackground};
  padding: ${props => props.theme.measurements.padding + 'px'};
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: ${props => 1 * props.theme.unit + 'px'};
  border-bottom-style: solid;
  align-content: center;
  box-sizing: border-box;
`;
