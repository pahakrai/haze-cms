import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  height: 41px;

  & input {
    display: inline-block;
  }

  & button {
    margin: 0 0 0 10px;
  }
`;
