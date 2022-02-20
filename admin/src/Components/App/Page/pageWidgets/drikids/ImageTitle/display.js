import React from 'react';

export default class Display extends React.PureComponent {
  render() {
    const {
      widget: {
        data: { reverse, src, width, height }
      },
      locale
    } = this.props;

    // h1、h2、h3、h4、h5、h6、p、small
    const localeData = this.props.widget.data[locale] || this.props.widget.data;

    const imageSrc = src[locale] || src || '';
    const imageAlt = typeof imageSrc === 'object' ? '' : imageSrc;

    return (
      <div className="widget_imageTitle_editor_style">
        <div className="image_title">
          <img
            alt="left_corner"
            className="imageTitle_leftcorner"
            src={'/images/left_corner.png'}
          />
          <div
            className="widget_text_editor_style"
            dangerouslySetInnerHTML={{
              __html: localeData.text
            }}
          />
          <img
            alt="right_corner"
            className="imageTitle_rightcorner"
            src={'/images/right_corner.png'}
          />
          <img
            alt={imageAlt}
            src={imageSrc}
            style={{
              width: width || '100%',
              height: height || '100%'
            }}
            className={reverse ? `left-image` : `right-image`}
          />
        </div>
      </div>
    );
  }
}
