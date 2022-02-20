import styled from 'styled-components';

export default styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${props => props.theme.measurements.padding}px;
  width: ${props => props.width || 500}px;
  box-sizing: border-box;
  flex: 1;

  ${props => {
    if (props.right) {
      return `
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          height: 100%;
        `;
    } else if (props.left) {
      return `
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          height: 100%;
        `;
    } else if (props.center) {
      return `
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `;
    } else {
      // default to fill
      return `
        position: absolute;
        height: 100%;
        width: 100%;
      `;
    }
  }} @media (max-width: ${props => (props.width || 500) + 100}px) {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: translate(0, 0);
  }
`;
