import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hasIn } from 'lodash'
import getSymbolFromCurrency from 'currency-symbol-map'

import { getAllTunnel } from '../../../../../Redux/selectors'
import { TunnelActions } from '../../../../../Redux/Tunnel/actions'

import {
  ServiceItem,
  Actions,
  Price,
  Label
} from '../../../../../Containers/Service/SelectServices'
import Checkbox from '../../../../../Containers/Service/Checkbox'

const TunnelItem = styled(ServiceItem)`
  height: 50px;
`

export class TunnelSelectList extends PureComponent {
  componentDidMount() {
    const { getAllTunnel, vehicleType } = this.props
    getAllTunnel({ populates: ['pricings'], vehicleType })
  }
  render() {
    const { tunnels, selected = [], intl } = this.props
    return (
      <div>
        {tunnels.map((v, idx) => {
          const name = hasIn(v, `name[${intl.locale}]`)
            ? v.name[intl.locale]
            : ''
          const currency = hasIn(v, `pricings[0].pricing.currency`)
            ? v.pricings[0].pricing.currency
            : ''
          const amount = hasIn(v, `pricings[0].pricing.amount`)
            ? v.pricings[0].pricing.amount
            : ''

          return (
            <TunnelItem key={idx}>
              <div>
                <Label>{name}</Label>
              </div>
              <Actions>
                <Price>
                  {getSymbolFromCurrency(currency) || '$'}
                  {amount}
                </Price>
                <Checkbox active={selected.includes(v._id)} onChange />
              </Actions>
            </TunnelItem>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tunnels: getAllTunnel(state)
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllTunnel: TunnelActions.getAllTunnel
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(TunnelSelectList)
