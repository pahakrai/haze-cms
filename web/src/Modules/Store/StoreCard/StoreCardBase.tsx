// DISPLAY(HOME|POST) PAGES
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";

const useClasses = makeStyles((theme) => ({
  store_card_root: {
    position: "relative",
    marginTop: theme.spacing(2)
  },
  store_card_media: {
    height: 276
  },
  store_card_heart: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main
  },
  store_card_date: {
    display: "box",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical",
    height: theme.spacing(2),
    marginBottom: 5
  },
  store_card_title: {
    display: "box",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical",
    fontWeight: 600
  },
  store_card_address: {
    color: "#a5a5a5"
  },
  store_card_actions: {
    display: "flex",
    justifyContent: "left",
    color: "#a5a5a5",
    fontSize: 16,
    padding: "20px 0 36px 16px",
    "&:hover": {
      color: "#222"
    }
  }
}));
interface StoreCardBaseProps {
  image?: string;
  title?: string;
  date?: string;
  address?: string;
  onCartClick?: () => void;
  onHeartClick?: () => void;
}
export const StoreCardBase = ({
  image,
  title,
  date,
  address,
  onCartClick,
  onHeartClick
}: StoreCardBaseProps) => {
  const classes = useClasses();
  const intl = useIntl();
  return (
    <Card className={classes.store_card_root}>
      <CardActionArea>
        {/* date title */}
        <CardContent style={{ height: 140 }}>
          <Typography
            gutterBottom
            variant="h5"
            className={classes.store_card_title}
          >
            {title}
          </Typography>
          <Typography variant="caption" className={classes.store_card_address}>
            {address}
          </Typography>
          <Typography
            variant="body2"
            color="inherit"
            className={classes.store_card_date}
          >
            {date ? date : ""}
          </Typography>
        </CardContent>
        {/* read more */}
        <CardActions className={classes.store_card_actions}>
          {intl.formatMessage({ id: "read_more" })}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default StoreCardBase;
