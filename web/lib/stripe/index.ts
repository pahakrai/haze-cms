import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>
const getStripe = (publicKey:string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publicKey)
  }
  return stripePromise
}
export default getStripe