import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { reset } from 'redux-form'
import { formValueSelector } from 'redux-form'
import Common from '@golpasal/common'

import FormName from '../../Constants/Form'

import Loading from '../../Components/Common/Loading'
import ReportForm from '../../Components/App/SystemReport/ReportForm'
import { SystemReportActions } from '../../Redux/SystemReport/actions'
import { WorkspaceActions } from '../../Redux/Workspace/actions'
import { getSystemReportById, getAllWorkspace } from '../../Redux/selectors'

class ReportContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  }

  componentDidMount() {
    const { fetchReport, fetchReportById, reportId, fetchWorkspaces } =
      this.props
    if (reportId) {
      fetchReportById(reportId)
    }
    fetchReport({
      query: { refresh: true }
    })
    fetchWorkspaces({ status: Common.status.WorkspaceStatus.ACTIVE }, true)
  }
  onSubmit(report) {
    const { updateReport } = this.props

    updateReport(report)
  }

  onSubmitSuccess() {
    const { onSubmitSuccess, history, fetchReport } = this.props
    fetchReport({
      query: { refresh: true }
    })
    onSubmitSuccess()
    history.push('/reports')
  }

  onSubmitFail() {}

  render() {
    let isLoading = true
    const {
      updateMode,
      locale,
      intl,
      report,
      formValueWorkspaceTypes,
      formValueWorkspaces,
      workspaces
    } = this.props
    if (report) {
      isLoading = false
    }
    if (!updateMode) {
      isLoading = false
    }
    const { REPORT_CREATE, REPORT_UPDATE } = FormName
    return isLoading ? (
      <Loading />
    ) : (
      <ReportForm
        locale={locale}
        intl={intl}
        form={updateMode ? REPORT_UPDATE : REPORT_CREATE}
        initialValues={updateMode ? report : {}}
        formValueWorkspaceTypes={formValueWorkspaceTypes}
        formValueWorkspaces={formValueWorkspaces}
        workspaces={workspaces}
        updateMode={updateMode}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = !!ownProps.reportId
  const { REPORT_UPDATE, REPORT_CREATE } = FormName
  const form = updateMode ? REPORT_UPDATE : REPORT_CREATE
  const _formValueSelector = formValueSelector(form)
  return {
    locale: state.intl.locale,
    updateMode: ownProps.reportId !== undefined,
    report: getSystemReportById(state, ownProps.reportId),
    formValueWorkspaceTypes: _formValueSelector(state, 'workspaceTypes'),
    formValueWorkspaces: _formValueSelector(state, 'workspaces'),
    workspaces: getAllWorkspace(state)
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateReport: SystemReportActions.updateSystemReport,
      fetchReport: SystemReportActions.getSystemReports,
      fetchReportById: SystemReportActions.getSystemReportById,
      fetchWorkspaces: WorkspaceActions.getAllWorkspace,
      reset: reset
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReportContainer)
)
