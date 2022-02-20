import React, { useRef, useEffect } from "react";
// @ts-ignore
import ItemsCarousel from "react-items-carousel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Video from "../Video/display";

import styles from "~/public/styles/pages/components/ImageSlick.module.scss";

interface DisplayProps {
  widget: any;
  locale: string;
  className: string;
  isMobile?: boolean;
}
class DisplayComponent extends React.Component<
  DisplayProps,
  { activeItemIndex: number; slideIndexChangeKey?: string }
> {
  _id?: any;
  interval?: any;
  state = {
    activeItemIndex: 0,
    slideIndexChangeKey: ""
  };
  constructor(props: DisplayProps) {
    super(props);

    this._id = +new Date() + "";
  }

  componentDidMount() {
    this.openLoop();

    if (document.hidden !== undefined) {
      document.addEventListener("visibilitychange", this.onBrowserTabChange);
    }
  }
  componentDidUpdate(prev: DisplayProps) {
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
    document.removeEventListener("visibilitychange", this.onBrowserTabChange);
  }

  onBrowserTabChange = () => {
    if (document.hidden || document.visibilityState === "hidden") {
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

    this.setState((prevState) => ({
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

    return images && images.length > Number(quantity || 1);
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
    return (
      (images && images.filter((v: any) => v && v.src && v.src[locale])) || []
    );
  };

  render() {
    const {
      widget: {
        data: {
          rightArrow,
          leftArrow,
          chevronWidth,
          className,
          infiniteLoop = true
        }
      },
      locale,
      isMobile,
      className: propClassName
    } = this.props;
    const { activeItemIndex, slideIndexChangeKey } = this.state;
    const showChevrons = this.showChevrons();
    const images = this.getImages();
    const slidesToScroll = this.getSlidesToScroll();
    const quantity = this.getQuantity();

    const leftImage = leftArrow || {};
    const leftImageSrc = (leftImage.src && leftImage.src[locale]) || "";
    const leftImageAlt = leftImageSrc;
    const rightImage = rightArrow || {};
    const rightImageSrc = (rightImage.src && rightImage.src[locale]) || "";
    const rightImageAlt = rightImageSrc;
    return (
      <div
        className={[
          "widget_image_slick_editor_style",
          propClassName,
          className
        ].join(" ")}
      >
        <SlickStyle chevronWidth={chevronWidth} _id={this._id} />
        <ItemsCarousel
          classes={{
            itemWrapper: "widget_image_slick_item",
            rightChevronWrapper: `rightChevronWrapper slick_right_${this._id}`,
            leftChevronWrapper: `leftChevronWrapper slick_right_${this._id}`
          }}
          requestToChangeActive={this.onChange}
          infiniteLoop={infiniteLoop}
          activeItemIndex={activeItemIndex}
          chevronWidth={60}
          activePosition={"center"}
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
                  width: leftImage.width || "100%",
                  height: leftImage.height || "100%"
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
                  width: rightImage.width || "100%",
                  height: rightImage.height || "100%"
                }}
              />
            )) ||
            null
          }
        >
          {images?.map((i: any, index: number) => {
            return (
              <MediaItem
                key={`${index}-item`}
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

const MediaItem = ({ item, locale, isMobile, slideIndexChangeKey }: any) => {
  const videoRef = useRef<any>();
  const { src, mobileSrc, width, height, title, borderRadius } = item || {};
  // src
  const imageSrc = (src && src[locale]) || "";
  const imageMobileSrc = (mobileSrc && mobileSrc[locale]) || imageSrc;
  const imgSrc = isMobile ? imageMobileSrc : imageSrc;
  const imageStyle = { width, height, borderRadius };
  const isImage = /\.(png|jpe?g|gif|svg|webp|bmp)(\?.*)?$/.test(imgSrc);
  // alt

  const imageAlt = typeof imageSrc === "object" ? "" : imageSrc;

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
            isPlaying={false}
            widget={{
              data: { src: imgSrc, width: "100%", height: "100%" }
            }}
            locale={locale}
            style={{ width: "100%", height: "100%" }}
          />
        )
      ) : (
        <div style={imageStyle}></div>
      )}

      {title && title[locale] && (
        <p
          style={{
            textAlign: "center",

            color: "#333333",

            paddingTop: "1.78rem"
          }}
        >
          {title[locale] || ""}
        </p>
      )}
    </div>
  );
};

const Wrapper = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return children({ isMobile: !matches });
};

const Display = (props: DisplayProps) => {
  return <Wrapper>{(res) => <DisplayComponent {...props} {...res} />}</Wrapper>;
};
export default Display;
const SlickStyle = ({ chevronWidth, _id }: any) => {
  const isNumber = /^\d+$/.test(`${chevronWidth}`);

  return (
    <style>
      {`
  .leftChevronWrapper.slick_right_${_id}{
    left: ${chevronWidth || 0}${isNumber ? "px" : ""};
    right: unset;
  }
  .rightChevronWrapper.slick_right_${_id}{
    left: unset;
    right: ${`${chevronWidth || 0}`}${isNumber ? "px" : ""};
  }
  `}
    </style>
  );
};
