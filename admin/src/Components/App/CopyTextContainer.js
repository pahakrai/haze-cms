import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { toast } from '../../Lib/Toast';

export const CopyTextContainer = ({ children, text, successMessage }) => {
  const contactRef = useRef(null);

  const copyToClipboard = e => {
    if (contactRef.current) {
      contactRef.current.select();
      document.execCommand('copy');
      e.target.focus();
      toast.success(
        successMessage || <FormattedMessage id={'display_copy_success'} />,
        {
          position: 'top-center',
          autoClose: 1000
        }
      );
    }
  };
  return (
    <>
      <input
        value={text || ''}
        ref={contactRef}
        style={{
          position: 'absolute',
          left: '-99999px'
        }}
        onChange={() => null}
      />
      {children({ onCopy: copyToClipboard })}
    </>
  );
};

export default CopyTextContainer;
