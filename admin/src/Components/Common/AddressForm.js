import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import Common from '@golpasal/common'

import MapView from './MapView'

const { GeoCoder } = Common.helpers

class AddressForm extends React.PureComponent {
  static propTypes = {
    defaultMarker: PropTypes.object,
    onAddressSelected: PropTypes.func,
    mapHeight: PropTypes.number
  }
  static defaultProps = {
    onAddressSelected: () => true
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.intl.locale !== prevState.locale) {
      const { locale } = nextProps.intl
      return {
        locale,
        geoCoder: new GeoCoder(process.env.REACT_APP_GOOGLEMAP_API_KEY, locale)
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    const { locale } = props.intl
    this.state = {
      locale,
      markers: [],
      center: undefined,
      geoCoder: new GeoCoder(process.env.REACT_APP_GOOGLEMAP_API_KEY, locale)
    }
  }

  componentDidMount() {
    const { defaultMarker } = this.props
    if (defaultMarker) {
      this.setState({ center: defaultMarker, markers: [defaultMarker] })
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!this.state.center) {
          this.setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        }
      })
    }
  }

  async getByLatlng(latitude, longitude) {
    const { geoCoder } = this.state
    const response = await geoCoder.getByLatlng(latitude, longitude)
    if (response.status === 'OK') {
      return response.results[0]
    }
    return null
  }

  async getByPlaceId(placeId) {
    const { geoCoder } = this.state
    const response = await geoCoder.getByPlaceId(placeId)
    if (response.status === 'OK') {
      return response.results[0]
    }
    return null
  }

  async onAddressSelected(_location, displayAddress) {
    const { geoCoder } = this.state
    const { onAddressSelected } = this.props
    const location = await geoCoder.formatOutputLocation(
      _location,
      displayAddress
    )
    onAddressSelected(location)
  }

  async onMapClicked(latLng, placeId) {
    let location
    if (placeId) {
      location = await this.getByPlaceId(placeId)
    } else {
      location = await this.getByLatlng(latLng.lat, latLng.lng)
    }

    this.onAddressSelected(location, location.formatted_address)
    this.setState({ center: latLng, markers: [latLng] })
  }

  async onSearchResultSelected(address) {
    const displayAddress = address.formatted_address + address.name
    const location = await this.getByPlaceId(address.place_id)

    this.onAddressSelected(location, displayAddress)
    this.setState({
      center: address.geometry.location,
      markers: [address.geometry.location]
    })
  }

  render() {
    const { center, markers } = this.state
    const { mapHeight } = this.props

    return (
      <MapView
        height={mapHeight}
        showSearchBox
        center={center}
        markers={markers}
        onMapClicked={this.onMapClicked.bind(this)}
        onSearchResultSelected={this.onSearchResultSelected.bind(this)}
      />
    )
  }
}
export default injectIntl(AddressForm)
