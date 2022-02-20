import { createActions } from 'reduxsauce';

export const { Types: ParamTypes, Creators: ParamActions } = createActions(
  {
    getEdmTemplates: null,
    getParamAvatar: null,
    getParamMobileNavigation: null,
    getPreferenceLanguage: null,
    setResult: ['result'],
    setNavigationsResult: ['navigationsResult'],
    setEdmTemplates: ['edmTemplates'],
    setLanguages: ['languages'],
    setDefaultAvatar: ['defaultAvatar']
  },
  { prefix: 'Param/' }
);
