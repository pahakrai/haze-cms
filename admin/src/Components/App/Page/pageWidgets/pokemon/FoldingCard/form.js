import * as React from 'react';
import { FormattedMessage } from '@golpasal/editor';
import TextEditorForm from '../../drikids/TextEditor/form';

export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange, locale } = this.props;
    const problem = widget.data.problem[locale] || '';
    const reply = widget.data.reply[locale] || '';
    return (
      <React.Fragment>
        <div className={'widget_form widget_inside_form'}>
          <FormattedMessage id="widget.problem" />
          {': '}
          <input
            style={{ display: 'inline-block' }}
            type="text"
            value={problem}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  problem: {
                    ...widget.data.problem,
                    [locale]: ev.target.value
                  }
                }
              })
            }
          />
          <br />
          <br />
        </div>

        <FormattedMessage id="widget.reply" />
        {': '}
        <TextEditorForm
          {...this.props}
          widget={{
            data: {
              ...widget.data,
              text: reply
            }
          }}
          onChange={val => {
            onChange({
              ...widget,
              data: {
                ...widget.data,
                reply: {
                  ...widget.data.reply,
                  [locale]: val.data[locale].text
                }
              }
            });
          }}
        />
        <br />
        <br />
        <FormattedMessage id="widget.iconBgColor" />
        {': '}
        <input
          style={{ display: 'inline-block' }}
          type="text"
          value={widget.data.iconBgColor}
          onChange={ev =>
            onChange({
              ...widget,
              data: {
                ...widget.data,
                iconBgColor: ev.target.value
              }
            })
          }
        />
        <br />
        <br />
        <FormattedMessage id="widget.isOpen" />
        {': '}
        <input
          style={{ display: 'inline-block' }}
          type="checkbox"
          checked={widget.data.open}
          onChange={() => {
            onChange({
              ...widget,
              data: {
                ...widget.data,
                open: !widget.data.open
              }
            });
          }}
        />
      </React.Fragment>
    );
  }
}
