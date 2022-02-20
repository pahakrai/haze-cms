import React from "react";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { InputBase } from "@material-ui/core";
import { useIntl } from "react-intl";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { SearchIcon } from "~/src/Components/SvgIcon";

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    justifyContent: "flex-end",
    "&:hover input": {
      display: "unset"
    }
  },
  input: {
    width: 0,
    minHeight: 33,
    transition: "all 0.2s",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    "& input": {
      display: "none"
    }
  },
  input_sm: { background: "unset", flex: 1, display: "none" },
  input_md: { background: "unset" },
  root_sm: {
    background: "unset",
    "&:hover": {
      position: "fixed",
      height: 72, // the same height with navbar
      left: 0,
      top: 0,
      width: "100%",
      zIndex: 1998, // TODO: should in global but not for now
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default
    },
    "&:hover $input_sm": {
      display: "unset"
    }
  },
  root_md: {
    background: "unset",
    "&:hover $input_md": {
      width: 180
    }
  }
}));
export interface NavbarSearchProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onToggleClick?: () => void;
  classes?: {
    root?: string;
    input?: string;
    icon?: string;
  };
  onSearch?: (value: string) => void;
}
export const NavbarSearch = ({
  classes,
  className,
  onSearch,
  ...rest
}: NavbarSearchProps) => {
  const intl = useIntl();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const _classes = useClasses({ isMobile });
  const [value, setValue] = React.useState<string>("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // submit and call onSearch
      !isEmpty(value) && onSearch?.(value);
      // then clear value
      setValue("");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const root_class = clsx(
    _classes.root,
    isMobile ? _classes.root_sm : _classes.root_md,
    className,
    classes?.root
  );
  const input_class = clsx(
    _classes.input,
    isMobile ? _classes.input_sm : _classes.input_md
  );

  return (
    <div className={root_class} {...rest}>
      <InputBase
        className={input_class}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder={intl.formatMessage({ id: "display_search" })}
      />
      <IconButton
        color="inherit"
        onClick={() => {
          !isEmpty(value) && onSearch?.(value);
          setValue("");
        }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};
export default NavbarSearch;
