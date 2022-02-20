import * as React from 'react';
import { WidgetFormContext } from '@golpasal/editor';
import Display from './display';

export default class Editor extends React.PureComponent {
  render() {
    const { widget, locale } = this.props;
    const { _id } = widget;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <div
            onClick={ev => {
              ev.stopPropagation();
              openForm(_id);
            }}
          >
            <style>
              {`.page_editor_widget_layout div:nth-child(2){
              height:100%
            }`}
            </style>
            <Display widget={widget} locale={locale} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
