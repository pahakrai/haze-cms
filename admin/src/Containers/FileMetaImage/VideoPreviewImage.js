import React from 'react';

export const VideoPreviewImage = ({
  src,
  style = {},
  height = style.height || 100,
  width = style.width || 100
}) => {
  return (
    <div>
      <video height={height} width={width}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPreviewImage;
