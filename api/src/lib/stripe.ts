import _Stripe from 'stripe';

class StripeChargeModel {
  /**
   * Amount intended to be collected by this payment.
   * A positive integer representing how much to charge
   * in the smallest currency unit
   * (https://stripe.com/docs/currencies#zero-decimal)
   * (e.g.
   *   100 cents to charge $1.00
   *    or 100 to charge ¥100, a zero-decimal currency).
   *
   * The minimum amount is $0.50 US or [equivalent in charge currency]
   * (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts).
   * The amount value supports up to eight digits
   * (e.g., a value of 99999999 for a USD charge of $999,999.99).
   */
  amount: number;

  /**
   * Whether to immediately capture the charge.
   * Defaults to `true`. When `false`, the charge issues an authorization,
   * and will need to be
   *    [captured](https://stripe.com/docs/api#capture_charge) later.
   * Uncaptured charges expire in _seven days_.
   * For more information, see the
   *    [authorizing charges and settling later] documentation.
   */
  capture: boolean;

  /**
   * Three-letter [ISO currency code], in lowercase.
   * Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * The ID of an existing customer that will be charged in this request.
   */
  customer?: string;

  /**
   * A payment source to be charged.
   * This can be the ID of a [card](https://stripe.com/docs/api#cards),
   * a [bank account](https://stripe.com/docs/api#bank_accounts),
   * a [source](https://stripe.com/docs/api#sources),
   * a [token](https://stripe.com/docs/api#tokens),
   *
   * For certain sources---namely,
   * [cards](https://stripe.com/docs/api#cards),
   * [bank accounts](https://stripe.com/docs/api#bank_accounts),
   * and attached [sources](https://stripe.com/docs/api#sources)
   * ---you must also pass the ID of the associated customer.
   */
  source: string;

  /**
   * An arbitrary string which you can attach to a `Charge` object.
   * It is displayed when in the web interface alongside the charge.
   * Note that if you use Stripe to send automatic email receipts to your customers,
   * your receipt emails will include the `description` of the charge(s) that they are describing.
   */
  description?: string;
}

export class Stripe {
  private _stripe: _Stripe;

  /**
   * private constructor
   * only accessable through getInstance()
   * to implement singleton pattern
   */
  constructor(key) {
    this._stripe = new _Stripe(key || '', {
      apiVersion: '2020-08-27'
    });
  }

  /**
   * add new customer with his/her email addr
   *
   * @param email customer's email address
   */
  public async addCustomer(email: string) {
    return this._stripe.customers.create({email});
  }

  /**
   * add new card to customer
   *
   * @param customerId customer id
   * @param sourceId new source id (card that registered to stripe)
   * @param isDefault is default payment method
   */
  public async addCustomerSource(
    customerId: string,
    sourceId: string,
    isDefault = false
  ) {
    const newSource = await this._stripe.customers.createSource(customerId, {
      source: sourceId
    });

    // update to default if isDefault = true
    if (isDefault) {
      await this.setCustomerDefaultSource(customerId, sourceId);
    }

    return newSource;
  }

  /**
   * charge customer
   *
   * @param charge charge model
   */
  public async charge(charge: StripeChargeModel) {
    return this._stripe.charges.create(charge);
  }

  /**
   * convert charge amount to stripe format (* 100 and no decimal place)
   *
   * @param charge original charge amount
   */
  public convertCharge(charge: number) {
    return Math.floor(charge * 100);
  }

  /**
   * update customer's default payment method (e.g. diff credit card)
   *
   * @param customerId customer stripe id
   * @param sourceId source (e.g. credit card) id in stripe
   */
  public async setCustomerDefaultSource(customerId: string, sourceId: string) {
    return this._stripe.customers.update(customerId, {
      default_source: sourceId
    });
  }
}
