import React from 'react';
import { hasIn } from 'lodash';
// import moment from 'moment';
import CountUp from 'react-countup';
import styled, { withTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { helpers } from '@golpasal/common';
import BaseCardLayout from '../../cardlayout';
import H5 from '../../../../Common/H5';

const CardLayout = styled(BaseCardLayout)`
  padding: 15px 25px;
`;
const Content = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: ${props => (props.isSm ? 'column' : 'row')};
  align-items: ${props => (props.isSm ? 'flex-start' : 'center')};
`;
const TextWrapper = styled.div`
  ${props =>
    props.isSm
      ? `
  width: 100%;
  margin-top: 20px;
  margin-left: 0px;
  `
      : `
  max-width: 478px;
  margin-left: 80px;
  `};
  font-family: PingFangHK-Regular, PingFangHK;
  flex: 1;
  & > .border {
    width: 100%;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.24);
  }
  & > .row {
    display: flex;
    align-items: center;
    ${props =>
      props.isSm
        ? `
    flex-direction: column;
    `
        : `
    flex-direction: row;
    justify-content: space-between;
    `};
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 12px;
  }
  & > .row > div {
    ${props => (props.isSm ? 'width:100%;' : 'flex:1;')};
  }
  & .label {
    color: #424242;
  }
  & .amount {
    color: #6b6b6b;
    text-align: right;
  }
  & .missing {
    color: ${({ percentage }) => (percentage >= 100 ? '#22AC38' : '#ED4700')};
  }
`;

const RoundWrapper = styled.div`
  width: 154px;
  height: 154px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ percentage }) =>
    percentage >= 100 ? '#22AC38' : percentage >= 80 ? '#FFB800' : '#ED4700'};
  border-radius: 100%;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #888;
    border-radius: 100%;
    background-color: #fff;
    width: ${props => 154 - props.size}px;
    height: ${props => 154 - props.size}px;
  }
`;

/**
  WidgetDataType {
    target: number
    salesAmount: number
    currency: string
    color: string
  }
 */
// const getMonth = (month, locale) => {
//   const date = moment();
//   return date.month(month).locale(locale).format('MMMM');
// };
class SalesVolumeContext extends React.PureComponent {
  render() {
    const {
      theme,
      gridItem: {
        data: { currency = '', target, title, color, salesAmount: current }
      },
      gridLayout,
      cardStyle,
      filter
      // intl
    } = this.props;
    const year = new Date().getFullYear();
    const month = ((filter && filter.month) || new Date().getMonth()) + 1;
    const pieColor = color || theme.color.primary;
    const percentage =
      target > 0 && current > 0
        ? Number(((current / target) * 100).toFixed(0))
        : target === 0
        ? 100
        : 0;
    const missing = current < target ? target - current : 0;
    const labels = {
      target: (
        <FormattedMessage
          id="display_sales_volume_target"
          values={{ month: `${year}-${month > 9 ? '' : '0'}${month}` }}
        />
      ),
      current: <FormattedMessage id="display_sales_volume_current" />,
      missing: <FormattedMessage id="display_sales_volume_missing" />
    };
    const layoutWidth =
      hasIn(gridLayout, 'current.ref.current.state.width') &&
      gridLayout.current.ref.current.state.width;
    const isSm = layoutWidth < 768;
    const isXs = layoutWidth < 480;

    return (
      <CardLayout style={cardStyle}>
        <H5
          style={{
            textAlign: 'left',
            color: '#818ea3'
          }}
        >
          <b>{title && title.toUpperCase ? `${title}`.toUpperCase() : title}</b>
        </H5>
        <Content isSm={isSm}>
          <RoundWrapper size={22} color={pieColor} percentage={percentage}>
            <div>
              <CountUp end={percentage} duration={2} />%
            </div>
          </RoundWrapper>
          <TextWrapper isSm={isSm} isXs={isXs} percentage={percentage}>
            <div className="row">
              <div className="label">{labels.target}：</div>
              <div className="amount">
                {currency}${helpers.formatNumber((target || 0).toFixed(0))}
              </div>
            </div>
            <div className="row">
              <div className="label">{labels.current}：</div>
              <div className="amount">
                {currency}${helpers.formatNumber((current || 0).toFixed(0))}
              </div>
            </div>
            <div className="row border"></div>
            <div className="row">
              <div className="missing">{labels.missing}：</div>
              <div className="amount missing">
                {currency}${helpers.formatNumber((missing || 0).toFixed(0))}
              </div>
            </div>
          </TextWrapper>
        </Content>
      </CardLayout>
    );
  }
}
export default withTheme(SalesVolumeContext);
