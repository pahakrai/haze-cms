import { helpers } from '@golpasal/common'

import { hazeApi } from '../../Services/APIs'
import { appWorkspace, appWorkspaceSecret } from '../../Lib/util'

export const appendSecureQuery = (url) => {
  let query = {}
  const safeKeyManager = hazeApi.safeKeyManager

  if (appWorkspace && appWorkspaceSecret) {
    const apiHeader = helpers.getAPIHeader(appWorkspace, appWorkspaceSecret)
    query['workspace'] = apiHeader.workspace
    query['timestamp'] = apiHeader.timestamp
    query['safe-key'] = apiHeader['safe-key']
  } else if (safeKeyManager.has()) {
    const apiHeader = safeKeyManager.get()
    query['workspace'] = apiHeader.workspace
    query['timestamp'] = apiHeader.timestamp
    query['safe-key'] = apiHeader['safe-key']
  }
  query = Object.keys(query)
    .map((v) => {
      return `${v}=${query[v]}`
    })
    .join('&&')
  let updatedUrl = (url || '').replace(/[/?]+$/, '')
  if (/[./][^.]+\?.*/.test(updatedUrl)) {
    updatedUrl += '&&' + query
  } else {
    updatedUrl += '?' + query
  }

  return updatedUrl
}

export default (url) => {
  const formatUrl = url || ''
  const filename = formatUrl
    .substring(formatUrl.lastIndexOf('/') + 1)
    .replace(/\?.+/, '')
  const element = document.createElement('a')

  element.setAttribute('target', '_blank')
  element.setAttribute('href', appendSecureQuery(url))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
