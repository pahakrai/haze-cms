import React from 'react';
import { withContentRect } from 'react-measure';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { helpers as EcommCommonHelpers } from '@golpasal/common';
import CountUp from 'react-countup';

import Themes from '../../../../../Themes';

// components
import CardLayout from '../../cardlayout';
import H5 from '../../../../Common/H5';
import H4 from '../../../../Common/H4';

/**
  WidgetDataType {
    colors: [string]
    charts: [{
      value: number
      label: string
      color: string
    }]
  }
 */

export default withContentRect('bounds')(
  ({
    measureRef,
    contentRect: { bounds },
    gridItem: { data: { charts, title, colors, amount } } = {},
    onChange
  }) => {
    let data = Array.isArray(charts) ? charts : [];
    const pieRadius = bounds ? bounds.height * 0.3 : 0;
    const haveAmount = amount !== undefined;
    return (
      <CardLayout>
        <H5
          style={{
            color: '#818ea3',
            textAlign: 'center'
          }}
        >
          <b>{title && title.toUpperCase ? `${title}`.toUpperCase() : title}</b>
        </H5>
        {haveAmount && (
          <H4 style={{ textAlign: 'center', fontWeight: 500, margin: 0 }}>
            <CountUp
              end={amount}
              duration={2}
              formattingFn={value => EcommCommonHelpers.formatMoney(value, 0)}
            />
          </H4>
        )}
        {charts && charts.length && (
          <div ref={measureRef} style={{ height: '100%' }}>
            <PieChart
              width={bounds && bounds.width}
              height={bounds && bounds.height}
            >
              <Legend verticalAlign="top" height={haveAmount ? 10 : 36} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="40%"
                outerRadius={pieRadius}
                // fill={colors[i] || Themes.color.primary}
              >
                {data.map((v, _i) => (
                  <Cell
                    key={`cell-${_i}`}
                    fill={v.color || colors[_i] || Themes.color.primary}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        )}
      </CardLayout>
    );
  }
);
