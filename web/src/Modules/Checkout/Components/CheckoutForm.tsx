import React from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Ecomm, { helpers } from "@golpasal/common";
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  makeStyles,
  Card,
  Typography,
  Divider,
  Radio,
  FormControlLabel,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { useForm, FormProvider, Controller } from "react-hook-form";
import dayjs from "dayjs";

import { useCheckout } from "~/src/Modules/Checkout/Hooks/useCheckout";
import { useLocale } from "~/lib/intl";
import { useMyAddresss } from "../../Address/Hooks/useMyAddresss";
import { useRedeemCoupon } from "../../Coupon/Hooks/useRedeemCoupon";
import { useShoppingCart } from "~/src/Modules/ShoppingCart/Hooks/useShoppingCart";
import { useStoresPlaceOrder } from "../../Store/Hooks/useStoresPlaceOrder";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";
import AddressSelectModal from "../../Address/Containers/AddressSelectModal";
import { PrepareCheckoutItem } from "~/pages/cart";
import { calculateItemsTotal } from "../../ShoppingCart/utils";
import {
  NotSupportPayment,
  PaymentGroups,
  StripePayment
} from "./ReCheckoutForm";

const useClasses = makeStyles((theme) => ({
  cart_root: {
    border: `1px solid ${theme.palette.divider}`,
    "& $title": {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    "& $content": {
      padding: theme.spacing(2),
      "& $line": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }
  },
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  my_2: {
    margin: `${theme.spacing(2)}px 0`
  },
  title: {},
  content: {},
  line: {},
  coupon_root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  coupon_submit: {
    height: 40,
    marginLeft: theme.spacing(1)
  },
  mb_1: {
    marginBottom: theme.spacing(1)
  },
  d_flex: {
    display: "flex"
  },
  align_items_center: {
    alignItems: "center"
  },
  cursor_pointer: {
    cursor: "pointer"
  },
  dialog_root: {
    width: 720
  },
  dialog_close_icon: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  [theme.breakpoints.down("md")]: {
    dialog_root: {
      width: "100%"
    }
  }
}));
const StoreStatus = Ecomm.status.StoreStatus;
interface ICheckoutForm {
  address: string;
  remarks?: string;
  pickupStore?: string;
  creditCardNumber: string;
  creditCardExpiry: string;
  creditCardCVV: string;
}

const PaymentMethod = Ecomm.method.PaymentMethod;
const PickUpMethod = Ecomm.method.PickUpMethod;
interface CheckoutFormProps {
  setLoading?: (loading: boolean) => void;
}
export const CheckoutForm = ({ setLoading }: CheckoutFormProps) => {
  const classes = useClasses();
  const intl = useIntl();
  const router = useRouter();
  const { current } = useLocale();
  const { currency, cart, reloadCart } = useShoppingCart();
  const [uiBlocking, setUIBlocking] = React.useState(false);
  const [paymentMethod, setPaymentMethod] =
    React.useState<IWorkspacePaymentMethod>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [formData, setFormData] = React.useState<ICheckoutOrderModel>();
  const filterItems = (cart?: IShoppingCart) => {
    const localItems: PrepareCheckoutItem[] =
      JSON.parse(localStorage.getItem("CHECKOUT_ITEMS")) || [];
    return cart?.items.filter((item) => {
      const product = item.product as IProduct;
      const sku = item.productSku as IProductSku;
      return localItems.find(
        (_item) => _item.skuId === sku._id && _item.productId === product._id
      );
    });
  };
  const filteredItems = filterItems(cart);
  const [couponCode, setCouponCode] = React.useState<string | undefined>();
  const [coupon, setCoupon] = React.useState<IOrderChargeCoupon>(null);
  const [couponError, setCouponError] = React.useState<string | undefined>();
  const {
    loading: redeemLoading,
    data: redeemCoupon,
    redeemCoupon: getCoupon,
    error: redeemError
  } = useRedeemCoupon();
  React.useEffect(() => {
    setCoupon(redeemCoupon || null);
  }, [redeemCoupon]);
  const [pickUpMethod, setPickupMethod] = React.useState<string>(
    PickUpMethod.DELIVERY
  );
  const [address, setAddress] = React.useState<IAddress>();
  const { addresses } = useMyAddresss();
  React.useEffect(() => {
    // when addresses changed change address to default address
    const defaultAddress = addresses.find((address) => address.isDefault);
    if (defaultAddress) {
      setAddress(defaultAddress);
      setValue("address", "done");
    }
  }, [addresses]);
  const { stores } = useStoresPlaceOrder();
  const [addressModalVisible, setAddressModalVisible] =
    React.useState<boolean>(false);
  const HookFormMethods = useForm<ICheckoutForm>();
  const { register, handleSubmit, errors, setValue, control } = HookFormMethods;
  const pickups = [PickUpMethod.DELIVERY, PickUpMethod.PICK_UP].map((item) => ({
    key: item,
    name: helpers.getConstantByValue(
      "method",
      "PickUpMethod",
      item,
      helpers.getLocale(current)
    ).text
  }));

  const { workspace } = useWorkspace();
  const { checkout, loading: checkoutLoading } = useCheckout({
    onComplete: (data) => {
      // when checkout succeed jump to order detail page
      reloadCart(); // reload cart when checkout finished
      router.replace(`/orders/${data?.order?._id}`);
    },
    onError: () => {
      setUIBlocking(false);
    }
  });
  const _handleSubmit = async (data: ICheckoutForm) => {
    // prepare form data
    const items = filteredItems.map((item) => {
      const product = item.product as IProduct;
      const sku = item.productSku as IProductSku;
      const qty = item.qty || 1;
      return {
        product: product._id,
        productSKU: sku._id,
        qty: qty,
        currency: sku.currency,
        amount: (sku.discountAmount || sku.amount) * qty
      };
    });
    const pickupStore = stores.find((item) => item._id === data.pickupStore);
    const contact =
      address && pickUpMethod === PickUpMethod.DELIVERY
        ? {
            name: address.name,
            country: address.country._id,
            state: address.state._id,
            city: address.city._id,
            address1: address.address1,
            address2: address.address2,
            postCode: address.postCode,
            phone: address.phone
          }
        : {
            name: pickupStore?.address.name,
            country: pickupStore?.address.country._id,
            state: pickupStore?.address.state._id,
            city: pickupStore?.address.city._id,
            address1: pickupStore?.address.address1,
            address2: pickupStore?.address.address2,
            postCode: pickupStore?.address.postCode,
            phone: pickupStore?.address.phone
          };
    const input: ICheckoutOrderModel = {
      order: {
        orderType: workspace.type,
        date: new Date().toISOString(),
        contactAddress: contact,
        billingContact: contact,
        product: {
          items: items
        },
        remarks: data.remarks,
        pickupStore: data.pickupStore,
        coupon: coupon?.code
      }
    };
    setFormData(input);
    setModalVisible(true);
  };
  const handleStripeCheckout = (source: string) => {
    setUIBlocking(true);
    setModalVisible(false);
    // checkout by stripe
    if (formData && source) {
      checkout({
        ...formData,
        payment: {
          paymentMethod: PaymentMethod.CREDIT_CARD_STRIPE,
          sourceId: source
        }
      });
    }
  };
  React.useEffect(() => {
    setLoading(checkoutLoading);
  }, [checkoutLoading]);
  React.useEffect(() => {
    if (register && pickUpMethod === PickUpMethod.DELIVERY) {
      register("address", { required: true });
    } else {
      register("address", { required: false });
    }
  }, [register, pickUpMethod]);
  return (
    <FormProvider {...HookFormMethods}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item md={12} lg={8}>
            {/* Shipping Method */}
            <Card
              elevation={0}
              className={clsx(classes.cart_root, classes.mb_2)}
            >
              <div className={classes.title}>
                <Typography variant="h6">
                  {intl.formatMessage({ id: "display_shipping_method" })}
                </Typography>
              </div>
              <div className={classes.content}>
                <div
                  className={clsx(classes.d_flex, classes.align_items_center)}
                >
                  {pickups.map((item) => (
                    <FormControlLabel
                      control={
                        <Radio
                          color="primary"
                          key={item.key}
                          checked={pickUpMethod === item.key}
                          onClick={() => setPickupMethod(item.key)}
                        />
                      }
                      label={item.name}
                    ></FormControlLabel>
                  ))}
                </div>
                {pickUpMethod === PickUpMethod.PICK_UP && (
                  <Controller
                    name="pickupStore"
                    control={control}
                    rules={{ required: true }}
                    render={(props) => {
                      return (
                        <TextField
                          select
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={props.value}
                          onChange={(e) => props.onChange(e.target.value)}
                          error={errors.pickupStore ? true : false}
                          helperText={
                            errors.pickupStore
                              ? intl.formatMessage({ id: "error_required" })
                              : undefined
                          }
                        >
                          {stores.map((store) => {
                            return (
                              <MenuItem
                                key={store._id}
                                value={store._id}
                                disabled={
                                  store.status === StoreStatus.INACTIVE ||
                                  store.status === StoreStatus.DEPRECATED
                                }
                              >
                                {`${store?.address?.name} - ${
                                  store.address?.address1 ??
                                  store.address?.address1
                                }${
                                  store.address?.address2 ??
                                  store.address?.address2
                                }`}
                                {` (${intl.formatMessage(
                                  {
                                    id: "display_no_longer_provide_service_after"
                                  },
                                  {
                                    date: dayjs(store.deprecatedDate).format(
                                      "YYYY/MM/DD"
                                    )
                                  }
                                )})`}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      );
                    }}
                  ></Controller>
                )}
                {pickUpMethod === PickUpMethod.DELIVERY && address && (
                  <div>
                    <Typography
                      gutterBottom
                      variant="caption"
                      color="textSecondary"
                      component="h6"
                    >
                      {`${intl.formatMessage({
                        id: "display_username"
                      })}: ${address?.name}`}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="caption"
                      color="textSecondary"
                      component="h6"
                    >
                      {`${address?.country?.name}/${address?.city?.name}/${address?.state?.name}`}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="caption"
                      color="textSecondary"
                      component="h6"
                    >
                      {`${intl.formatMessage({
                        id: "display_detailed_address"
                      })}: ${address?.address1} ${address?.address2 ?? ""}`}
                    </Typography>
                    {address?.postCode && (
                      <Typography
                        gutterBottom
                        variant="caption"
                        color="textSecondary"
                        component="h6"
                      >
                        {`${intl.formatMessage({
                          id: "display_postcode"
                        })}: ${address.postCode}`}
                      </Typography>
                    )}
                    {address?.phone && (
                      <Typography
                        gutterBottom
                        variant="caption"
                        color="textSecondary"
                        component="h6"
                      >
                        {`${intl.formatMessage({
                          id: "display_phone"
                        })}: ${address?.phone}`}
                      </Typography>
                    )}
                  </div>
                )}
                {pickUpMethod === PickUpMethod.DELIVERY && !address && (
                  <Typography
                    component="h6"
                    variant="caption"
                    color={errors.address ? "error" : "secondary"}
                    gutterBottom
                  >
                    {`${intl.formatMessage({
                      id: "display_please_select_address"
                    })}`}
                  </Typography>
                )}
                {pickUpMethod === PickUpMethod.DELIVERY && (
                  <Typography
                    component="h6"
                    variant="caption"
                    color="primary"
                    gutterBottom
                    className={classes.cursor_pointer}
                    onClick={() => setAddressModalVisible(true)}
                  >
                    {intl.formatMessage({ id: "display_change_address" })}
                  </Typography>
                )}
              </div>
            </Card>
            {/* Order Remarks */}
            <Card
              elevation={0}
              className={clsx(classes.cart_root, classes.mb_2)}
            >
              <div className={classes.title}>
                <Typography variant="h6">
                  {intl.formatMessage({ id: "display_order_remarks" })}
                </Typography>
              </div>
              <div className={classes.content}>
                <TextField
                  name="remarks"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  placeholder={intl.formatMessage({
                    id: "placeholder_checkout_order_remarks"
                  })}
                  inputRef={register()}
                ></TextField>
              </div>
            </Card>
            <Card
              elevation={0}
              className={clsx(classes.cart_root, classes.mb_2)}
            >
              <div className={classes.title}>
                <Typography variant="h6">
                  {intl.formatMessage({ id: "display_payment_method" })}
                </Typography>
              </div>
              <div className={classes.content}>
                <PaymentGroups
                  onChange={(method) => {
                    setPaymentMethod(method);
                  }}
                />
                {/* {paymentDisabled && (
                  <Typography>
                    {intl.formatMessage({ id: "display_no_payment_support" })}
                  </Typography>
                )}
                {!paymentDisabled && <StripeElements />} */}
              </div>
            </Card>
          </Grid>
          <Grid item md={12} lg={4}>
            {/*  */}
            <Card
              elevation={0}
              className={clsx(classes.cart_root, classes.mb_2)}
            >
              <div className={classes.title}>
                <Typography variant="h6">
                  {intl.formatMessage({ id: "display_order" })}
                </Typography>
              </div>
              <div className={classes.content}>
                <div className={clsx(classes.line, classes.mb_1)}>
                  <Typography variant="caption">
                    {`${intl.formatMessage({ id: "display_subtotal" })}:`}
                  </Typography>
                  <Typography variant="caption">
                    {`${currency}${calculateItemsTotal(filteredItems)}`}
                  </Typography>
                </div>
                <div className={clsx(classes.line, classes.mb_1)}>
                  <Typography variant="caption">
                    {`${intl.formatMessage({ id: "display_shipping" })}:`}
                  </Typography>
                  <Typography variant="caption">{`${currency}0`}</Typography>
                </div>
                {coupon && (
                  <div className={clsx(classes.line, classes.mb_1)}>
                    <Typography variant="caption" color="error">
                      {`${intl.formatMessage({ id: "display_discount" })}:`}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="error"
                    >{`-${currency}${coupon.amount}`}</Typography>
                  </div>
                )}
                <Typography gutterBottom color="textSecondary">
                  {intl.formatMessage({ id: "display_use_coupon_code" })}
                </Typography>
                <div className={classes.coupon_root}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={redeemError ? true : false}
                    disabled={Boolean(coupon)}
                    helperText={
                      redeemError
                        ? intl.formatMessage({
                            id: "display_invalid_coupon"
                          })
                        : undefined
                    }
                    onChange={(event) => {
                      setCouponError(undefined);
                      setCouponCode(event.target.value);
                    }}
                  ></TextField>
                  {coupon && (
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.coupon_submit}
                      onClick={() => {
                        setCoupon(null);
                      }}
                    >
                      {intl.formatMessage({ id: "display_cancel" })}
                    </Button>
                  )}
                  {!coupon && (
                    <Button
                      variant="contained"
                      disableElevation
                      color="primary"
                      className={classes.coupon_submit}
                      onClick={() => {
                        getCoupon(couponCode, {
                          productTotAmount: calculateItemsTotal(filteredItems),
                          products: filteredItems.map((item) => {
                            const product = item.product as IProduct;
                            const sku = item.productSku as IProductSku;
                            return {
                              product: product._id,
                              productSKU: sku._id,
                              amount: sku.discountAmount || sku.amount || 0
                            };
                          })
                        });
                      }}
                    >
                      {intl.formatMessage({ id: "display_redeem" })}
                    </Button>
                  )}
                </div>
                <Divider className={classes.my_2} />
                <div className={clsx(classes.line)}>
                  <Typography variant="caption">
                    {`${intl.formatMessage({
                      id: "display_total"
                    })}:`}
                  </Typography>
                  <Typography variant="caption">
                    {`${currency}${
                      calculateItemsTotal(filteredItems) - (coupon?.amount || 0)
                    }`}
                  </Typography>
                </div>
              </div>
            </Card>
            <Card
              elevation={0}
              className={clsx(classes.cart_root, classes.mb_2)}
            >
              <div className={classes.title}>
                <Typography variant="h6">
                  {intl.formatMessage({ id: "display_order_consult" })}
                </Typography>
              </div>
              <div className={classes.content}>
                <List>
                  {filteredItems?.map((item) => {
                    const product = item.product as IProduct | undefined;
                    const sku = item.productSku as IProductSku | undefined;
                    return (
                      <React.Fragment>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              src={product?.images?.[0]?.thumbnailUri}
                            ></Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.name}
                            secondary={`*${item.qty} ${currency}${
                              sku.discountAmount || sku.amount
                            }`}
                          ></ListItemText>
                        </ListItem>
                      </React.Fragment>
                    );
                  })}
                </List>
              </div>
            </Card>
            <Card
              elevation={0}
              className={clsx(classes.cart_root, classes.mb_2)}
            >
              <div className={classes.content}>
                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  variant="contained"
                  disabled={uiBlocking || !paymentMethod}
                  disableElevation
                >
                  {intl.formatMessage({ id: "display_proceed_to_checkout" })}
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
        <AddressSelectModal
          open={addressModalVisible}
          onHide={() => setAddressModalVisible(false)}
          onDone={(address) => {
            setAddress(address);
            setValue("address", "done");
            setAddressModalVisible(false);
          }}
        />
      </form>
      <Dialog
        open={modalVisible}
        aria-labelledby="payment-dialog-title"
        classes={{ paper: classes.dialog_root }}
      >
        <DialogTitle id="form-dialog-title">
          {paymentMethod?.paymentMethod?.name}
          <IconButton
            aria-label="close"
            className={classes.dialog_close_icon}
            onClick={() => {
              setModalVisible(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {paymentMethod?.paymentMethod?.code === PaymentMethod.ALIPAY && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code === PaymentMethod.ATM && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code ===
            PaymentMethod.CASH_ON_DELIVERY && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code === PaymentMethod.CHEQUE && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code ===
            PaymentMethod.CREDIT_CARD_STRIPE && (
            <StripePayment
              method={paymentMethod}
              onPrepared={handleStripeCheckout}
            />
          )}
          {paymentMethod?.paymentMethod?.code === PaymentMethod.FPS && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code === PaymentMethod.PAYME && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code === PaymentMethod.PAYPAL && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code === PaymentMethod.UNION_PAY && (
            <NotSupportPayment method={paymentMethod} />
          )}
          {paymentMethod?.paymentMethod?.code === PaymentMethod.WECHAT_PAY && (
            <NotSupportPayment method={paymentMethod} />
          )}
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
