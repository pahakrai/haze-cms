import React, { useCallback } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { IoIosRemoveCircle, IoIosAddCircle } from 'react-icons/io';

import { ErrorMessage } from '../../../Form/Errors';

import { ProductContentItem } from './OrderProducts.styled';

const Wrapper = styled(ProductContentItem)`
    display: flex;
    line-height:40px
    padding-right: 10px;
    align-items: center;
    margin-bottom: 0px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;
const Value = styled.div`
  margin: 0 7px;
  line-height: 25px;
  user-select: none;
`;

const iconStyle = {
  cursor: 'pointer'
};
export const OrderNumberControl = ({
  input,
  meta: { error },
  changeCondition = () => true,
  style,
  label,
  editMode
}) => {
  const onAdd = useCallback(() => {
    const value = Number(input.value) + 1;
    changeCondition(value) && input.onChange(value);
  }, [input, changeCondition]);
  const onRemove = useCallback(() => {
    const value = Number(input.value) - 1;
    changeCondition(value) && input.onChange(value);
  }, [input, changeCondition]);

  return (
    <div style={{ marginBottom: 0 }}>
      <Wrapper>
        <span style={{ whiteSpace: 'nowrap' }}>{label}</span>:
        <div style={style}>
          {!editMode ? (
            ` ${input.value || 0}`
          ) : (
            <Container>
              <IoIosRemoveCircle
                size={20}
                onClick={onRemove}
                style={iconStyle}
              />
              <Value>{input.value}</Value>
              <IoIosAddCircle size={20} onClick={onAdd} style={iconStyle} />
            </Container>
          )}
        </div>
      </Wrapper>
      {editMode && error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
export default props => {
  return <Field {...props} component={OrderNumberControl} />;
};
