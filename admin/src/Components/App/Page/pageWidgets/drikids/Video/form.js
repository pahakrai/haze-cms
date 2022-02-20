import * as React from 'react';
import { FormattedMessage } from '@golpasal/editor';

export default class Form extends React.PureComponent {
  render() {
    const { widget, disabled, onChange } = this.props;
    return (
      <React.Fragment>
        <div className={'widget_form widget_inside_form'}>
          <label>
            <FormattedMessage id="widget.source" />{' '}
          </label>
          <input
            disabled={disabled}
            type="text"
            value={widget.data.src}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  src: ev.target.value
                }
              })
            }
          />
          <br />
          <label>
            <FormattedMessage id="widget.width" />{' '}
          </label>
          <input
            disabled={disabled}
            type="text"
            value={widget.data.width}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  width: ev.target.value
                }
              })
            }
          />
          <br />
          <label>
            <FormattedMessage id="widget.height" />{' '}
          </label>
          <input
            disabled={disabled}
            type="text"
            value={widget.data.height}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  height: ev.target.value
                }
              })
            }
          />
        </div>
      </React.Fragment>
    );
  }
}
