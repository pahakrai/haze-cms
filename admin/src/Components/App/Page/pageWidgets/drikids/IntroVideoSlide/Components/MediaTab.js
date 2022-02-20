import React from 'react';
import { FormattedMessage, MediaLibrary } from '@golpasal/editor';
import styled from 'styled-components';

import TextInput from '../../../Components/TextInput';

export const MediaTab = ({ widget, onChange, locale, openImageForm }) => {
  const medias = [...((widget.data && widget.data.medias) || [])];

  const _openImageForm = (key, index, showMobileStyle) => {
    const props = {
      formatValues: _widget => {
        const item =
          (_widget.data.medias &&
            _widget.data.medias &&
            _widget.data.medias[index] &&
            _widget.data.medias[index][key]) ||
          {};
        return {
          image: item.src,
          width: item.width,
          height: item.height,
          mobileHeight: item.mobileHeight,
          borderRadius: item.borderRadius
        };
      },
      onChange: (_widget, values) => {
        const medias = [...((_widget.data && _widget.data.medias) || [])];
        const newMedias = [...medias];
        const item = newMedias[index] || {};
        newMedias[index] = {
          ...item,
          [key]: {
            ...(item[key] || {}),
            ...values
          }
        };

        onChange({ medias: newMedias });
      },
      showMobileStyle,
      showTitle: false
    };

    openImageForm(props);
  };
  const customRenderPreviewItem = (key, index, showMobileStyle) => (
    Comp,
    props
  ) => {
    return (
      <Comp
        {...props}
        onClick={() => {
          _openImageForm(key, index, showMobileStyle);
        }}
      />
    );
  };

  return (
    <div>
      {medias.map((media, index) => {
        const change = (key, value) => {
          const newMedias = [...medias];
          newMedias[index] = { ...media, [key]: value };
          onChange({ medias: newMedias });
        };

        return (
          <div key={index}>
            <h4>
              <FormattedMessage id="widget.slide_item" /> ({index + 1})
            </h4>
            <Row>
              <div className={'widget_form widget_inside_form'}>
                <label>
                  <FormattedMessage id="widget.media_file" />
                </label>
                <IconForm
                  {...{
                    value: media.media,
                    onChange: change,
                    locale,
                    name: 'media',
                    customRenderPreviewItem: key =>
                      customRenderPreviewItem(key, index, true)
                  }}
                />
              </div>
              <div className={'widget_form widget_inside_form'}>
                <label>
                  <FormattedMessage id="widget.title_icon" />
                </label>
                <IconForm
                  {...{
                    value: media.titleIcon,
                    onChange: change,
                    locale,
                    name: 'titleIcon',
                    customRenderPreviewItem: key =>
                      customRenderPreviewItem(key, index)
                  }}
                />
              </div>
            </Row>
            <br />
            <div className={'widget_form widget_inside_form'}>
              <label>
                <FormattedMessage id="widget.title" />
              </label>
              <TextInput
                value={(media.title && media.title[locale]) || ''}
                placeholder="widget.title"
                onChange={ev => {
                  ev.stopPropagation();
                  change('title', {
                    ...(media.title || {}),
                    [locale]: ev.target.value
                  });
                }}
              />
            </div>
            <br />
            <div className={'widget_form widget_inside_form'}>
              <label>
                <FormattedMessage id="widget.description" />
              </label>
              <TextInput
                value={(media.description && media.description[locale]) || ''}
                placeholder="widget.description"
                textarea
                rows="4"
                onChange={ev => {
                  ev.stopPropagation();
                  change('description', {
                    ...(media.description || {}),
                    [locale]: ev.target.value
                  });
                }}
              />
            </div>
            <hr />
          </div>
        );
      })}
      <AddButtonContainer>
        <AddButton
          onClick={() => {
            onChange({ medias: [...medias, { ...DEFAULT_MEDIA_VALUE }] });
          }}
        >
          新增幻灯片
        </AddButton>
      </AddButtonContainer>
    </div>
  );
};

const IconForm = ({
  value,
  onChange,
  locale,
  name,
  customRenderPreviewItem
}) => {
  return (
    <MediaLibrary
      multiple={false}
      urls={value && value.src && value.src[locale] ? [value.src[locale]] : []}
      type={['image', 'video']}
      onChange={urls => {
        const _value = {
          ...value,
          src: {
            ...(value.src || {}),
            [locale]: (urls && urls[0]) || ''
          }
        };
        onChange(name, _value);
      }}
      customRenderPreviewItem={customRenderPreviewItem(name)}
    />
  );
};

export const DEFAULT_MEDIA_VALUE = {
  media: {
    src: {},
    width: '50%',
    height: '300px',
    mobileHeight: '194px',
    fit: 'cover',
    position: 'center'
  },
  title: {
    en: '',
    'zh-hk': '',
    'zh-cn': ''
  },
  description: {
    en: '',
    'zh-hk': '',
    'zh-cn': ''
  },
  titleIcon: {
    src: {},
    width: '30px',
    height: '30px',
    fit: 'cover',
    position: 'center'
  }
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const AddButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const AddButton = styled.button`
  padding: 6px 10px;
  font-size: 18px;
  border-radius: 8px;
`;

export default MediaTab;
