/**
 * @class Editor
 */

import * as React from 'react';
import LocaleDisplay from './display';
export default class Editor extends React.PureComponent {
  render() {
    return <LocaleDisplay {...this.props} />;
  }
}
