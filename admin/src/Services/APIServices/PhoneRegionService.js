import { ecommApi } from '../APIs';

const getAllPhoneRegions = async () => ecommApi.get('phone-regions/all');

export default { getAllPhoneRegions };
