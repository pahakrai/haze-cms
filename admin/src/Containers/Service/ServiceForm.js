import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { reset, formValueSelector, change as formValueChange } from 'redux-form'
import Common from '@golpasal/common'
import { isMultiLanguageVehicleType } from '../../Lib/util'
import FormName from '../../Constants/Form'
import { sycnMTField } from '../../Components/Form/MultiLanguageTextInput'
import { hasIn } from 'lodash'

import Loading from '../../Components/Common/Loading'
import ServiceForm from '../../Components/App/Service/ServiceForm'

import { ServiceTypeActions } from '../../Redux/ServiceType/actions'
import { ServiceActions } from '../../Redux/Service/actions'
import { getServiceById } from '../../Redux/selectors'
import { getCurrentWorkspace } from '../../Redux/Account/selectors'
import {
  getCategoryById,
  getServiceTypesByWorkspaceType
} from '../../Redux/selectors'

class ServicemContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  }

  componentDidMount() {
    const { fetchServiceById, serviceId, getServiceTypesByWorkspaceType } =
      this.props
    if (serviceId) {
      fetchServiceById(serviceId)
    }
    getServiceTypesByWorkspaceType()
  }

  componentDidUpdate(prevProps) {
    const { formValueUnit, form, formValueChange, updateMode } = this.props
    if (prevProps.formValueUnit !== formValueUnit && !updateMode) {
      if (formValueUnit === Common.unit.ServiceUnit.BOOLEAN) {
        formValueChange(form, 'unitMeta', { default: true })
      }
      if (formValueUnit === Common.unit.ServiceUnit.NUMBER) {
        formValueChange(form, 'unitMeta', { default: 0 })
      }
    }
  }

  imageFormValueFormat(paramValues, newImages = []) {
    if (!hasIn(paramValues, `length`) || !paramValues.length) {
      return null
    }
    const values = [...paramValues]
    const newValues = []
    values.forEach((image) => {
      const hasFildMeta = hasIn(image, 'fileMeta') && image.fileMeta
      const fileMeta = hasFildMeta ? image.fileMeta : ''

      if (hasFildMeta && typeof fileMeta === 'string') {
        newValues.push(fileMeta)
      } else if (hasFildMeta && fileMeta._id) {
        newValues.push(fileMeta._id)
      } else {
        newImages.push(image)
      }
    })

    return newValues ? newValues[0] : null
  }

  onSubmit(_service) {
    const { updateMode, service, formValueCategoryCode } = this.props
    let formatService = Object.assign({}, _service)
    const { createService, updateService } = this.props

    if (!isMultiLanguageVehicleType) {
      sycnMTField(_service, 'name', isMultiLanguageVehicleType)
      sycnMTField(_service, 'description', isMultiLanguageVehicleType)
    }
    if (!formValueCategoryCode) {
      return
    } else {
      formatService._category = formValueCategoryCode
    }
    const newImages = []
    // imageFormValueFormat
    formatService.icon = this.imageFormValueFormat(
      formatService.icon,
      newImages
    )

    // format number
    if (
      formatService.unitMeta &&
      formatService.unit === Common.unit.ServiceUnit.NUMBER
    ) {
      formatService.unitMeta = { ...formatService.unitMeta }
      formatService.unitMeta.min = Number(formatService.unitMeta.min)
      formatService.unitMeta.max = Number(formatService.unitMeta.max)
      formatService.unitMeta.interval = Number(formatService.unitMeta.interval)
      formatService.unitMeta.default = Number(formatService.unitMeta.default)
    }

    if (formatService._id && updateMode) {
      updateService(service._id, formatService, newImages)
    } else {
      if (formatService.unit === Common.unit.ServiceUnit.BOOLEAN) {
        formatService.unitMeta = {
          default: formatService.unitMeta.default
        }
      }
      if (formatService.unit === Common.unit.ServiceUnit.UNQUANTIFIABLE) {
        formatService.unitMeta = {
          max: formatService.unitMeta.max,
          min: formatService.unitMeta.min
        }
      }
      formatService.isConfigurable = true
      formatService.isMatchCriteria = true
      formatService.isActive = true
      formatService.idx = 1
      createService(formatService, newImages)
    }
  }

  onSubmitSuccess() {
    const { onSubmitSuccess, history } = this.props

    onSubmitSuccess()
    history.push('/service')
  }

  onSubmitFail() {}

  render() {
    let isLoading = true
    const {
      updateMode,
      locale,
      intl,
      service,
      currentWorkspace,
      formValueUnit,
      formValueType,
      form
    } = this.props

    if (service) {
      isLoading = false
    }
    if (!updateMode) {
      isLoading = false
    }
    return isLoading ? (
      <Loading />
    ) : (
      <ServiceForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={
          updateMode
            ? {
                ...service,
                _category:
                  service.category && service.category._id
                    ? service.category._id
                    : '',
                icon: service.icon ? [{ fileMeta: service.icon }] : null
              }
            : {
                isActive: true
              }
        }
        updateMode={updateMode}
        formValueUnit={formValueUnit}
        formValueType={formValueType}
        currentWorkspace={currentWorkspace}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = ownProps.serviceId !== undefined
  const { SERVICE_CREATE, SERVICE_UPDATE } = FormName
  const form = updateMode ? SERVICE_UPDATE : SERVICE_CREATE
  const selector = formValueSelector(form)
  const formCategory = getCategoryById(state, selector(state, '_category'))

  return {
    locale: state.intl.locale,
    updateMode,
    serviceType: getServiceTypesByWorkspaceType(state),
    service: getServiceById(state, ownProps.serviceId),
    currentWorkspace: getCurrentWorkspace(state),
    formValueUnit: selector(state, 'unit'),
    formValueType: selector(state, 'type'),
    formValueCategoryCode:
      formCategory && formCategory.code ? formCategory.code : undefined,
    form
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateService: ServiceActions.updateService,
      createService: ServiceActions.createService,
      fetchServiceById: ServiceActions.getServiceById,
      getServiceTypesByWorkspaceType:
        ServiceTypeActions.getServiceTypesByWorkspaceType,
      reset: reset,
      formValueChange
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServicemContainer)
)
