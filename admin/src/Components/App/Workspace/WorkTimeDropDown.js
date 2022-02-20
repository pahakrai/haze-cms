import React from 'react';
import { helpers as EcommCommonHelpers } from '@golpasal/common';
import styled from 'styled-components';
import moment from 'moment';

import Dropdown from '../../Form/Dropdown';

const Label = styled.div`
  padding: 3px 0;
  display: inline-block;
  font-weight: 600;
  font-weight: 600;
  color: #666666;
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Worktime = styled.div`
  flex: 1;
`;

const Line = styled.div`
  width: 15px;
  text-align: center;
  margin: 10px auto;
`;

const getTimeOptions = (() => {
  let prevLocale;
  let TimeOptions;
  return locale => {
    if (prevLocale === locale) {
      return TimeOptions;
    } else {
      prevLocale = locale;
      TimeOptions = Array(48)
        .fill('')
        .map((v, i) => {
          const i2 = i % 2 === 0;
          const j = (i - (i2 ? 0 : 1)) / 2;
          const value = 1000 * 60 * 60 * (j + (i2 ? 0 : 0.5));

          return {
            label: EcommCommonHelpers.msTimeToString(value, true, locale),
            value: moment().startOf('day').add(value, 'ms').format('HH:mm')
          };
        });

      return TimeOptions;
    }
  };
})();

const WorkTimeDropDown = ({ intl, ...props }) => {
  const TimeOptions = getTimeOptions(intl.locale);
  return (
    <div>
      <Label>
        {intl.formatMessage({
          id: 'display_recruitment_worktime'
        })}
      </Label>
      <Wrapper>
        <Worktime>
          <Dropdown
            noLabel
            name="contacts[0].serviceHour.worktime.from"
            options={TimeOptions}
          />
        </Worktime>
        <Line>-</Line>
        <Worktime>
          <Dropdown
            noLabel
            name="contacts[0].serviceHour.worktime.to"
            options={TimeOptions}
          />
        </Worktime>
      </Wrapper>
    </div>
  );
};

export default WorkTimeDropDown;
