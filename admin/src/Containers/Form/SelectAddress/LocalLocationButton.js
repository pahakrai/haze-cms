import React, { PureComponent } from 'react'
import { helpers as EcommCommonHelpers } from '@golpasal/common'
import { hasIn } from 'lodash'
import { toast } from '../../../Lib/Toast'

import RegionService from '../../../Services/APIServices/RegionService'
import Button from '../../../Components/Common/Button'
import { getCurrentPosition, isDevelopmentEnv } from '../../../Lib/util'

class componentName extends PureComponent {
  state = { loading: false }

  handleLoading = (loading) => {
    this.setState({
      loading
    })
  }
  getCurrentPositionInfo = async () => {
    const { intl, googleGeocoder, onChange } = this.props
    if (!googleGeocoder) {
      return
    }
    this.handleLoading(true)

    try {
      let lat, lng
      if (!isDevelopmentEnv) {
        const { lat: a, lng: b } = await getCurrentPosition()
        lat = a
        lng = b
      } else {
        lat = 22.3578427
        lng = 114.131397
      }
      const regions = await RegionService.getRegionsByCoordinates(lng, lat, {
        limit: 1,
        type: 'region'
      })

      const results = await googleGeocoder.getByLatlng(lat, lng, intl.locale)
      let addressName = ''
      let addressRegions = []
      if (hasIn(results, 'results[0].formatted_address')) {
        addressName = results.results[0].formatted_address
      }
      if (
        hasIn(regions, 'ok') &&
        regions.ok &&
        hasIn(regions, 'data[0].ancestors') &&
        Array.isArray(regions.data[0].ancestors)
      ) {
        addressRegions = [...regions.data[0].ancestors, regions.data[0]._id]
      }
      if (addressRegions.length === 0 || !addressName) {
        throw new Error()
      }
      const locationValue = await EcommCommonHelpers.textToLocation(
        addressName,
        addressRegions,
        {
          locale: intl.locale,
          engine: 'none'
        }
      )
      locationValue.geometry.coordinates = [lng, lat]
      onChange(locationValue)
      return locationValue
    } catch (e) {
      toast.warn(
        intl.formatMessage({
          id: 'display_address_error_info_fail'
        })
      )
    } finally {
      this.handleLoading(false)
    }
  }
  render() {
    const { intl, style = {} } = this.props
    const { loading } = this.state

    return (
      <Button.Primary
        style={{
          margin: 0,
          ...style
        }}
        type="button"
        disabled={loading}
        onClick={this.getCurrentPositionInfo}
      >
        {intl.formatMessage({
          id: loading ? 'loading' : 'display_address_get_local_location'
        })}
      </Button.Primary>
    )
  }
}

export default componentName
