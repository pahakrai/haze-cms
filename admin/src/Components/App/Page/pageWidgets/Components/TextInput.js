import * as React from 'react';
import { FormattedMessage } from '@golpasal/editor';
export const TextInput = ({ placeholder, style, textarea, ...props }) => {
  const _style = {
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
  };
  return (
    <FormattedMessage id={placeholder}>
      {text =>
        !textarea ? (
          <input placeholder={text || placeholder} {...props} style={_style} />
        ) : (
          <textarea
            placeholder={text || placeholder}
            {...props}
            style={_style}
          />
        )
      }
    </FormattedMessage>
  );
};

export default TextInput;
