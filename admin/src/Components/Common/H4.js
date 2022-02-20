import styled from 'styled-components';

export default styled.h4`
  display: block;
  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: ${props => props.theme.fonts.size.h4};
  font-weight: ${props => props.theme.fonts.fontWeight.h4};
  margin: ${props => props.theme.fonts.margin.h4};
  color: ${props => props.theme.fonts.color.h4};
  ${props => (props.noTopMargin ? 'margin-top: 0;' : '')};
  ${props => (props.noBottomMargin ? 'margin-top: 0;' : '')};
`;
