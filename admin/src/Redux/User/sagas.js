import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  all,
  put,
  takeLatest,
  call,
  takeEvery,
  select,
  takeLeading
} from 'redux-saga/effects'
import { toast } from '../../Lib/Toast'

import { UserTypes, UserActions } from './actions'
import { entities as Schemas } from '../../Services/Schemas'
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form'
import { normalize } from 'normalizr'

import Form from '../../Constants/Form'

import AccountService from '../../Services/APIServices/AccountService'

import { handleResponse } from '../utils/saga'
import { ErrorActions } from '../Error/actions'
import { LoadingActions } from '../Loading/actions'
import { RegionActions } from '../Region/actions'
import ResourceActions from '../Resources/actions'

import { handlePaginate } from '../utils/saga'
import { getErrorFromResponse } from '../utils/saga'
import { appendQueryWorkspace } from '../utils'

const DEFAULT_QUERY = {
  sort: '-createdAt'
}
export let getUsers = handlePaginate('user', {
  call: function* (api, { opts: { q }, userType }, paginate) {
    const { offset = 0, limit } = paginate
    yield put(LoadingActions.setLoading('userList', true))
    const state = yield select((state) => state)
    // query parse
    const apiQuery = {
      ...appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        localize: true,
        userTypes: userType ? [userType] : undefined,
        ...DEFAULT_QUERY,
        ...q
      })
    }
    if (apiQuery.workspace) {
      apiQuery.workspaceId = apiQuery.workspace
      delete apiQuery.workspace
    }

    return yield call(api.getUsers, apiQuery, userType)
  },
  onSuccess: function* (data, paginate) {
    yield put(LoadingActions.setLoading('userList', false))
    const { entities, result } = yield normalize(data, [Schemas.userSchema])
    yield put(ResourceActions.addEntities(entities))
    if (paginate.append) {
      yield put(UserActions.mergeResults(result))
    } else {
      yield put(UserActions.setResults(result))
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetUsersErrors(data))
    yield put(LoadingActions.setLoading('userList', false))
  }
})

export function* searchUsers(api, { q, query }) {
  yield put(LoadingActions.setLoading('searchUsers', true))
  const response = yield call(api.searchUsers, {
    q,
    query: { offset: 0, limit: 10, ...query, paginate: true }
  })

  function* onSuccess(reqResult) {
    const data = (reqResult && reqResult.docs) || []
    const { entities, result } = yield normalize(data, [Schemas.userSchema])
    yield put(ResourceActions.addEntities(entities))
    yield put(UserActions.setSearchResults(result))
    yield put(UserActions.mergeAllResults(result))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setSearchUsersErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
  yield put(LoadingActions.setLoading('searchUsers', false))
}
export function* searchUserList(api, { q, query }) {
  yield put(LoadingActions.setLoading('searchUserList', true))
  const response = yield call(api.searchUsers, { q, query })
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.userSchema])
    yield put(ResourceActions.addEntities(entities))
    yield put(UserActions.setSearchListResults(result))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setSearchUsersErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
  yield put(LoadingActions.setLoading('searchUserList', false))
}

export function* getUserType(api) {
  const response = yield call(api.getUserType)
  function* onSuccess(data) {
    yield put(UserActions.setUserType(data))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUserTypeErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* getUserGroups(api, { search, isActive }) {
  const response = yield call(api.getUserGroups, { search, isActive })
  function* onSuccess(data) {
    yield put(UserActions.setUserGroups(data))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUserGroupsErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* updateUser(api, { userForm }) {
  yield put(startSubmit(Form.USER_UPDATE))
  const response = yield call(api.updateUser, userForm)
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.USER_UPDATE))
    yield put(ResourceActions.updateUser(data))
    yield put(stopSubmit(Form.USER_UPDATE))
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.USER_UPDATE))
    yield put(stopSubmit(Form.USER, getErrorFromResponse(Form.USER, response)))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* createUser(api, { userForm }) {
  yield put(startSubmit(Form.USER_CREATE))
  let response
  try {
    response = yield call(AccountService.signUp, userForm)
  } catch (e) {}
  function* onSuccess(data) {
    yield put(UserActions.setSelected(data._id))
    yield put(UserActions.setCreated(data._id))
    const { entities } = yield normalize([data], [Schemas.userSchema])
    yield put(ResourceActions.addEntities(entities))
    yield put(setSubmitSucceeded(Form.USER_CREATE))
    yield put(stopSubmit(Form.USER_CREATE))
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.USER_CREATE))
    yield put(
      stopSubmit(
        Form.USER_CREATE,
        getErrorFromResponse(Form.USER_CREATE, response)
      )
    )
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* deleteUser(api, { id }) {
  const response = yield call(api.deleteUser, id)
  function* onSuccess(data) {
    yield put(UserActions.getUsers())
    yield put(UserActions.setDeleted(id))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeleteUserErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* findUserById(api, { _id }) {
  const state = yield select((state) => state)
  const response = yield call(api.findUserById, _id, {
    ...appendQueryWorkspace(state, {})
  })
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.userSchema])
    yield put(ResourceActions.addEntities(entities))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUserErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* updateUserProfile(api, { data }) {
  yield put(LoadingActions.setLoading('updateUserProfile', true))
  const { user, member } = data || {}
  // toast
  const formatUploadProgress = (messsage) => {
    const toastId = toast.info(
      <span>
        {messsage}
        {'  '}
        <FormattedMessage id="uploading" />
        ...0%
      </span>,
      { autoClose: false }
    )
    return {
      toastId,
      onUploadProgress: ({ loaded, total }) => {
        const progress = (loaded / total) * 100
        toast.update(toastId, {
          render: (
            <span>
              {messsage}
              {'  '}
              <FormattedMessage id="uploading" />
              ...{progress.toFixed(2)}%
            </span>
          )
        })
      }
    }
  }
  // Update user avatar
  // if (userFiles && userFiles[0]) {
  //   const response = yield call(
  //     api.updateUserAvatar,
  //     user._id,
  //     userFiles,
  //     onUploadProgress('User Avatar')
  //   );
  //   if (response && response.ok) {
  //     toast.update(toastId, {
  //       render: 'User Avatar Upload Successfully',
  //       type: toast.TYPE.SUCCESS,  autoClose: 1500
  //     });
  //   } else {
  //     toast.update(toastId, {
  //       render: `User Avatar Upload failed`,
  //       type: toast.TYPE.ERROR,  autoClose: 1500
  //     });
  //   }
  // }

  yield put(startSubmit(Form.USER_UPDATE))

  // get member preferences locations region
  if (member && member.preferences && member.preferences.locations) {
    yield put(RegionActions.getRegionById(member.preferences.locations[0]))
  }

  // Update other data
  const response = yield call(api.updateUserProfile, {
    user,
    member
  })
  if (response && response.ok) {
    toast.success(<FormattedMessage id="updated_successfully" />)
  } else {
    toast.error(<FormattedMessage id="updated_failure" />)
  }
  yield put(UserActions.getUserProfile(user._id))
  yield put(LoadingActions.setLoading('updateUserProfile', false))
  yield put(stopSubmit(Form.USER_UPDATE))
}

export function* updateUserAvatar(api, { userId, avatar, userType }) {
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  )
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100
    toast.update(toastId, {
      render: (
        <span>
          <FormattedMessage id="uploading" />
          ...{progress.toFixed(2)}%
        </span>
      )
    })
  }

  // Update user avatar
  if (avatar && avatar._id) {
    const response = yield call(
      api.updateUser,
      {
        _id: userId,
        avatars: [{ fileMetaId: avatar._id }]
      },
      onUploadProgress
    )
    if (response && response.ok) {
      toast.update(toastId, {
        render: <FormattedMessage id="updated_successfully" />,
        type: toast.TYPE.SUCCESS,
        autoClose: 1500
      })
      const { entities } = yield normalize(
        [response.data],
        [Schemas.userSchema]
      )
      yield put(ResourceActions.addEntities(entities))
    } else {
      toast.update(toastId, {
        render: <FormattedMessage id="updated_failure" />,
        type: toast.TYPE.ERROR,
        autoClose: 1500
      })
    }
  } else {
    const response = yield call(
      api.updateUserAvatar,
      userId,
      [avatar],
      userType,
      onUploadProgress('User Avatar')
    )
    if (response && response.ok) {
      toast.update(toastId, {
        render: <FormattedMessage id="updated_successfully" />,
        type: toast.TYPE.SUCCESS,
        autoClose: 1500
      })
      const { entities } = yield normalize(
        [response.data],
        [Schemas.userSchema]
      )
      yield put(ResourceActions.addEntities(entities))
    } else {
      toast.update(toastId, {
        render: <FormattedMessage id="updated_failure" />,
        type: toast.TYPE.ERROR,
        autoClose: 1500
      })
    }
  }
}

export function* addReason(api, { userId, value }) {
  const response = yield call(api.addReason, { userId, value })
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.USER_CREATE_REASON))
    const result = yield call(api.getUserProfile, userId)
    yield put(ResourceActions.updateUser(result.data.user))
    yield put(stopSubmit(Form.USER_CREATE_REASON))
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.USER_CREATE_REASON))
    yield put(
      stopSubmit(
        Form.USER_CREATE_REASON,
        getErrorFromResponse(Form.USER_CREATE_REASON, response)
      )
    )
  }
  yield handleResponse(response)(onSuccess, onFailed)
}
export function* updateReason(api, { userId, value }) {
  const response = yield call(api.updateReason, { userId, value })
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.USER_UPDATE_REASON))
    yield put(ResourceActions.updateUser(data))
    yield put(stopSubmit(Form.USER_UPDATE_REASON))
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.USER_UPDATE_REASON))
    yield put(
      stopSubmit(
        Form.USER_UPDATE_REASON,
        getErrorFromResponse(Form.USER_UPDATE_REASON, response)
      )
    )
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* getUserProfile(api, { id }) {
  yield put(ErrorActions.setGetUserErrors(undefined))
  const response = yield call(api.getUserProfile, id)
  function* onSuccess(data) {
    const { driver, vehicle, user, merchant, member } = data

    const { entities: userEntities } = yield normalize(
      [user],
      [Schemas.userSchema]
    )
    const { entities: driverEntities } = yield normalize(
      [driver],
      [Schemas.driverSchema]
    )
    const { entities: vehicleEntities } = yield normalize(
      [vehicle],
      [Schemas.vehicleSchema]
    )
    const { entities: merchantEntities } = yield normalize(
      [merchant],
      [Schemas.merchantSchema]
    )
    const { entities: memberEntities } = yield normalize(
      [member],
      [Schemas.memberSchema]
    )
    yield put(
      ResourceActions.addEntities({
        ...userEntities,
        ...driverEntities,
        ...vehicleEntities,
        ...memberEntities,
        ...merchantEntities
      })
    )
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUserErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* sendVerifyPassCode(api, { data }) {
  yield call(api.sendVerifyPassCode, { data })
  function* onSuccess() {
    yield put(setSubmitSucceeded(Form.SEND_VERIFY_PASS_CODE))
    // yield put(ResourceActions.updateUser(data));
    yield put(stopSubmit(Form.SEND_VERIFY_PASS_CODE))
  }

  // function* onFailed(data) {
  //   yield put(setSubmitFailed(Form.SEND_VERIFY_PASS_CODE));
  //   yield put(
  //     stopSubmit(
  //       Form.SEND_VERIFY_PASS_CODE,
  //       getErrorFromResponse(Form.SEND_VERIFY_PASS_CODE, response)
  //     )
  //   );
  // }
  yield onSuccess()
}
export function* changeUserStatus(api, { value, body }) {
  const response = yield call(api.changeUserStatus, { value, body })
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.CHANGE_USER_STATUS))
    yield put(ResourceActions.updateUser(data))
    yield put(stopSubmit(Form.CHANGE_USER_STATUS))
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.CHANGE_USER_STATUS))
    yield put(
      stopSubmit(
        Form.CHANGE_USER_STATUS,
        getErrorFromResponse(Form.CHANGE_USER_STATUS, response)
      )
    )
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* inviteUsers(api, { contactsForm, userType }) {
  yield put(startSubmit(Form.USER_INVITE))
  let response
  try {
    response = yield call(AccountService.inviteUsers, contactsForm, userType)
  } catch (e) {}
  function* onSuccess(data) {
    // TODO: check whey yield all is blocking
    // yield all(
    //   data.map(d => {
    //     put(UserActions.setSelected(d._id));
    //     put(UserActions.setCreated(d._id));
    //     const { entities } = normalize([d], [Schemas.userSchema]);
    //     put(ResourceActions.addEntities(entities));
    //   })
    // );
    yield put(setSubmitSucceeded(Form.USER_INVITE))
    yield put(stopSubmit(Form.USER_INVITE))
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.USER_INVITE))
    yield put(
      stopSubmit(
        Form.USER_INVITE,
        getErrorFromResponse(Form.USER_INVITE, response)
      )
    )
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export default function* roots(api) {
  yield all([
    // findUserById
    takeEvery(UserTypes.FIND_USER_BY_ID, findUserById, api),
    takeEvery(UserTypes.GET_USERS, getUsers, api),
    takeLeading(UserTypes.UPDATE_USER, updateUser, api),
    takeLeading(UserTypes.DELETE_USER, deleteUser, api),
    takeLeading(UserTypes.CREATE_USER, createUser, api),
    takeLeading(UserTypes.INVITE_USERS, inviteUsers, api),
    takeLatest(UserTypes.GET_USER_TYPE, getUserType, api),
    takeLatest(UserTypes.GET_USER_GROUPS, getUserGroups, api),
    takeLatest(UserTypes.SEARCH_USERS, searchUsers, api),
    takeLatest(UserTypes.SEARCH_USER_LIST, searchUserList, api),
    takeLeading(UserTypes.UPDATE_USER_PROFILE, updateUserProfile, api),
    takeLeading(UserTypes.UPDATE_USER_AVATAR, updateUserAvatar, api),
    takeLeading(UserTypes.ADD_REASON, addReason, api),
    takeLeading(UserTypes.UPDATE_REASON, updateReason, api),
    takeLeading(UserTypes.GET_USER_PROFILE, getUserProfile, api),
    takeLeading(UserTypes.SEND_VERIFY_PASS_CODE, sendVerifyPassCode, api),
    takeLeading(UserTypes.CHANGE_USER_STATUS, changeUserStatus, api)
  ])
}
