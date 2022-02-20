import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { helpers as BsgoCommonHelpers } from '@golpasal/common'

import OrderService from '../../../../Services/APIServices/OrderService'

import styled from 'styled-components'

export const Item = styled.div`
  text-align: center;
  display: table-cell;
  width: ${({ size = 1 }) => 100 * size}%;
  padding: 0 5px;
  font-weight: 600;
  color: #666666;
  font-size: 14px;
`

export const TitleItemWrapper = styled.div`
  width: 100%;
  padding: 10px 5px;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
`

export const ItemWrapper = styled(TitleItemWrapper)`
  padding-bottom: 0px;
  padding: 10px 5px;
  display: table;
`

export default ({ orderId, intl, updateMode }) => {
  const [logs, setLogs] = useState([])
  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await OrderService.getOrderLogs({
          order: orderId,
          populates: ['user']
        })
        setLogs(
          data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        )
      } catch (e) {}
    }

    if (updateMode) {
      func()
    }
  }, [orderId, updateMode])

  return (
    <React.Fragment>
      <TitleItemWrapper>
        <Item>
          {intl.formatMessage({
            id: 'display_time'
          })}
        </Item>
        <Item>
          {intl.formatMessage({
            id: 'type'
          })}
        </Item>
        <Item>
          {intl.formatMessage({
            id: 'display_order_log_reason'
          })}
        </Item>
        <Item>
          {intl.formatMessage({
            id: 'display_user'
          })}
        </Item>
        <Item>
          {intl.formatMessage({
            id: 'display_phone'
          })}
        </Item>
        <Item>
          {intl.formatMessage({
            id: 'display_email'
          })}
        </Item>
        <Item>
          {intl.formatMessage({
            id: 'display_name'
          })}
        </Item>
      </TitleItemWrapper>
      {logs.map((log, idx) => {
        const type = BsgoCommonHelpers.getConstantByValue(
          'type',
          'OrderLogType',
          log.type,
          intl.locale
        )
        return (
          <ItemWrapper key={idx}>
            <Item>
              {log ? moment(log.createdAt).format('YYYY/MM/DD HH:mm') : '-'}
            </Item>
            <Item>{type ? type.text : '-'}</Item>
            <Item style={{ wordBreak: 'break-all' }}>{log.reason}</Item>
            <Item>{log.user && (log.user.name || log.user.username)}</Item>
            <Item>{log.user && log.user.phone}</Item>
            <Item style={{ wordBreak: 'break-all' }}>
              {log.user && log.user.email}
            </Item>
            <Item style={{ wordBreak: 'break-all' }}>
              {log.user && `${log.user.firstName} ${log.user.lastName}`}
            </Item>
          </ItemWrapper>
        )
      })}
    </React.Fragment>
  )
}
