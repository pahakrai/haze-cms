// DISPLAY(HOME|PRODUCTS) PAGES
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Fab,
  Typography
} from "@material-ui/core";

import { HeartIcon, FullHeartIcon } from "~/src/Components/SvgIcon";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

// Product Card Base pure ui not bind with IProduct(ProductCard will bind IProduct)
const useClasses = makeStyles((theme) => ({
  product_card_root: {
    position: "relative"
  },
  product_card_media: {
    height: 276
  },
  product_card_heart: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main
  },
  product_card_title: {
    display: "box",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical",
    height: 64
  },
  product_card_actions: {
    display: "flex",
    justifyContent: "center"
  },
  product_price: {
    position: "absolute",
    bottom: 20,
    left: 0,
    background: "#FF4A52",
    padding: "0px 10px",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    height: 27,
    lineHeight: "27px"
  }
}));
interface ProductCardBaseProps {
  image?: string;
  title?: string;
  priceText?: string;
  watched?: boolean;
  onCartClick?: () => void;
  onHeartClick?: () => void;
}
export const ProductCardBase = ({
  image,
  title,
  priceText,
  watched,
  onCartClick,
  onHeartClick
}: ProductCardBaseProps) => {
  const classes = useClasses();
  const { workspace } = useWorkspace();
  const intl = useIntl();
  return (
    <Card className={classes.product_card_root}>
      <CardActionArea>
        <div
          style={{
            backgroundImage: `url(${image})`,
            height: 276,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative"
          }}
        >
          <div className={classes.product_price}>{priceText}</div>
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            className={classes.product_card_title}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      {onCartClick && (
        <CardActions className={classes.product_card_actions}>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onCartClick();
            }}
          >
            {intl.formatMessage({ id: "display_add_to_cart" })}
          </Button>
        </CardActions>
      )}
      {workspace?.preferences?.product?.isEnableCart && (
        <Fab
          className={classes.product_card_heart}
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onHeartClick?.();
          }}
          color="primary"
        >
          {watched ? <FullHeartIcon /> : <HeartIcon />}
        </Fab>
      )}
    </Card>
  );
};

export default ProductCardBase;
