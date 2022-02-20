import React, { PureComponent } from 'react';
import EditorView from './Editor';

export default class FetchEditor extends PureComponent {
  static defaultProps = {
    onChange: () => true
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.url !== prevState.url) {
      return {
        url: nextProps.url,
        html: null
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      html: null
    };
  }

  // load html from url
  async componentDidMount() {
    const { url } = this.state;
    if (url) {
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        this.setState({ html });
      }
    }
  }

  render() {
    const { html } = this.state;
    const { onChange } = this.props;
    return html && <EditorView value={html} onChange={onChange} />;
  }
}
