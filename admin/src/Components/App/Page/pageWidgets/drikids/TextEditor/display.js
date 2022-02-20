import React from 'react';

export default class Display extends React.PureComponent {
  render() {
    const { widget, locale } = this.props;
    const localeData = widget.data[locale] || widget.data;
    return (
      <div
        className="widget_text_editor_style"
        dangerouslySetInnerHTML={{
          __html: localeData.text
        }}
      />
    );
  }
}
