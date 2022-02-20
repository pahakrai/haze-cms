import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import Editor from '../../../../../Common/Editor';

const GlobalStyle = createGlobalStyle`
  .page-text-editor.page-text-editor-form {
    min-height: 300px !important;
  }
`;
export default class TextEditorForm extends React.PureComponent {
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
    const { widget, locale } = this.props;
    const localeData = widget.data[locale] || widget.data;
    return (
      <>
        <GlobalStyle />
        <Editor
          editorClassName="page-text-editor page-text-editor-form"
          value={localeData.text}
          onChange={this.onChange}
          locale={locale}
        />
      </>
    );
  }
}
