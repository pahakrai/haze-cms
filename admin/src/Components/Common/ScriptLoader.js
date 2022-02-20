import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ScriptLoader extends PureComponent {
  timeout = null;

  static srcLoadMap = {
    // src : [function]
  };
  static srcFlatMap = {
    // src : true | false
  };

  componentDidMount() {
    this.timeout = setTimeout(this._appendScript, this.props.delayMs);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  _onLoadScript = () => {
    const { onLoad, src } = this.props;
    // set flat true
    ScriptLoader.srcFlatMap[src] = true;
    // call load function
    const loadFuncs = ScriptLoader.srcLoadMap[src];
    if (loadFuncs && loadFuncs.length) loadFuncs.forEach(f => f && f());
    if (onLoad) onLoad();
  };

  _appendScript = () => {
    const {
      onCreate,
      onLoad,
      onError,
      delayMs,
      src,
      ...otherProps
    } = this.props;
    // get exist script list
    const existList = document.getElementsByTagName('script');
    // filter same src
    if (existList && existList.length)
      for (let i = 0; i < existList.length; i++)
        if (existList[i] && existList[i].src === src) {
          if (ScriptLoader.srcFlatMap[src]) {
            // loaded call load function
            onLoad();
          } else {
            // loading , wait call
            ScriptLoader.srcLoadMap[src] = [
              ...(ScriptLoader.srcLoadMap[src] || []),
              onLoad
            ];
          }
          return;
        }

    const script = document.createElement('script');
    script.src = src;

    // Add custom attributes
    for (const [attr, value] of Object.entries(otherProps)) {
      script.setAttribute(attr, value);
    }

    script.onload = this._onLoadScript;
    script.onerror = onError;
    document.body.appendChild(script);

    onCreate();
  };

  render() {
    return null;
  }
}

ScriptLoader.defaultProps = {
  delayMs: 0,
  onCreate: Function.prototype,
  onError: e => {
    // throw new URIError(`The script ${e.target.src} is not accessible`);
    console.warn(`The script ${e.target.src} is not accessible`);
  },
  onLoad: Function.prototype
};

ScriptLoader.propTypes = {
  delayMs: PropTypes.number,
  onCreate: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  src: PropTypes.string.isRequired
};

export default ScriptLoader;
