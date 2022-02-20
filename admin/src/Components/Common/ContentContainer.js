import styled from 'styled-components';

export default styled.div`
  padding: ${props =>
    props.theme.measurements.contentPadding / 2 +
    'px ' +
    (props.theme.measurements.contentPadding - 30) +
    'px ' +
    props.theme.measurements.contentPadding * 3 +
    'px ' +
    (props.theme.measurements.contentPadding - 30) +
    'px'};
  flex: 1;
`;
