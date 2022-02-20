import React from 'react';
import {} from '@golpasal/editor';

export default class Display extends React.PureComponent {
  render() {
    const {
      widget: {
        data: { cardData }
      },
      locale
    } = this.props;
    return (
      <div className="widget_HomeIntroCard_editor_style">
        <div className="info_card_wrapper">
          <Card bgColor="#E4F4FF" data={cardData[0] || {}} locale={locale} />
          <Card bgColor="#FFF1E9" data={cardData[1] || {}} locale={locale} />
        </div>
        <div className="info_card_wrapper">
          <Card bgColor="#FFF4DE" data={cardData[2] || {}} locale={locale} />
          <Card bgColor="#E3FFF0" data={cardData[3] || {}} locale={locale} />
        </div>
      </div>
    );
  }
}

const Card = ({ style, bgColor, data, locale }) => {
  const title = data.title ? data.title[locale] || data.title : '';
  const content = data.content ? data.content[locale] || data.content : '';
  const icon = data.icon ? data.icon[locale] || data.icon : '';

  return (
    <div style={{ backgroundColor: bgColor }} className="info_card">
      <div className="detail">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </div>
      <div
        className="card_icon"
        style={{
          backgroundImage: `url(${icon})`
        }}
      ></div>
    </div>
  );
};
