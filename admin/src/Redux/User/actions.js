import { createActions } from 'reduxsauce';

export const { Types: UserTypes, Creators: UserActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getUserProfile: ['id'],
    updateUserProfile: ['data'],
    findUserById: ['_id', 'opts'],
    getUsers: ['opts', 'userType'],
    searchUsers: ['q', 'query'],
    searchUserList: ['q', 'query'],
    getUserType: null,
    getUserGroups: ['search', 'isActive'],
    updateUser: ['userForm', 'files'],
    createUser: ['userForm', 'files'],
    inviteUsers: ['contactsForm', 'userType'],
    sendVerifyPassCode: ['data'],
    changeUserStatus: ['value', 'body'],
    // updateUserProfile: ['data'],
    deleteUser: ['id'],
    updateUserAvatar: ['userId', 'avatar', 'userType'],
    addReason: ['userId', 'value'],
    updateReason: ['userId', 'value'],
    /* ------------- Reducers ------------- */
    setResults: ['results'],
    mergeResults: ['results'],
    mergeAllResults: ['_ids'],
    setSearchResults: ['results'],
    setSearchListResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setUserType: ['userType'],
    setSearchFilters: ['searchFilters'],
    setUserGroups: ['userGroups']
  },
  { prefix: 'User/' }
);
