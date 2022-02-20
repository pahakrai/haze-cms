import React from 'react';
import { FormattedMessage } from 'react-intl';
import SelectList from './SelectList';

const WeekOptions = [
  [<FormattedMessage id="week_1" />, 1],
  [<FormattedMessage id="week_2" />, 2],
  [<FormattedMessage id="week_3" />, 3],
  [<FormattedMessage id="week_4" />, 4],
  [<FormattedMessage id="week_5" />, 5],
  [<FormattedMessage id="week_6" />, 6],
  [<FormattedMessage id="week_7" />, 0]
].map(v => ({ value: v[0], key: v[1] }));

export default props => (
  <SelectList selects={WeekOptions} mode="number" {...props} />
);
