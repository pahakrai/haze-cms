import { makeStyles } from "@material-ui/core";
import { LocationFilledIcon } from "~/src/Components/SvgIcon";

interface MarkerProps {
  lat: number;
  lng: number;
  text?: string;
}
const useClasses = makeStyles((theme) => ({
  icon: { color: theme.palette.error.main }
}));
export const Marker = ({}: MarkerProps) => {
  const classes = useClasses();
  return (
    <div>
      <LocationFilledIcon className={classes.icon} />
    </div>
  );
};
