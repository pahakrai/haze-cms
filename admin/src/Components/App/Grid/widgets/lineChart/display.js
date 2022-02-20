import React from 'react';
import styled from 'styled-components';
import { IoIosStats } from 'react-icons/io';
import P from '../../../../Common/P';

const Layout = styled.div`
  padding: 4px;
`;

const PlotlyIcon = styled(IoIosStats)`
  cursor: pointer;
`;

export default props => (
  <Layout>
    <PlotlyIcon size={30} {...props} />
    <P>BarChart</P>
  </Layout>
);
