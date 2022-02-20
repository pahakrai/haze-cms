import getSymbolFromCurrency from 'currency-symbol-map'
import Common, { helpers } from '@golpasal/common'

const defaultPriceType = {
  FIXED: 'fixed',
  QTY: 'qty',
  QUOTE: 'quote',
  ON_DEMAND: 'on-demand',
  BY_METER: 'by-meter',
  FREE_RIDE: 'free-ride'
}

const PriceType = Common.type.PriceType || defaultPriceType
/**
 * return
 *  style1 : totalAmount | base
 *  style2 : PriceType
 */
export const getChargeAmountByPriceType = (
  intl,
  charge,
  amoutField = 'totalAmount',
  prefix = true,
  formatAmout = (chargeAmount) => chargeAmount
) => {
  const defaultPrice = '---'
  // if charge null , direct return
  if (!charge) return defaultPrice
  // handle currency
  const _$ = getSymbolFromCurrency(charge.currency)
  // by basePriceType return
  switch (charge.basePriceType) {
    case PriceType.QUOTE:
    case PriceType.ON_DEMAND:
    case PriceType.BY_METER:
    case PriceType.FREE_RIDE:
      return helpers.getConstantByValue(
        'type',
        'PriceType',
        charge.basePriceType,
        helpers.getLocale(intl.locale)
      ).text
    case PriceType.FIXED:
    case PriceType.QTY:
    default:
      return `${prefix ? _$ : ''}${
        formatAmout(charge[amoutField] || 0) || defaultPrice
      }`
  }
}

/**
 * return
 *  style1 : totalAmount + tips $tipNumber + quotation
 *  style2 : PriceType + tips $tipNumber + quotation
 */
export const generateOrderPriceByPriceType = (intl, charge) => {
  const defaultPrice = '---'
  // if charge null , direct return
  if (!charge) return defaultPrice
  // handle currency
  const _$ = getSymbolFromCurrency(charge.currency)
  // handle tips
  const tipString = ` + ${intl.formatMessage({
    id: 'display_order_tips'
  })} ${_$}${charge.tips || 0}`
  // handle hasQuotation
  const quoteString = charge.hasQuotation
    ? ` + ${intl.formatMessage({ id: 'display_order_quote' })}`
    : ''
  // by basePriceType return
  return `${getChargeAmountByPriceType(intl, charge)}${tipString}${quoteString}`
}
