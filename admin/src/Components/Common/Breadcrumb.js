import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const BreadcrumbWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Breadcrumb = styled.div`
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  color: ${props => (props.disabled ? '#000' : props.theme.color.primary)};
  margin-left: ${props => (props.index > 0 ? '30px' : '0px')};
  position: relative;
  ${props =>
    props.index > 0
      ? `
    &:before {
      content: '/';
      position: absolute;
      left: -20px;
      top: 0;
      color: #a1a1a1;
      cursor: default;
    }
    `
      : ''};
`;

export default withRouter(({ items, history }) => (
  <BreadcrumbWrapper>
    {items.map((item, itemIndex) => (
      <Breadcrumb
        key={itemIndex}
        index={itemIndex}
        disabled={item.to === undefined}
        onClick={() => {
          if (item.to) history.push(item.to);
        }}
      >
        {item.localeId ? <FormattedMessage id={item.localeId} /> : item.name}
      </Breadcrumb>
    ))}
  </BreadcrumbWrapper>
));
