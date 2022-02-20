import * as React from 'react';
import { widgets, FormattedMessage } from '@golpasal/editor';
import TextEditorForm from '../TextEditor/form';

export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange } = this.props;
    // data
    const reverse = widget.data.reverse;
    // img , text
    const ImageForm = widgets.image.form;
    return (
      <React.Fragment>
        <div className={'widget_form widget_inside_form'}>
          <FormattedMessage id="widget.reverse" />
          {': '}
          <input
            style={{ display: 'inline-block' }}
            type="checkbox"
            checked={reverse}
            onChange={() => {
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  reverse: !reverse
                }
              });
            }}
          />
        </div>
        <TextEditorForm {...this.props} />
        <ImageForm {...this.props} />
      </React.Fragment>
    );
  }
}
