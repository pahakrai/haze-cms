import React from 'react';
import styled, { withTheme } from 'styled-components';
import Loading from 'react-loading';

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ButtonLoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LoadingContent = styled.div`
  margin-left: 3px;
`;
const DefaultButtonComponent = styled.button`
  border-radius: 6px;
  display: ${props => (props.full ? 'block' : 'inline-block')};
  position: relative;
  padding: 8.5px 7px;
  margin: 5px 0 13px 0;
  min-width: 80px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: ${props => props.theme.fonts.size.h5};
  background-color: ${props =>
    props.active ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
  &:focus {
    outline: 0;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &:hover:after {
    background-color: rgba(255, 255, 255, 0.05);
  }
  &:disabled {
    cursor: default;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
  ${({ margin = true }) => (!margin ? 'margin:0px;' : '')}
`;
export const DefaultButton = withTheme(
  ({ loading, children, theme, ...props }) => (
    <DefaultButtonComponent {...props}>
      <ButtonLoadingWrapper>
        <ButtonContent>{children}</ButtonContent>
        {loading && (
          <LoadingContent>
            <Loading
              type="spokes"
              color={theme.color.primaryHighlight}
              height={15}
              width={15}
            />
          </LoadingContent>
        )}
      </ButtonLoadingWrapper>
    </DefaultButtonComponent>
  )
);

const transparentButton = styled.button`
  display: ${props => (props.full ? 'block' : 'inline-block')};
  position: relative;
  padding: 3px 8px;
  margin: 0px;
  max-width: 50px;
  border: none;
  cursor: pointer;
  font-size: ${props => props.theme.fonts.size.h6};
  background-color: ${props =>
    props.active ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
  &:focus {
    outline: 0;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  &:hover:after {
    background-color: rgba(255, 255, 255, 0.05);
  }
  &:disabled {
    cursor: default;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const SecondaryButton = styled(DefaultButton)`
  background-color: ${props =>
    props.active
      ? props.theme.color.secondaryHighlight
      : props.theme.color.secondary};
  color: ${props =>
    props.active
      ? props.theme.color.secondaryHighlightText
      : props.theme.color.secondaryText};
  &:disabled {
    cursor: default;
    border-color: ${props => props.theme.color.secondaryDisabled};
    color: ${props => props.theme.color.secondaryDisabledText};
    background-color: ${props => props.theme.color.secondaryDisabled};
  }
`;
export const PrimaryButton = styled(DefaultButton)`
  background-color: ${props =>
    props.active
      ? props.theme.color.primaryHighlight
      : props.theme.color.primary};
  color: ${props =>
    props.active
      ? props.theme.color.primaryHighlightText
      : props.theme.color.primaryText};
  &:disabled {
    cursor: default;
    border-color: ${props => props.theme.color.primaryDisabled};
    color: ${props => props.theme.color.primaryDisabledText};
    background-color: ${props => props.theme.color.primaryDisabled};
  }
`;

export const DangerButton = styled(DefaultButton)`
  background-color: ${props =>
    props.active
      ? props.theme.color.dangerHighlight
      : props.theme.color.danger};
  color: ${props =>
    props.active
      ? props.theme.color.dangerHighlightText
      : props.theme.color.dangerText};
  &:disabled {
    cursor: default;
    border-color: ${props => props.theme.color.dangerDisabled};
    background-color: ${props => props.theme.color.dangerDisabled};
  }
`;

const LangButton = styled(transparentButton)`
  background-color: ${props => (props.active ? 'transparent' : 'transparent')};
  color: ${props =>
    props.active ? 'rgb(54,98,213)' : props.theme.color.black};
  &:disabled {
    cursor: default;
    border-color: ${props => props.theme.color.primaryDisabled};
    background-color: ${props => props.theme.color.primaryDisabled};
  }
`;

const SuccessButton = styled(DefaultButton)`
  background-color: ${props =>
    props.active
      ? props.theme.color.successHighlight
      : props.theme.color.success};
  color: ${props =>
    props.active
      ? props.theme.color.successHighlightText
      : props.theme.color.successText};
  &:disabled {
    cursor: default;
    border-color: ${props => props.theme.color.successDisabled};
    color: ${props => props.theme.color.successDisabledText};
    background-color: ${props => props.theme.color.successDisabled};
  }
`;

const HyberlinkButton = styled(DefaultButton)`
  border-color: ${props =>
    props.theme.color.hyberlink
      ? props.theme.color.hyberlink
      : props.theme.color.primary || '#1890ff'};
  color: ${props =>
    props.theme.color.hyberlink
      ? props.theme.color.hyberlink
      : props.theme.color.primary || '#1890ff'};
`;

// align
export const ButtonAlignWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: ${({ topMargin }) =>
    topMargin === true ? 25 : !topMargin ? 0 : topMargin}px;
`;
export const ButtonCenterWrapper = styled(ButtonAlignWrapper)`
  justify-content: center;
`;
export const ButtonLeftWrapper = styled(ButtonAlignWrapper)`
  justify-content: flex-start;
`;
export const ButtonRightWrapper = styled(ButtonAlignWrapper)`
  justify-content: flex-end;
`;
export const ButtonBetweenWrapper = styled(ButtonAlignWrapper)`
  justify-content: space-between;
`;

const Button = ({
  primary,
  secondary,
  danger,
  lang,
  success,
  hyberlink,
  ...rest
}) => {
  if (primary) {
    return <PrimaryButton {...rest} />;
  }
  if (secondary) {
    return <SecondaryButton {...rest} />;
  }
  if (lang) {
    return <LangButton {...rest} />;
  }
  if (success) {
    return <SuccessButton {...success} />;
  }
  if (hyberlink) {
    return <HyberlinkButton {...rest} />;
  }

  return <DefaultButton {...rest} />;
};

Button.Primary = PrimaryButton;
Button.Secondary = SecondaryButton;
Button.Danger = DangerButton;
Button.Lang = LangButton;
Button.Default = DefaultButton;
Button.Success = SuccessButton;
Button.Hyberlink = HyberlinkButton;

Button.Center = ButtonCenterWrapper;
Button.Right = ButtonRightWrapper;
Button.Left = ButtonLeftWrapper;
Button.Between = ButtonBetweenWrapper;

export default Button;
