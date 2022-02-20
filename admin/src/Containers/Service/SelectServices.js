import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { hasIn } from 'lodash'
import Common from '@golpasal/common'

import FileMetaImage from '../../Containers/FileMetaImage'
import { ServiceActions } from '../../Redux/Service/actions'
import { getAllService } from '../../Redux/selectors'

import { FieldLabel } from '../../Components/Form/form.styled'
import ContentLoader from '../../Components/Common/ContentLoader'

import Checkbox from './Checkbox'
import NumberPicker from './NumberPicker'

const Container = styled.div`
  font-size: 14px;
`
export const ServiceItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
`
export const LabelWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Label = styled.div`
  color: #999;
`
export const Actions = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 30px;
  align-items: center;
`
export const Price = styled.div`
  color: #000;
  font-size: 0.85em;
  margin-right: 5px;
`

const { ServiceUnit } = Common.unit
const { ServiceType } = Common.type
const defaultValueControl = {
  set: (v) => v,
  get: (v) => v
}

class SelectServices_ extends PureComponent {
  static defaultProps = {
    valueControl: defaultValueControl
  }
  addService = (key) => {
    const { input, valueControl } = this.props
    input.onChange([...(input.value || []), valueControl.set(key, true)])
  }
  updateService = (key, value, prevValue) => {
    const { input, valueControl } = this.props
    const services = [...(input.value || [])]
    const index = services.indexOf(prevValue)
    const newValue = valueControl.set(key, value)
    if (index !== -1) {
      services[index] = {
        ...prevValue,
        ...newValue
      }
    } else {
      services.push(newValue)
    }
    input.onChange(services)
  }
  removeService = (key, service) => {
    const { input, valueControl } = this.props
    const newValue = [...input.value]

    input.onChange(
      newValue.filter((v) => {
        const _key = valueControl.get(v)

        const conditions =
          service && service.conditions ? service.conditions : []

        return (
          _key !== key ||
          (conditions.length ? !conditions.some((c) => c.key === key) : false)
        )
      })
    )
    return newValue
  }
  activeService = (key) => {
    const { input, valueControl } = this.props
    let active = false
    if (hasIn(input, 'value.find')) {
      active = input.value.find((v) => valueControl.get(v) === key)
    }
    return !!active
  }
  serviceConditions = (conditions = []) => {
    const { valueControl, input } = this.props
    const values = [...input.value]

    const state = conditions.every(({ key, comparison, value }) => {
      const item = values.find((v) => valueControl.get(v) === key)
      if (item) {
        if (comparison === 'eq') {
          return value === item.value
        }
      }
      return false
    })
    return state
  }
  render() {
    const {
      intl,
      input,
      // meta: { touched, error, warning },
      services,
      disabled,
      label,
      displayMode = false,
      whiteListMode = false,
      whiteList = [],
      loading,
      valueControl
    } = this.props
    const { addService, removeService, activeService, updateService } = this
    return (
      <Container>
        {label && <FieldLabel style={{ marginBottom: 20 }}>{label}</FieldLabel>}
        {loading && <Loading />}
        {(services || []).map((service, index) => {
          const key = service._id
          if (!this.serviceConditions(service.conditions)) {
            return null
          }
          if (whiteListMode && !(whiteList || []).includes(key)) {
            return null
          }
          let price = hasIn(service, `pricings[0].pricing.amount`)
            ? service.pricings[0].pricing.amount
            : null
          price = hasIn(service, `pricing.pricing.amount`)
            ? service.pricing.pricing.amount
            : price
          const displayPrice = price !== null && price !== undefined
          const name = hasIn(service, `name.${intl.locale}`)
            ? service.name[intl.locale]
            : ''
          const uom = hasIn(service, `uom.display[${intl.locale}]`)
            ? service.uom.display[intl.locale]
            : ''
          const active = activeService(key)

          const currentData = (input.value || []).find(
            (v) => valueControl.get(v) === key
          )

          return (
            <ServiceItem key={index}>
              <LabelWrapper>
                <div>
                  <FileMetaImage
                    fileMetaId={service.icon}
                    style={{ width: 22, marginRight: 3 }}
                  />
                </div>
                <Label>{name}</Label>
              </LabelWrapper>
              {!displayMode && (
                <Actions>
                  {displayPrice && <Price>${price}</Price>}
                  {ServiceUnit.BOOLEAN === service.unit && (
                    <Checkbox
                      active={active}
                      disabled={disabled}
                      onChange={(newActive) => {
                        newActive
                          ? addService(key)
                          : removeService(key, service)
                      }}
                    />
                  )}
                  {'number' === service.unit && (
                    <NumberPicker
                      min={service.unitMeta && service.unitMeta.min}
                      max={service.unitMeta && service.unitMeta.max}
                      interval={service.unitMeta && service.unitMeta.interval}
                      defaultValue={
                        (currentData && currentData.value) ||
                        service.unitMeta.default ||
                        0
                      }
                      disabled={disabled}
                      onChange={(count) => {
                        const min = service.unitMeta.min
                        if (count >= min) {
                          updateService(key, count, currentData)
                        } else {
                          removeService(key, service)
                        }
                      }}
                    />
                  )}
                  {uom ? <span style={{ marginLeft: 5 }}>{uom}</span> : ''}
                </Actions>
              )}
            </ServiceItem>
          )
        })}
      </Container>
    )
  }
}

class SelectServiceDataContainerComponent extends PureComponent {
  componentDidMount() {
    const { getAllService, vehicleType, query = {} } = this.props
    getAllService({
      type: ServiceType.PREFERENCE,
      isActive: true,
      vehicleType,
      populates: [vehicleType ? 'pricing' : 'pricings'],
      ...query
    })
  }
  render() {
    const { children, services } = this.props
    return children({ services })
  }
}

export const SelectServiceDataContainer = connect(
  (state) => {
    return { services: getAllService(state) }
  },
  (dispatch) =>
    bindActionCreators(
      { getAllService: ServiceActions.getAllService },
      dispatch
    )
)(SelectServiceDataContainerComponent)

const Loading = () => (
  <ContentLoader
    width="100%"
    height={90}
    speed={1.5}
    primaryColor="#f3f3f3"
    secondaryColor="#ececec"
  >
    <rect x="0" y="0" rx="0.25" ry="0.25" width="100%" height="30" />
    <rect x="0" y="45" rx="0.25" ry="0.25" width="100%" height="30" />
  </ContentLoader>
)
export default (props) => {
  return <Field {...props} component={SelectServices_} />
}
