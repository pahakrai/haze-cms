import React from 'react';
import { FormattedMessage } from '@golpasal/editor';

import TextInput from './TextInput';

export const BaseTab = ({ widget, onChange }) => {
  return (
    <>
      <div className={'widget_form widget_inside_form'}>
        <label>
          <FormattedMessage id="widget.carouseSpeed" />
        </label>
        <TextInput
          value={widget.data.carouseSpeed || ''}
          type="number"
          placeholder="widget.carouseSpeed"
          onChange={ev => {
            ev.stopPropagation();
            onChange({ carouseSpeed: ev.target.value });
          }}
        />
      </div>
      <br />
      <div className={'widget_form widget_inside_form'}>
        <label>
          <FormattedMessage id="widget.chevron_width" />
        </label>
        <TextInput
          value={widget.data.chevronWidth || ''}
          placeholder="widget.chevron_width"
          onChange={ev => {
            ev.stopPropagation();
            onChange({ chevronWidth: ev.target.value });
          }}
        />
      </div>
      <br />
      <div className={'widget_form widget_inside_form'}>
        <label>
          <FormattedMessage id="widget.quantity" />
        </label>
        <TextInput
          value={widget.data.quantity}
          type="number"
          placeholder="widget.quantity_placeholder"
          onChange={ev => {
            ev.stopPropagation();
            onChange({ quantity: ev.target.value });
          }}
        />
      </div>
      <br />
      <div className={'widget_form widget_inside_form'}>
        <label>
          <FormattedMessage id="widget.slides_to_scroll" />
        </label>
        <TextInput
          value={widget.data.slidesToScroll || ''}
          placeholder="widget.slides_to_scroll"
          onChange={ev => {
            ev.stopPropagation();
            onChange({ slidesToScroll: ev.target.value });
          }}
        />
      </div>
      <br />
      <div className={'widget_form widget_inside_form'}>
        <label style={{ display: 'inline-block' }}>
          <FormattedMessage id="widget.infinite_loop" />
        </label>
        <input
          style={{ display: 'inline-block', marginLeft: 10 }}
          type="checkbox"
          checked={
            widget.data.infiniteLoop === undefined
              ? true
              : widget.data.infiniteLoop
          }
          onChange={event => {
            if (event.target.checked) {
              onChange({ infiniteLoop: true });
            } else {
              onChange({ infiniteLoop: false });
            }
          }}
        />
      </div>
      <br />
      <h3>
        <FormattedMessage id="widget.mobile_settings" />
      </h3>
      <div className={'widget_form widget_inside_form'}>
        <label>
          <FormattedMessage id="widget.quantity" />
        </label>
        <TextInput
          value={widget.data.mobileQuantity}
          type="number"
          placeholder="widget.quantity_placeholder"
          onChange={ev => {
            ev.stopPropagation();
            onChange({ mobileQuantity: ev.target.value });
          }}
        />
      </div>
      <br />
      <div className={'widget_form widget_inside_form'}>
        <label>
          <FormattedMessage id="widget.slides_to_scroll" />
        </label>
        <TextInput
          value={widget.data.mobileSlidesToScroll || ''}
          placeholder="widget.slides_to_scroll"
          onChange={ev => {
            ev.stopPropagation();
            onChange({ mobileSlidesToScroll: ev.target.value });
          }}
        />
      </div>
    </>
  );
};

export default BaseTab;
