import * as React from 'react';
import { WidgetFormContext } from '@golpasal/editor';
import Display from './display';

export default class Editor extends React.PureComponent {
  render() {
    const { widget, locale, ...props } = this.props;
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
            <Display widget={widget} locale={locale} {...props} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
