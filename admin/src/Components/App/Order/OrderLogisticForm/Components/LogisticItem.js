import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'react-flexa'

import Dropdown from '../../../../Form/Dropdown'
import TextInput from '../../../../Form/TextInput'

import LogisticItemFooter from './LogisticItemFooter'

const FormContent = {
  padding: '20px 30px 15px',
  margin: '0 0 15px',
  backgroundColor: '#fff',
  borderRadius: '5px'
}

class _LogisticItem extends PureComponent {
  domdrugstart(sort, e) {
    e.dataTransfer.setData('sort', sort)
  }
  dragenter(e) {
    const node = document.getElementsByClassName('drag-box')
    for (let i = 0; i < node.length; i++) {
      node[i].className += ' stop-drag'
    }
    e.target.style.border = '2px dashed #008dff'
    e.target.style.boxShadow = '0 0 8px rgba(30, 144, 255, 0.8)'
  }
  dragend() {
    const node = document.getElementsByClassName('drag-box')
    for (let i = 0; i < node.length; i++) {
      node[i].className = 'drag-box'
    }
  }
  dragleave(e) {
    e.target.style.border = '0px'
    e.target.style.boxShadow = '0 0 0 0 #fff'
  }
  drop = (dropedSort, i, e) => {
    const {
      input: { value: items = [], onChange }
    } = this.props
    e.preventDefault()
    const sort = e.dataTransfer.getData('sort')
    e.target.style.border = '0px'
    e.target.style.boxShadow = '0 0 0 0 #fff'
    let copyItems = JSON.parse(JSON.stringify(items))
    copyItems[parseInt(i)] = {
      ...copyItems[parseInt(i)],
      choices: this.alterItem(copyItems[parseInt(i)].choices, sort, dropedSort)
    }
    onChange(copyItems)
  }
  allowDrop = (e) => {
    e.preventDefault()
  }
  alterItem(arr, index1, index2) {
    let copyArr = JSON.parse(JSON.stringify(arr))
    copyArr[index1] = copyArr.splice(index2, 1, arr[index1])[0]
    copyArr.forEach(
      (item, i) => (item.key = String.fromCharCode(64 + parseInt(i + 1)))
    )

    return copyArr
  }

  render() {
    const {
      input: { value: items = [], name, onChange },
      intl,
      unitOfMeasures
    } = this.props

    const unitLengthOptions = []
    const unitWeightOptions = []
    if (unitOfMeasures) {
      unitOfMeasures
        .filter((v) => v.type === 'Length')
        .forEach((unit) => {
          unitLengthOptions.push({
            label:
              unit && unit.display && unit.display[intl.locale]
                ? unit.display[intl.locale]
                : '',
            value: unit.code
          })
        })
      unitOfMeasures
        .filter((v) => v.type === 'Weight')
        .forEach((unit) => {
          unitWeightOptions.push({
            label:
              unit && unit.display && unit.display[intl.locale]
                ? unit.display[intl.locale]
                : '',
            value: unit.code
          })
        })
    }
    const statusHiddle = false
    return (
      <div>
        {Array.isArray(items)
          ? items.map((item, i) => {
              return (
                <div style={{ ...FormContent, marginTop: 0 }} key={i}>
                  <Row>
                    <Col xs={12} sm={6} md={6} lg={3}>
                      <TextInput
                        type="number"
                        name={`${name}[${i}].qty`}
                        label={intl.formatMessage({
                          id: 'display_qty'
                        })}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                      <Dropdown
                        name={`${name}[${i}].qUnit`}
                        label={intl.formatMessage({
                          id: 'display_unit'
                        })}
                        options={unitWeightOptions}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                      <TextInput
                        type="number"
                        name={`${name}[${i}].qty2`}
                        label={intl.formatMessage({
                          id: 'display_qty2'
                        })}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                      <Dropdown
                        name={`${name}[${i}].qUnit2`}
                        label={intl.formatMessage({
                          id: 'display_unit2'
                        })}
                        options={unitWeightOptions}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6} md={6} lg={3}>
                      <TextInput
                        type="number"
                        name={`${name}[${i}].dimensions.length`}
                        label={intl.formatMessage({
                          id: 'display_vehicle_capacity_length'
                        })}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                      <TextInput
                        type="number"
                        name={`${name}[${i}].dimensions.width`}
                        label={intl.formatMessage({
                          id: 'display_vehicle_capacity_width'
                        })}
                      />
                    </Col>

                    <Col xs={12} sm={6} md={6} lg={3}>
                      <TextInput
                        type="number"
                        name={`${name}[${i}].dimensions.height`}
                        label={intl.formatMessage({
                          id: 'display_vehicle_capacity_height'
                        })}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                      <Dropdown
                        name={`${name}[${i}].dimensions.unit`}
                        label={intl.formatMessage({
                          id: 'display_unit'
                        })}
                        options={unitLengthOptions}
                        maxMenuHeight={150}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <TextInput
                        intl={intl}
                        type="number"
                        name={`${name}[${i}].weight`}
                        label={intl.formatMessage({
                          id: 'display_weight'
                        })}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <Dropdown
                        name={`${name}[${i}].weightUnit`}
                        label={intl.formatMessage({
                          id: 'display_unit'
                        })}
                        options={unitWeightOptions}
                        maxMenuHeight={150}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <TextInput
                        intl={intl}
                        type="number"
                        name={`${name}[${i}].weight2`}
                        label={intl.formatMessage({
                          id: 'display_weight2'
                        })}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <Dropdown
                        name={`${name}[${i}].weight2Unit`}
                        label={intl.formatMessage({
                          id: 'display_unit2'
                        })}
                        options={unitWeightOptions}
                        maxMenuHeight={150}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <TextInput
                        disabled
                        type="number"
                        name={`${name}[${i}].cbm`}
                        label={intl.formatMessage({
                          id: 'display_cbm'
                        })}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <TextInput
                        disabled
                        type="number"
                        name={`${name}[${i}].rt`}
                        label={intl.formatMessage({
                          id: 'display_rt'
                        })}
                      />
                    </Col>
                  </Row>
                  {statusHiddle && (
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <TextInput
                        type="number"
                        name={`${name}[${i}].status`}
                        label={intl.formatMessage({
                          id: 'status'
                        })}
                      />
                    </Col>
                  )}
                  <LogisticItemFooter
                    items={items}
                    item={item}
                    i={i}
                    onChange={onChange}
                  />
                </div>
              )
            })
          : null}
      </div>
    )
  }
}

export default (props) => {
  return <Field component={_LogisticItem} {...props} />
}
