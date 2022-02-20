import React from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Ecomm from "@golpasal/common";
import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { useForm, FormProvider } from "react-hook-form";
import { useCheckout } from "~/src/Modules/Checkout/Hooks/useCheckout";
import { getSymbolFromCurrency } from "~/lib/currencyMap";

import { useCurrentUser } from "../../Auth/Hooks/useCurrentUser";
import { useWorkspacePaymentMethods } from "~/src/Modules/Workspace/Hooks/useWorkspacePaymentMethods";
import { StripeProvider } from "./StripeProvider";
import { StripeElements } from "./StripeElements";

const PaymentStatus = Ecomm.status.PaymentStatus;
const PaymentTransactionStatus = Ecomm.status.PaymentTransactionStatus;
const PaymentMethod = Ecomm.method.PaymentMethod;
const OrderStatus = Ecomm.status.OrderStatus;

const useClasses = makeStyles((theme) => ({
  card_root: {
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
  mb_1: {
    marginBottom: theme.spacing(1)
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
  d_flex: {
    display: "flex"
  },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  },
  py_5: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
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

interface IReCheckoutForm {}

interface ReCheckoutFormProps {
  order?: IOrder;
  setLoading?: (loading: boolean) => void;
  paymentDisabled?: boolean;
}
export const ReCheckoutForm = ({
  setLoading,
  order,
  paymentDisabled
}: ReCheckoutFormProps) => {
  const classes = useClasses();
  const intl = useIntl();
  const router = useRouter();
  // const stripe = useStripe();
  // const elements = useElements();
  const [uiBlocking, setUIBlocking] = React.useState(false);
  const [paymentMethod, setPaymentMethod] =
    React.useState<IWorkspacePaymentMethod>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { currentUser } = useCurrentUser();
  const HookFormMethods = useForm<IReCheckoutForm>();
  const { handleSubmit } = HookFormMethods;
  const { checkout, loading: checkoutLoading } = useCheckout({
    onComplete: (data) => {
      // when checkout succeed jump to order detail page
      router.replace(`/orders/${data?.order?._id}`);
    },
    onError: () => {
      setUIBlocking(false);
    }
  });
  const _handleSubmit = async (data: IReCheckoutForm) => {
    setModalVisible(true);
  };
  const handleStripeCheckout = (source: string) => {
    setUIBlocking(true);
    // checkout by stripe
    order &&
      checkout({
        orderId: order._id,
        payment: {
          paymentMethod: PaymentMethod.CREDIT_CARD_STRIPE,
          sourceId: source
        }
      });
  };

  React.useEffect(() => {
    setLoading(checkoutLoading);
  }, [checkoutLoading]);
  if (
    !order ||
    order.client?._id !== currentUser?._id ||
    order?.status !== OrderStatus.PENDING_PAYMENT
  ) {
    // TODO: not find order ui
    return (
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.py_5}
      >
        <Typography>
          {intl.formatMessage({ id: "error_invalid_order" })}
        </Typography>
      </Grid>
    );
  }
  // calculate paid ammount
  const pricePaid = order?.payment?.transactions?.reduce((result, item) => {
    if (item.status === PaymentTransactionStatus.SUCCESS) {
      return (result += item.amount);
    }
    return result;
  }, 0);
  const pricePending = order?.payment?.transactions?.reduce((result, item) => {
    if (item.status === PaymentTransactionStatus.PENDING) {
      return (result += item.amount);
    }
    return result;
  }, 0);
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
              className={clsx(classes.card_root, classes.mb_2)}
              elevation={0}
            >
              <div className={classes.title}>
                <Typography variant="h6">
                  {intl.formatMessage({ id: "display_shipping_address" })}
                </Typography>
              </div>
              <div className={classes.content}>
                <Typography
                  gutterBottom
                  variant="caption"
                  color="textSecondary"
                  component="h6"
                >
                  {`${intl.formatMessage({
                    id: "display_username"
                  })}: ${order.contactAddress.name}`}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  color="textSecondary"
                  component="h6"
                >
                  {`${intl.formatMessage({
                    id: "display_phone"
                  })}: ${order.contactAddress.phone}`}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  color="textSecondary"
                  component="h6"
                >
                  {`${intl.formatMessage({
                    id: "display_shipping_address"
                  })}: ${order.contactAddress.country?.name}/${
                    order.contactAddress.city?.name
                  }/${order.contactAddress.state?.name} ${
                    order.contactAddress.address1 ?? ""
                  } ${order.contactAddress.address2 ?? ""}`}
                </Typography>
              </div>
            </Card>
            {/* Order Remarks */}
            {order?.remarks && (
              <Card
                className={clsx(classes.card_root, classes.mb_2)}
                elevation={0}
              >
                <div className={classes.title}>
                  <Typography variant="h6">
                    {intl.formatMessage({ id: "display_order_remarks" })}
                  </Typography>
                </div>
                <div className={classes.content}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    color="textSecondary"
                    component="h6"
                  >
                    {order?.remarks}
                  </Typography>
                </div>
              </Card>
            )}
            <Card
              className={clsx(classes.card_root, classes.mb_2)}
              elevation={0}
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
                {/* display radio group provide multiple payment methods */}
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
              className={clsx(classes.card_root, classes.mb_2)}
              elevation={0}
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
                  <Typography variant="caption">{`${getSymbolFromCurrency(
                    order?.charge?.currency
                  )}${order?.product?.items?.reduce((result, item) => {
                    return (result += item.amount);
                  }, 0)}`}</Typography>
                </div>
                {order?.charge?.services?.map((service, idx) => {
                  return (
                    <div className={clsx(classes.line, classes.mb_1)} key={idx}>
                      <Typography variant="caption">
                        {`${service.service?.name}:`}
                      </Typography>
                      <Typography variant="caption">{`${getSymbolFromCurrency(
                        order?.charge?.currency
                      )}${service.amount}`}</Typography>
                    </div>
                  );
                })}
                {order?.charge?.others?.map((other, idx) => {
                  return (
                    <div className={clsx(classes.line, classes.mb_1)} key={idx}>
                      <Typography variant="caption">
                        {`${other.description}:`}
                      </Typography>
                      <Typography variant="caption">{`${getSymbolFromCurrency(
                        order?.charge?.currency
                      )}${other.amount}`}</Typography>
                    </div>
                  );
                })}
                <div className={clsx(classes.line, classes.mb_1)}>
                  <Typography variant="caption">
                    {`${intl.formatMessage({ id: "display_shipping" })}:`}
                  </Typography>
                  <Typography variant="caption">{`${getSymbolFromCurrency(
                    order?.charge?.currency
                  )}${0}`}</Typography>
                </div>
                <div className={clsx(classes.line, classes.mb_1)}>
                  <Typography variant="caption" color="error">
                    {`${intl.formatMessage({ id: "display_discount" })}:`}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="error"
                  >{`${getSymbolFromCurrency(
                    order?.charge?.currency
                  )}${order?.charge?.coupons?.reduce((result, item) => {
                    return (result += item.amount);
                  }, 0)}`}</Typography>
                </div>
                {/* if this payment parts payed */}
                {pricePaid > 0 && (
                  <div className={clsx(classes.line, classes.mb_1)}>
                    <Typography variant="caption" color="error">
                      {`${intl.formatMessage({ id: "display_paid" })}:`}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="error"
                    >{`${getSymbolFromCurrency(
                      order?.charge?.currency
                    )}${pricePaid}`}</Typography>
                  </div>
                )}
                {pricePending > 0 && (
                  <div className={clsx(classes.line, classes.mb_1)}>
                    <Typography variant="caption" color="secondary">
                      {`${intl.formatMessage({ id: "display_pending" })}:`}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="secondary"
                    >{`${getSymbolFromCurrency(
                      order?.charge?.currency
                    )}${pricePending}`}</Typography>
                  </div>
                )}
                <Divider className={classes.my_2} />
                <div className={clsx(classes.line, classes.mb_1)}>
                  <Typography variant="caption">
                    {`${intl.formatMessage({
                      id: "display_total"
                    })}:`}
                  </Typography>
                  <Typography variant="caption">{`${getSymbolFromCurrency(
                    order?.charge?.currency
                  )}${
                    order?.charge?.totalAmount - pricePaid - pricePending
                  }`}</Typography>
                </div>
              </div>
            </Card>

            <Card
              className={clsx(classes.card_root, classes.mb_2)}
              elevation={0}
            >
              <div className={classes.title}>
                <Typography variant="h6">
                  {intl.formatMessage({ id: "display_order_consult" })}
                </Typography>
              </div>
              <div className={classes.content}>
                {order?.product?.items?.map((item) => {
                  const product = item.product as IProduct | undefined;
                  const sku = item.productSKU as IProductSku | undefined;
                  return (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          variant="square"
                          src={product?.images?.[0]?.thumbnailUri}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={`*${item.qty} ${getSymbolFromCurrency(
                          item.currency
                        )}${sku.discountAmount || sku.amount}`}
                      ></ListItemText>
                    </ListItem>
                  );
                })}
              </div>
            </Card>
            <Card className={clsx(classes.card_root)} elevation={0}>
              <div className={classes.content}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={uiBlocking || !paymentMethod}
                  onClick={() => {
                    setModalVisible(true);
                  }}
                >
                  {intl.formatMessage({ id: "display_proceed_to_checkout" })}
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
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

interface PaymentGroupsProps {
  onChange?: (method: IWorkspacePaymentMethod) => void;
}
export const PaymentGroups = ({ onChange }: PaymentGroupsProps) => {
  const { workspacePaymentMethods, loading: paymentMethodsLoading } =
    useWorkspacePaymentMethods();
  return (
    <>
      <RadioGroup
        aria-label="payments"
        name="payments"
        onChange={(event, value) => {
          const method = workspacePaymentMethods.find(
            (item) => item._id === value
          );
          onChange?.(method);
        }}
      >
        {workspacePaymentMethods?.map((item) => (
          <FormControlLabel
            value={item._id}
            control={<Radio />}
            label={item.paymentMethod?.name}
            disabled={!item.paymentMethod.isActive}
          />
        ))}
      </RadioGroup>
    </>
  );
};
interface StripePaymentProps {
  method: IWorkspacePaymentMethod;
  onPrepared?: (source: string) => void;
}
export const StripePayment = ({ method, onPrepared }: StripePaymentProps) => {
  return (
    <StripeProvider publicKey={method.credential.publicKey}>
      <StripeElements onPrepared={onPrepared} />
    </StripeProvider>
  );
};

interface NotSupportPaymentProps {
  method: IWorkspacePaymentMethod;
}
export const NotSupportPayment = ({ method }: NotSupportPaymentProps) => {
  const intl = useIntl();
  return (
    <div
      style={{
        padding: 16
      }}
    >
      <Typography align="center">
        {intl.formatMessage({ id: "display_no_support" })}
      </Typography>
    </div>
  );
};
