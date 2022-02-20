import React from 'react';
import { FormattedMessage, MediaLibrary } from '@golpasal/editor';

export const OthersTab = ({ widget, onChange, locale, openImageForm }) => {
  const _openImageForm = (key, index) => {
    const props = {
      formatValues: _widget => {
        let item = { ...((_widget.data && _widget.data[key]) || []) };
        return {
          image: item.src,
          width: item.width,
          height: item.height,
          borderRadius: item.borderRadius
        };
      },
      onChange: (_widget, values) => {
        let item = { ...((_widget.data && _widget.data[key]) || []) };
        item = {
          ...(item || {}),
          ...values
        };
        onChange({ [key]: item });
      },
      showTitle: false
    };

    openImageForm(props);
  };

  const customRenderPreviewItem = key => (Comp, props) => {
    return (
      <Comp
        {...props}
        onClick={() => {
          _openImageForm(key);
        }}
      />
    );
  };

  return (
    <div>
      <h4>
        <FormattedMessage id="widget.left" />
      </h4>
      <IconForm
        {...{
          widget,
          onChange: value => {
            onChange({ leftArrow: value });
          },
          locale,
          name: 'leftArrow',
          customRenderPreviewItem
        }}
      />
      <br />
      <h4>
        <FormattedMessage id="widget.right" />
      </h4>
      <IconForm
        {...{
          widget,
          onChange: value => {
            onChange({ rightArrow: value });
          },
          locale,
          name: 'rightArrow',
          customRenderPreviewItem
        }}
      />
    </div>
  );
};
const IconForm = ({
  widget,
  onChange,
  locale,
  name,
  customRenderPreviewItem
}) => {
  const data = widget.data[name] || {};
  const _onChange = values => {
    onChange({ ...data, ...values });
  };

  return (
    <MediaLibrary
      multiple={false}
      urls={data && data.src && data.src[locale] ? [data.src[locale]] : []}
      type={['image']}
      onChange={urls => {
        const value = {
          ...data.src,
          [locale]: (urls && urls[0]) || ''
        };
        _onChange({ src: value });
      }}
      customRenderPreviewItem={customRenderPreviewItem(name)}
    />
  );
};

export default OthersTab;
