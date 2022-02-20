/**
 * @class ButtonForm
 */

import * as React from 'react';
import { ButtonWidget } from '.';
import { widgets } from '@golpasal/editor';

export type ButtonFormProps = WidgetFormProps<ButtonWidget>;

export default class ButtonForm extends React.Component<ButtonFormProps> {
  render() {
    const { widget, onChange } = this.props;

    const ButtonForm = widgets.button.form;
    return (
      <ButtonForm
        {...this.props}
        widget={{ data: widget.data }}
        onChange={v => {
          onChange({
            ...widget,
            data: v.data
          });
        }}
      />
    );
  }
}
