import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getCurrencies = (query) => hazeApi.get(`currencies?` + serialize(query))
const createCurrency = (currency) => hazeApi.post('currencies', currency)
const updateCurrency = (currency) =>
  hazeApi.put('currencies/' + currency._id, currency)

export default {
  getCurrencies,
  createCurrency,
  updateCurrency
}
