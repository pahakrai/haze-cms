import React from "react";
import clsx from "clsx";
import { compose } from "recompose";
import { useIntl } from "react-intl";
import remove from "lodash/remove";
import concat from "lodash/concat";
import sort from "lodash/sortBy";
import isEqual from "lodash/isEqual";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Hidden,
  Divider,
  Card,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { mapProductProperties } from "~/src/Modules/Product/utils";
import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { useShoppingCart } from "~/src/Modules/ShoppingCart/Hooks/useShoppingCart";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import {
  calculateItemsDiscount,
  calculateItemsSubTotal,
  calculateItemsTotal
} from "~/src/Modules/ShoppingCart/utils";
import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { MobileProduct } from "~/src/Modules/ShoppingCart/Components/Product/Mobile";
import { PCProduct } from "~/src/Modules/ShoppingCart/Components/Product/Pc";

const useClasses = makeStyles((theme) => ({
  page_main: {
    backgroundColor: theme.palette.background.default
  },
  dialog_paper: {
    minWidth: 320
  },
  card_root: {
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2)
  },
  card_title: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  },
  card_sections: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    "& $card_section": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: `${theme.spacing(1) / 2}px 0`
    },
    "& $divider": {
      margin: `${theme.spacing(2)}px 0`
    }
  },
  card_section: {},
  divider: {},
  error: {
    color: theme.palette.error.main
  },
  submit: {
    padding: theme.spacing(2)
  }
}));
export interface PrepareCheckoutItem {
  productId: string;
  skuId: string;
}
const Cart = () => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [removeItemId, setRemoveItemId] = React.useState<string | undefined>();
  const [prepareCheckoutItems, setPrepareCheckoutItems] = React.useState<
    PrepareCheckoutItem[]
  >([]);
  const {
    qty,
    cart,
    amount,
    currency,
    removeItemFromCart,
    updateCartItem
  } = useShoppingCart();
  const selectAll = (cart?: IShoppingCart): PrepareCheckoutItem[] => {
    const items =
      cart?.items
        ?.map<PrepareCheckoutItem>((item) => {
          const product = item.product as IProduct;
          const sku = item.productSku as IProductSku;
          return {
            productId: product._id,
            skuId: sku._id
          };
        })
        .filter((item) => item.productId && item.skuId) || [];
    return items;
  };
  const onCheckChanged = (product?: string, sku?: string) => {
    const checked = isSelected(product, sku);
    if (checked) {
      // remove item from list
      const newItems = removeItemFromCheckList(product, sku);
      setPrepareCheckoutItems(newItems);
    } else {
      // add item to list
      const newItems = addItemToCheckList(product, sku);
      setPrepareCheckoutItems(newItems);
    }
  };
  // will return new items
  const removeItemFromCheckList = (
    product?: string,
    sku?: string
  ): PrepareCheckoutItem[] => {
    return remove(prepareCheckoutItems, (item) => {
      return item.productId !== product || item.skuId !== sku;
    });
  };
  // will return new items
  const addItemToCheckList = (
    product?: string,
    sku?: string
  ): PrepareCheckoutItem[] => {
    const existed = prepareCheckoutItems?.find(
      (item) => item.productId === product && item.skuId === sku
    );
    if (!existed) {
      return concat(prepareCheckoutItems, [
        { productId: product, skuId: sku }
      ]).filter((item) => item.productId && item.skuId);
    }
    return prepareCheckoutItems;
  };
  const isSelected = (product?: string, sku?: string): PrepareCheckoutItem => {
    const existed = prepareCheckoutItems?.find(
      (item) => item.productId === product && item.skuId === sku
    );
    return existed;
  };
  const isAllSelected = (
    cart?: IShoppingCart,
    prepareCheckoutItems?: PrepareCheckoutItem[]
  ): boolean => {
    const sortedCartItems = sort(selectAll(cart), (item) => item.skuId);
    const sortedPrepareItems = sort(prepareCheckoutItems, (item) => item.skuId);
    return isEqual(sortedCartItems, sortedPrepareItems);
  };
  React.useEffect(() => {
    // when cart loaded set all product&sku to prepareCheckoutItems list
    const items = selectAll(cart);
    setPrepareCheckoutItems(items);
  }, [cart]);
  const allItemSelected = isAllSelected(cart, prepareCheckoutItems);
  const filterItems = (cart?: IShoppingCart) => {
    return cart?.items.filter((item) => {
      const product = item.product as IProduct;
      const sku = item.productSku as IProductSku;
      return prepareCheckoutItems.find(
        (_item) => _item.skuId === sku._id && _item.productId === product._id
      );
    });
  };
  const filteredItems = filterItems(cart);
  return (
    <Layout classes={{ main: classes.page_main }}>
      <PageHead title={intl.formatMessage({ id: "display_cart" })} />
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/cart",
              title: intl.formatMessage({ id: "display_cart" }),
              active: true
            }
          ]}
        />
        <Card elevation={0} className={classes.card_root}>
          <div className={classes.card_title}>{`${intl.formatMessage({
            id: "display_cart"
          })}(${qty})`}</div>
          <Divider></Divider>
          {cart?.items?.map((item, idx) => {
            const product = item.product as IProduct | undefined;
            const productSku = item.productSku as IProductSku | undefined;
            const values =
              (product &&
                productSku &&
                mapProductProperties(product, productSku)) ||
              [];
            const discount = productSku.amount - productSku.discountAmount;
            const selected = isSelected(product._id, productSku._id)
              ? true
              : false;
            return (
              <React.Fragment key={idx}>
                {/* will hiden when down md (PC LAYOUT)*/}
                <Hidden smDown>
                  <PCProduct
                    checked={selected}
                    image={product?.images?.[0]?.thumbnailUri}
                    title={product.name}
                    specs={values}
                    qty={item?.qty}
                    subtotal={`${currency}${productSku.amount}`}
                    discount={`${
                      discount > 0 ? "-" : ""
                    }${currency}${discount}`}
                    total={`${currency}${
                      productSku.discountAmount || productSku.amount || 0
                    }`}
                    onCheckChanged={() => {
                      onCheckChanged(product._id, productSku._id);
                    }}
                    onQtyChanged={(value) => {
                      updateCartItem?.(item._id, productSku._id, value);
                    }}
                    onDeleteClick={() => {
                      setModalVisible(true);
                      setRemoveItemId(item._id);
                    }}
                    headerProps={
                      idx === 0
                        ? {
                            allSelected: allItemSelected,
                            onAllSelectChanged: () => {
                              if (allItemSelected) {
                                setPrepareCheckoutItems([]);
                              } else {
                                setPrepareCheckoutItems(selectAll(cart));
                              }
                            }
                          }
                        : undefined
                    }
                  />
                  <Divider />
                </Hidden>
                {/* will hiden when up md (MOBILE LAYOUT)*/}
                <Hidden mdUp>
                  <MobileProduct
                    checked={selected}
                    image={product?.images?.[0]?.thumbnailUri}
                    title={product.name}
                    specs={values}
                    qty={item?.qty}
                    subtotal={`${currency}${productSku.amount}`}
                    discount={`${
                      discount > 0 ? "-" : ""
                    }${currency}${discount}`}
                    total={`${intl.formatMessage({
                      id: "display_subtotal"
                    })}: ${currency}${
                      productSku.discountAmount || productSku.amount || 0
                    }`}
                    onCheckChanged={() => {
                      onCheckChanged(product._id, productSku._id);
                    }}
                    onQtyChanged={(value) => {
                      updateCartItem?.(item._id, productSku._id, value);
                    }}
                    onDeleteClick={() => {
                      setModalVisible(true);
                      setRemoveItemId(item._id);
                    }}
                    headerProps={
                      idx === 0
                        ? {
                            allSelected: allItemSelected,
                            onAllSelectChanged: () => {
                              if (allItemSelected) {
                                setPrepareCheckoutItems([]);
                              } else {
                                setPrepareCheckoutItems(selectAll(cart));
                              }
                            }
                          }
                        : undefined
                    }
                  />
                  <Divider />
                </Hidden>
              </React.Fragment>
            );
          })}
        </Card>

        <Grid container>
          <Grid item md={6} lg={8}>
            {/* ADDRESS? DESIGN */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card elevation={0} className={classes.card_root}>
              <div className={classes.card_title}>
                {`${intl.formatMessage({ id: "display_order_info" })}`}
              </div>
              <Divider></Divider>
              <div className={classes.card_sections}>
                <div className={classes.card_section}>
                  <Typography variant="caption" color="inherit">
                    {`${intl.formatMessage({ id: "display_subtotal" })}:`}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="inherit"
                  >{`${currency}${calculateItemsSubTotal(
                    filteredItems
                  )}`}</Typography>
                </div>
                <div className={classes.card_section}>
                  <Typography variant="caption" color="inherit">
                    {`${intl.formatMessage({ id: "display_shipping" })}:`}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="inherit"
                  >{`${currency}${0}`}</Typography>
                </div>
                <div className={clsx(classes.card_section, classes.error)}>
                  <Typography variant="caption" color="inherit">
                    {`${intl.formatMessage({ id: "display_discount" })}:`}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="inherit"
                  >{`${currency}${calculateItemsDiscount(
                    filteredItems
                  )}`}</Typography>
                </div>
                <Divider className={classes.divider}></Divider>
                <div className={classes.card_section}>
                  <Typography
                    variant="caption"
                    color="inherit"
                  >{`${intl.formatMessage({
                    id: "display_total"
                  })}:`}</Typography>
                  <Typography
                    variant="caption"
                    color="inherit"
                  >{`${currency}${calculateItemsTotal(
                    filteredItems
                  )}`}</Typography>
                </div>
              </div>
              {qty > 0 && (
                <div className={classes.submit}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    disableElevation
                    disabled={isEmpty(prepareCheckoutItems)}
                    onClick={() => {
                      // save items to local store
                      localStorage.setItem(
                        "CHECKOUT_ITEMS",
                        JSON.stringify(prepareCheckoutItems)
                      );
                      // then jump to checkout page
                      router.push("/cart/checkout");
                    }}
                  >
                    {intl.formatMessage({ id: "display_checkout" })}
                  </Button>
                </div>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Modal here */}
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
    </Layout>
  );
};

export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler, SSRShoppingCartHandler])
)(Cart);
