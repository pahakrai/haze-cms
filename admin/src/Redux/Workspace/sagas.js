import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form'
import Common from '@golpasal/common'

import { toast } from '../../Lib/Toast'
import { entities as Schemas } from '../../Services/Schemas'
import { normalize } from 'normalizr'
import { handleResponse, handlePaginate } from '../utils/saga'
import { ErrorActions } from '../Error/actions'
import ResourceActions from '../Resources/actions'
import { LoadingActions } from '../Loading/actions'
import { getErrorFromResponse } from '../utils/saga'
import Form from '../../Constants/Form'

import { WorkspaceActions, WorkspaceTypes } from './actions'

const { WorkspaceStatus } = Common.status

export let getWorkspaces = handlePaginate('workspaces', {
  call: function* (
    api,
    { opts: filterValues = { filterValues: {} } },
    paginate
  ) {
    const { offset = 0, limit } = paginate
    return yield call(api.getWorkspaces, {
      q: filterValues.searchTerm || '',
      offset,
      limit,
      localize: true,
      paginate: true,
      sort: '-createdAt',
      populates: [
        '$setting.logo',
        '$setting.favicon',
        '$setting.headerLogo',
        '$setting.loginBackgroundImage',
        '$setting.theme'
      ],
      ...filterValues.filterValues
    })
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspaceSchema
    ])
    yield put(ResourceActions.addEntities(entities))
    if (paginate.append) {
      yield put(WorkspaceActions.mergeResults(result))
    } else {
      yield put(WorkspaceActions.setResults(result))
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetWorkspacesErrors(data))
  }
})

export function* getWorkspaceById(api, { id }) {
  yield put(LoadingActions.setLoading('getWorkspaceById', true))
  const response = yield call(api.getWorkspaceById, id, {
    populates: [
      '$setting.logo',
      '$setting.favicon',
      '$setting.headerLogo',
      '$setting.loginBackgroundImage',
      '$setting.theme'
    ]
  })
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.workspaceSchema)
    yield put(ResourceActions.addEntities(entities))
    yield put(LoadingActions.setLoading('getWorkspaceById', false))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspacesErrors(data))
    yield put(LoadingActions.setLoading('getWorkspaceById', false))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* getWorkspaceByCode(api, { code }) {
  yield put(LoadingActions.setLoading('getWorkspaceByCode', true))
  const response = yield call(api.getWorkspaceByCode, code)
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.workspaceSchema)
    yield put(ResourceActions.addEntities(entities))
    yield put(LoadingActions.setLoading('getWorkspaceByCode', false))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspacesErrors(data))
    yield put(LoadingActions.setLoading('getWorkspaceByCode', false))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* createWorkspace(api, { workspace, files }) {
  const toastId = toast.info('Create workspace...0%', { autoClose: false })
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    })
  }
  yield put(startSubmit(Form.WORKSPACE_CREATE))
  const response = yield call(
    api.createWorkspace,
    workspace,
    files,
    onUploadProgress
  )

  function* onSuccess(data) {
    toast.update(toastId, {
      render: 'Create workspace successfully',
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    })
    const { entities } = yield normalize([data], [Schemas.workspaceSchema])
    yield put(ResourceActions.addEntities(entities))
    yield put(WorkspaceActions.setCreated(data._id))
    yield put(WorkspaceActions.setSelected(data._id))
    yield put(setSubmitSucceeded(Form.WORKSPACE_CREATE))
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.WORKSPACE_CREATE))
    yield put(
      stopSubmit(Form.WORKSPACE_CREATE, getErrorFromResponse(null, data))
    )
  }

  yield handleResponse(response)(onSuccess, onFailed)
}

export function* updateWorkspace(api, { workspace, files }) {
  yield put(startSubmit(Form.WORKSPACE_UPDATE))
  const response = yield call(api.updateWorkspace, workspace, files)
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.WORKSPACE_UPDATE))
    yield put(stopSubmit(Form.WORKSPACE_UPDATE))
    yield put(WorkspaceActions.getWorkspaces())
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.WORKSPACE_UPDATE))
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* toggleActive(api, { id, active }) {
  const response = yield call(api.toggleActive, id, active)
  function* onSuccess(data) {
    toast.success(
      `Change ${data.code} status to ${
        data.status === WorkspaceStatus.ACTIVE ? 'ACTIVE' : 'INACTIVE'
      }`
    )
    const { entities } = yield normalize([data], [Schemas.workspaceSchema])
    yield put(ResourceActions.addEntities(entities))
    yield put(WorkspaceActions.getWorkspaces())
  }
  function onFailed(data, response) {
    toast.error(`Change status failed with error code ${response.status}`)
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* createWorkspaceContact(api, { workspaceId, contact }) {
  const formName = Form.WORKSPACE_CREATE_CONTACT
  yield put(startSubmit(formName))
  const response = yield call(api.createWorkspaceContact, workspaceId, contact)

  function* onSuccess(data) {
    const { entities } = yield normalize(
      [data],
      [Schemas.workspaceContactSchema]
    )
    yield put(ResourceActions.addEntities(entities))
    yield put(setSubmitSucceeded(formName))
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(formName))
    yield put(stopSubmit(formName, getErrorFromResponse(null, data)))
  }

  yield handleResponse(response)(onSuccess, onFailed)
}

export function* updateWorkspaceContact(api, { workspaceId, contact }) {
  const formName = Form.WORKSPACE_UPDATE_CONTACT
  yield put(startSubmit(formName))
  const response = yield call(api.updateWorkspaceContact, workspaceId, contact)

  function* onSuccess(data) {
    const { entities } = yield normalize(
      [data],
      [Schemas.workspaceContactSchema]
    )
    yield put(ResourceActions.addEntities(entities))
    yield put(setSubmitSucceeded(formName))
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(formName))
    yield put(stopSubmit(formName, getErrorFromResponse(null, data)))
  }

  yield handleResponse(response)(onSuccess, onFailed)
}

export function* deleteWorkspaceContact(api, { workspaceId, contactId }) {
  const response = yield call(
    api.deleteWorkspaceContact,
    workspaceId,
    contactId
  )
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.workspaceSchema])
    yield put(ResourceActions.addEntities(entities))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeleteWorkspaceContactErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* getWorkspaceContactId(api, { workspaceId, contactId }) {
  yield put(LoadingActions.setLoading('getWorkspaceContactId', true))
  const response = yield call(api.getWorkspaceContactId, workspaceId, contactId)
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.workspaceContactSchema)
    yield put(ResourceActions.addEntities(entities))
    yield put(LoadingActions.setLoading('getWorkspaceContactId', false))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspacesErrors(data))
    yield put(LoadingActions.setLoading('getWorkspaceContactId', false))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* updateWorkspaceContactIsPrimary(
  api,
  { workspaceId, contactId, isPrimary }
) {
  const response = yield call(
    api.updateWorkspaceContactIsPrimary,
    workspaceId,
    contactId,
    isPrimary
  )
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.workspaceSchema])
    yield put(ResourceActions.addEntities(entities))
  }
  function onFailed(data, response) {
    toast.error(`Change status failed with error code ${response.status}`)
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* currentWorkspace(api, { code }) {
  yield put(LoadingActions.setLoading('currentWorkspace', true))
  const response = yield call(api.currentWorkspace, code)
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.workspaceSchema)
    yield put(ResourceActions.addEntities(entities))
    yield put(LoadingActions.setLoading('currentWorkspace', false))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspacesErrors(data))
    yield put(LoadingActions.setLoading('currentWorkspace', false))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export function* getAllWorkspace(api, { query, refresh }) {
  const response = yield call(api.getAllWorkspace, query)
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspaceSchema
    ])
    yield put(WorkspaceActions.setAllResults(result))

    yield put(ResourceActions.addEntities(entities))
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceErrors(data))
  }
  yield handleResponse(response)(onSuccess, onFailed)
}

export default function* roots(api) {
  yield all([
    takeLatest(WorkspaceTypes.GET_WORKSPACES, getWorkspaces, api),
    takeEvery(WorkspaceTypes.GET_WORKSPACE_BY_ID, getWorkspaceById, api),
    takeLatest(WorkspaceTypes.GET_WORKSPACE_BY_CODE, getWorkspaceByCode, api),
    takeLatest(WorkspaceTypes.CREATE_WORKSPACE, createWorkspace, api),
    takeLatest(WorkspaceTypes.UPDATE_WORKSPACE, updateWorkspace, api),
    takeLatest(WorkspaceTypes.TOGGLE_ACTIVE, toggleActive, api),
    takeEvery(
      WorkspaceTypes.GET_WORKSPACE_CONTACT_ID,
      getWorkspaceContactId,
      api
    ),
    takeLatest(
      WorkspaceTypes.DELETE_WORKSPACE_CONTACT,
      deleteWorkspaceContact,
      api
    ),

    takeLatest(
      WorkspaceTypes.CREATE_WORKSPACE_CONTACT,
      createWorkspaceContact,
      api
    ),
    takeLatest(
      WorkspaceTypes.UPDATE_WORKSPACE_CONTACT,
      updateWorkspaceContact,
      api
    ),

    takeLatest(
      WorkspaceTypes.UPDATE_WORKSPACE_CONTACT_IS_PRIMARY,
      updateWorkspaceContactIsPrimary,
      api
    ),
    takeLatest(WorkspaceTypes.TOGGLE_ACTIVE, toggleActive, api),
    takeLatest(WorkspaceTypes.CURRENT_WORKSPACE, currentWorkspace, api),
    takeLatest(WorkspaceTypes.GET_ALL_WORKSPACE, getAllWorkspace, api)
  ])
}
