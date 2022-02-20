// DISPLAY(HOME|POST) PAGES
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import moment from "moment";

const useClasses = makeStyles((theme) => ({
  post_card_root: {
    position: "relative"
  },
  post_card_media: {
    height: 276
  },
  post_card_heart: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main
  },
  post_card_date: {
    display: "box",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical",
    height: theme.spacing(2),
    marginBottom: 5
  },
  post_card_title: {
    display: "box",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical",
    fontWeight: 600
  },
  post_card_snippets: {
    display: "box",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical"
  },
  post_card_actions: {
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
interface PostCardBaseProps {
  image?: string;
  title?: string;
  date?: string;
  snippets?: string;
  onCartClick?: () => void;
  onHeartClick?: () => void;
}
export const PostCardBase = ({
  image,
  title,
  date,
  snippets,
  onCartClick,
  onHeartClick
}: PostCardBaseProps) => {
  const classes = useClasses();
  const intl = useIntl();
  return (
    <Card className={classes.post_card_root}>
      <CardActionArea>
        <CardMedia className={classes.post_card_media} image={image} />
        {/* date title */}
        <CardContent style={{ height: 140 }}>
          <Typography variant="caption" className={classes.post_card_date}>
            {moment(date).format("YYYY-MM DD")}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            className={classes.post_card_title}
          >
            {title}
          </Typography>
        </CardContent>
        {/* snippets */}
        <CardContent style={{ height: 60 }}>
          <Typography
            gutterBottom
            variant="subtitle2"
            className={classes.post_card_snippets}
          >
            {snippets}
          </Typography>
        </CardContent>
        {/* read more */}
        <CardActions className={classes.post_card_actions}>
          {intl.formatMessage({ id: "read_more" })}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default PostCardBase;
