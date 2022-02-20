import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from '@golpasal/editor';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 22px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;
const Tab = styled.div`
  margin-right: 20px;
  padding: 15px 26px;
  font-size: 14px;
  font-weight: 400;
  color: ${props => (props.active ? '#22ac38' : '#666666')};
  line-height: 20px;
  border-bottom: 2px solid ${props => (props.active ? '#22ac38' : '#fff')};
  cursor: pointer;
`;

export const TabHeader = ({ activeKey, onChange }) => {
  const tabs = ['tab1', 'tab2', 'tab3'];

  return (
    <Container>
      {tabs.map((text, index) => (
        <Tab
          key={index}
          active={activeKey === index}
          onClick={() => onChange(index)}
        >
          <FormattedMessage id={`widget.${text}`} />
        </Tab>
      ))}
    </Container>
  );
};

export default TabHeader;
