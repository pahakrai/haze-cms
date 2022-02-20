import React from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import getConfig from "next/config";
import { Button, Grid } from "@material-ui/core";

import { useCurrentUser } from "~/src/Modules/Auth/Hooks/useCurrentUser";
import { useShoppingCart } from "~/src/Modules/ShoppingCart/Hooks/useShoppingCart";
import {
  FullHeartIcon,
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon
} from "~/src/Components/SvgIcon";
import { CopyTextContainer } from "~/src/Components/CopyTextContainer";
import { useToast } from "~/lib/toast";
import { useMyProductWatchExist } from "../Hooks/useMyProductWatchExist";
import { useToggleProductWatch } from "../Hooks/useToggleProductWatch";

const { publicRuntimeConfig: Config } = getConfig();

export const ProductDetailActionButtons = ({
  product,
  selectedSku,
  hiddenAddToCart,
  workspace
}: {
  product: IProduct;
  selectedSku?: string;
  hiddenAddToCart?: boolean;
  workspace?: IWorkspace;
}) => {
  const intl = useIntl();
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useShoppingCart();
  const { currentUser } = useCurrentUser();
  const { toggleWatch, loading: toggleWatchLoadiing } = useToggleProductWatch();
  const {
    loading: watchIsExistLoading,
    watched,
    refetch
  } = useMyProductWatchExist({
    skip: !product?._id,
    _id: product?._id
  });

  const handleAddToCart = () => {
    const productId = product?._id;
    const skuId = selectedSku;
    if (currentUser) {
      productId && skuId && addToCart(productId, skuId);
    } else {
      // jump to login page
      router.push(`/auth/login?redirect=/products/${product._id}`);
    }
  };
  const handleWatch = async () => {
    const productId = product?._id;
    if (currentUser) {
      if (productId) {
        await toggleWatch(productId);
        refetch();
      }
    } else {
      // jump to login page
      router.push(`/auth/login?redirect=/products/${product._id}`);
    }
  };

  const watchLoading = toggleWatchLoadiing || watchIsExistLoading;

  return (
    <Grid container spacing={2}>
      {workspace?.preferences?.product?.isEnableCart && !hiddenAddToCart && (
        <Grid item xs={12}>
          <Button
            size="large"
            fullWidth
            onClick={handleAddToCart}
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<ShoppingCartIcon />}
          >
            {intl.formatMessage({ id: "display_add_to_cart" })}
          </Button>
        </Grid>
      )}
      {workspace?.preferences?.product?.isEnableCart && (
        <Grid item xs={12} sm={6}>
          <Button
            size="large"
            fullWidth
            onClick={handleWatch}
            disabled={watchLoading}
            variant="outlined"
            startIcon={
              watched ? (
                <FullHeartIcon color="inherit" />
              ) : (
                <HeartIcon color="inherit" />
              )
            }
          >
            {intl.formatMessage({
              id: watched ? "display_watched" : "display_watch"
            })}
          </Button>
        </Grid>
      )}

      {workspace?.preferences?.product?.isEnableCart && (
        <CopyTextContainer text={`${Config.WEB_URL}${router.asPath}`}>
          {({ onCopy }) => (
            <Grid item xs={12} sm={6}>
              <Button
                size="large"
                fullWidth
                variant="outlined"
                onClick={() => {
                  onCopy();
                  toast({
                    title:
                      intl.formatMessage({
                        id: "msg_copy_product_url_success"
                      }) + "！",
                    status: "success"
                  });
                }}
                startIcon={<ShareIcon />}
              >
                {intl.formatMessage({ id: "display_share" })}
              </Button>
            </Grid>
          )}
        </CopyTextContainer>
      )}
    </Grid>
  );
};

export default ProductDetailActionButtons;
