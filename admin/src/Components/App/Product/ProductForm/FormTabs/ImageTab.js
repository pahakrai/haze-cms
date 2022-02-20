import React from 'react';

import Uploader from '../../../../Form/Uploader';

export const ImageTab = ({ intl }) => {
  return (
    <Uploader
      intl={intl}
      name="images"
      label={`${intl.formatMessage({
        id: 'label_images'
      })}`}
      multiple={true}
    />
  );
};
