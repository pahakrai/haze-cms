// DISPLAY(HOME|POST) PAGES
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";

const useClasses = makeStyles((theme) => ({
  destination_root: {
    position: "relative"
  },
  destination_media: {
    height: 276
  },
  destination_title_wrapper: {
    color: "#fff",
    fontSize: 25,
    fontWeight: 600,
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundImage:
      "-webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(60%,transparent),color-stop(66%,rgba(0,0,0,0.1)),color-stop(93%,rgba(0,0,0,0.5)),to(rgba(0,0,0,0.49)))"
  },
  destination_name: {
    margin: 0,
    padding: 0,
    position: "absolute",
    bottom: 10,
    left: 10
  }
}));
interface DestinationCardBaseProps {
  image?: string;
  name?: string;
}
export const DestinationCardBase = ({
  image,
  name
}: DestinationCardBaseProps) => {
  const classes = useClasses();

  return (
    <Card className={classes.destination_root}>
      <CardActionArea>
        <CardMedia
          className={classes.destination_media}
          image={image}
          children={
            <div className={classes.destination_title_wrapper}>
              <h3 className={classes.destination_name}>{name}</h3>
            </div>
          }
        />
      </CardActionArea>
    </Card>
  );
};

export default DestinationCardBase;
