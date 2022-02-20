import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getSystemReports = opts => {
  return ecommApi.get('/system-reports?' + serialize(opts));
};

const getReportsWorkspaceAllowToAccess = opts => {
  return ecommApi.get(
    '/system-reports/getReportsWorkspaceAllowToAccess?' + serialize(opts)
  );
};

const getSystemReportById = id => {
  return ecommApi.get('/system-reports/' + id);
};

const createSystemReport = formValues => {
  return ecommApi.post(`/system-reports`, formValues);
};

const updateSystemReport = formValues => {
  return ecommApi.put(`/system-reports/` + formValues._id, formValues);
};

const getSystemReportByParameter = async (url, parameters) => {
  return ecommApi.get(url + `?` + serialize(parameters));
};

const getSystemReportByName = async (reportName, format, parameters) => {
  return ecommApi.get(
    `/system-reports/export` + reportName,
    format + `?` + serialize(parameters)
  );
};

export default {
  self: ecommApi,
  createSystemReport,
  getSystemReportById,
  getSystemReports,
  updateSystemReport,
  getSystemReportByParameter,
  getSystemReportByName,
  getReportsWorkspaceAllowToAccess
};
