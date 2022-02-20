import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationScheduleActions } from '../../Redux/NotificationSchedule/actions';
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateButton } from '../../Components/Common/FilterLayout';

class NotificationScheduleCreateButtonContainer extends React.PureComponent {
  render() {
    const { intl, history } = this.props;
    return (
      <CreateButton
        type="button"
        onClick={() => {
          history.push('/notification-schedule/create');
        }}
      >
        <AiOutlinePlus /> {intl.formatMessage({ id: 'create_btn' })}
      </CreateButton>
    );
  }
}

const mapStateToProps = state => ({
  // created: state.partner.created
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetCreated: () => NotificationScheduleActions.setCreated(null),
      resetSelected: () => NotificationScheduleActions.setSelected(null),
      getNotificationSchedules:
        NotificationScheduleActions.getNotificationSchedules
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationScheduleCreateButtonContainer)
);
