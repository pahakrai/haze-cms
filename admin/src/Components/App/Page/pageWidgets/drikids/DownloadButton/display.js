import React from 'react';

export default class Display extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showHoverImage: false
    };
  }
  handlerClick = (target, href) => {
    if (href && target !== 'hover') {
      window.open(href, target);
    }
    if (target === 'hover') {
      this.setState({ showHoverImage: true });
    }
  };

  render() {
    const {
      widget: {
        data: {
          width,
          height,
          icon,
          href,
          borderRadius,
          hrefTarget,
          backgroundColor,
          color,
          fontSize,
          fontFamily,
          hoverWidth
        }
      },
      widget,
      locale
    } = this.props;

    const { showHoverImage } = this.state;
    const localeData = widget.data[locale] || { text: 'submit' };

    return (
      <div>
        <button
          type="button"
          onClick={() => this.handlerClick(hrefTarget, href)}
          onMouseEnter={() => {
            this.setState({ showHoverImage: true });
          }}
          onMouseLeave={() => {
            this.setState({ showHoverImage: false });
          }}
          style={{
            width: width || '65px',
            height: height || '50px',
            borderRadius: borderRadius || '0px',
            padding: 0,
            margin: 0,
            background: backgroundColor || 'rgba(241, 112, 19, 1)',
            color: color || '#fff',
            border: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {icon.url && (
              <img
                style={{
                  width: icon.width || '20px',
                  height: icon.height || '20px'
                }}
                src={icon.url}
                alt=""
              />
            )}
            {localeData.text && (
              <div
                style={{
                  fontSize,
                  fontFamily,
                  maxWidth: '17rem',
                  paddingLeft: 10
                }}
              >
                {localeData.text}
              </div>
            )}
          </div>
        </button>
        {showHoverImage && hrefTarget === 'hover' && (
          <div
            style={{
              width: hoverWidth,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              margin: 'auto'
            }}
            onMouseEnter={() => {
              this.setState({ showHoverImage: true });
            }}
            onMouseLeave={() => {
              this.setState({ showHoverImage: false });
            }}
          >
            <div style={{ margin: '10px' }}>
              <img
                style={{ width: '100%', height: '100%' }}
                alt="url error"
                src={href}
              ></img>
            </div>
          </div>
        )}
      </div>
    );
  }
}
