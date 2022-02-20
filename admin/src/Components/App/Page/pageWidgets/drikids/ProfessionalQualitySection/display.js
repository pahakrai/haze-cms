import React from 'react';

import useAntdBreakpoint from '../../../../../..//Lib/common/useAntdBreakpoint';

const Display = ({
  widget: {
    data: { title, content, left, center, right }
  },
  locale
}) => {
  const leftImage = left || {};
  const leftImageSrc =
    (leftImage.src && leftImage.src[locale]) || leftImage.src || '';
  const leftImageAlt = typeof leftImageSrc === 'object' ? '' : leftImageSrc;

  const rightImage = right || {};
  const rightImageSrc =
    (rightImage.src && rightImage.src[locale]) || rightImage.src || '';
  const rightImageAlt = typeof rightImageSrc === 'object' ? '' : rightImageSrc;

  const centerImage = center || {};
  const centerImageSrc =
    (centerImage.src && centerImage.src[locale]) || centerImage.src || '';
  const centerImageAlt =
    typeof centerImageSrc === 'object' ? '' : centerImageSrc;

  const breakpoint = useAntdBreakpoint();
  const isMobile = !breakpoint.lg && !breakpoint.xl && !breakpoint.xxl;
  return isMobile ? (
    <div className="widget_imageRight_editor_style">
      <div
        style={{
          flex: 1,
          paddingTop: 21,
          width: '100%'
        }}
      >
        <p className="title">{title[locale]}</p>
        <div className="content" style={{ fontSize: 14, paddingTop: '8.5px' }}>
          {content[locale]}
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            className="image_wrapper"
            style={{ width: '53.1rem', height: '14.8rem' }}
          >
            <div className="image_wrapper_flex">
              <img
                style={{ width: '10rem', height: '10rem' }}
                alt={leftImageSrc}
                src={leftImageSrc}
              />
            </div>
            <div className="image_wrapper_flex">
              <img
                style={{
                  width: '7.85rem',
                  height: '7.85rem'
                }}
                alt={centerImageSrc}
                src={centerImageSrc}
              />
            </div>
          </div>
          <div className="wrapper_right_mobile_image">
            <img
              style={{ width: '14.7rem', height: '14.7rem' }}
              alt={rightImageSrc}
              src={rightImageSrc}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="widget_imageRight_editor_style">
      <div className="wrapper_left">
        <p className="title">{title[locale]}</p>
        <div className="content" style={{ paddingTop: 17 }}>
          {content[locale]}{' '}
        </div>

        <div className="image_wrapper" style={{ height: '20rem' }}>
          <div className="image_wrapper_flex">
            <img
              alt={leftImageAlt}
              style={{ width: left.width, height: left.height }}
              src={leftImageSrc}
            />
          </div>
          <div className="image_wrapper_flex">
            <img
              alt={centerImageAlt}
              style={{
                width: center.width,
                height: center.height
              }}
              src={centerImageAlt}
            />
          </div>
        </div>
      </div>

      <div className="wrapper_right">
        <div>
          <img
            style={{
              width: right.width,
              height: right.height
            }}
            alt={rightImageAlt}
            src={rightImageAlt}
          />
        </div>
      </div>
    </div>
  );
};

export default Display;
