import React, { useState, useMemo } from "react";
import { Button, Grid } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import Common from "@golpasal/common";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";

import { useToast } from "~/lib/toast";
import { useCurrentUser } from "~/src/Modules/Auth/Hooks/useCurrentUser";
import { useCreateQuotation } from "~/src/Modules/Quotation/Hooks/useCreateQuotation";

interface ProductQuoteButtonProps {
  sku?: IProductSku;
  product?: IProduct;
}

const { OrderType } = Common.type;

export const ProductQuoteButton = ({
  sku,
  product
}: ProductQuoteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const intl = useIntl();
  const { currentUser } = useCurrentUser();
  const { createQuotation } = useCreateQuotation({
    onCompleted: () => {
      router.push("/ask-quotation-success");
    },
    onError: () => {
      toast({
        status: "error",
        title: intl.formatMessage({
          id: "msg_ask_for_a_quote_failure"
        }),
        delay: 1500
      });
      setLoading(false);
    }
  });
  const onClick = useMemo(
    () =>
      debounce(async () => {
        if (!currentUser) {
          router.push(`/auth/login?redirect=/products/${product._id}`);
          return;
        }
        if (product?._id && sku?._id) {
          setLoading(true);
          await createQuotation({
            orderType: OrderType.SHOPPING,
            details: [
              {
                product: product?._id,
                productSKU: sku?._id,
                qty: 1,
                amount: 0,
                remark: ""
              }
            ]
          });
        }
      }, 500),
    [sku, product, currentUser]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          size="large"
          onClick={onClick}
          variant="contained"
          color="primary"
          disableElevation
          disabled={loading}
        >
          <FormattedMessage id="msg_ask_for_a_quote" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductQuoteButton;
