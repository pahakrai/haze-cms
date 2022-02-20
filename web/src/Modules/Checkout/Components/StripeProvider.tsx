import { Elements } from "@stripe/react-stripe-js";
import getStripe from "~/lib/stripe";
interface StripeProviderProps {
  publicKey: string;
  children?: React.ReactNode;
}
export const StripeProvider = ({
  publicKey,
  children
}: StripeProviderProps) => {
  return <Elements stripe={getStripe(publicKey)}>{children}</Elements>;
};
