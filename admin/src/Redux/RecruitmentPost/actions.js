import { createActions } from 'reduxsauce';

export const {
  Types: RecruitmentPostTypes,
  Creators: RecruitmentPostActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getRecruitmentPosts: ['opts'],
    getRecruitmentPostById: ['id'],
    updateRecruitmentPost: ['formValues'],
    createRecruitmentPost: ['formValues'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'RecruitmentPost/' }
);
