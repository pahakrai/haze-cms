import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class UploadButton extends PureComponent {
  static propTypes = {
    handleChange: PropTypes.func.isRequired
  };

  openFileSelect = () => {
    this.inputElement.click();
  };

  handleChange = e => {
    const { handleChange } = this.props;
    handleChange(e.target.files);
  };

  render() {
    const { handleChange, openFileSelect } = this;
    const { children } = this.props;

    return (
      <span>
        <input
          onChange={handleChange}
          style={{ width: '1px', visibility: 'hidden' }}
          ref={input => (this.inputElement = input)}
          type="file"
        />
        {children(openFileSelect)}
      </span>
    );
  }
}
