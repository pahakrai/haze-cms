import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Loading from './Loading';
const ScrollDiv = styled.div`
  overflow: hidden;
  overflow-x: scroll;
`;

export default class FetchHtmlContent extends PureComponent {
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

  async componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) await this._loadData();
  }

  // load html from url
  async componentDidMount() {
    await this._loadData();
  }

  _loadData = async () => {
    const { onChange } = this.props;
    const { url } = this.state;
    if (url) {
      const response = await fetch(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Method': 'GET'
        }
      });
      if (response.ok) {
        const html = await response.text();
        this.setState({ html }, () => onChange && onChange(html));
      }
    } else {
      onChange && onChange('');
    }
  };

  render() {
    const { url, html } = this.state;
    return html ? (
      <ScrollDiv
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={() => window.open(url)}
      />
    ) : (
      <Loading />
    );
  }
}
