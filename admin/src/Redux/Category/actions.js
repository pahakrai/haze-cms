import { createActions } from 'reduxsauce';

export const {
  Types: CategoryTypes,
  Creators: CategoryActions
} = createActions(
  {
    getCategories: ['query'],
    getAllCategoriesWithChildren: null,
    createCategory: ['formValues', 'files'],
    updateCategory: ['id', 'category', 'files'],
    deleteCategory: ['id'],
    getAllCategory: ['query', 'refresh'],
    getCategoryById: ['id'],
    getAllDistrict: null,
    // reducers
    setResults: ['results'],
    setCategoriesWithChildrenResult: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    deleteResultId: ['id'],
    setSearchTerm: ['searchTerm'],
    setExpanded: ['category', 'isExpanded'],
    mergeAllResults: ['allResults'],
    setAllDistrict: ['allDistrict'],
    setAllResults: ['allResults'],
    resetExpanded: null,
    reset: null
  },
  { prefix: 'Category/' }
);
