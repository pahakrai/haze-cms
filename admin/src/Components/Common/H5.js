import styled from 'styled-components';

export default styled.h5`
  display: block;
  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: ${props => props.theme.fonts.size.h5};
  font-weight: ${props => props.theme.fonts.fontWeight.h5};
  margin: ${props => props.theme.fonts.margin.h5};
  color: ${props => props.theme.fonts.color.h5};
  ${props => (props.noTopMargin ? 'margin-top: 0;' : '')};
  ${props => (props.noBottomMargin ? 'margin-top: 0;' : '')};
`;
