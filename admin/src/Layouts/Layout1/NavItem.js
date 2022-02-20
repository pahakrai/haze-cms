import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Popover from '../../Components/Common/Popover';
import IntlMessages from '../../Components/Common/IntlMessages';
import NavIcon from './NavIcon';

const NavItemBase = styled(NavLink)`
  text-decoration: none;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.65);
  display: block;
  position: relative;
  cursor: pointer;
  padding: ${props => 10 * props.theme.unit + 'px'}
    ${props => props.theme.measurements.padding + 'px'};
  background-color: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${props => '#f6f6f6'};
  }
  &.${props => props.activeClassName} {
    background-color: rgba(0, 0, 0, 0.5);
  }
  box-sizing: border-box;
  min-height: 40px;
  padding-left: 40px;
  & svg {
    position: absolute;
    top: 10px;
    left: 18px;
  }
  & span {
    min-width: 250px;
  }
`;

export const NavItem = props => {
  return <NavItemBase {...props} activeClassName={'active'} />;
};

export class NavItemControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  togglePopoverOpen = (toState = null) => {
    this.setState({ isOpen: toState === null ? !this.state.isOpen : toState });
  };

  render() {
    const { isOpen } = this.state;
    const {
      showPopover,
      exact,
      to = '',
      icon,
      iconSize,
      localeId,
      name
    } = this.props;
    const text = <div>{localeId ? <IntlMessages id={localeId} /> : name}</div>;

    return (
      <Popover isOpen={showPopover && isOpen} preferPlace={'right'} body={text}>
        {/* react-router-dom NavLink */}
        <NavItem
          exact={exact}
          to={to}
          onMouseOver={this.togglePopoverOpen.bind(this, true)}
          onMouseOut={this.togglePopoverOpen.bind(this, false)}
        >
          {icon && <NavIcon icon={icon} size={iconSize} />}
          {text}
        </NavItem>
      </Popover>
    );
  }
}

export default NavItemControl;
