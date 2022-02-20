import * as React from 'react';
import { FormattedMessage, MediaLibrary } from '@golpasal/editor';

export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange, locale } = this.props;
    // data
    const cardData = widget.data.cardData;
    // widget form
    const updateData = data =>
      onChange({
        ...widget,
        data: {
          ...widget.data,
          ...data
        }
      });
    return (
      <React.Fragment>
        <div className={'widget_form widget_inside_form'}>
          {Array(4)
            .fill('')
            .map((_, index) => {
              const newCardData = [...cardData];
              const data = newCardData[index];
              return (
                <div key={index}>
                  <h3>
                    <FormattedMessage id="widget.section" />({index + 1})
                  </h3>
                  <h5>
                    <FormattedMessage id="widget.title" />
                  </h5>
                  <input
                    type="text"
                    value={(data && data.title && data.title[locale]) || ''}
                    onChange={ev => {
                      newCardData[index] = { ...data };
                      newCardData[index].title = {
                        ...(newCardData[index].title || {}),
                        [locale]: ev.target.value
                      };
                      updateData({ cardData: newCardData });
                    }}
                  />
                  <h5>
                    <FormattedMessage id="widget.content" />
                  </h5>
                  <textarea
                    type="text"
                    value={(data && data.content && data.content[locale]) || ''}
                    onChange={ev => {
                      newCardData[index] = { ...data };
                      newCardData[index].content = {
                        ...(newCardData[index].content || {}),
                        [locale]: ev.target.value
                      };
                      updateData({ cardData: newCardData });
                    }}
                  />
                  <h5>
                    <FormattedMessage id="widget.icon" />
                  </h5>
                  <MediaLibrary
                    multiple={false}
                    urls={
                      data && data.icon && data.icon[locale]
                        ? [data.icon[locale]]
                        : []
                    }
                    type={['image']}
                    onChange={newUrls => {
                      newCardData[index] = { ...data };
                      newCardData[index].icon = {
                        ...(newCardData[index].icon || {}),
                        [locale]: newUrls[0]
                      };
                      updateData({ cardData: newCardData });
                    }}
                  />
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
