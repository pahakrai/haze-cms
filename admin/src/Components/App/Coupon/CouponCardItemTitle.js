import React from 'react';

import { Wrapper, Item } from '../ListCard/title';

export const formatTitleI18nText = ({ intl } = {}) => {
  return {
    code: intl.formatMessage({ id: 'display_coupon_code' }),
    workspace: intl.formatMessage({ id: 'workspace' }),
    name: intl.formatMessage({ id: 'display_coupon_name' }),
    icon: intl.formatMessage({ id: 'display_coupon_icon' }),
    perUserRedeemLimit: intl.formatMessage({
      id: 'display_coupon_perUserRedeemLimit'
    }),
    count: intl.formatMessage({ id: 'display_coupon_count' }),
    applicationTime: intl.formatMessage({
      id: 'display_coupon_applicationTime'
    }),
    deadline: intl.formatMessage({ id: 'display_coupon_deadline' })
    // action: intl.formatMessage({ id: 'actions' })
  };
};

export default ({ intl, isProvider = false }) => {
  const texts = formatTitleI18nText({ intl });
  const titles = [
    { text: texts.code },
    { text: texts.name },
    { text: texts.icon },
    // { text: texts.perUserRedeemLimit },
    { text: texts.count },
    { text: texts.applicationTime },
    { text: texts.deadline }
    // { text: texts.action }
  ];

  return (
    <Wrapper>
      {titles.map((item, index) => {
        if (!item) {
          return null;
        }
        const { text } = item;
        return text ? <Item key={index}>{text}</Item> : null;
      })}
    </Wrapper>
  );
};
