import React, { useState, useEffect } from 'react'
import Common from '@golpasal/common'
import { hasIn, debounce } from 'lodash'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

import { toast } from '../Lib/Toast'

const { UserType } = Common.type

// ENV Test
export const isTestEnv = process.env.REACT_APP_ENV === 'testing'

// ENV Production
export const isProductionEnv = process.env.REACT_APP_ENV === 'production'

// ENV Development
export const isDevelopmentEnv = process.env.REACT_APP_ENV === 'development'

// ENV Workspace
export const appWorkspace = process.env.REACT_APP_WORKSPACE
export const appWorkspaceSecret = process.env.REACT_APP_WORKSPACE_SECRET

// ENV Login user type
export const appLoginUserTypes = process.env.REACT_APP_LOGIN_USERTYPES || ''
export const appAllowloginUserTypes = appLoginUserTypes.split(',').map(
  (key) =>
    ({
      Provider: UserType.PROVIDER,
      User: UserType.USER,
      Member: UserType.MEMBER,
      SystemAdmin: UserType.SYSTEM_ADMIN
    }[key])
)

export const strIsNumber = (v) =>
  /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|(\d))$/.test(
    v + ''
  )

export const isEmpty = (v) => v === undefined || v === null || v === ''

/**
 *  is use Multi language
 */
export const isMultiLanguage = process.env.REACT_APP_MULTI_LANGUAGE === 'true'

/**
 *  is use Multi language (Post[title, content, snippets])
 */
export const isMultiLanguagePost = isMultiLanguage

/**
 *  is use Multi language (Page[title, content])
 */
export const isMultiLanguagePage = isMultiLanguage
/**
 *  is use Multi language (Category[name])
 */
export const isMultiLanguageCategory = isMultiLanguage
/**
 *  is use Multi language (Region[name])
 */
export const isMultiLanguageRegion = isMultiLanguage
/**
 *  is use Multi language (VehicleType[name ,description])
 */
export const isMultiLanguageVehicleType = isMultiLanguage

/**
 *  is use Multi language (VehicleMake[name, description])
 */
export const isMultiLanguageVehicleMake = isMultiLanguage

/**
 *  is use Multi language (VehicleModel[name, description])
 */
export const isMultiLanguageVehicleModel = isMultiLanguage

/**
 *  is use Multi language (Product[name, description])
 */
export const isMultiLanguageProduct = isMultiLanguage
/**
 *  is use Multi language (Survey[name, description])
 */
export const isMultiLanguageSurvey = isMultiLanguage

/**
 *  is use Multi language (Workspace[name, description])
 */
export const isMultiLanguageWorkspace = isMultiLanguage

/**
 *  is use Multi language (Workspace[name, description])
 */
export const isMultiLanguageService = isMultiLanguage

/**
 *  is use Multi language (UserLevel[name])
 */
export const isMultiLanguageUserLevel = isMultiLanguage

/**
 *  is use Multi language (Courier[name])
 */
export const isMultiLanguageCourier = isMultiLanguage

/**
 *  is use Multi language (PaymentMethod[name])
 */
export const isMultiLanguagePaymentMethod = isMultiLanguage

/**
 *  is use Multi language (ProductType[name, description])
 */
export const isMultiLanguageProductType = isMultiLanguage

/**
 *  is use Multi language (Tunnel[name])
 */
export const isMultiLanguageTunnel = isMultiLanguage

/**
 *  is use Multi language (Gang[name])
 */
export const isMultiLanguageGang = isMultiLanguage
/**
 *  is use Multi language (ExpenseType[name])
 */
export const isMultiLanguageExpenseType = isMultiLanguage
/**
 *  is use Multi language (StoreType[name])
 */
export const isMultiLanguageStoreType = isMultiLanguage

/**
 *  default map coordinates [lng,lat]
 */
export const defaultMapCoordinates = [114.22436050274554, 22.312059710215724]

/*
 * userType judge
 */
export const UserTypeJudge = (currentUser) => {
  let isUser, isProvider, isMember
  isUser = isProvider = isMember = false

  if (hasIn(currentUser, 'userTypes.includes')) {
    isProvider = currentUser.userTypes.includes(Common.type.UserType.PROVIDER)
    isUser = currentUser.userTypes.includes(Common.type.UserType.USER)
    isMember = currentUser.userTypes.includes(Common.type.UserType.MEMBER)
  }

  return {
    isUser,
    isProvider,
    isMember
  }
}

/**
 * getCurrentPosition
 */

export const getCurrentPosition = () => {
  return new Promise((res, rej) => {
    const timer = setTimeout(() => {
      toast.warn(<FormattedMessage id="display_address_error_info_time_out" />)
      rej()
    }, 5000)

    navigator.geolocation.getCurrentPosition(
      function (position) {
        clearTimeout(timer)
        res({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },

      function (error) {
        // Handling errors
        switch (error.code) {
          case 1:
            toast.warn(
              <FormattedMessage id="display_address_error_info_reject" />
            )
            break
          case 2:
            toast.warn(
              <FormattedMessage id="display_address_error_info_temporarily_fail" />
            )
            break
          case 3:
            toast.warn(
              <FormattedMessage id="display_address_error_info_time_out" />
            )
            break
          default:
            toast.warn(
              <FormattedMessage id="display_address_error_info_unknow_fail" />
            )
            break
        }
        clearTimeout(timer)
        rej()
      }
    )
  })
}

/**
 * time range
 */

export const filterTimeRangeFormat = (startTime, endTime) => {
  return [
    startTime ? moment(startTime).startOf('day').toISOString() : '',
    endTime ? moment(endTime).endOf('day').toISOString() : ''
  ]
}

/*

 product sku

*/
export const productSkuCalculation = (groups) => {
  const results = []
  const keys = Object.keys(groups)
  if (keys.length > 0 && keys.some((v) => groups[v].length > 0)) {
    const loop = (item, count) => {
      const key = keys[count]
      const items = groups[key]
      const _count = count + 1
      if (items.length > 0) {
        items.forEach((v) => {
          const _item = { ...item, [key]: v }
          keys.length === _count ? results.push(_item) : loop(_item, _count)
        })
      } else {
        keys.length === _count ? results.push(item) : loop(item, _count)
      }
    }
    loop({}, 0)
  }
  return results
}

export function formatCurrencyNumber(
  value,
  precision = 0,
  decimalSeparator = '.',
  thousandSeparator = ',',
  allowNegative = false,
  prefix = '',
  suffix = ''
) {
  // provide some default values and arg validation.
  if (precision < 0) {
    precision = 0
  } // precision cannot be negative
  if (precision > 20) {
    precision = 20
  } // precision cannot be greater than 20

  if (value === null || value === undefined) {
    return {
      value: 0,
      maskedValue: ''
    }
  }

  value = String(value) //if the given value is a Number, let's convert into String to manipulate that

  if (value.length === 0) {
    return {
      value: 0,
      maskedValue: ''
    }
  }

  // extract digits. if no digits, fill in a zero.
  var digits = value.match(/\d/g) || ['0']

  var numberIsNegative = false
  if (allowNegative) {
    var negativeSignCount = (value.match(/-/g) || []).length
    // number will be negative if we have an odd number of "-"
    // ideally, we should only ever have 0, 1 or 2 (positive number, making a number negative
    // and making a negative number positive, respectively)
    numberIsNegative = negativeSignCount % 2 === 1

    // if every digit in the array is '0', then the number should never be negative
    var allDigitsAreZero = true
    for (var idx = 0; idx < digits.length; idx += 1) {
      if (digits[idx] !== '0') {
        allDigitsAreZero = false
        break
      }
    }
    if (allDigitsAreZero) {
      numberIsNegative = false
    }
  }

  // zero-pad a input
  while (digits.length <= precision) {
    digits.unshift('0')
  }

  if (precision > 0) {
    // add the decimal separator
    digits.splice(digits.length - precision, 0, '.')
  }

  // clean up extraneous digits like leading zeros.
  digits = Number(digits.join('')).toFixed(precision).split('')
  var raw = Number(digits.join(''))

  var decimalpos = digits.length - precision - 1 // -1 needed to position the decimal separator before the digits.
  if (precision > 0) {
    // set the final decimal separator
    digits[decimalpos] = decimalSeparator
  } else {
    // when precision is 0, there is no decimal separator.
    decimalpos = digits.length
  }

  // add in any thousand separators
  for (var x = decimalpos - 3; x > 0; x = x - 3) {
    digits.splice(x, 0, thousandSeparator)
  }

  // if we have a prefix or suffix, add them in.
  if (prefix.length > 0) {
    digits.unshift(prefix)
  }
  if (suffix.length > 0) {
    digits.push(suffix)
  }

  // if the number is negative, insert a "-" to
  // the front of the array and negate the raw value
  if (allowNegative && numberIsNegative) {
    digits.unshift('-')
    raw = -raw
  }

  return {
    value: raw,
    maskedValue: digits.join('').trim()
  }
}

export const humanFileSize = (bytes) => {
  const thresh = 1024
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }
  let u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

export const base64ToFile = (base64Data, imgName) => {
  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }
  const blobToFile = (theBlob, filename) => {
    theBlob.lastModifiedDate = new Date()
    theBlob.name = filename
    return new File([theBlob], filename, { type: 'image/png' })
    // return theBlob;
  }
  const blob = dataURLtoBlob(base64Data)
  const file = blobToFile(blob, imgName)
  return file
}

export const formatUserName = (user) => {
  const first = (user && user.firstName) || ''
  const last = (user && user.lastName) || ''

  return first && last ? `${first} ${last}` : first || last || user?.username
}

export const useWindowHeight = () => {
  const doEl = document.documentElement
  const [height, setHeight] = useState({
    clientHeight: doEl.clientHeight
  })
  useEffect(() => {
    const onResize = debounce((event) => {
      const el = document.documentElement
      setHeight((prev) => ({
        ...height,
        clientHeight: el.clientHeight
      }))
    }, 1000)
    window.addEventListener('resize', onResize, false)
    return () => window.removeEventListener('resize', onResize, false)
  }, [height])

  return height
}

export const productSkuTextFormat = (productSku, locale, format) => {
  const specs = productSku && productSku.specs ? productSku.specs : []
  const values = specs.map((item) => {
    const values = (item.spec && item.spec.values) || []
    const value = values.find((v) => v._id === item.value)
    return value && value.name && value.name[locale]
  })
  if (format) {
    return format(values)
  } else {
    return values.map((v) => v || '-').join('、')
  }
}
