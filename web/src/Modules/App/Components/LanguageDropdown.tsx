import React from "react";
import { useLocale, changeLanguage } from "~/lib/intl";
import { useApollo } from "~/lib/apollo/client";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { ExpandMoreIcon } from "~/src/Components/SvgIcon";

interface LanguageDropDownProps {}
export const LanguageDropDown = ({}: LanguageDropDownProps) => {
  const { current } = useLocale();
  const apollo = useApollo();
  const languages = [
    {
      key: "繁體中文",
      value: "zh-HK"
    },
    {
      key: "简体中文",
      value: "zh-CN"
    },
    {
      key: "EN",
      value: "en-US"
    }
  ];
  const handleLanguageClick = (language: string) => {
    changeLanguage(language);
    // reset store when change language
    apollo?.resetStore?.();
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        {languages.find((language) => language.value === current)?.key}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((language, idx) => {
          const active = language.value == current;
          return (
            <MenuItem
              key={idx}
              onClick={() => {
                handleLanguageClick(language.value);
                handleClose?.();
              }}
              selected={active}
            >
              {language.key}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};
