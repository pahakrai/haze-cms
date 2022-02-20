import { ecommApi } from '../APIs';

const getTagRecommendations = () => ecommApi.get(`tag-recommendations/`);

export default {
  getTagRecommendations
};
