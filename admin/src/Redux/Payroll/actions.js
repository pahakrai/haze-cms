import { createActions } from 'reduxsauce';

export const { Types: PayrollTypes, Creators: PayrollActions } = createActions(
  {
    getPayeeUserType: [],
    getPayrolls: ['opts'],
    getPayrollById: ['id'],
    createPayroll: ['formValues'],
    updatePayrollById: ['formValues'],
    changePayrollStatus: ['formValues'],
    approvePayroll: ['id', 'status'],
    calculateAmount: ['formValues'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm'],
    setPayeeUserType: ['userType'],
    setSummary: ['summary']
  },
  { prefix: 'PayrollTypes/' }
);
