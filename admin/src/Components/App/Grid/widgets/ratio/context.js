import React from 'react';
import CountUp from 'react-countup';
import { helpers as EcommCommonHelpers } from '@golpasal/common';
import styled from 'styled-components';

import BaseCardLayout from '../../cardlayout';
import H4 from '../../../../Common/H4';
import H5 from '../../../../Common/H5';

const CardLayout = styled(BaseCardLayout)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContext = styled.div`
  margin: auto;
  text-align: center;
  z-index: 1;
`;

/**
  WidgetDataType {
    amount: number
    total: number
    color: string
    hint: string
  }
 */

export default class RatioContext extends React.PureComponent {
  render() {
    const {
      gridItem: {
        data: { title, hint = '', color, amount, total }
      }
    } = this.props;

    return (
      <CardLayout>
        <CardContext>
          <H5 style={{ color: '#818ea3' }}>
            <b>
              {title && title.toUpperCase ? `${title}`.toUpperCase() : title}
            </b>
          </H5>
          <H4 style={{ marginTop: 25, marginBottom: 25, fontWeight: 500 }}>
            <CountUp
              end={amount || 0}
              duration={2}
              formattingFn={value =>
                `${EcommCommonHelpers.formatMoney(value, 0)} / `
              }
            />
            <CountUp
              end={total || 0}
              duration={2}
              formattingFn={value => EcommCommonHelpers.formatMoney(value, 0)}
            />
          </H4>
          {hint && <H5 style={{ color: color, fontWeight: '400' }}>{hint}</H5>}
        </CardContext>
      </CardLayout>
    );
  }
}
