import moment from 'moment';

const format = 'YYYY-MM-DD HH:mmZ';

export const TimeFormatString = time =>
  time ? moment(time).format(format) : '';

export const StringFormatTime = str => moment(str, format);

export default (keynames, times) => {
  return {
    [keynames[0]]: TimeFormatString(times[0]),
    [keynames[1]]: TimeFormatString(times[1])
  };
};
