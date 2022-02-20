import React from 'react'
import { Field } from 'redux-form'
import moment from 'moment'
import {
  Input,
  // InputNumber,
  DatePicker
} from 'antd'
import { Row, Col } from 'react-flexa'
import Select from 'react-select'
import { ErrorMessage } from '../../Form/Errors'
// common
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'
// Common
// import DatePicker from '../../Common/TimePicker';
import WeekPicker from '../../Common/WeekPicker'
import Dropdown from '../../Form/Dropdown'
// Form
import FieldContainer from '../../Form/FieldContainer'
import FieldLabel from '../../Form/FieldLabel'
// styled
import styled from 'styled-components'

const { NotificationScheduleType, CalendarEventEveryType } = Common.type

const OffsetDiv = styled.div`
  padding: 10px;
`

const FieldComp = ({
  label,
  placeholder,
  children,
  Comp,
  offset = false,
  ...props
}) => {
  return (
    <FieldContainer>
      <FieldLabel>{label || placeholder}</FieldLabel>
      {Comp && <Comp placeholder={placeholder} {...props} />}
      {!!children && (!offset ? children : <OffsetDiv>{children}</OffsetDiv>)}
    </FieldContainer>
  )
}

const FieldSelect = ({
  label,
  options,
  placeholder,
  disabled,
  onChange,
  value,
  ...props
}) => {
  return (
    <FieldComp
      label={label}
      Comp={Select}
      placeholder={placeholder}
      options={options}
      isDisabled={disabled}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

class NotificationScheduleTime extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.input.value
    }
  }
  static defaultProps = {
    input: {
      value: { type: null },
      onChange: () => true,
      onBlur: () => true
    }
  }
  // get default Daily Freq
  _getDefaultDailyFreq = () => {
    return {}
  }

  // freq: { occurs: opt.value, recurs: { every: { n: 1 } } }
  _getDefaultFreq = () => {
    return {
      everyN: 1,
      ...this._getDefaultDailyFreq
    }
  }

  _onChange = (props) => {
    const {
      input: { value, onChange }
    } = this.props
    if (onChange) onChange({ ...value, ...props })
  }

  _onChangeType = ({ type }) => {
    const {
      input: { onChange }
    } = this.props
    if (onChange)
      onChange(
        type === NotificationScheduleType.RECURRING
          ? {
              type
              // startTime: moment(new Date()).toISOString()
              // freq: this._getDefaultFreq(),
              // dailyFreq: this._getDefaultDailyFreq()
            }
          : { type }
      )
  }

  /* freq: { recurs: { every: { n, day } } } */
  _onFreqRecursEveryValueChange = (props) => {
    if (!props) return false
    const {
      input: {
        value: { freq = {} }
      }
    } = this.props
    this._onChange({
      freq: {
        ...freq,
        recurs: {
          every:
            freq.recurs && freq.recurs.every
              ? {
                  ...freq.recurs.every,
                  ...props
                }
              : { ...props }
        }
      }
    })
  }
  /* freq: { recurs: { every: { days } } } */
  _onFreqRecursEveryDaysChange = (options) => {
    const {
      input: { value: inputValue }
    } = this.props
    let reoccurance = inputValue.reoccurance
    const days =
      options && Array.isArray(options) && options.map((v) => v.value)
    this._onChange({
      reoccurance: {
        ...reoccurance,
        weeklyDays: days
      }
    })
    // this._onFreqRecursEveryValueChange({ days });
  }
  /* freq: { recurs: { every: { n } } } */
  _onFreqRecursEveryNChange = (n) => {
    this._onFreqRecursEveryValueChange({ n })
  }

  // dailyFreq
  _onDailyFreqChange = (props) => {
    if (!props) return false
    const {
      input: {
        value: { dailyFreq = {} }
      }
    } = this.props
    // every
    const every =
      dailyFreq.recurs &&
      dailyFreq.recurs.every &&
      props.recurs &&
      props.recurs.every
        ? { ...dailyFreq.recurs.every, ...props.recurs.every }
        : (dailyFreq.recurs && dailyFreq.recurs.every) ||
          (props.recurs && props.recurs.every)
    const recurs =
      dailyFreq.recurs && props.recurs
        ? { ...dailyFreq.recurs, ...props.recurs }
        : dailyFreq.recurs || props.recurs
    this._onChange({
      dailyFreq: {
        ...dailyFreq,
        // type , occurOnceAt
        ...props,
        // recurs
        recurs: { ...recurs, every }
      }
    })
  }

  /* select */
  _renderSelectPlaceholder = () => {
    const { intl } = this.props
    return intl.formatMessage({ id: 'display_select' })
  }

  _renderOneTime = () => {
    const {
      intl,
      input: { value: inputValue }
    } = this.props
    const { reoccurance } = inputValue
    // Select placeholder
    return (
      <Row>
        <Col md={12} sm={12}>
          <div>
            {intl.formatMessage({
              id: 'display_pushnotificationschedule_occurOnceAt'
            })}
          </div>
          <DatePicker
            showTime
            defaultValue={
              inputValue.startTime
                ? moment(inputValue.startTime)
                : moment(new Date())
            }
            onChange={(time) => {
              this._onChange({
                // default n vaule
                reoccurance: {
                  ...reoccurance
                },
                startTime: time._d.toISOString()
              })
            }}
          />
        </Col>
      </Row>
    )
  }

  // not needed for now
  _renderRecurring = () => {
    const {
      intl,
      disabled,
      input: { value: inputValue }
    } = this.props
    const { reoccurance } = inputValue
    const frequencyOccurs = EcommCommonHelpers.getConstants(
      'type',
      'CalendarEventEveryType',
      intl.locale
    )
      .map((item) => ({
        label: item.text,
        value: item.value
      }))
      .filter((item) => item.value !== 'never')

    const notificationScheduleType = EcommCommonHelpers.getConstants(
      'type',
      'CalendarEventReoccuranceDurationType',
      intl.locale
    ).map((item) => ({
      label: item.text,
      value: item.value
    }))
    const NotificationScheduleReoccuranceEnableType =
      EcommCommonHelpers.getConstants(
        'type',
        'NotificationScheduleReoccuranceEnableType',
        intl.locale
      ).map((item) => ({
        label: item.text,
        value: item.value
      }))
    const DaysPicker =
      reoccurance &&
      reoccurance.everyType &&
      reoccurance.everyType === CalendarEventEveryType.WEEK &&
      WeekPicker
    return (
      <React.Fragment>
        {/* freq */}
        <FieldComp
          offset
          label={intl.formatMessage({
            id: 'display_notificationschedule_freq'
          })}
        >
          <Row>
            <Col md={6} sm={12}>
              <FieldSelect
                label={intl.formatMessage({
                  id: 'display_notificationschedule_redundant'
                })}
                placeholder={this._renderSelectPlaceholder()}
                options={NotificationScheduleReoccuranceEnableType}
                isDisabled={disabled}
                onChange={(opt) => {
                  let value = ''
                  value = opt.value === 1 ? 'day' : 'never'
                  this._onChange({
                    // default n vaule
                    reoccurance: {
                      ...this._getDefaultFreq(),
                      everyType: value
                    }
                  })
                }}
                value={NotificationScheduleReoccuranceEnableType.find(
                  (opt) =>
                    opt.value ===
                    (reoccurance && reoccurance.everyType === 'never' ? 0 : 1)
                )}
              />
            </Col>
          </Row>
          {reoccurance &&
            reoccurance.everyType &&
            reoccurance.everyType !== CalendarEventEveryType.NEVER && (
              <React.Fragment>
                {this._renderOneTime()}
                <br />
                <Row>
                  <Col md={6} sm={12}>
                    <FieldSelect
                      label={intl.formatMessage({
                        id: 'display_notificationschedule_freq_occurs'
                      })}
                      placeholder={this._renderSelectPlaceholder()}
                      options={frequencyOccurs}
                      isDisabled={disabled}
                      onChange={(opt) =>
                        this._onChange({
                          // default n vaule
                          reoccurance: {
                            ...this._getDefaultFreq(),
                            everyType: opt.value
                          }
                        })
                      }
                      value={frequencyOccurs.find(
                        (opt) =>
                          opt.value === (reoccurance && reoccurance.everyType)
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    {/* reoccurance.everyN */}
                    <FieldComp
                      label={intl.formatMessage({
                        id: 'display_notificationschedule_freq_recurs_n'
                      })}
                    >
                      <Input
                        type="number"
                        value={(reoccurance && reoccurance.everyN) || 0}
                        onChange={(e) =>
                          this._onChange({
                            // default everyN vaule
                            reoccurance: {
                              ...reoccurance,
                              everyN: parseInt(e.target.value)
                            }
                          })
                        }
                        // freq.occurs
                        addonAfter={
                          <FieldLabel>
                            {reoccurance && reoccurance.everyN}
                          </FieldLabel>
                        }
                      />
                    </FieldComp>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          {/* freq: { everyType === 'WEEKLY' } */}
          {reoccurance &&
            reoccurance.everyType &&
            reoccurance.everyType === CalendarEventEveryType.WEEK && (
              /* freq: { recurs: { every: { n ,days } } } */
              <React.Fragment>
                <Row>
                  <Col md={6} sm={12}>
                    {/* freq: { recurs: { every: { n ,days } } } */}
                    <FieldComp
                      label={intl.formatMessage({
                        id: 'display_notificationschedule_freq_recurs_days'
                      })}
                    >
                      {DaysPicker && (
                        <DaysPicker
                          isMulti
                          value={(reoccurance && reoccurance.weeklyDays) || []}
                          locale={intl.locale}
                          onChange={this._onFreqRecursEveryDaysChange}
                        />
                      )}
                    </FieldComp>
                  </Col>
                </Row>
                {this._renderError('weeklyDays')}
              </React.Fragment>
            )}
          {/* freq: { everyType === 'MONTHLY' } */}
          {reoccurance &&
            reoccurance.everyType &&
            reoccurance.everyType === CalendarEventEveryType.MONTH && (
              /* freq: { recurs: { every: { n ,days } } } */
              <React.Fragment />
            )}
          {reoccurance &&
            reoccurance.everyType &&
            reoccurance.everyType === CalendarEventEveryType.NEVER && (
              /* freq: { recurs: { every: { n ,days } } } */
              <React.Fragment />
            )}
          {this._renderError('freq')}
        </FieldComp>
        {/* dailyFreq */}
        {reoccurance && reoccurance.everyType !== 'never' && (
          <FieldComp
            offset
            label={intl.formatMessage({
              id: 'display_notificationschedule_dailyFreq'
            })}
          >
            <Row>
              <Col md={6} sm={12}>
                <FieldSelect
                  label={intl.formatMessage({
                    id: 'display_notificationschedule_dailyFreq_type'
                  })}
                  placeholder={this._renderSelectPlaceholder()}
                  options={notificationScheduleType}
                  isDisabled={disabled}
                  onChange={(opt) => {
                    this._onChange({
                      reoccurance: {
                        ...reoccurance,
                        duration: {
                          ...this._getDefaultDailyFreq(),
                          type: opt.value
                        }
                      }
                    })
                  }}
                  value={notificationScheduleType.find(
                    (opt) =>
                      opt.value ===
                      (reoccurance &&
                        reoccurance.duration &&
                        reoccurance.duration.type)
                  )}
                  // value={notificationScheduleType.find(
                  //   opt => opt.value === (dailyFreq && dailyFreq.type)
                  // )}
                />
              </Col>
            </Row>
            {/* dailyFreq.type === repetition */}
            {reoccurance.duration &&
              reoccurance.duration.type &&
              reoccurance.duration.type === 'repetition' && (
                <Row>
                  <Col md={6} sm={12}>
                    <FieldComp
                      label={intl.formatMessage({
                        id: 'display_notificationschedule_freq_recurs_n'
                      })}
                    >
                      <Input
                        type="number"
                        value={
                          (reoccurance.duration &&
                            reoccurance.duration.repetition) ||
                          0
                        }
                        onChange={(e) =>
                          this._onChange({
                            reoccurance: {
                              ...reoccurance,
                              duration: {
                                ...reoccurance.duration,
                                repetition: parseInt(e.target.value)
                              }
                            }
                          })
                        }
                      />
                      {this._renderError('repetition')}
                    </FieldComp>
                  </Col>
                </Row>
              )}
            {reoccurance.duration &&
              reoccurance.duration.type &&
              reoccurance.duration.type === 'until' && (
                <Row>
                  <Col md={6} sm={12}>
                    <FieldComp
                      label={intl.formatMessage({
                        id: 'display_notificationschedule_recurs_endAt'
                      })}
                    >
                      <DatePicker
                        showTime
                        defaultValue={
                          reoccurance && reoccurance.duration.endTime
                            ? moment(reoccurance.duration.endTime)
                            : moment(new Date())
                        }
                        onChange={(time) => {
                          this._onChange({
                            reoccurance: {
                              ...reoccurance,
                              duration: {
                                ...reoccurance.duration,
                                endTime: time._d.toISOString()
                              }
                            }
                          })
                        }}
                      />
                      {/* {this._renderError('endTime')} */}
                    </FieldComp>
                  </Col>
                </Row>
              )}
          </FieldComp>
        )}
      </React.Fragment>
    )
  }
  _renderAtSelectedTime = () => {
    const {
      intl,
      disabled,
      input: { value: inputValue }
    } = this.props
    const { reoccurance } = inputValue
    const frequencyOccurs = EcommCommonHelpers.getConstants(
      'type',
      'NotificationScheduleReoccuranceEnableType',
      intl.locale
    ).map((item) => ({
      label: item.text,
      value: item.value
    }))
    return (
      <React.Fragment>
        {/* freq */}
        <FieldComp
          offset
          label={intl.formatMessage({
            id: 'display_notificationschedule_freq'
          })}
        >
          <Row>
            <Col md={6} sm={12}>
              <FieldSelect
                label={intl.formatMessage({
                  id: 'display_notificationschedule_freq_occurs'
                })}
                placeholder={this._renderSelectPlaceholder()}
                options={frequencyOccurs}
                isDisabled={disabled}
                onChange={(opt) =>
                  this._onChange({
                    // default n vaule
                    reoccurance: {
                      ...this._getDefaultFreq(),
                      everyType: opt.value
                    }
                  })
                }
                value={frequencyOccurs.find(
                  (opt) => opt.value === (reoccurance && reoccurance.everyType)
                )}
              />
            </Col>
          </Row>
        </FieldComp>
      </React.Fragment>
    )
  }
  _recurVaildElement = (value) =>
    // one Error
    value && (React.isValidElement(value) || typeof value === 'string') ? (
      <ErrorMessage>{value}</ErrorMessage>
    ) : (
      // muilt Error
      value && (
        <React.Fragment>
          {Object.keys(value).map((item) =>
            React.isValidElement(value[item]) ? (
              <ErrorMessage key={item}>{value[item]}</ErrorMessage>
            ) : (
              this._recurVaildElement(value[item])
            )
          )}
        </React.Fragment>
      )
    )

  _renderError = (field, render = this._recurVaildElement) => {
    const {
      meta: { touched, error, warning }
    } = this.props
    return (
      touched &&
      ((error && error[field] && render(error[field])) ||
        (warning && warning[field] && (
          <ErrorMessage>{warning[field]}</ErrorMessage>
        )))
    )
  }

  render() {
    const {
      intl,
      input: { value: inputValue }
    } = this.props
    const { type } = inputValue
    const NotificationScheduleStartTimeType = EcommCommonHelpers.getConstants(
      'type',
      'NotificationScheduleStartTimeType',
      intl.locale
    ).map((item) => ({
      label: item.text,
      value: item.value
    }))

    return (
      <React.Fragment>
        <Row>
          <Col md={6} sm={12}>
            <Dropdown
              name="type"
              disabled={
                process.env
                  .REACT_APP_PUSH_NOTIFICATION_SCHEDULE_TO_CONFIGURABLE ===
                'false'
              }
              label={intl.formatMessage({
                id: 'display_notificationschedule_type'
              })}
              // onChange={value => this._onChangeType({ type: value })}
              onChange={(value) =>
                this._onChange({
                  // default n vaule
                  reoccurance: {
                    everyType: 'never'
                  },
                  type: value
                })
              }
              options={NotificationScheduleStartTimeType}
            />
          </Col>
        </Row>
        {this._renderError('type')}
        {/* type OneTime */}
        {/* {this._renderError(notificationTimeOption.value)} */}
        {/* {type === 'immediately' && this._renderOneTime()} */}
        {/* {type === 'atSelectedTime' && this._renderRecurring()} */}
        {/* {type === 'atSelectedTime' && this._renderRecurring()} */}
        {type === 'atSelectedTime' && this._renderOneTime()}
      </React.Fragment>
    )
  }
}

export default (props) => {
  // input { value onChange }
  // onChange
  // onblur
  return <Field component={NotificationScheduleTime} {...props} />
}
