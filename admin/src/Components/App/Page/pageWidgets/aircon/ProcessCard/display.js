import React from 'react';
import useAntdBreakpoint from '../../../../../../Lib/common/useAntdBreakpoint';

export default ({
  widget: {
    data: {
      cards,
      cardStyle: { height }
    }
  },
  locale
}) => {
  const breakpoint = useAntdBreakpoint();
  const isMobile = !breakpoint.xl && !breakpoint.lg && !breakpoint.md;

  return (
    <div className="widget_process_card_style">
      {cards.map((card, index) => {
        const image = card.image && card.image[locale];
        const title = card.title && card.title[locale];
        const description = card.description && card.description[locale];

        return (
          <div
            key={index}
            className={`card_item ${index % 2 !== 0 ? 'card_reverse' : ''} ${
              isMobile ? 'card_mobile' : ''
            }`}
          >
            <div
              className="card_item_image"
              style={{ maxHeight: `${height}px` }}
            >
              <div className="image_arrow" />
              <img
                src={image}
                alt="info"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div>
              <div
                className="card_item_content"
                style={{ height: `${height}px` }}
              >
                <div className="card_item_title">{title}</div>
                <div className="card_item_description">{description}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
