import * as React from 'react';
import { widgets, FormattedMessage } from '@golpasal/editor';

export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange, locale } = this.props;
    const ImageForm = widgets.image.form;
    const text = widget.data.text[locale] || '';
    return (
      <React.Fragment>
        <div className={'widget_form widget_inside_form'}>
          <FormattedMessage id="widget.title" />
          {': '}
          <input
            style={{ display: 'inline-block' }}
            type="text"
            value={text}
            onChange={ev => {
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  text: {
                    [locale]: ev.target.value
                  }
                }
              });
            }}
          />
        </div>
        <ImageForm {...this.props} />
      </React.Fragment>
    );
  }
}
