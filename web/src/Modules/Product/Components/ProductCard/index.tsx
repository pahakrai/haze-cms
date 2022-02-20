// DISPLAY(HOME|PRODUCTS) PAGES
import { useRouter } from "next/router";
import getConfig from "next/config";
import { useIntl } from "react-intl";

import { getSymbolFromCurrency } from "~/lib/currencyMap";
import { useCurrentUser } from "~/src/Modules/Auth/Hooks/useCurrentUser";
import { useShoppingCart } from "~/src/Modules/ShoppingCart/Hooks/useShoppingCart";
import { useToggleProductWatch } from "../../Hooks/useToggleProductWatch";
import ProductCardBase from "./ProductCardBase";
import { useWorkspace } from "../../../Workspace/Hooks/useWorkspace";

const { publicRuntimeConfig: Config } = getConfig();

interface ProductCardProps {
  product?: IProduct;
  authed?: boolean;
}
export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const intl = useIntl();
  const { currentUser } = useCurrentUser();
  const { addToCart } = useShoppingCart();
  const { toggleWatch } = useToggleProductWatch();
  const sku = product?.skus?.[0];
  const currency = getSymbolFromCurrency(sku?.currency);
  const { workspace } = useWorkspace();

  const price = `${currency}${sku.discountAmount || sku.amount}`;
  let priceText = `${price.replace(
    /(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
    "$1,"
  )}${intl.formatMessage({ id: "display_up" })}`;

  if (!product.priceRange?.min && !product.priceRange?.max) {
    priceText = intl.formatMessage({
      id: "display_product_quote",
      defaultMessage: "display_product_quote"
    });
  }

  return (
    <ProductCardBase
      image={product.images?.[0]?.uri}
      title={product.name}
      priceText={priceText}
      onCartClick={
        workspace?.preferences?.product?.isEnableCart === true
          ? () => {
              if (currentUser) addToCart?.(product._id, sku._id);
              else {
                router.push("/auth/login?redirect=/");
              }
            }
          : undefined
      }
      onHeartClick={() => {
        if (currentUser) toggleWatch?.(product._id);
        else {
          router.push("/auth/login?redirect=/");
        }
      }}
      watched={product.isWatched}
    />
  );
};

export default ProductCard;
