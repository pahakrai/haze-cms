import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FaChevronLeft,
  FaChevronDown,
  FaFolder,
  FaFolderOpen
} from 'react-icons/fa';

import NavIcon from './NavIcon';
import Popover from '../../Components/Common/Popover';
import IntlMessages from '../../Components/Common/IntlMessages';

const NavItemGroupContainer = styled.div``;

const NavItemGroupChildrenContainer = styled.div`
  padding-left: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: hidden;
  max-height: 0px;
  max-width: 0px;
  &.active {
    max-height: 500px;
    max-width: 400px;
  }
  transition: all 300ms ease-in-out;
  overflow: hidden;
`;

const NavItemGroupButton = styled.div`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  justify-content: space-between;
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
  & svg:not(.rightIcon) {
    position: absolute;
    top: 10px;
    left: 18px;
  }
`;

export const RightIconContainer = styled.div``;

const NavItemGroupLabel = styled.div``;

class NavItemGroup extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  static defaultProps = {
    isOpen: false,
    onClick: () => true
  };

  constructor(props: Object): void {
    super(props);
    this.state = {
      isChildrenVisible: props.isOpen,
      isPopoverOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;
    if (isOpen !== prevProps.isOpen) {
      this.setState({
        isChildrenVisible: isOpen
      });
    }
  }

  togglePopoverOpen = (toState = null) => {
    this.setState({
      isPopoverOpen: toState === null ? !this.state.isOpen : toState
    });
  };

  onGroupButtonClick = () => {
    const { onClick } = this.props;
    this.setState({
      isChildrenVisible: !this.state.isChildrenVisible
    });
    onClick();
  };

  render() {
    const { onGroupButtonClick } = this;
    const { isChildrenVisible, isPopoverOpen } = this.state;
    const { showPopover, icon, localeId, label, children } = this.props;
    const text = localeId ? <IntlMessages id={localeId} /> : label;

    return (
      <NavItemGroupContainer
        onMouseOver={this.togglePopoverOpen.bind(this, true)}
        onMouseOut={this.togglePopoverOpen.bind(this, false)}
      >
        <Popover
          isOpen={showPopover && isPopoverOpen}
          preferPlace={'right'}
          body={
            <div>
              {isChildrenVisible ? <FaFolderOpen /> : <FaFolder />} {text}
            </div>
          }
        >
          <NavItemGroupButton
            className={isChildrenVisible ? 'active' : null}
            activeClassName={'active'}
            onClick={onGroupButtonClick}
          >
            {/* for support img url */}
            {icon && <NavIcon icon={icon} size={20} />}
            <NavItemGroupLabel>{text}</NavItemGroupLabel>
            <RightIconContainer>
              {isChildrenVisible ? (
                <FaChevronDown className="rightIcon" />
              ) : (
                <FaChevronLeft className="rightIcon" />
              )}
            </RightIconContainer>
          </NavItemGroupButton>
        </Popover>
        <NavItemGroupChildrenContainer
          className={isChildrenVisible ? 'active' : null}
        >
          {children}
        </NavItemGroupChildrenContainer>
      </NavItemGroupContainer>
    );
  }
}

export default NavItemGroup;
