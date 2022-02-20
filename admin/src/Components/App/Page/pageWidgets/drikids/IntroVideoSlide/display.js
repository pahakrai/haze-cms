import React from 'react';
import ItemsCarousel from 'react-items-carousel';

import useAntdBreakpoint from '../../../../../../Lib/common/useAntdBreakpoint';

import IntroVideoCard from './Components/IntroVideoCard';

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
        data: { carouseSpeed, medias }
      }
    } = this.props;

    const {
      widget: {
        data: { carouseSpeed: preCarouseSpeed, medias: prevImage }
      }
    } = prev;
    if (carouseSpeed !== preCarouseSpeed || medias !== prevImage) {
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
    const medias = this.getImages();

    return (
      this.showChevrons() &&
      Number(carouseSpeed) > 0 &&
      medias &&
      medias.length > 1
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
    const medias = this.getImages();
    const quantity = this.getQuantity();

    return medias.length > Number(quantity || 1);
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
        data: { medias }
      }
    } = this.props;
    return medias || [];
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
    const medias = this.getImages();
    const slidesToScroll = this.getSlidesToScroll();
    const quantity = this.getQuantity();

    const leftImage = leftArrow || {};
    const leftImageSrc = (leftImage.src && leftImage.src[locale]) || '';
    const leftImageAlt = leftImageSrc;
    const rightImage = rightArrow || {};
    const rightImageSrc = (rightImage.src && rightImage.src[locale]) || '';
    const rightImageAlt = rightImageSrc;

    return (
      <div className="widget_intro_video_slide_editor_style">
        <SlickStyle chevronWidth={chevronWidth} _id={this._id} />
        <ItemsCarousel
          classes={{
            itemWrapper: 'widget_intro_video_slide_item',
            rightChevronWrapper: `introVideoSlideRightChevronWrapper slick_right_${this._id}`,
            leftChevronWrapper: `introVideoSlideLeftChevronWrapper slick_right_${this._id}`
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
          {medias.map((i, index) => {
            return (
              <IntroVideoCard
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

const SlickStyle = ({ chevronWidth, _id }) => {
  const isNumber = /^\d+$/.test(`${chevronWidth}`);

  return (
    <style>
      {`
  .introVideoSlideLeftChevronWrapper.slick_right_${_id}{
    left: ${chevronWidth || 0}${isNumber ? 'px' : ''};
    right: unset;
  }
  .introVideoSlideRightChevronWrapper.slick_right_${_id}{
    left: unset;
    right: ${`${chevronWidth || 0}`}${isNumber ? 'px' : ''};
  }
  /* admin only */
  .page_base .page_editor_widget,
  .page_base .widget_layout_builder_editor_column,
  .page_base .widget_intro_video_slide_editor_style > div {
    position: static;
  }
  .page_display > div{
    position: relative;
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
