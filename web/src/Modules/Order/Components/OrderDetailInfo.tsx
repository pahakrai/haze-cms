import React from "react";
import clsx from "clsx";
import getConfig from "next/config";
import { useIntl } from "react-intl";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import * as Common from "@golpasal/common";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "next/link";
import { downloadFile } from "~/lib/downloadFile/index";

import { formatUserName } from "~/lib/utils";
import { useLocale } from "~/lib/intl";
import { useGetCheckOutUrl } from "~/src/Modules/Checkout/Hooks/useGetCheckOutUrl";

interface OrderDetailInfoProps {
  order?: IOrder;
}

const { PaymentStatus } = Common.default.status;
const Locales = Common.default.locales;

export const OrderDetailInfo = ({ order }: OrderDetailInfoProps) => {
  const intl = useIntl();
  const { publicRuntimeConfig: Config } = getConfig();
  const { locale } = useLocale();
  const classes = useClasses();
  const paid = order?.payment?.status !== PaymentStatus.NOT_PAID;
  const { url: checkoutUrl } = useGetCheckOutUrl({
    orderId: order?._id,
    skip: !order?._id || paid
  });
  let status: any =
    order?.status !== undefined
      ? Common.helpers.getConstantByValue(
          "status",
          "OrderStatus",
          order?.status,
          locale
        )
      : { text: "" };
  status = status?.text;
  let paymentStatus: any =
    order?.payment?.status !== undefined
      ? Common.helpers.getConstantByValue(
          "status",
          "PaymentStatus",
          order?.payment?.status,
          locale
        )
      : { text: "" };
  paymentStatus = paymentStatus?.text;
  const address = order?.pickupStore
    ? order?.pickupStore?.address
    : order?.contactAddress;
  const addressText = (
    order?.pickupStore
      ? [address?.name, address?.address1, address?.address2]
      : [
          address?.country?.name,
          address?.state?.name,
          address?.city?.name,
          address?.name
        ]
  )
    .filter((v) => v)
    .join(" ");
  const infos = [
    ["display_order_no", order?.orderNo],
    [
      "display_order_date",
      order?.date ? moment(order?.date).format("YYYY/MM/DD HH:mm") : ""
    ],
    ["display_order_status", status]
  ];
  const goods = [
    ["display_order_recipient_name", formatUserName(order?.client)],
    [
      "display_order_recipient_phone_number",
      order?.contactAddress?.phone || order?.billingContact?.phone
    ],
    [
      "display_shipping_method",
      <div>
        {
          Locales?.[locale]?.method?.["PickUpMethod"]?.[
            order?.pickupStore ? "PICK_UP" : "DELIVERY"
          ]
        }{" "}
        {addressText}
      </div>
    ],
    ["display_remarks", order?.remarks]
  ];
  const formatRow = (rows: any) =>
    rows.map((v, index) => {
      return (
        <div className="card_row" key={index}>
          <div className="label">
            <FormattedMessage id={v[0]} /> ：
          </div>
          <div className="value">
            {v[1] || (
              <span style={{ color: "#999" }}>
                <FormattedMessage id="display_no_information" />
              </span>
            )}
          </div>
        </div>
      );
    });
  const transactions = order?.payment?.transactions;

  const payment = (v) => {
    return formatRow([
      ["display_receiptNo", v?.receiptNo],
      ["display_pay_method", v?.paymentMethod?.name],
      [
        "display_payment_status",
        paymentStatus ? (
          <div className={clsx(classes.payment_status, { paid: paid })}>
            <span>{paymentStatus}</span>
            {!paid && (
              <div className="button">
                {checkoutUrl ? (
                  <Link href={checkoutUrl} passHref>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={!checkoutUrl}
                    >
                      <FormattedMessage id="display_pay" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!checkoutUrl}
                  >
                    <FormattedMessage id="display_pay" />
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          ""
        )
      ],
      ["display_amount", v?.amount],
      ["display_transaction_number", v?.id?.replace(/.+(?=.{6})/, "****") || ""]
    ]);
  };

  return (
    <div>
      <div className={classes.root}>
        <div className={clsx(classes.info, classes.card)}>
          <div className={classes.card_title}>
            <FormattedMessage id="display_order_information" />
          </div>
          {formatRow(infos)}
        </div>
        <div className={clsx(classes.goods, classes.card)}>
          <div className={classes.card_title}>
            <FormattedMessage id="display_order_delivery_information" />
          </div>
          {formatRow(goods)}
        </div>
      </div>

      {transactions.map(
        (v, index) =>
          v.status === PaymentStatus.PAID && (
            <div className={classes.root}>
              <div className={clsx(classes.payment, classes.card)}>
                <div className={classes.card_title}>
                  <FormattedMessage id="display_payment_information" />
                </div>
                {payment(v)}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    const utcOffset = moment().utcOffset() || 0;
                    const fileUrl = `${Config.BASE_API_URL}/invoices/${order?._id}/download-email-pdf/${v.receiptNo}/${utcOffset}`;
                    downloadFile(fileUrl);
                  }}
                >
                  {intl.formatMessage({ id: "display_receipt_pdf" })}
                </Button>
              </div>
            </div>
          )
      )}
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  root: {
    padding: "14px 16px",
    border: "1px solid  #dee2e6",
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
    flexWrap: "wrap"
  },
  card: {
    width: "50%",
    paddingRight: 16,
    paddingBottom: 40,
    "& .card_row": {
      display: "flex",
      flexDirection: "row",
      marginBottom: 8,
      "& .label": {
        flex: 1,
        fontSize: 14,
        fontWeight: 400,
        color: "#333333",
        lineHeight: "20px,"
      },
      "& .value": {
        flex: 1,
        fontSSize: 14,
        fontWeight: 400,
        color: "#333333",
        lineHeight: "20px"
      }
    }
  },
  card_title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#333333",
    lineHeight: "25px",
    marginBottom: 20
  },
  payment_status: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&.paid": {
      color: "#333"
    },
    "& > span": {
      fontSize: 14,
      fontWeight: 600,
      color: "#0590ff",
      lineHeight: "20px"
    },
    "& .button": {
      marginLeft: 8,
      "& a": {
        padding: "2px 18px",
        fontSize: 14,
        fontWeight: 400,
        color: "#ffffff",
        lineHeight: "20px"
      }
    }
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      flexDirection: "column",
      marginTop: 24
    },
    card: {
      paddingRight: 0,
      paddingBottom: 24,
      width: "100%"
    },
    card_title: { marginBottom: 16 }
  }
}));
export default OrderDetailInfo;
