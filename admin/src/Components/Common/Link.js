import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BasicLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const LinkStyled = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

export default props =>
  props.to ? <LinkStyled {...props} /> : <BasicLink {...props} />;
