import styled from 'styled-components';
import H2 from './H2';

const CardSettings = styled.div`
  position: relative;
  margin-top: ${props =>
    props.top ? '-' + props.theme.measurements.padding + 'px' : 0};
  padding: ${props =>
    props.noPadding ? '0px' : props.theme.measurements.padding + 'px'};
  ${props =>
    `& .fullWidth {margin: 0 -${
      props.noPadding ? 0 : props.theme.measurements.padding
    }px}`};
`;

const Card = styled(CardSettings)`
  border: ${props => (props.borderSize === undefined ? 1 : props.borderSize)}px
    solid rgba(0, 0, 0, 0.1);
  padding: ${props =>
    props.style && props.style.padding
      ? props.style.padding
      : props.theme.measurements.padding + 'px'};
  background: ${props => props.theme.color.contentBackground};
  margin: ${props =>
    props.style && props.style.margin ? props.style.margin : '20px 0'};
  display: block;
  @supports (display: flex;) {
    display: flex;
    flex: 1;
  }
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  ${props => {
    let elevation = props.elevation;
    let animateHover = props.base || props.animateHover;
    if (props.base) {
      elevation = 5;
    }
    if (elevation === undefined) {
      elevation = 1;
    }

    let boxShadow = 'none';
    let boxShadowHover = 'none';
    switch (elevation) {
      case 0:
        boxShadow = 'none';
        boxShadowHover =
          '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
        break;
      case 1:
        boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
        boxShadowHover =
          '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
        break;
      case 2:
        boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
        boxShadowHover =
          '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
        break;
      case 3:
        boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
        boxShadowHover =
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
        break;
      case 4:
        boxShadow =
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
        boxShadowHover =
          '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)';
        break;
      case 5:
        boxShadow = '0 1px 15px 1px rgba(69,65,78,.08)';
        boxShadowHover = '0 5px 15px 3px rgba(69,65,78,.1)';
        break;
      default:
        break;
    }
    return `
      box-shadow: ${props.active ? boxShadowHover : boxShadow};
      ${
        animateHover
          ? `&:hover {
        box-shadow: ${boxShadowHover};
      }`
          : ''
      }
    `;
  }};
`;

Card.Full = styled(Card)`
  width: 100%;
`;

Card.Title = styled(CardSettings)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  min-height: 60px;
  font-size: 1.76rem;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  margin: ${props => '-' + props.theme.measurements.padding + 'px'};
  margin-bottom: 0;
  margin-top: ${props =>
    props.top ? '-' + props.theme.measurements.padding + 'px' : 0};
`;
Card.TitleText = styled(H2)`
  margin: 0;
  font-size: 24pt;
  line-height: 31pt;
  margin-top: -2pt;
  padding: 5pt;
`;
Card.TitleRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  height: 41px;

  & input {
    display: inline-block;
  }

  & button {
    margin: 0 0 0 10px;
  }
`;

Card.Content = styled(CardSettings)`
  margin: ${props => '-' + props.theme.measurements.padding + 'px'};
  margin-bottom: 0;
  margin-top: ${props =>
    props.top ? '-' + props.theme.measurements.padding + 'px' : 0};
  padding: ${props =>
    props.noPadding ? '0px' : props.theme.measurements.padding + 'px'};
  flex: 1;
  overflow-y: auto;
  margin-left: -1;
`;

Card.List = styled.div`
  overflow-y: auto;
  flex: 1;
  ${Card} {
    margin: -1px -1px 0 -1px;
  }
`;

// TODO:: this does not handle top margin. if item is Card's first child, it'll have extra padding at top.
// handle margin-top depending on if first child or not
Card.Image = styled(CardSettings)`
  background-image: url('${props => props.src}');
  background-repeat: no-repeat;
  background-size: cover;
  margin: ${props => '-' + props.theme.measurements.padding + 'px'};
  margin-bottom: 0;
  margin-top: ${props =>
    props.top ? '-' + props.theme.measurements.padding + 'px' : 0};
  height: 200px;
`;

export default Card;
