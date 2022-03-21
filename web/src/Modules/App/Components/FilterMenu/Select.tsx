import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  MenuItem,
  makeStyles,
  Select,
  FormControl,
  ListItemIcon,
  Checkbox,
  ListItemText,
  MenuProps
} from "@material-ui/core";

const useClasses = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps: Partial<MenuProps> = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      //   width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

interface FilterSelectType<T> {
  type: string;
  selected?: string[];
  options?: T[];
  onChange?: (type: string, values: string[]) => void;
}
const FilterSelect = <T extends { _id: string; name_display: string }>({
  options = [],
  selected: prevSelected = [],
  type,
  onChange
}: PropsWithChildren<FilterSelectType<T>>) => {
  const classes = useClasses();
  const [selected, setSelected] = useState(prevSelected);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      const updatedValue =
        selected.length === options.length ? [] : options.map((opt) => opt._id);
      setSelected(updatedValue);
      onChange(type, updatedValue);
      return;
    }
    setSelected(value);
    onChange(type, value);
  };

  return (
    <FormControl className={classes.formControl}>
      {/* <InputLabel id="mutiple-select-label">Multiple Select</InputLabel> */}
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        onScroll={() => console.log("hello world")}
        renderValue={(selected: any[]) =>
          `${selected.length} organizations selected`
        }
        MenuProps={{
          ...MenuProps,
          onScroll: () => console.log("do pagination here")
        }}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : ""
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option._id) > -1} />
            </ListItemIcon>
            <ListItemText primary={option.name_display} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
