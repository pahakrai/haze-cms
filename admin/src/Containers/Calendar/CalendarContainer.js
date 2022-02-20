import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import DnCalendar from './DnCalendar';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Redux Selectors
import { getRegions } from '../../Redux/selectors';
import { RegionActions } from '../../Redux/Region/actions';
import { HolidayActions } from '../../Redux/Holiday/actions.js';
import { getHolidays } from '../../Redux/selectors';

class CalendarContainer extends React.PureComponent {
  componentDidMount() {
    const { getHolidays, holidays, getRegions } = this.props;
    if (!holidays.length) {
      getHolidays({});
    }
    getRegions({
      parent: null,
      refresh: true
    });
  }

  render() {
    const {
      intl,
      holidays,
      createHoliday,
      updateHoliday,
      deleteHoliday,
      regions
    } = this.props;
    const events = [];
    if (holidays.length) {
      holidays.forEach(item => {
        let result = Object.assign({}, item);
        result.start = moment(result.date).toDate();
        result.end = moment(result.date).toDate();
        result.title = result.name;
        events.push(result);
      });
    }
    return (
      <DnCalendar
        intl={intl}
        events={events}
        form="calendar"
        regions={regions}
        createHoliday={createHoliday}
        updateHoliday={updateHoliday}
        deleteHoliday={deleteHoliday}
      />
    );
  }
}

const mapStateToProps = state => ({
  holidays: getHolidays(state),
  regions: getRegions(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getHolidays: HolidayActions.getHolidays,
      createHoliday: HolidayActions.createHoliday,
      updateHoliday: HolidayActions.updateHoliday,
      deleteHoliday: HolidayActions.deleteHoliday,
      getRegions: RegionActions.getRegions
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
);
