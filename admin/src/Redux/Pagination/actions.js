import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    // GENERIC
    resetGroup: ['field'],
    setFetching: ['field', 'isFetching'],
    setRefreshing: ['field', 'isRefreshing'],
    setIsEnd: ['field', 'isEnd'],
    setLimit: ['field', 'limit'],
    addLimitToOffset: ['field'],
    addToOffset: ['field', 'offset'],
    setGroup: ['field', 'data'],
    reset: null,
    resetSuggestionsPagination: null
  },
  { prefix: '_PAGINATION_' }
);

export const PaginationTypes = Types;
export default Creators;
