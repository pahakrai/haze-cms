import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { TextInputNoField as TextInput } from '../../Components/Form/TextInput';
import { DatePickerNoField } from '../../Components/Form/DatePicker';
import { RowWrapper, ColWrapper } from '../../Components/App/Form/Wrapper';
import Card from '../../Components/Common/Card';
import Button from '../../Components/Common/Button';
import H3 from '../../Components/Common/H3';
import { Dropdown } from '../../Components/Form/Dropdown';
import { toast } from '../../Lib/Toast';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const modalStyle = {
  content: {
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '24rem',
    maxHeight: '95%',
    left: '50%',
    padding: '2rem 2rem 6rem 3.2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '32rem',
    width: '80%',
    maxWidth: '96rem',
    height: '75vh'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const Container = styled.div`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
`;

const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -32px;
  margin-bottom: 30px;
  padding: 10px 32px;
  border-bottom: 1px solid rgb(226, 226, 226);
  align-items: center;
`;
const IconButton = styled(Button)`
  padding: 10px 14px;
  display: block;
  position: relative;
  width: auto;
  min-width: auto;
`;

const validate = values => {
  const errors = {};
  if (!values.name) errors.name = <FormattedMessage id={'error.required'} />;
  if (!values.countryCode)
    errors.countryCode = <FormattedMessage id={'error.required'} />;

  return Object.keys(errors).length > 0 ? errors : false;
};
class DnCalendar extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  state = {
    selectEvent: {
      countryCode: ''
    },
    updateMode: false,
    errors: {},
    openModal: false
  };

  onSelectEvent = event => {
    this.setState({
      selectEvent: event,
      openModal: true,
      updateMode: true
    });
  };

  onEventResize = ({ end, start, event, isAllDay, resourceId }) => {
    const { updateHoliday } = this.props;
    const result = {
      ...event,
      date: moment(start).format('YYYY-MM-DD')
    };
    updateHoliday({
      id: event._id,
      value: result
    });
    toast.success(<FormattedMessage id="updated_successfully" />);
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    const { updateHoliday } = this.props;
    const result = {
      ...event,
      date: moment(start).format()
    };
    updateHoliday({
      id: event._id,
      value: result
    });

    toast.success(<FormattedMessage id="updated_successfully" />);
  };

  onSelectSlot = ({ start, end }) => {
    this.setState({
      selectEvent: {
        ...this.state.selectEvent,
        date: start
      },
      updateMode: false,
      openModal: true
    });
  };

  onDelete = () => {
    const { deleteHoliday } = this.props;
    deleteHoliday(this.state.selectEvent._id);
    this.onCloseClick();
  };

  onSubmit = () => {
    const { updateMode, selectEvent } = this.state;
    const { createHoliday, updateHoliday } = this.props;

    const errors = validate(selectEvent);
    if (errors) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ errors: {} });
    }

    if (updateMode) {
      updateHoliday({
        id: selectEvent._id,
        value: selectEvent
      });
    } else {
      createHoliday({
        date: moment(selectEvent.date).format(),
        name: selectEvent.name,
        countryCode: selectEvent.countryCode
      });
    }

    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    this.setState({
      openModal: false,
      selectEvent: {}
    });
  };

  onCloseClick = () => {
    this.setState({
      openModal: false,
      selectEvent: { countryCode: '' },
      updateMode: false
    });
  };

  render() {
    const { events, intl, regions } = this.props;
    const { updateMode } = this.state;
    const {
      onEventDrop,
      onEventResize,
      onSelectEvent,
      onSelectSlot,
      onCloseClick
    } = this;
    const { selectEvent, errors, openModal } = this.state;
    const regionsOptions = regions.map(v => ({
      label: v.name[intl.locale],
      value: v._id
    }));
    return (
      <div>
        <Container>
          <Modal
            style={{
              ...modalStyle,
              content: { ...modalStyle.content }
            }}
            isOpen={openModal}
            closeTimeoutMS={100}
            contentLabel="Modal"
            ariaHideApp={false}
          >
            <ModalHeaderContainer>
              <H3>
                {updateMode
                  ? intl.formatMessage({ id: 'update_btn' })
                  : intl.formatMessage({ id: 'create_btn' })}
              </H3>
              <IconButton type="button" onClick={onCloseClick}>
                x
              </IconButton>
            </ModalHeaderContainer>
            <RowWrapper>
              <ColWrapper xs={12}>
                {regionsOptions.length && (
                  <Dropdown
                    name="countryCode"
                    intl={intl}
                    label={intl.formatMessage({ id: 'calendar_country' })}
                    input={{
                      value: selectEvent && selectEvent.countryCode,
                      onChange: value => {
                        this.setState({
                          selectEvent: { ...selectEvent, countryCode: value }
                        });
                      }
                    }}
                    meta={{
                      touched: selectEvent.countryCode ? false : true,
                      error: !selectEvent.countryCode
                        ? errors.countryCode
                        : null
                    }}
                    options={regionsOptions}
                  />
                )}
              </ColWrapper>
            </RowWrapper>
            <RowWrapper>
              <ColWrapper xs={12}>
                <TextInput
                  label={intl.formatMessage({ id: 'calendar_name' })}
                  name="name"
                  input={{
                    value: selectEvent && selectEvent.name,
                    onChange: value => {
                      this.setState({
                        selectEvent: { ...selectEvent, name: value }
                      });
                    }
                  }}
                  meta={{
                    touched: selectEvent.name ? false : true,
                    error: selectEvent.name ? null : errors.name
                  }}
                />
              </ColWrapper>
              <ColWrapper xs={12}>
                <DatePickerNoField
                  label={intl.formatMessage({ id: 'calendar_date' })}
                  input={{
                    value: selectEvent && selectEvent.date,
                    onChange: value => {
                      this.setState({
                        selectEvent: {
                          ...selectEvent,
                          date: value
                        }
                      });
                    }
                  }}
                  dateFormat="yyyy-MM-dd hh:mm aa"
                  showTimeSelect
                />
              </ColWrapper>
            </RowWrapper>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                bottom: '10px',
                right: '0',
                paddingRight: 'calc(4rem / 2)'
              }}
            >
              <Button.Primary onClick={() => this.onSubmit()}>
                {updateMode
                  ? intl.formatMessage({ id: 'update_btn' })
                  : intl.formatMessage({ id: 'create_btn' })}
              </Button.Primary>

              {updateMode && (
                <Button.Danger
                  style={{ marginLeft: '10px' }}
                  onClick={() => this.onDelete()}
                >
                  {intl.formatMessage({ id: 'display_delete' })}
                </Button.Danger>
              )}
            </div>
          </Modal>
        </Container>
        <div>
          <Card style={{ marginTop: 0 }}>
            <DnDCalendar
              resizable={true}
              selectable={true}
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={onSelectSlot}
              onSelectEvent={onSelectEvent}
              onEventResize={onEventResize}
              onEventDrop={onEventDrop}
              style={{ height: '60vh' }}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(DnCalendar);
