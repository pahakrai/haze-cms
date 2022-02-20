import React from 'react';

export default class Display extends React.PureComponent {
  render() {
    const {
      widget: {
        data: { src, width, height, text }
      },
      locale
    } = this.props;
    const localeText = text[locale] || '';

    const imageSrc = src[locale] || src || '';
    const imageAlt = typeof imageSrc === 'object' ? '' : imageSrc;

    return (
      <div className="widget_aboutTitle_editor_style">
        <div className="title">
          <img
            alt={imageAlt}
            src={imageSrc}
            style={{
              width: width || '100%',
              height: height || '100%'
            }}
          />
          <p>{localeText}</p>
        </div>
      </div>
    );
  }
}
