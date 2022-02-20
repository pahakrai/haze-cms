import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import MuiDialogTitle, {
  DialogTitleProps
} from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { CloseIcon } from "~/src/Components/SvgIcon";

const useClasses = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export const DialogTitle = ({
  onClose,
  children,
  ...other
}: {
  onClose?();
} & DialogTitleProps) => {
  const classes = useClasses();
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
export default DialogTitle;
