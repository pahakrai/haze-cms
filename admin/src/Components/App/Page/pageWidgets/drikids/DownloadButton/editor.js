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
            onDoubleClick={ev => {
              ev.stopPropagation();
              openForm(_id);
            }}
          >
            <Display widget={widget} locale={locale} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
