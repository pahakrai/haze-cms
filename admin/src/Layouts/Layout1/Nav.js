import React from 'react';
import styled from 'styled-components';

import NavItemControl from './NavItem';
import NavItemGroup from './NavItemGroup';
import IntlMessages from '../../Components/Common/IntlMessages';
import Sitemap from '../../Lib/Sitemap';

const NavContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  color: ${props => props.theme.color.primary};
  margin-bottom: ${props => 2 * props.theme.unit + 'px'};
  span,
  .rightIcon {
    display: ${props => (props.isOpen ? 'block' : 'none')};
  }
  @media (max-width: ${props => props.theme.media.sm}px) {
  }
`;

/**
 * Use NavRouter [some] item data analysis and unified use of NavGroupCell and NavItemCell
 */
const NavGroup = ({
  // group subitems
  items,
  // id for group toggles
  id,
  // on toggle group function
  onToggleGroup = () => true,
  // array of opened group ids
  openedGroups = [],
  // whether popover should show
  showPopover,
  // hideMenu => Sidebar handle combineHideMenu
  // combineHideMenu,
  hideMenu,
  ...props
}) => {
  // alwaysShown priority over hideMenu
  if (hideMenu) {
    return null;
  }
  if (Array.isArray(items)) {
    // if id doesn't exist, throw error because it is required
    if (!id) {
      throw new Error(
        "Sitemap item with field 'items' must also have field 'id'"
      );
    }
    const sortItems = [...items]
      .map((v, i) => ({ ...v, arrayIndex: i }))
      .sort(
        (a, b) => (a.idx || a.arrayIndex + 100) - (b.idx || b.arrayIndex + 100)
      );
    return (
      <NavItemGroup
        {...props}
        // on click, pass updated openedGroups to onToggleGroup
        onClick={onToggleGroup.bind(
          this,
          // openedGroups.some(o => o === id)
          //   ? openedGroups.filter(o => o !== id)
          //   : openedGroups.concat([id])
          [id]
        )}
        // open group if current id in openedGroups
        isOpen={openedGroups.some(o => o === id)}
        label={<IntlMessages id={props.localeId} />}
        icon={props.icon}
        showPopover={showPopover}
      >
        {/* for each item, call NavGroup */}
        {sortItems.map(item => (
          <NavGroup
            key={item.id || item.to}
            onClick={onToggleGroup}
            openedGroups={openedGroups}
            showPopover={showPopover}
            onToggleGroup={onToggleGroup}
            {...item}
          />
        ))}
      </NavItemGroup>
    );
  } else {
    // if no items, it is not a group. Display nav item
    return <NavItemControl {...props} showPopover={showPopover} />;
  }
};
/**
 * Nav root render
 */
const Nav = ({
  history,
  isOpen,
  openedNavItemGroups,
  setOpenedNavItemGroups,
  styles,
  sitemap = new Sitemap()
}) => {
  // build nav items
  const NavItems = sitemap.items.map(sitemapItem => (
    <NavGroup
      key={sitemapItem.id || sitemapItem.to}
      onToggleGroup={setOpenedNavItemGroups}
      openedGroups={openedNavItemGroups}
      showPopover={!isOpen}
      {...sitemapItem}
    />
  ));

  return <NavContainer isOpen={isOpen}>{NavItems}</NavContainer>;
};

export default Nav;
