import React from 'react'
import Common from '@golpasal/common'
import { Popconfirm } from 'antd'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import Label from '../../Common/Label'
import Card from '../../Common/Card'
import Button from '../../Common/Button'
import moment from 'moment'
// import hasIn from 'lodash/hasIn';
const LabelField = styled(Label.Field)`
  height: 30px;
`
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  border: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
  @media (max-width: 700px) {
    display: none;
  }
`

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`

export const Item = styled.div`
  font-size: ${(props) => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  cursor: pointer;
`

export const HiddenItem = styled(Item)`
  @media (max-width: ${(props) => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`

export class DeviceCardItem extends React.PureComponent {
  render() {
    const { item, intl, onClick, changeDeviceStatus } = this.props
    const createdAt = moment(item.createdAt)
      .locale(intl.locale)
      .format('YYYY-MM-DD HH:mm:ss')
    const lastOnTime = moment(item.lastOnTime)
      .locale(intl.locale)
      .format('YYYY-MM-DD HH:mm:ss')

    function cancel(e) {
      e.stopPropagation()
    }
    function confirm(e) {
      e.stopPropagation()
      changeDeviceStatus(item)
    }

    return (
      <React.Fragment>
        <Wrapper>
          <Item onClick={onClick}>{item.deviceName}</Item>
          <Item onClick={onClick}>{item.deviceType}</Item>
          <Item onClick={onClick}>{createdAt}</Item>
          <Item onClick={onClick}>{lastOnTime}</Item>
          <Item onClick={onClick}>
            {item.online
              ? intl.formatMessage({ id: 'device.online' })
              : intl.formatMessage({ id: 'device.offline' })}
          </Item>
          <Item onClick={onClick}>
            {item.deviceStatus === Common.status.DeviceStatus.WHITE_LIST
              ? intl.formatMessage({ id: 'device.white_list' })
              : intl.formatMessage({ id: 'device.black_list' })}
          </Item>
          <Item onClick={onClick}>
            <Popconfirm
              title={intl.formatMessage({
                id:
                  item.deviceStatus === Common.status.DeviceStatus.WHITE_LIST
                    ? 'device.change_to_black_list'
                    : 'device.change_to_white_list'
              })}
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button.Default
                style={{
                  height: 42,
                  minWidth: 50,
                  padding: 0
                }}
                type="button"
              >
                <FormattedMessage
                  id={
                    item.deviceStatus === Common.status.DeviceStatus.WHITE_LIST
                      ? 'device.change_to_black_list'
                      : 'device.change_to_white_list'
                  }
                />
              </Button.Default>
            </Popconfirm>
            {/* <Button.Default onClick={() => changeDeviceStatus(item)}>
              <FormattedMessage
                id={
                  item.deviceStatus ===
                  Common.status.DeviceStatus.WHITE_LIST
                    ? 'device.change_to_black_list'
                    : 'device.change_to_white_list'
                }
              />
            </Button.Default> */}
          </Item>
        </Wrapper>

        <CardWrapper>
          <Label>{intl.formatMessage({ id: 'device.name' })} </Label>
          <LabelField rows={1}>{item.deviceName}</LabelField>

          <Label>{intl.formatMessage({ id: 'device.type' })} </Label>
          <LabelField rows={1}>{item.deviceType}</LabelField>

          <Label>{intl.formatMessage({ id: 'device.create_time' })} </Label>
          <LabelField rows={1}>{createdAt}</LabelField>

          <Label>
            {intl.formatMessage({ id: 'device.last_time_inline' })}{' '}
          </Label>
          <LabelField rows={1}>{lastOnTime}</LabelField>

          <Label>{intl.formatMessage({ id: 'device.whether_online' })} </Label>
          <LabelField rows={1}>
            {' '}
            {item.online
              ? intl.formatMessage({ id: 'device.online' })
              : intl.formatMessage({ id: 'device.offline' })}
          </LabelField>

          <Label>{intl.formatMessage({ id: 'device.status' })} </Label>
          <LabelField rows={1}>
            {' '}
            {item.deviceStatus === Common.status.DeviceStatus.WHITE_LIST
              ? intl.formatMessage({ id: 'device.white_list' })
              : intl.formatMessage({ id: 'device.black_list' })}
          </LabelField>

          <Label>{intl.formatMessage({ id: 'actions' })} </Label>
          <LabelField rows={1}>
            <Button.Default onClick={() => changeDeviceStatus(item)}>
              <FormattedMessage
                id={
                  item.deviceStatus === Common.status.DeviceStatus.WHITE_LIST
                    ? 'device.change_to_black_list'
                    : 'device.change_to_white_list'
                }
              />
            </Button.Default>
          </LabelField>
        </CardWrapper>
      </React.Fragment>
    )
  }
}

export default DeviceCardItem
