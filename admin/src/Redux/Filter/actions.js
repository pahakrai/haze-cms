import { createActions } from 'reduxsauce';

export const { Types: FilterTypes, Creators: FilterActions } = createActions(
  {
    reset: null,
    updateFilter: ['field', 'filter'],
    updateFilterField: ['field', 'filterField', 'value']
  },
  { prefix: 'Filter/' }
);
