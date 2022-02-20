import React from 'react'
import Common from '@golpasal/common'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { toast } from '../../Lib/Toast'
import { FormattedMessage } from 'react-intl'
import Loading from '../../Components/Common/Loading'
import DeviceList from '../../Components/App/Device/DeviceList'

import { DeviceActions } from '../../Redux/Device/actions'
// import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { getDevices } from '../../Redux/selectors'

import DeviceService from '../../Services/APIServices/DeviceService'

class DeviceListContainer extends React.PureComponent {
  componentDidMount() {
    const { devices } = this.props
    if (!devices.length) {
      this.fetchDevice({ refresh: true }, true)
    }
  }

  _onLoadMore = () => {
    const { fetchDevice } = this.props
    fetchDevice({ append: true })
  }

  fetchDevice(options = {}) {
    const { fetchDevice, query } = this.props
    fetchDevice({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    })
  }

  _onPageChange = (page, limit) => {
    this.fetchDevice({ query: { page: Number(page), limit: Number(limit) } })
  }

  async changeDeviceStatus(item) {
    let v = JSON.parse(JSON.stringify(item))
    v.deviceStatus =
      v.deviceStatus === Common.status.DeviceStatus.WHITE_LIST
        ? Common.status.DeviceStatus.BLACK_LIST
        : Common.status.DeviceStatus.WHITE_LIST
    const { data } = await DeviceService.updateDevice(v)
    toast.success(
      <FormattedMessage
        id={data ? 'updated_successfully' : 'updated_failure'}
      />
    )
    this.fetchDevice({ refresh: true }, true)
  }

  render() {
    const isLoading = false
    const { devices, locale, intl, pagination } = this.props
    return isLoading ? (
      <Loading />
    ) : (
      <DeviceList
        locale={locale}
        intl={intl}
        devices={devices}
        isEnd={pagination.isEnd}
        loading={pagination.fetching}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this._onPageChange
        }}
        onLoadMore={this._onLoadMore}
        changeDeviceStatus={this.changeDeviceStatus.bind(this)}
      />
    )
  }
}
const mapStateToProps = (state) => {
  return {
    locale: state.intl.locale,
    devices: getDevices(state),
    pagination: state.pagination.devices
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDevice: DeviceActions.getDevices,
      changeDeviceStatus: DeviceActions.updateDevice
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeviceListContainer)
)
