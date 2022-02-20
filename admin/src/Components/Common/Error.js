import React from 'react';
import styled from 'styled-components';

const ErrorText = styled.div`
  color: red;
`;

export default ({ errors, name }) => {
  if (!errors) {
    return null;
  }
  let errorArray = [];
  const errorByName = errors[name];
  if (Array.isArray(errorByName)) {
    errorArray = errorByName;
  } else {
    errorArray = [errorByName];
  }

  return (
    <div>
      {errorArray.map((err, errIndex) => (
        <ErrorText key={errIndex}>{err}</ErrorText>
      ))}
    </div>
  );
};
