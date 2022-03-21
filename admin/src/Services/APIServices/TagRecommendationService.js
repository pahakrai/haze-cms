import { hazeApi } from '../APIs'

const getTagRecommendations = () => hazeApi.get(`tag-recommendations/`)

export default {
  getTagRecommendations
}
