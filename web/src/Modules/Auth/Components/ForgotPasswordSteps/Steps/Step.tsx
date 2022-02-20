import { makeStyles, fade } from "@material-ui/core";
import clsx from "clsx";
const useClasses = makeStyles((theme) => ({
  step: {
    position: "relative",
    "& $wrapper": {
      display: "inline-flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      width: 34,
      height: 34,
      boxSizing: "border-box",
      background: "transparent",
      borderRadius: "50%",
      "&$active": {
        background: fade(theme.palette.primary.main, 0.3)
      },
      "& $inner": {
        width: 24,
        height: 24,
        display: "inline-flex",
        background: fade(theme.palette.text.primary, 0.2),
        borderRadius: "50%",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        color: theme.palette.primary.contrastText,
        overflow: "hidden",
        "&$active": {
          background: theme.palette.primary.main
        }
      }
    },
    "&$label": {
      position: "absolute",
      top: "100%",
      left: "50%",
      marginTop: 20,
      display: "inline-block",
      whiteSpace: "nowrap",
      transform: "translate(-50%, -50%)",
      color: theme.palette.text.primary,
      fontSize: 14,
      "&$active": {
        color: theme.palette.primary.main
      }
    }
  },
  wrapper: {},
  inner: {},
  label: {},
  active: {}
}));
export interface StepProps {
  label?: string;
  active?: boolean;
  value?: string;
}
export const Step = ({ active, value, label }: StepProps) => {
  const classes = useClasses();
  return (
    <span className={classes.step}>
      <span className={clsx(classes.wrapper, { [classes.active]: active })}>
        <span className={clsx(classes.inner, { [classes.active]: active })}>
          {value}
        </span>
      </span>
      <span className={clsx(classes.label, { [classes.active]: active })}>
        {label}
      </span>
    </span>
  );
};
