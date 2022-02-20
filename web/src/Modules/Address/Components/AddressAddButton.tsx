import React from "react";
import { FormattedMessage } from "react-intl";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

import { AddIcon } from "~/src/Components/SvgIcon";

interface AddressAddButtonProps {
  onClick?();
  mobile?: boolean;
}
export const AddressAddButton = ({
  onClick,
  mobile
}: AddressAddButtonProps) => {
  const classes = useClasses();

  return !mobile ? (
    <div className={classes.container} onClick={onClick}>
      <div>
        <FormattedMessage id="display_address_add" />
      </div>
    </div>
  ) : (
    <Button variant="contained" color="primary" fullWidth onClick={onClick}>
      <AddIcon size={30} color="#ffffff" />
      <span>
        <FormattedMessage id="display_address_add" />
      </span>
    </Button>
  );
};

const useClasses = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "2px dashed rgb(238, 238, 238)",
    borderRadius: 5,
    height: 253,
    textAlign: "center",
    fontSize: 17,
    color: "#9d9d9d",
    cursor: "pointer"
  }
}));
export default AddressAddButton;
