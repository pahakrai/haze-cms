import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useClasses = makeStyles((theme) => ({
  indicator: {
    display: "flex",
    flex: 1,
    background: theme.palette.divider,
    height: 1
  },
  active: {}
}));
export interface IndicatorProps {
  active?: boolean;
}
export const Indicator = ({}: IndicatorProps) => {
  const classes = useClasses();
  return (
    <span
      className={clsx(classes.indicator, { [classes.active]: false })}
    ></span>
  );
};
