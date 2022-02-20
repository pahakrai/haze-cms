import React from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import every from "lodash/every";
import remove from "lodash/remove";
import Link from "next/link";
import {
  Grid,
  makeStyles,
  Typography,
  Card,
  Link as MLink
} from "@material-ui/core";

import { PRODUCT_DETAIL_PAGE_FIELDS } from "~/src/Modules/Product/Apollo/ProductDetailPageQueryFields";
import { useProduct } from "~/src/Modules/Product/Hooks/useProduct";
import { getSymbolFromCurrency } from "~/lib/currencyMap";
import ProductDetailActionButtons from "../../Containers/ProductDetailActionButtons";
import { ContactUsForm } from "~/src/Modules/ContactUs/Components/ContactUsForm";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

import {
  ProductGallery,
  ProductSpecs,
  DeliveryAndPayment,
  ProductIllustration,
  ProductQuoteButton
} from "./";

const useClasses = makeStyles((theme) => ({
  detail: {
    marginBottom: theme.spacing(3)
  },
  tag: {
    marginRight: theme.spacing(0.5),
    fontSize: "1rem",
    borderRadius: 0,
    cursor: "pointer"
  },
  amount_wrapper: {
    display: "flex",
    alignItems: "flex-end",
    "& .text": {
      fontSize: "1rem",
      marginLeft: 5,
      marginBottom: "0.6rem"
    }
  },
  amount_currency: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginTop: 10
  },
  quote_button_wrapper: {
    paddingTop: theme.spacing(2)
  },
  delivery_and_payment: {
    "& p": {
      margin: 0,
      minHeight: 20
    }
  },
  caption: {
    padding: "40px 0 10px 0"
  },
  contact_container: {
    boxShadow: "rgba(0,0,0,.2) 0 3px 10px 0px",
    borderRadius: "10px 10px 0 0",
    marginTop: 15
  },
  contact_wrapper: {
    padding: 15
  },
  contact_title: {
    backgroundColor: "#b8c55c",
    color: "#fff",
    padding: 15,
    borderRadius: "10px 10px 0 0"
  }
}));

export const ProductDetail = () => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const { workspace } = useWorkspace();

  const _id = router.query._id as string;
  const [specs, setSpecs] = React.useState<{ spec: string; value: string }[]>(
    []
  );
  const [selectedSku, setSelectedSku] = React.useState<string>();
  const { product } = useProduct({ _id, field: PRODUCT_DETAIL_PAGE_FIELDS });
  const appendSpecs = (spec: string, value: string) => {
    // find and remove
    const removed = remove(specs, (item) => item.spec !== spec);
    // add
    removed.push({ spec, value });
    setSpecs(removed);
  };
  const selectedSkuObject = product?.skus?.find(
    (item) => item._id === selectedSku
  );
  const outOfStock =
    selectedSkuObject?.validateInventory && selectedSkuObject.qty === 0;
  React.useEffect(() => {
    // when page mounted and loaded product select first sku specs(if has)
    const sku = product?.skus?.[0];
    const selectedSpecs = sku?.specs?.map((item) => ({
      spec: item.spec._id,
      value: item.value
    }));
    setSpecs(selectedSpecs);
  }, [product]);
  React.useEffect(() => {
    // when specs changed reselect current sku
    const sku = product?.skus?.find((item) => {
      const skuSpecs = item.specs?.map((spec) => ({
        spec: spec.spec._id,
        value: spec.value
      }));
      return every(
        skuSpecs,
        (item) =>
          specs.find((_item) => _item.spec === item.spec)?.value === item.value
      );
    });
    setSelectedSku(sku?._id);
  }, [specs]);
  // display_out_of_stock
  return (
    <>
      <Grid container spacing={2} className={classes.detail}>
        <Grid item sm={12} md={6}>
          <ProductGallery product={product} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product?.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {intl.formatMessage({ id: "display_category" })}：
            {product?.category?.name || ""}
          </Typography>
          {product?.tags?.map((v, index) => (
            <span className={classes.tag} key={index}>
              <Link href={`/products?tag=${v?.text}`}>
                <MLink style={{ color: "#1a0dab" }}>{v?.text}</MLink>
              </Link>
            </span>
          ))}
          {selectedSkuObject?.isQuote !== true ? (
            <div className={classes.amount_wrapper}>
              <span className={classes.amount_currency}>
                {getSymbolFromCurrency(selectedSkuObject?.currency)}

                {String(
                  selectedSkuObject?.discountAmount || selectedSkuObject?.amount
                ).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") ||
                  intl.formatMessage({ id: "display_no_price" })}
              </span>

              {outOfStock && (
                <span className="text">
                  {intl.formatMessage({ id: "display_out_of_stock" })}
                </span>
              )}
            </div>
          ) : (
            <div className={classes.quote_button_wrapper}>
              <ProductQuoteButton sku={selectedSkuObject} product={product} />
            </div>
          )}
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ paddingTop: 10 }}
          >
            {intl.formatMessage({ id: "display_remarks" })}：
            {product?.remarks || ""}
          </Typography>
          {workspace?.preferences?.product?.isEnableCart && (
            <ProductSpecs
              product={product}
              specs={specs}
              onSpecChanged={appendSpecs}
            />
          )}
          <ProductDetailActionButtons
            product={product}
            selectedSku={selectedSku}
            hiddenAddToCart={outOfStock}
            workspace={workspace}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container sm={12} md={8} spacing={2}>
          <Grid container sm={12}>
            <div style={{ width: "95%" }}>
              {!workspace?.preferences?.product?.isEnableCart && (
                <ProductIllustration intl={intl} product={product} />
              )}
              <Typography variant="h5" className={classes.caption}>
                {intl.formatMessage({ id: "display_product_description" })}
              </Typography>
              <Typography
                variant="body1"
                style={{ width: "100%", overflow: "hidden" }}
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></Typography>
              <Typography variant="h5" className={classes.caption}>
                {intl.formatMessage({ id: "display_product_information" })}
              </Typography>
              <div
                style={{
                  textAlign: "center",
                  margin: "auto",
                  maxWidth: 846,
                  width: "100%",
                  overflow: "hidden"
                }}
                dangerouslySetInnerHTML={{ __html: product?.content }}
              ></div>

              {workspace?.preferences?.product?.hasDeliveryAndPaymentInfo ===
                true && (
                <>
                  <Typography variant="h5" className={classes.caption}>
                    {intl.formatMessage({ id: "display_delivery_and_payment" })}
                  </Typography>
                  <DeliveryAndPayment />
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid item sm={12} md={4} spacing={2}>
          <div className={classes.contact_container}>
            <div className={classes.contact_title}>
              <Typography variant="h5" component="span">
                {intl.formatMessage({ id: "display_contact_us" })}
              </Typography>
            </div>
            <div className={classes.contact_wrapper}>
              <ContactUsForm />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetail;
