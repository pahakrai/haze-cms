import React from 'react';
import { withContentRect } from 'react-measure';
import {
  Area,
  AreaChart,
  Tooltip,
  YAxis,
  CartesianGrid,
  XAxis,
  Legend
} from 'recharts';

import Themes from '../../../../../Themes';

// components
import CardLayout from '../../cardlayout';
import H5 from '../../../../Common/H5';

import { formatChartKeys } from '../utils';

/**
  WidgetDataType {
    colors: [string]
    charts: [{
      name: string
      x: [string]
      y: [number]
    }]}
  }
 */

const dataFormat = charts =>
  Array.isArray(charts)
    ? charts.map(chart => {
        const _data = { name: chart.name };
        if (Array.isArray(chart.x) && Array.isArray(chart.y)) {
          chart.x.forEach((_x, index) => {
            _data[_x] = chart.y[index] || 0;
          });
        }
        return _data;
      })
    : [];

export default withContentRect('bounds')(
  ({
    measureRef,
    contentRect: { bounds },
    gridItem: { data: { charts, colors, title } } = {},
    onChange
  }) => {
    const chartKeys = formatChartKeys(charts);
    const data = dataFormat(charts);

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
        <div ref={measureRef} style={{ height: '100%' }}>
          <AreaChart
            width={bounds && bounds.width}
            height={bounds && bounds.height}
            data={data}
            margin={{ right: bounds ? bounds.width * 0.06 : 0 }}
          >
            <defs>
              {chartKeys.map((v, i) => (
                <linearGradient key={i} id={v} x1="0" y1="0" x2="0" y2="1">
                  {/* <stop
                    offset="5%"
                    stopColor={colors[i] || Themes.color.primary}
                    stopOpacity={0.2}
                  /> */}
                  <stop
                    stopColor={colors[i] || Themes.color.primary}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {chartKeys.map((v, i) => (
              <Area
                key={i}
                type="monotone"
                dataKey={v}
                stroke={colors[i] || Themes.color.primary}
                fillOpacity={1}
                fill={`url(#${v})`}
              />
            ))}
            <Legend verticalAlign="bottom" height={36} />
          </AreaChart>
        </div>
      </CardLayout>
    );
  }
);
