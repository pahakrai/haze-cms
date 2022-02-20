import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import DatePickerInput, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import esUs from 'date-fns/locale/en-US';
import zhCN from 'date-fns/locale/zh-CN';
import zhTW from 'date-fns/locale/zh-TW';

// start week on sunday
const formatLocale = opts => ({
  ...opts,
  options: {
    ...opts.options,
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
});
registerLocale('en', formatLocale(esUs));
registerLocale('zh-cn', formatLocale(zhCN));
registerLocale('zh-hk', formatLocale(zhTW));

const DatePickerWrapper = styled.div`
  &
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list {
    padding: 0;
    display: block;
  }
  & .react-datepicker-wrapper {
    display: ${props => (props.block ? 'block' : 'inline-block')};
  }
  & .react-datepicker__input-container {
    display: ${props => (props.block ? 'block' : 'inline-block')};
  }
  & .react-datepicker__input-container > div {
    display: ${props => (props.block ? 'block' : 'inline-block')};
  }
  & .react-datepicker-popper {
    z-index: 2;
  }
  & .react-datepicker--time-only {
    & .react-datepicker__time,
    & .react-datepicker__time-box {
      border-bottom-left-radius: 0.48rem;
      border-bottom-right-radius: 0.48rem;
    }
  }
  & .react-datepicker__year {
    & .react-datepicker__year-text {
      width: 6.4rem;
    }
  }
  & .react-datepicker__month {
    & .react-datepicker__quarter-text {
      width: 6.4rem;
    }
  }

  & .react-datepicker__time-container {
    & &--with-today-button {
      border-radius: 0.48rem;
    }
    & .react-datepicker__time,
    & .react-datepicker__time-box {
      border-bottom-right-radius: 0.48rem;
    }
  }
  & .react-datepicker__day-name,
  & .react-datepicker__day,
  & .react-datepicker__time-name {
    width: 2.72rem;
    line-height: 2.72rem;
  }
  @media (max-width: 400px), (max-height: 550px) {
    & .react-datepicker__day-name,
    & .react-datepicker__day,
    & .react-datepicker__time-name {
      width: 2.72rem;
      line-height: 2.72rem;
    }
  }
`;

export const DATE_FORMAT = 'yyyy-MM-dd';
export const TIME_FORMAT = 'HH:mm';

class DatePicker extends React.PureComponent {
  static propTypes = {
    customInput: propTypes.element
  };
  static defaultProps = {
    onTimeChange: () => true
  };

  render() {
    const {
      block,
      onTimeChange,
      customInput,
      value,
      showTimeSelect = true,
      timeIntervals = 15,
      dateFormat = `${DATE_FORMAT} ${TIME_FORMAT}`,
      intl,
      ...props
    } = this.props;
    return (
      <DatePickerWrapper block={block}>
        <DatePickerInput
          customInput={customInput}
          selected={value ? moment(value).toDate() : null}
          onChange={onTimeChange}
          showTimeSelect={showTimeSelect}
          timeFormat={TIME_FORMAT}
          timeIntervals={timeIntervals}
          dateFormat={dateFormat}
          timeCaption={intl.formatMessage({ id: 'display_time' })}
          locale={intl.locale}
          showMonthDropdown
          showYearDropdown
          dropdownMode="scroll"
          {...props}
        />
      </DatePickerWrapper>
    );
  }
}

export default injectIntl(DatePicker);
