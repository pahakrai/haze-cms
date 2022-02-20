import styled from 'styled-components';

export default styled.div`
  background: url(${props => props.src}) no-repeat center center;
  background-size: contain;
  height: ${props => (props.height || 100) * props.theme.unit}px;
  ${props => {
    if (props.background) {
      return `
        background-attachment: fixed;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-size: cover;
        filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${props =>
          props.src}', sizingMethod='scale');
        -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${props =>
          props.src}', sizingMethod='scale')";
      `;
    }
  }};
`;
