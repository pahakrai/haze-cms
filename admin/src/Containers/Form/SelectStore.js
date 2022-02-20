import React, { useEffect, useState, useCallback } from 'react'
import Common from '@golpasal/common'
import moment from 'moment'
import { useIntl } from 'react-intl'

import Dropdown from '../../Components/Form/Dropdown'
import StoreService from '../../Services/APIServices/StoreService'

const { StoreStatus } = Common.status

export const SelectStore = ({ query, ...props }) => {
  const { options } = useOptions(query)

  const isOptionDisabled = useCallback((v) => {
    return [StoreStatus.DEPRECATED, StoreStatus.INACTIVE].includes(
      v.store && v.store.status
    )
  }, [])

  return (
    <Dropdown
      options={options}
      isOptionDisabled={isOptionDisabled}
      {...props}
    />
  )
}

const useOptions = (query) => {
  const [options, setOptions] = useState([])
  const intl = useIntl()

  useEffect(() => {
    const request = async () => {
      const result = await StoreService.getStores({
        populates: ['address'],
        ...query
      })
      if (result && result.data && result.data.length) {
        const data = result.data
          .map((v) => {
            return {
              value: v._id,
              label: formatOptionLabel(v, intl),
              store: v
            }
          })
          .sort((a, b) => (a.store?.idx || 0) - (b.store?.idx || 0))
        setOptions(data)
      }
    }
    request()
    // eslint-disable-next-line
  }, [query, intl.locale])

  return { options }
}

export const formatOptionLabel = (store, intl) => {
  const address = store.address || {}
  const label = [
    address.name,
    address.address1,
    address.address2,
    store?.deprecatedDate
      ? `(${intl.formatMessage(
          { id: 'display_no_longer_provide_service_after' },
          {
            date: moment(store.deprecatedDate || '').format('YYYY/MM/DD')
          }
        )})`
      : null
  ]
    .filter((v) => v)
    .join(' ')

  return label
}

export default SelectStore
