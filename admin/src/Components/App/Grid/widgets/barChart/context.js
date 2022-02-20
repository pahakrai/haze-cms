import React from 'react'
import { withContentRect } from 'react-measure'
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar
} from 'recharts'

import Themes from '../../../../../Themes'

// components
import CardLayout from '../../cardlayout'
import H5 from '../../../../Common/H5'

import { formatChartKeys } from '../utils'

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
const dataFormat = (charts) =>
  Array.isArray(charts)
    ? charts.map((chart) => {
        const _data = { name: chart.name }
        if (Array.isArray(chart.x) && Array.isArray(chart.y)) {
          chart.x.forEach((_x, index) => {
            _data[_x] = chart.y[index] || 0
          })
        }
        return _data
      })
    : []

export default withContentRect('bounds')(
  ({
    measureRef,
    contentRect: { bounds },
    gridItem: { data: { charts, colors, title } } = {},
    onChange
  }) => {
    const chartKeys = formatChartKeys(charts)
    const data = dataFormat(charts)
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
          <BarChart
            width={bounds && bounds.width}
            height={bounds && bounds.height}
            data={data}
            margin={{ right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            {chartKeys.map((v, i) => (
              <Bar
                key={v}
                dataKey={v}
                fill={colors[i] || Themes.color.primary}
              />
            ))}
          </BarChart>
        </div>
      </CardLayout>
    )
  }
)
