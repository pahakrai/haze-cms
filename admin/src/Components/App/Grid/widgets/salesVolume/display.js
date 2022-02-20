import React from 'react';
import styled from 'styled-components';
import { MdTimeline } from 'react-icons/md';
import P from '../../../../Common/P';

const Layout = styled.div`
  padding: 4px;
`;

const TotalCountIcon = styled(MdTimeline)`
  cursor: pointer;
`;

export default props => (
  <Layout>
    <TotalCountIcon size={30} {...props} />
    <P>businessVolume</P>
  </Layout>
);
