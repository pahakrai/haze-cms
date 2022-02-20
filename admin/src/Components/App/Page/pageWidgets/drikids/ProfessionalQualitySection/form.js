import * as React from 'react';
import { widgets, FormattedMessage } from '@golpasal/editor';

export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange, locale } = this.props;
    const title = widget.data.title[locale] || widget.data.title || '';
    const content = widget.data.content[locale] || widget.data.content || '';
    const ImageForm = widgets.image.form;
    return (
      <React.Fragment>
        <div className={'widget_form widget_inside_form'}>
          <FormattedMessage id="widget.text" />
          {': '}
          <input
            style={{ display: 'inline-block' }}
            type="text"
            value={title}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  title: {
                    ...widget.data.title,
                    [locale]: ev.target.value
                  }
                }
              })
            }
          />
        </div>
        <br />
        <br />

        <FormattedMessage id="widget.content" />
        {': '}
        <input
          style={{ display: 'inline-block' }}
          type="text"
          value={content}
          onChange={ev =>
            onChange({
              ...widget,
              data: {
                ...widget.data,
                content: {
                  ...widget.data.content,
                  [locale]: ev.target.value
                }
              }
            })
          }
        />
        <br />
        <br />

        <FormattedMessage id="widget.left" />
        <br />
        <br />

        <ImageForm
          {...this.props}
          widget={{
            data: {
              ...widget.data.left,
              src: widget.data.left.src || {}
            }
          }}
          onChange={newI => {
            onChange({
              ...widget,
              data: {
                ...widget.data,
                left: { ...newI.data }
              }
            });
          }}
        />
        <br />
        <br />
        <FormattedMessage id="widget.center" />
        <br />
        <br />

        <ImageForm
          {...this.props}
          widget={{
            data: {
              ...widget.data.center,
              src: widget.data.center.src || {}
            }
          }}
          onChange={newI => {
            onChange({
              ...widget,
              data: {
                ...widget.data,
                center: newI
              }
            });
          }}
        />
        <br />
        <br />
        <FormattedMessage id="widget.right" />
        <br />
        <br />

        <ImageForm
          {...this.props}
          widget={{
            data: {
              ...widget.data.right,
              src: widget.data.right.src || {}
            }
          }}
          onChange={newI => {
            onChange({
              ...widget,
              data: {
                ...widget.data,
                right: newI
              }
            });
          }}
        />
      </React.Fragment>
    );
  }
}
