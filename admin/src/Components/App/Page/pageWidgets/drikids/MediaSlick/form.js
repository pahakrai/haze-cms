import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import {
  BaseTab,
  ImageTab,
  OthersTab,
  TabHeader,
  ImageEditForm
} from './Components';

const GlobalStyle = createGlobalStyle`
  .page_editor_widget_form_left {
    padding: 0px !important;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;
const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
`;
const TabContent = styled.div`
  flex: 1;
  padding: 16px 20px;
  overflow: auto;
`;

export default class Form extends React.PureComponent {
  state = {
    activeTab: 0,
    isOpenImageForm: false,
    imageEditFormProps: {}
  };
  onChange = values => {
    const { widget, onChange } = this.props;
    const cloneWidget = {
      ...widget,
      data: {
        ...widget.data,
        ...values
      }
    };
    onChange(cloneWidget);
  };

  onTabChange = activeTab => {
    const { activeTab: currenctActiveTab } = this.state;
    if (currenctActiveTab !== activeTab) {
      this.setState({
        activeTab,
        isOpenImageForm: false,
        imageEditFormProps: {}
      });
    }
  };

  openImageForm = props => {
    this.setState({
      isOpenImageForm: true,
      imageEditFormProps: props
    });
  };
  onCloseImageForm = () => {
    this.setState({
      isOpenImageForm: false,
      imageEditFormProps: {}
    });
  };

  render() {
    const { widget, locale, renderEditorWidgetFormRight } = this.props;
    const { activeTab, isOpenImageForm, imageEditFormProps } = this.state;
    const TabComp = [BaseTab, ImageTab, OthersTab][activeTab];

    return (
      <React.Fragment>
        <GlobalStyle />
        <TabHeader activeKey={activeTab} onChange={this.onTabChange} />
        <TabContainer>
          <TabContent>
            <TabComp
              onChange={this.onChange}
              widget={widget}
              locale={locale}
              openImageForm={this.openImageForm}
            />
          </TabContent>
          {activeTab === 0 && renderEditorWidgetFormRight}
          {isOpenImageForm && (
            <ImageEditForm
              widget={widget}
              locale={locale}
              onClose={this.onCloseImageForm}
              {...imageEditFormProps}
            />
          )}
        </TabContainer>
      </React.Fragment>
    );
  }
}
