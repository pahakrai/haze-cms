import styled from 'styled-components';

const Label = styled.label`
  color: #a4a6ae;
  font-size: 1.36rem;
  font-weight: 300;
`;

const LabelField = styled.span`
  display: block;
  color: #7b7e8a;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 1.6rem;
`;

Label.Field = LabelField;

export default Label;
