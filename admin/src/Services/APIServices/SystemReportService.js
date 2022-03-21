import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getSystemReports = (opts) => {
  return hazeApi.get('/system-reports?' + serialize(opts))
}

const getReportsWorkspaceAllowToAccess = (opts) => {
  return hazeApi.get(
    '/system-reports/getReportsWorkspaceAllowToAccess?' + serialize(opts)
  )
}

const getSystemReportById = (id) => {
  return hazeApi.get('/system-reports/' + id)
}

const createSystemReport = (formValues) => {
  return hazeApi.post(`/system-reports`, formValues)
}

const updateSystemReport = (formValues) => {
  return hazeApi.put(`/system-reports/` + formValues._id, formValues)
}

const getSystemReportByParameter = async (url, parameters) => {
  return hazeApi.get(url + `?` + serialize(parameters))
}

const getSystemReportByName = async (reportName, format, parameters) => {
  return hazeApi.get(
    `/system-reports/export` + reportName,
    format + `?` + serialize(parameters)
  )
}

export default {
  self: hazeApi,
  createSystemReport,
  getSystemReportById,
  getSystemReports,
  updateSystemReport,
  getSystemReportByParameter,
  getSystemReportByName,
  getReportsWorkspaceAllowToAccess
}
