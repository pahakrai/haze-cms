import AnalyticsService from '../../../Services/APIServices/AnalyticsService';

import GridBase from '../../../Components/App/Grid/GridBase';

class DynamicWidget extends GridBase {
  constructor(props) {
    super(props);
    const { intl, data } = props;
    this.state = {
      data: {
        title: data.title ? data.title[intl.locale] || data.title : ''
      }
    };
  }
  getKey = () => {
    const { data } = this.props;
    return data._id;
  };
  getDataGrid = () => {
    const { data } = this.props;
    return data.position;
  };
  getWidgetType = () => {
    const { data } = this.props;
    return data.widgetType;
  };
  getData = () => {
    const { data } = this.state;
    return data;
  };
  async componentDidMount() {
    await this.fetchData();
  }
  refetchKeyIncludes = key => {
    const {
      data: { queries: refetchKeys }
    } = this.props;

    return Array.isArray(refetchKeys) && refetchKeys.includes(key);
  };
  async componentDidUpdate(prevProps, prevState) {
    const { filter } = this.props;
    const hasKey = this.refetchKeyIncludes;
    let showRefetch = false;
    if (
      (hasKey('dateFr') || hasKey('dateTo')) &&
      (prevProps.filter.dateFr !== filter.dateFr ||
        prevProps.filter.dateTo !== filter.dateTo)
    ) {
      showRefetch = true;
    }
    showRefetch && this.fetchData();
  }
  fetchData = async () => {
    const { data, filter } = this.props;
    // const ranN = n => ~~(Math.random() * (n || 90));

    // this.setState(({ data: _data }) => ({
    //   data: {
    //     ..._data,
    //     amount: ranN(1000),
    //     total: ranN(1000),
    //     hint: `▴ ${ranN()}%`, // 'Ongoing / Total'
    //     color: '#8dbefe',
    //     colors: ['#8dbefe', '#feda85', '#8ae2b7', '#fd9eb2'],
    //     charts: Array(6)
    //       .fill('')
    //       .map((v, i) => ({
    //         x: Array(4)
    //           .fill('')
    //           .map((v, i) => `value${i}`),
    //         y: Array(4)
    //           .fill('')
    //           .map(() => ranN()),
    //         name: 'LA Zoo' + i
    //       }))
    //   }
    // }));
    const response = await AnalyticsService.getDashboardWidgetData(
      data.apiUrl,
      filter
    );
    if (response && response.ok && response.data) {
      this.setState(({ data }) => ({
        data: {
          ...data,
          colors: ['#8dbefe', '#feda85', '#8ae2b7', '#fd9eb2'],
          ...response.data
        }
      }));
    }
  };
}
export default DynamicWidget;
