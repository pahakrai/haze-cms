export const formatChartKeys = charts =>
  Array.isArray(charts)
    ? Object.keys(
        charts.reduce((r, chart) => {
          return Array.isArray(chart.x)
            ? chart.x.reduce((_r, _v) => ({ ..._r, [_v]: undefined }), r)
            : r;
        }, {})
      )
    : [];
