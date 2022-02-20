import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import Editor from '../../../../../Common/Editor';

const GlobalStyle = createGlobalStyle`
.page_editor_layout{
  overflow: visible !important;
}
.widget_text_editor_style {
  .rdw-editor-toolbar{
    position: absolute;
    transform: translateY(-100%);
  }
  .public-DraftStyleDefault-block{
    margin-top:0px;
    margin-bottom:0px;
  }
}
`;
export default class TextEditor extends React.PureComponent {
  onChange = text => {
    const { widget, locale, onChange } = this.props;
    const localeData = widget.data[locale] || widget.data;
    onChange({
      ...widget,
      data: {
        ...widget.data,
        ...(locale ? { [locale]: { ...localeData, text } } : { text })
      }
    });
  };

  render() {
    const { widget, openForm, locale } = this.props;
    const { _id } = widget;
    const localeData = widget.data[locale] || widget.data;
    return (
      <div
        className="widget_text_editor_style"
        onClick={ev => ev.stopPropagation()}
        onDoubleClick={ev => {
          ev.stopPropagation();
          openForm(_id);
        }}
      >
        <GlobalStyle />
        <Editor
          editorClassName="page-text-editor"
          toolbarOnFocus
          value={localeData.text}
          onChange={this.onChange}
          locale={locale}
        />
      </div>
    );
  }
}
