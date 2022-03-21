import { hazeApi } from '../APIs'

const getAllPhoneRegions = async () => hazeApi.get('phone-regions/all')

export default { getAllPhoneRegions }
