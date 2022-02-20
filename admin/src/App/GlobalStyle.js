import { createGlobalStyle } from 'styled-components'

import 'antd/dist/antd.min.css'
import 'cropperjs/dist/cropper.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default createGlobalStyle`
  .ant-modal-confirm-btns button:nth-child(1){
    background-color:${(props) => props.theme.color.secondary} !important;
    color:${(props) => props.theme.color.secondaryText} !important;
    border: 0;
  }
  .ant-modal-confirm-btns button:nth-child(2){
    background-color:${(props) => props.theme.color.primary} !important;
    color:${(props) => props.theme.color.primaryText} !important;
    border: 0;
  }
  .ant-modal-confirm-btns button:hover {
    border: 0;
  }
  .react-grid-placeholder{
    background: ${(props) => props.theme.color.primary} !important;
  }
  .ant-switch-checked {
    background-color: ${(props) => props.theme.color.switch} !important;
  }
  .ant-slider-handle{
    border-color:${(props) => props.theme.color.primary} !important;
  }
  .ant-slider-track{
    background-color:${(props) => props.theme.color.primary} !important;
  }
  .ant-time-picker-input, .ant-calendar-picker-input.ant-input {
    height:42px !important;
  }
  .ant-time-picker-panel-narrow .ant-time-picker-panel-input-wrap{
    height:42px !important;
  }
  .ant-time-picker-panel-inner{
    top:2px;
  }
  .ant-calendar-picker-input .ant-calendar-range-picker-separator {
    line-height:30px !important;
  }
  .ant-tabs.user-form-tab{
    overflow: visible;
  }

  .ant-tabs-tab:hover{
    color:${(props) => props.theme.color.hyberlink} !important;
  }
  ant-tabs-tab ant-tabs-tab-active{
    color:${(props) => props.theme.color.hyberlink} !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color:${(props) => props.theme.color.hyberlink} !important;
    font-weight: 500;
  }
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active {
    color:${(props) => props.theme.color.hyberlink} !important;
  }
  .ant-tabs-tab-btn:focus, .ant-tabs-tab-remove:focus, .ant-tabs-tab-btn:active, .ant-tabs-tab-remove:active {
    color:${(props) => props.theme.color.hyberlink} !important;
  }
  .ant-spin-container::after{
    background-color: transparent !important;
  }

  .ant-select-auto-complete .ant-select-selector,
  .ant-select-selection-search-input,
  .ant-tree-select .ant-select-selector,
  .ant-select-single .ant-select-selector{
    height:42px !important;
  }
  .ant-select-auto-complete .ant-select-selection-search input{
    color: #000;
    font-size: 16px;
    font-weight: 600;
  }
  .ant-select-disabled.ant-select-auto-complete .ant-select-selection-search input{
    color: #999;
  }

  .ant-select-selection__placeholder, .ant-select-selection-placeholder{
    line-height: 42px !important;
    color: #777 !important;
    font-size: 16px;
    font-weight: 600;
  }
  .ant-picker input {
    height: 33px !important;
  }
  .ant-picker {
    border-radius: 4px !important;
  }
  .ant-select-auto-complete .ant-select-selection-item,
  .ant-tree-select .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selection-item{
    line-height: 42px !important;
  }
  .ant-select-multiple .ant-select-selection-item{
    height: 33px !important;
    line-height: 30px !important;
  }
  .ant-tree-select {
    width: 100%;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected.customclass {
    background-color: ${(props) => props.theme.color.primary} !important;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  .ant-pagination .ant-pagination-options .ant-pagination-options-quick-jumper {
    display: inline-block;
    height: 32px;
    line-height: 43px;
    vertical-align: top;
  }
`
