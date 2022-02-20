import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import Common from '@golpasal/common'
import { formatUserName } from '../../../Lib/util'
import styled from 'styled-components'
import Dropdown from '../../Common/Dropdown'
import Button from '../../Common/Button'
import TextInputCommon from '../../Common/TextInput'
import { serialize } from '../../../Services/APIServices/ServiceUtils'
import downloadFile from '../../../Lib/common/downloadFile'
import { DatePicker } from 'antd'
import Title from '../../Common/H5'

import { SelectUser } from './SelectUser'
const { UserType } = Common.type
const { UserStatus } = Common.status

const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`

class SystemReportList extends React.PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  }
  static defaultProps = {
    resourceTypes: [],
    onItemClick: () => true,
    isNextPageLoading: false,
    isEnd: true,
    onLoadMore: () => true,
    header: true
  }

  constructor(props) {
    super(props)
    this.state = {
      report: '',
      workspace: null,
      customer: null,
      employee: null,
      vehicleType: null,
      peopleInCharge: null,
      displayValue: null,
      startDateTo: moment(new Date()).format('YYYY-MM-DD'),
      startDateFrom: moment(new Date()).format('YYYY-MM-DD')
    }
  }

  onReportClick = async () => {
    const {
      report,
      workspace,
      customer,
      employee,
      vehicleType,
      startDateTo,
      startDateFrom,
      peopleInCharge
    } = this.state
    const { currentWorkspace } = this.props
    const parameters: any = {}
    const parameCode = report && report[0] && report[0].parameters
    parameCode.forEach((value, index) => {
      if (parameCode[index].code === 'workspace' && workspace) {
        parameters.workspace = currentWorkspace && currentWorkspace._id
      }

      if (parameCode[index].code === 'vehicleType' && vehicleType) {
        parameters.vehicleType = vehicleType
      }
      if (parameCode[index].code === 'peopleInCharge' && peopleInCharge) {
        parameters.peopleInCharge = peopleInCharge
      }
      if (parameCode[index].code === 'startDateTo' && startDateTo) {
        parameters.startDateTo = startDateTo
      }
      if (parameCode[index].code === 'startDateFrom' && startDateFrom) {
        parameters.startDateFrom = startDateFrom
      }
      if (parameCode[index].code === 'customer' && customer) {
        parameters.customer = customer
      }
      if (parameCode[index].code === 'employee' && employee) {
        parameters.employee = employee
      }
      parameters.utcOffset = moment().utcOffset()
    })

    downloadFile(
      process.env.REACT_APP_API_URL +
        '/system-reports/export/' +
        report[0].reportName +
        '/' +
        report[0].format +
        '?' +
        serialize(parameters)
    )
  }

  render() {
    const {
      intl,
      systemReports,
      // workspaces,
      customers,
      employees,
      currentWorkspace,
      // currentUserType,
      // currentUserWorkspace,
      vehicleTypes
    } = this.props
    const { workspace, displayValue } = this.state
    // let workspaceIds = workspaces.reduce((wsIds, workspace) => {
    //   wsIds.push({ label: workspace.name[intl.locale], value: workspace._id });
    //   return wsIds;
    // }, []);

    let customerIds
    customerIds = customers.reduce((ctIds, customer) => {
      ctIds.push({ label: customer.name[intl.locale], value: customer._id })
      return ctIds
    }, [])

    if (workspace) {
      const customerValues = customers.filter(
        (c) => c.workspace._id === workspace
      )
      customerIds = customerValues.reduce((ctIds, customer) => {
        ctIds.push({ label: customer.name[intl.locale], value: customer._id })
        return ctIds
      }, [])
    }
    let employeeIds
    employeeIds = employees.reduce((elIds, employee) => {
      elIds.push({ label: employee.name, value: employee._id })
      return elIds
    }, [])

    if (workspace) {
      const employeeValues = employees.filter((c) => c.workspace === workspace)
      employeeIds = employeeValues.reduce((elIds, employee) => {
        elIds.push({ label: employee.name, value: employee._id })
        return elIds
      }, [])
    }

    const VehicleTypesOption = []
    if (vehicleTypes) {
      vehicleTypes.forEach((type, i) => {
        VehicleTypesOption.push({
          label: type.name ? type.name[intl.locale] : '',
          value: type._id
        })
      })
    }
    const reportNameOption = []
    systemReports.forEach((key, value) => {
      reportNameOption.push({
        label: key.name[intl.locale],
        value: key._id
      })
    })
    let reportParameter = []
    let parameters = []
    let children = []
    const { report, employee, customer, vehicleType } = this.state
    parameters = report[0] && report[0].parameters
    const paramsValue = []
    //  const dateFormat = 'YYYY/MM/DD';
    if (parameters) {
      parameters.forEach((parm, index) => {
        const item = (paramsValue[index] = { ...parm, Conp: null })
        switch (item.dataType) {
          case 'number':
            switch (item.code) {
              case '':
                item.value = null
                item.Conp = TextInputCommon
                break
              default:
                break
            }
            break
          case 'string':
            switch (item.code) {
              case 'workspace':
                this.setState({
                  workspace: currentWorkspace && currentWorkspace._id
                })
                // if (currentUserType === Common.type.UserType.PROVIDER) {
                //   item.value = workspaceIds;
                //   item.Conp = (
                //     <Dropdown
                //       label={item.name[intl.locale]}
                //       options={workspaceIds}
                //       customValue
                //       value={workspace}
                //       onChange={value => {
                //         this.setState({
                //           workspace: value
                //         });
                //       }}
                //     />
                //   );
                // }
                // if (currentUserType === Common.type.UserType.USER) {
                //   item.value = currentUserWorkspace;
                // }

                break
              case 'customer':
                item.value = customerIds
                item.Conp = (
                  <Dropdown
                    customValue
                    value={customer}
                    intl={intl}
                    label={item.name[intl.locale]}
                    options={customerIds}
                    onChange={(value) => {
                      this.setState({
                        customer: value
                      })
                    }}
                  />
                )
                break
              case 'employee':
                item.value = employeeIds
                item.Conp = (
                  <Dropdown
                    customValue
                    value={employee}
                    label={item.name[intl.locale]}
                    options={employeeIds}
                    onChange={(value) => {
                      this.setState({
                        employee: value
                      })
                    }}
                  />
                )
                break
              case 'vehicleType':
                item.value = VehicleTypesOption
                item.Conp = (
                  <Dropdown
                    label={item.name[intl.locale]}
                    customValue
                    value={vehicleType}
                    options={VehicleTypesOption}
                    onChange={(value) => {
                      this.setState({
                        vehicleType: value
                      })
                    }}
                  />
                )
                break
              case 'peopleInCharge':
                item.Conp = (
                  <div>
                    <SelectUser
                      containerStyle={{ width: '100%' }}
                      label={intl.formatMessage({ id: 'display_staff' })}
                      query={{
                        userTypes: [UserType.USER],
                        statuses: [UserStatus.ACTIVE]
                      }}
                      _onChange={(value, option) => {
                        this.setState({
                          displayValue: value ? option.label : '',
                          peopleInCharge: value ? value : ''
                        })
                      }}
                      displayValue={displayValue}
                      formatOption={(user) =>
                        `${
                          formatUserName(user) ? `${formatUserName(user)} ` : ''
                        }${(user && user.phone) || ''}`
                      }
                    />
                  </div>
                )
                break
              default:
                break
            }
            break

          case 'date':
            switch (item.code) {
              case 'startDateFrom':
                item.value = moment(new Date()).format('YYYY-MM-DD')
                item.Conp = (
                  <div>
                    <FilterLabel>{item.name[intl.locale]}</FilterLabel>
                    <DatePicker
                      defaultValue={moment(item.value)}
                      onChange={(value) => {
                        this.setState({
                          startDateFrom: value
                            ? moment(value).format('YYYY-MM-DD')
                            : null
                        })
                      }}
                    />
                  </div>
                )
                break
              case 'startDateTo':
                item.value = moment(new Date()).format('YYYY-MM-DD')
                item.Conp = (
                  <div>
                    <FilterLabel>{item.name[intl.locale]}</FilterLabel>
                    <DatePicker
                      defaultValue={moment(item.value)}
                      onChange={(value) => {
                        this.setState({
                          startDateTo: value
                            ? moment(value).format('YYYY-MM-DD')
                            : null
                        })
                      }}
                    />
                  </div>
                )
                break
              default:
                break
            }
            break
          default:
            break
        }
        children.push(item.Conp)
      })
    }
    return (
      <div>
        <Dropdown
          label={intl.formatMessage({ id: 'display_reportName' })}
          options={reportNameOption}
          intl={intl}
          placeholder={intl.formatMessage({ id: 'display_select' })}
          onChange={(item) => {
            reportParameter = systemReports.filter(
              (re) => re._id === item.value
            )
            this.setState({
              report: reportParameter,
              customer: '',
              employee: '',
              vehicleType: '',
              workspace: '',
              peopleInCharge: ''
            })
          }}
        />
        {children}
        <Button.Left topMargin>
          <Button.Primary
            type="submit"
            onClick={this.onReportClick}
            disabled={!report}
          >
            {intl.formatMessage({ id: 'display_report' })}
          </Button.Primary>
        </Button.Left>
      </div>
    )
  }
}

export default reduxForm({
  // validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(SystemReportList)
