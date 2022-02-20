import React from 'react';
import { MdClose } from 'react-icons/md';
import { FormattedMessage } from '@golpasal/editor';
import styled from 'styled-components';

import Video from '../../Video/display';
import TextInput from '../../../Components/TextInput';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  & .widget_inside_form {
    flex: 1;
  }
  & .widget_inside_form:first-child {
    margin-right: 9px;
  }
`;
export const ImageEditForm = ({
  widget,
  locale,
  onClose,
  formatValues,
  onChange: _onChange,
  showTitle = true,
  showMobileStyle
}) => {
  const {
    image,
    title,
    width,
    height,
    mobileHeight,
    borderRadius
  } = formatValues(widget);
  const onChange = v => {
    _onChange(widget, v);
  };
  const src = image && image[locale];
  const isImage = /\.(png|jpe?g|gif|svg|webp|bmp)(\?.*)?$/.test(src);
  return (
    <div className={`page_editor_widget_form_right`}>
      <div style={{ textAlign: 'right' }}>
        <MdClose size={18} onClick={onClose} />
      </div>
      {isImage || !src ? (
        <div
          style={{
            backgroundImage: `url(${image && image[locale]})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            width: '100%',
            height: 230
          }}
        ></div>
      ) : (
        <Video
          widget={{
            data: { src: src, width: '100%', height: '100%' }
          }}
          style={{ width: '100%', height: 230 }}
        />
      )}
      {showTitle && (
        <>
          <br />
          <div className={'widget_form widget_inside_form'}>
            <label>
              <FormattedMessage id="widget.title" />
            </label>
            <TextInput
              value={(title && title[locale]) || ''}
              placeholder="widget.title_placeholder"
              onChange={ev => {
                const value = {
                  ...title,
                  [locale]: ev.target.value
                };
                onChange({ title: value });
              }}
            />
          </div>
        </>
      )}
      <br />
      <RowContainer>
        <div className={'widget_form widget_inside_form'}>
          <label>
            <FormattedMessage id="image_form.width" />
          </label>
          <TextInput
            type="text"
            value={width || ''}
            placeholder="widget.size_placerholder"
            onChange={ev =>
              onChange({
                width: ev.target.value
              })
            }
            style={{ width: '100%', maxWidth: 'unset' }}
          />
        </div>
        <div className={'widget_form widget_inside_form'}>
          <label>
            <FormattedMessage id="image_form.height" />
          </label>
          <TextInput
            type="text"
            value={height || ''}
            placeholder="widget.size_placerholder"
            onChange={ev =>
              onChange({
                height: ev.target.value
              })
            }
            style={{ width: '100%', maxWidth: 'unset' }}
          />
        </div>
      </RowContainer>
      <br />
      {showMobileStyle && (
        <>
          <div className={'widget_form widget_inside_form'}>
            <label>
              <FormattedMessage id="widget.mobile_height" />
            </label>
            <TextInput
              type="text"
              value={mobileHeight || ''}
              placeholder="widget.size_placerholder"
              onChange={ev =>
                onChange({
                  mobileHeight: ev.target.value
                })
              }
              style={{ width: '100%', maxWidth: 'unset' }}
            />
          </div>
          <br />
        </>
      )}
      <div className={'widget_form widget_inside_form'}>
        <label>
          <FormattedMessage id="image_form.borderRadius" />
        </label>
        <TextInput
          type="text"
          value={borderRadius || ''}
          placeholder="widget.size_placerholder"
          onChange={ev =>
            onChange({
              borderRadius: ev.target.value
            })
          }
        />
      </div>
    </div>
  );
};
export default ImageEditForm;
