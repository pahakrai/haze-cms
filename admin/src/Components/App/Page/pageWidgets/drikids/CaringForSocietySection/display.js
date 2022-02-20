import React from 'react';

import useAntdBreakpoint from '../../../../../..//Lib/common/useAntdBreakpoint';

const Display = ({ widget, locale }) => {
  const breakpoint = useAntdBreakpoint();
  const isMobile = !breakpoint.lg && !breakpoint.xl && !breakpoint.xxl;

  return (
    <div>
      {isMobile ? (
        <div>
          {widget.data.images.map((v: any, i: number) => {
            const localeText = v.title[locale] || '';
            const imageSrc = v.src[locale] || v.src || '';
            const imageAlt = typeof imageSrc === 'object' ? '' : imageSrc;
            return (
              <div
                style={{
                  width: '30%',
                  height: locale === 'en' ? 120 : 100,
                  backgroundColor: '#fff',
                  float: 'left',
                  marginRight: (i + 1) % 3 === 0 ? '' : 10,
                  marginBottom: 10,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexFlow: 'column',
                  alignItems: 'center'
                }}
                key={i}
              >
                <img
                  style={{
                    height: v.height || '100%'
                  }}
                  src={imageSrc}
                  alt={imageAlt}
                />
                <span
                  style={{
                    color: '#333',
                    fontFamily: 'PingFang SC',
                    fontWeight: 500,
                    paddingTop: 10,
                    lineHeight: '15px',
                    maxWidth:
                      locale === 'en' || localeText.length < 7 ? '' : '60px',
                    fontSize: 14,
                    whiteSpace: locale === 'en' ? 'break-spaces' : 'initial'
                  }}
                >
                  {localeText}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="widget_caringForSocietySection_editor_style">
          {widget.data.images.map((v: any, i: number) => {
            const localeText = v.title[locale] || '';

            const imageSrc = v.src[locale] || v.src || '';
            const imageAlt = typeof imageSrc === 'object' ? '' : imageSrc;

            return (
              <div
                key={i}
                className="widget_caringForSocietySection_wrapper"
                style={{
                  flexFlow: 'wrapper'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    marginLeft: 11,
                    marginRight: 11,
                    marginBottom: 22
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      height: 110,
                      textAlign: 'center',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      style={{
                        width: v.width || '100%',
                        marginTop: 15
                      }}
                    />
                  </div>
                  <div
                    style={{
                      color: '#333',
                      fontSize: 16,
                      fontFamily: 'PingFang SC',
                      fontWeight: 500,
                      paddingBottom: 16,
                      textAlign: 'center',
                      height: locale === 'en' ? 45 : 25
                    }}
                  >
                    {localeText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Display;
