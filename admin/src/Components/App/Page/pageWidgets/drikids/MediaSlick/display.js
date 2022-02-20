import React, { useRef, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';

import useAntdBreakpoint from '../../../../../../Lib/common/useAntdBreakpoint';

import Video from '../Video/display';

class Display extends React.PureComponent {
  interval;
  state = {
    activeItemIndex: 0
  };
  constructor(props) {
    super(props);

    this._id = +new Date() + '';
  }

  componentDidMount() {
    this.openLoop();
    if (document.hidden !== undefined) {
      document.addEventListener('visibilitychange', this.onBrowserTabChange);
    }
  }
  componentDidUpdate(prev) {
    const {
      widget: {
        data: { carouseSpeed, images }
      }
    } = this.props;

    const {
      widget: {
        data: { carouseSpeed: preCarouseSpeed, images: prevImage }
      }
    } = prev;
    if (carouseSpeed !== preCarouseSpeed || images !== prevImage) {
      if (!this.isAutoPlay()) {
        this.closeLoop();
      } else {
        this.openLoop();
      }
    }
  }
  componentWillUnmount() {
    this.closeLoop();
    document.removeEventListener('visibilitychange', this.onBrowserTabChange);
  }
  onBrowserTabChange = () => {
    if (document.hidden || document.visibilityState === 'hidden') {
      this.closeLoop();
    } else {
      this.openLoop();
    }
  };

  openLoop() {
    const {
      widget: {
        data: { carouseSpeed }
      }
    } = this.props;
    if (this.isAutoPlay()) {
      this.closeLoop();
      this.interval = setInterval(this.tick, Number(carouseSpeed) * 1000);
    }
  }
  closeLoop = () => {
    this.interval !== undefined && clearInterval(this.interval);
  };

  tick = () => {
    const slidesToScroll = this.getSlidesToScroll();

    this.setState(prevState => ({
      activeItemIndex: prevState.activeItemIndex + slidesToScroll,
      slideIndexChangeKey: `${+new Date()}`
    }));
  };

  isAutoPlay = () => {
    const {
      widget: {
        data: { carouseSpeed }
      }
    } = this.props;
    const images = this.getImages();

    return (
      this.showChevrons() &&
      Number(carouseSpeed) > 0 &&
      images &&
      images.length > 1
    );
  };

  onChange = (index: number) => {
    this.closeLoop();
    this.setState(
      { activeItemIndex: Number(index), slideIndexChangeKey: `${+new Date()}` },
      () => this.openLoop()
    );
  };

  showChevrons = () => {
    const images = this.getImages();
    const quantity = this.getQuantity();

    return images.length > Number(quantity || 1);
  };

  getQuantity = () => {
    const {
      widget: {
        data: { quantity, mobileQuantity }
      },
      isMobile
    } = this.props;

    return Number((!isMobile ? quantity : mobileQuantity) || 1);
  };
  getSlidesToScroll = () => {
    const {
      widget: {
        data: { slidesToScroll, mobileSlidesToScroll }
      },
      isMobile
    } = this.props;

    return Number((!isMobile ? slidesToScroll : mobileSlidesToScroll) || 1);
  };

  getImages = () => {
    const {
      widget: {
        data: { images }
      },
      locale
    } = this.props;
    return (images && images.filter(v => v && v.src && v.src[locale])) || [];
  };

  render() {
    const {
      widget: {
        data: { rightArrow, leftArrow, chevronWidth, infiniteLoop = true }
      },
      locale,
      isMobile
    } = this.props;
    const { activeItemIndex, slideIndexChangeKey } = this.state;
    const showChevrons = this.showChevrons();
    const images = this.getImages();
    const slidesToScroll = this.getSlidesToScroll();
    const quantity = this.getQuantity();

    const leftImage = leftArrow || {};
    const leftImageSrc = (leftImage.src && leftImage.src[locale]) || '';
    const leftImageAlt = leftImageSrc;
    const rightImage = rightArrow || {};
    const rightImageSrc = (rightImage.src && rightImage.src[locale]) || '';
    const rightImageAlt = rightImageSrc;

    return (
      <div className="widget_image_slick_editor_style">
        <SlickStyle chevronWidth={chevronWidth} _id={this._id} />
        <ItemsCarousel
          classes={{
            itemWrapper: 'widget_image_slick_item',
            rightChevronWrapper: `rightChevronWrapper slick_right_${this._id}`,
            leftChevronWrapper: `leftChevronWrapper slick_right_${this._id}`
          }}
          requestToChangeActive={this.onChange}
          infiniteLoop={infiniteLoop}
          activeItemIndex={Number(activeItemIndex)}
          chevronWidth={60}
          activePosition={'center'}
          numberOfCards={quantity}
          slidesToScroll={slidesToScroll}
          outsideChevron
          firstAndLastGutter={true}
          leftChevron={
            (showChevrons && leftImageSrc && (
              <img
                alt={leftImageAlt}
                src={leftImageSrc}
                style={{
                  borderRadius: leftImage.borderRadius || 0,
                  width: leftImage.width || '100%',
                  height: leftImage.height || '100%'
                }}
              />
            )) ||
            null
          }
          rightChevron={
            (showChevrons && rightImageSrc && (
              <img
                alt={rightImageAlt}
                src={rightImageSrc}
                style={{
                  borderRadius: rightImage.borderRadius || 0,
                  width: rightImage.width || '100%',
                  height: rightImage.height || '100%'
                }}
              />
            )) ||
            null
          }
        >
          {images.map((i, index) => {
            return (
              <MediaItem
                key={index}
                item={i}
                locale={locale}
                isMobile={isMobile}
                slideIndexChangeKey={slideIndexChangeKey}
              />
            );
          })}
        </ItemsCarousel>
      </div>
    );
  }
}

const MediaItem = ({ item, locale, isMobile, slideIndexChangeKey }) => {
  const videoRef = useRef();
  const { src, mobileSrc, width, height, title, borderRadius } = item || {};

  // src
  const imageSrc = (src && src[locale]) || '';
  const imageMobileSrc = (mobileSrc && mobileSrc[locale]) || imageSrc;
  const imgSrc = isMobile ? imageMobileSrc : imageSrc;
  const imageStyle = { width, height, borderRadius };
  const isImage = /\.(png|jpe?g|gif|svg|webp|bmp)(\?.*)?$/.test(imgSrc);

  // alt
  const imageAlt = typeof imageSrc === 'object' ? '' : imageSrc;

  // stop video on slide change
  useEffect(() => {
    if (slideIndexChangeKey && videoRef.current) {
      videoRef.current.onPause();
    }
  }, [slideIndexChangeKey]);
  return (
    <div className="widget_image_slick_item_wrapper">
      {imgSrc ? (
        isImage ? (
          <img alt={imageAlt} src={imgSrc} style={imageStyle} />
        ) : (
          <Video
            ref={videoRef}
            widget={{
              data: { src: imgSrc, width: '100%', height: '100%' }
            }}
            style={{
              ...imageStyle,
              width: width || '100%',
              height: height || '100%'
            }}
          />
        )
      ) : (
        <div style={imageStyle}></div>
      )}
      {title && title[locale] && (
        <p
          style={{
            textAlign: 'center',
            color: '#333333',
            paddingTop: '1.78rem'
          }}
        >
          {title[locale] || ''}
        </p>
      )}
    </div>
  );
};

const SlickStyle = ({ chevronWidth, _id }) => {
  const isNumber = /^\d+$/.test(`${chevronWidth}`);

  return (
    <style>
      {`
  .leftChevronWrapper.slick_right_${_id}{
    left: ${chevronWidth || 0}${isNumber ? 'px' : ''};
    right: unset;
  }
  .rightChevronWrapper.slick_right_${_id}{
    left: unset;
    right: ${`${chevronWidth || 0}`}${isNumber ? 'px' : ''};
  }
  `}
    </style>
  );
};

export default props => {
  const breakpoint = useAntdBreakpoint();
  const isMobile = !breakpoint.xl && !breakpoint.lg && !breakpoint.md;
  return <Display isMobile={isMobile} {...props} />;
};
