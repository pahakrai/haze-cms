import getCurrencySymbol from 'currency-symbols'
export const getSymbolFromCurrency = (currency = "HKD") => {
 return getCurrencySymbol(currency)
};
