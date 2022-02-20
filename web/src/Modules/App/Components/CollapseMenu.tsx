import React from "react";
import isEmpty from "lodash/isEmpty";
import {
  List,
  ListProps,
  ListItem,
  ListItemText,
  makeStyles,
  Collapse
} from "@material-ui/core";

import { ExpandMoreIcon } from "~/src/Components/SvgIcon";

const useClasses = makeStyles((theme) => ({
  root: {},
  item: {
    cursor: "pointer",
    "& $icon": {
      color: theme.palette.text.secondary
    }
  },
  icon: {}
}));
export interface Menu {
  title: string;
  value?: any;
  menus?: Menu[];
}
export interface CollapseMenuProps extends ListProps {
  menus: Menu[];
  renderItem?: (menu: Menu) => React.ReactNode;
  onMenuClick?: (menu: Menu) => void;
}
export const CollapseMenu = ({
  menus = [],
  onMenuClick,
  renderItem,
  ...rest
}: CollapseMenuProps) => {
  return (
    <Menus
      menus={menus}
      onMenuClick={onMenuClick}
      renderItem={renderItem}
      {...rest}
    />
  );
};
export default CollapseMenu;
const Menus = ({
  menus = [],
  onMenuClick,
  renderItem,
  ...rest
}: {
  menus?: Menu[];
  renderItem?: (menu: Menu) => React.ReactNode;
  onMenuClick?: (menu: Menu) => void;
}) => {
  const classes = useClasses();
  const [collapseParent, setCollapseParent] = React.useState<
    string | undefined
  >();
  const _handleClick = (key: string) => {
    if (key === collapseParent) {
      setCollapseParent(undefined);
    } else {
      setCollapseParent(key);
    }
  };
  return (
    <List component="nav" {...rest}>
      {menus.map((menu, idx) => {
        const isEnd = isEmpty(menu.menus);
        const isOpen = collapseParent === menu.title;
        return (
          <React.Fragment key={idx}>
            <ListItem
              className={classes.item}
              onClick={() => {
                onMenuClick?.(menu);
              }}
            >
              {renderItem ? (
                renderItem(menu)
              ) : (
                <ListItemText secondary={menu.title}></ListItemText>
              )}
              {!isEnd && (
                <ExpandMoreIcon
                  className={classes.icon}
                  onClick={() => _handleClick(menu.title)}
                />
              )}
            </ListItem>
            {!isEnd && (
              <Collapse in={isOpen}>
                <Menus
                  menus={menu.menus}
                  renderItem={renderItem}
                  onMenuClick={onMenuClick}
                />
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};
