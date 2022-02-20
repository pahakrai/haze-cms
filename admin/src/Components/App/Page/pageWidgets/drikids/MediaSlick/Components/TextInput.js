import * as React from 'react';
import { FormattedMessage } from '@golpasal/editor';
export const TextInput = ({ placeholder, style, ...props }) => (
  <FormattedMessage id={placeholder}>
    {text => (
      <input
        placeholder={text || placeholder}
        {...props}
        style={{
          marginTop: '2px',
          marginBottom: '2px',
          padding: '10px 8px',
          border: '1px solid #eeeeee',
          borderRadius: '5px',
          width: '400px',
          maxWidth: '100%',
          outline: 'none',
          overflow: 'hidden',
          ...style
        }}
      />
    )}
  </FormattedMessage>
);

export default TextInput;
