import React from 'react';

export default class Display extends React.PureComponent {
  render() {
    const { widget, locale } = this.props;

    return (
      <div className="widget_accessSection_editor_style">
        {widget.data.images.map((v: any, i: number) => {
          const localeText = v.title[locale] || '';

          const imageSrc = v.src[locale] || v.src || '';
          const imageAlt = typeof imageSrc === 'object' ? '' : imageSrc;
          return (
            <div key={i} className="widget_accessSection_wrapper">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: 160,
                    height: 140,
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    style={{
                      width: v.width || '100%',
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      marginTop: '-30px',
                      marginLeft: `-${Number(v.width.replace('px', '')) / 2}px`
                    }}
                  />
                </div>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#333',
                    fontSize: 16,
                    fontFamily: 'PingFang SC'
                  }}
                >
                  {localeText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
