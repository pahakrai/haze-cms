import React from "react";
import isEmpty from "lodash/isEmpty";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Typography
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { CloseIcon, ShoppingCartIcon } from "~/src/Components/SvgIcon";
import { useShoppingCart } from "../../ShoppingCart/Hooks/useShoppingCart";
import { useIntl } from "react-intl";
import Link from "next/link";
// just display up md and click will show modal

const useClasses = makeStyles((theme) => ({
  popover_root: {},
  popover_paper: {
    minWidth: 320
  },
  popover_content: {
    minHeight: 120
  },
  product_title: {
    maxWidth: 160,
    display: "box",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical"
  },
  submit: {
    borderRadius: 0
  },
  dialog_paper: {
    minWidth: 320
  },
  empty: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: fade(theme.palette.text.primary, 0.5)
  },
  text_decoration_none: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  }
}));
interface RichShoppingCartIconProps {}
const RichShoppingCartIcon = ({}: RichShoppingCartIconProps) => {
  const intl = useIntl();
  const classes = useClasses();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [removeItemId, setRemoveItemId] = React.useState<string | undefined>();
  const [anchor, setAnchor] = React.useState(null);

  const { qty, cart, currency, removeItemFromCart } = useShoppingCart();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchor(event.currentTarget);
  };
  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={qty} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchor}
        open={Boolean(anchor)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setAnchor(null)}
        classes={{ paper: classes.popover_paper }}
      >
        <div className={classes.popover_content}>
          {/* content here */}
          {isEmpty(cart?.items) && (
            <Typography className={classes.empty}>
              {intl.formatMessage({ id: "display_empty_cart" })}
            </Typography>
          )}
          <List>
            {cart?.items.map((item) => {
              const product = item.product as IProduct;
              const sku = item.productSku as IProductSku;
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={product?.images?.[0]?.thumbnailUri} />
                  </ListItemAvatar>
                  <ListItemText
                    classes={{ primary: classes.product_title }}
                    primary={product?.name}
                    secondary={`${item.qty}x ${currency}${
                      sku.discountAmount || sku.amount
                    }`}
                  ></ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setRemoveItemId(item._id);
                        setModalVisible(true);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
        <Link href="/cart" passHref>
          <a className={classes.text_decoration_none}>
            <Button
              fullWidth
              disableElevation
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {intl.formatMessage({ id: "display_checkout" })}
            </Button>
          </a>
        </Link>
      </Popover>
      <Dialog
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        classes={{ paper: classes.dialog_paper }}
      >
        <DialogTitle>
          {intl.formatMessage({ id: "display_remove" })}
        </DialogTitle>
        <DialogContent>
          {intl.formatMessage({ id: "msg_remove_cart_item" })}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={() => {
              setModalVisible(false);
            }}
          >
            {intl.formatMessage({ id: "display_cancel" })}
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              removeItemId && removeItemFromCart?.(removeItemId);
              setModalVisible(false);
            }}
          >
            {intl.formatMessage({ id: "display_confirm" })}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default RichShoppingCartIcon;
