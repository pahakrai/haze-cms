import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
import getSymbolFromCurrency from 'currency-symbol-map'
import Card from '../../Common/Card'
import { Row, Col } from 'react-flexa'
import Button from '../../Common/Button'
import moment from 'moment'
const CardContent = styled.div`
  padding: 0px 30px;
  background-color: #fff;
`

class WorkspaceSubscriptionList extends React.PureComponent {
  static defaultProps = {
    workspaceSubscriptions: [],
    isNextPageLoading: false,
    isEnd: true,
    onItemClick: () => true,
    onLoadMore: () => true
  }
  constructor(props) {
    super(props)
    this.state = {
      items: {}
    }
  }
  async componentDidMount() {
    const { workspaceSubscriptions } = this.props
    this.setState({
      items: workspaceSubscriptions ? workspaceSubscriptions[0] : {}
    })
  }
  render() {
    const {
      workspaceSubscriptions,
      workspaceSubscriptionPlans,
      intl,
      currentWorkspace,
      onClick,
      updateWorkspaceSubscription
    } = this.props
    let item
    const { items } = this.state
    item = workspaceSubscriptions && !items ? workspaceSubscriptions[0] : items
    const name =
      item && item.subscriptionPlan && item.subscriptionPlan.name[intl.locale]
    const pricings =
      item &&
      item.subscriptionPlan &&
      item.subscriptionPlan.pricings.filter(
        (v) => v.currency === currentWorkspace.defaultCurrency
      )
    const pricingsAmount =
      pricings && pricings.length
        ? pricings.reduce((amount, v) => {
            return amount + Number(v.amount || 0)
          }, 0)
        : 0

    const amount =
      item && item.subscriptionPlan && item.subscriptionPlan.pricings
        ? getSymbolFromCurrency(currentWorkspace.defaultCurrency || 'HKD') +
          pricingsAmount
        : ''
    const status =
      item && item.subscriptionPlan && item.subscriptionPlan.isActive
        ? intl.formatMessage({ id: 'display_available' })
        : intl.formatMessage({ id: 'display_unavailable' })

    const currentSubscriptionPeriod =
      item && item.currentSubscriptionPeriod
        ? moment(item.createdAt).format('MMM, YYYY') +
          '-' +
          moment(item.currentSubscriptionPeriod).format('MMM, YYYY')
        : ''
    const defaultValue =
      workspaceSubscriptions &&
      workspaceSubscriptions[0] &&
      workspaceSubscriptions[0].subscriptionPlan &&
      workspaceSubscriptions[0].subscriptionPlan.name[intl.locale]
    return (
      <div>
        <Card>
          <Row>
            <Col
              xs={0}
              sm={0}
              md={1}
              lg={1}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold'
              }}
            ></Col>
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={4}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold'
              }}
            >
              {intl.formatMessage(
                { id: 'display_subscription_name' },
                { planName: name }
              )}
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              {intl.formatMessage({ id: 'display_subscription_plan' })}{' '}
              <Select
                style={{ width: '70%' }}
                defaultValue={defaultValue}
                onChange={async (option) => {
                  const itemValue =
                    workspaceSubscriptionPlans &&
                    workspaceSubscriptionPlans.find(
                      (opt) => opt.name[intl.locale] === option
                    )
                  this.setState({
                    items: { subscriptionPlan: itemValue }
                  })
                }}
              >
                {workspaceSubscriptionPlans &&
                  workspaceSubscriptionPlans.map((v) => {
                    return (
                      <Select.Option key={v._id} value={v.name[intl.locale]}>
                        {v.name[intl.locale]}
                      </Select.Option>
                    )
                  })}
              </Select>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3}>
              <Button.Primary
                type="button"
                style={{
                  display: 'end'
                }}
                onClick={(e) => {
                  updateWorkspaceSubscription({
                    ...workspaceSubscriptions[0],
                    subscriptionPlan: items.subscriptionPlan._id
                  })
                }}
              >
                {intl.formatMessage({
                  id: 'save'
                })}
              </Button.Primary>
            </Col>
          </Row>
        </Card>
        <CardContent>
          <Row style={{ paddingBottom: '10px' }}>
            <Col xs={6} sm={3} md={3} lg={3}></Col>
            <Col xs={6} sm={3} md={3} lg={3}></Col>
            <Col xs={6} sm={3} md={3} lg={3}>
              {item && amount}
            </Col>
            <Col xs={6} sm={3} md={3} lg={3}>
              {item && status}
            </Col>
          </Row>
          {item &&
            item.subscriptionPlan &&
            item.subscriptionPlan.items &&
            item.subscriptionPlan.items.map((v, index) => {
              return (
                <Row style={{ paddingBottom: '10px' }} key={index}>
                  <Col xs={6} sm={3} md={3} lg={3}>
                    {v.item.name[intl.locale]}
                  </Col>
                  <Col xs={6} sm={3} md={3} lg={3}>
                    {v.value}
                  </Col>
                </Row>
              )
            })}
          <br />
          <br />
          {item && item.currentSubscriptionPeriod && (
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                {intl.formatMessage({ id: 'display_subscription_date' })}
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={12} sm={6} md={9} lg={9}>
              {item && currentSubscriptionPeriod}
            </Col>
            <Col xs={12} sm={6} md={3} lg={3}>
              <Button.Primary onClick={onClick}>
                {intl.formatMessage({ id: 'display_subscription_invoice' })}
              </Button.Primary>
            </Col>
          </Row>
        </CardContent>
      </div>
    )
  }
}

export default WorkspaceSubscriptionList
