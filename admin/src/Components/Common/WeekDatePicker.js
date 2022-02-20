import React, { useCallback } from 'react'
import moment from 'moment'
import { helpers } from '@golpasal/common'

import TimePicker from './TimePicker'

export const getWeekValues = (date) => {
  const sunday = helpers.getSundayOfYourDay(date)
  const saturday = new Date()
  saturday.setDate(sunday.getDate() + 6)
  return [sunday, saturday]
}
export const WeekDatePicker = ({
  value = getWeekValues(new Date()),
  onChange,
  ...props
}) => {
  const [startDate, endDate] = value
  return (
    <TimePicker
      selected={startDate}
      onChange={useCallback(
        (date) => {
          return onChange(getWeekValues(date))
        },
        [onChange]
      )}
      dayClassName={useCallback(
        (value) => {
          const date = moment(value)
          return date.isBetween(startDate, endDate, 'day', '[]')
            ? 'react-datepicker__day--in-range'
            : ''
        },
        [startDate, endDate]
      )}
      showTimeSelect={false}
      {...props}
    />
  )
}

export default WeekDatePicker
