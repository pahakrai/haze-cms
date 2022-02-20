import moment from 'moment';
import { DatePicker } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { getWorkspaceById } from '../../Redux/selectors';

import AnalyticsService from '../../Services/APIServices/AnalyticsService';

import WidgetTypes from '../../Components/App/Grid/widgets/WidgetTypes';

import { onDatePickerFormatChange } from '../../Lib/common';

import H5 from '../../Components/Common/H5';
import Loading from '../../Components/Common/Loading';
import GridLayout from '../../Components/App/Grid';

import DynamicWidget from './Widgets/DynamicWidget';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  padding: 6px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const FilterLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-direction: row-reverse;
  flex-wrap: wrap;
`;

const FilterLabel = styled(H5)`
  margin-right: 1em;
  margin-left: 1em;
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 250px;
`;

class _Layout extends React.PureComponent {
  gridLayout = React.createRef();
  constructor(props) {
    super(props);
    const today = moment().set({ h: 23, m: 59, s: 59 });
    const lastMonthDay = moment()
      .set({ h: 0, m: 0, s: 0 })
      .subtract(1, 'month');
    const defalutDateRangeValue = [lastMonthDay, today];
    this.state = {
      commonData: null,
      commonFilter: {
        ...onDatePickerFormatChange(['dateFr', 'dateTo'], defalutDateRangeValue)
        // dateFr
        // dateTo
      },
      defalutDateRangeValue,
      loading: false
    };
  }
  // for get common data
  componentDidMount() {
    this._fetchData();
  }
  // async componentDidUpdate(prevProps, prevState) {
  //   const currentProps = this.props;
  //   // commonFilter
  //   if (!isEqual(prevProps.commonFilter, currentProps.commonFilter))
  //     await this.fetchData();
  // }
  _fetchData = async () => {
    this.setState({
      loading: true
    });
    const response = await AnalyticsService.getDashboardData();
    if (response && response.ok && response.data) {
      const result = response.data.filter(
        item =>
          item.workspaces.indexOf(this.props.workspace._id) >= 0 &&
          WidgetTypes[item.widgetType]
      );
      this.setState({
        commonData: result,
        loading: false
      });
      return;
    }
    this.setState({
      loading: false
    });
  };
  // end for get common data
  _onDatePickerValueChanged = times => {
    const { commonFilter } = this.state;
    if (times) {
      const dateRange = onDatePickerFormatChange(
        ['dateFr', 'dateTo'],
        // ['createdAtFr', 'createdAtTo'],
        times
      );
      // update times refresh data
      this.setState({ commonFilter: { ...commonFilter, ...dateRange } });
    } else {
      this.setState({
        commonFilter: { ...commonFilter, dateFr: undefined, dateTo: undefined }
      });
    }
  };
  _renderHeader = () => {
    const { defalutDateRangeValue } = this.state;
    const { intl } = this.props;

    return (
      <HeaderLayout>
        {this.props.title}
        <FilterLayout>
          <FilterRow>
            <FilterLabel>{intl.formatMessage({ id: 'date' })}</FilterLabel>
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              defaultValue={defalutDateRangeValue}
              onChange={this._onDatePickerValueChanged}
            />
          </FilterRow>
          {/* not need workspace */}
          {/* <WorkspaceFilter
            onChange={workspace =>
              this.setState({ commonFilter: { ...commonFilter, workspace } })
            }
          /> */}
        </FilterLayout>
      </HeaderLayout>
    );
  };

  _renderGrid = () => {
    const { intl } = this.props;
    const { commonFilter, commonData } = this.state;
    return commonData.map(data => (
      <DynamicWidget
        key={data._id}
        intl={intl}
        data={data}
        filter={commonFilter}
        gridLayout={this.gridLayout}
      />
    ));
  };
  _mergeGridLayouts = () => {
    const { commonData } = this.state;
    const breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];
    // { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
    return mergeGridLayouts(commonData, breakpoints);
  };
  render() {
    const { commonData } = this.state;
    const { loading } = this.props;

    if (loading) return <Loading isLoading fill />;

    return commonData ? (
      <Layout>
        {this._renderHeader()}
        <GridLayout
          ref={this.gridLayout}
          rowHeight={230}
          layouts={this._mergeGridLayouts()}
          cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 3 }}
        >
          {this._renderGrid()}
        </GridLayout>
      </Layout>
    ) : null;
  }
}

export const mergeGridLayouts = (data, breakpoints) => {
  return (
    data
      .map(data =>
        // get breakpoints eg : GridWidget lg {i,x,y...}
        breakpoints
          .map(p => ({
            // merge breakpoint grid w,y....,i...
            [p]: Object.assign({}, data.position[p] || data.position, {
              i: data._id
            })
          }))
          .reduce((all, item) => Object.assign(all, item), {})
      )
      // [ {lg:{},md:{}...}... ],merge {lg:[...],md:[...]...}
      .reduce(
        (all, item) =>
          breakpoints
            .map(p => ({ [p]: all[p].concat(item[p]) }))
            .reduce((all, item) => Object.assign(all, item), {}),
        // set start object {lg:[],md:[],...}
        breakpoints
          .map(p => ({ [p]: [] }))
          .reduce((all, item) => Object.assign(all, item), {})
      )
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    workspace: getWorkspaceById(state, state.app.workspaceId)
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_Layout)
);
