import styled, { createGlobalStyle } from 'styled-components';

import _FieldContainer from '../../../Components/Form/FieldContainer';

export {
  RequireMark,
  HorizontalContainer,
  HorizontalContainerWrapper,
  HorizontalErrorContainer,
  HorizontalFieldLabel,
  TextInputWrapper
} from '../../../Components/Form/form.styled';

export const FieldContainer = styled(_FieldContainer)`
  position: relative;
  z-index: 0;
`;

export const GlobalStyle = createGlobalStyle`
  .ant-select-auto-complete.ant-select .ant-input{
    border: 1px solid rgba(236, 237, 237, 1);
    border-radius: 0px;
    border-color: rgb(224,224,224);
    font-weight: 600;
    color: rgba(51,51,51,1);
    font-size: 16px;
    height: 42px !important;
    padding: 6px 10px;
  }
  .ant-select-auto-complete.ant-select .ant-select-selection--single {
    height: 42px !important;
  }
  .ant-select-selection__placeholder, .ant-select-search__field__placeholder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.51) !important;
    font-weight: 600;
  }
  .ant-cascader-input.ant-input {
    border: 1px solid rgba(236, 237, 237, 1);
    border-radius: 0px;
    border-color: rgb(224,224,224);
    font-weight: 600;
    color: rgba(51,51,51,1);
    font-size: 16px;
    height: 42px !important;
    padding: 6px 10px;
  }
  .ant-cascader-picker-label{
    font-size: 16px;
    font-weight: 600;
    color: rgba(51,51,51,1);
  }
  .ant-cascader-input.ant-input::-webkit-input-placeholder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.51) !important;
    font-weight: 600;
  }
  .ant-cascader-input.ant-input::-moz-placeholder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.51) !important;
    font-weight: 600;
  }
  .ant-cascader-input.ant-input::-ms-input-placeholder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.51) !important;
    font-weight: 600;
  }
  .ant-cascader-picker{
  }
  .ecomm-form-dropdown-control-disabled {
    cursor: default;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
