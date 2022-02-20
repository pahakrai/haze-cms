import React, { useRef, useEffect } from 'react';

import Video from '../../Video/display';

export const IntroVideoCard = ({
  slideIndexChangeKey,
  isMobile,
  locale,
  item
}) => {
  const { media } = item;

  const _mediaStyle = isMobile
    ? {
        height: media.mobileHeight,
        width: '100%',
        borderRadius: media.borderRadius
      }
    : {
        height: media.height,
        width: media.width,
        borderRadius: media.borderRadius
      };
  const src = media && media.src && media.src[locale];
  const title = item.title && item.title[locale];
  const description = item.description && item.description[locale];
  const icon =
    item.titleIcon && item.titleIcon.src && item.titleIcon.src[locale];
  const iconStyle = {
    height: item.titleIcon && item.titleIcon.height,
    width: item.titleIcon && item.titleIcon.width
  };

  return (
    <div className={!isMobile ? 'intro-video-card' : 'intro-video-card-mobile'}>
      <Media
        src={src}
        style={_mediaStyle}
        slideIndexChangeKey={slideIndexChangeKey}
      />
      <div>
        <div style={!isMobile ? { paddingLeft: 40 } : { marginTop: 20 }}>
          {icon && (
            <img
              alt="icon"
              className={
                !isMobile
                  ? 'intro-video-card-icon'
                  : 'intro-video-card-icon-mobile'
              }
              src={icon}
              style={iconStyle}
            />
          )}
          {title && (
            <div
              className={
                !isMobile
                  ? 'intro-video-card-title'
                  : 'intro-video-card-title-mobile'
              }
            >
              {title}
            </div>
          )}
          {description && (
            <div
              className={
                !isMobile
                  ? 'intro-video-card-description'
                  : 'intro-video-card-description-mobile'
              }
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Media = ({ src, style, slideIndexChangeKey }) => {
  const videoRef = useRef();
  const isImage = /\.(png|jpe?g|gif|svg|webp|bmp)(\?.*)?$/.test(src);

  // stop video on slide change
  useEffect(() => {
    if (slideIndexChangeKey && videoRef.current) {
      videoRef.current.onPause();
    }
  }, [slideIndexChangeKey]);

  if (!src) {
    return <div style={style}></div>;
  }

  return isImage ? (
    <img alt="icon" src={src} style={style} />
  ) : (
    <Video
      ref={videoRef}
      widget={{
        data: { src: src, width: '100%', height: '100%' }
      }}
      style={{ ...style, overflow: 'hidden' }}
    />
  );
};

export default IntroVideoCard;
