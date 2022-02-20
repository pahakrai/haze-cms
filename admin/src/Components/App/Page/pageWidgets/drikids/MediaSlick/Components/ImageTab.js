import React, { useRef, useEffect } from 'react';
import { FormattedMessage, MediaLibrary } from '@golpasal/editor';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  & .media_preview_item {
    flex: none;
  }
`;
export const ImageTab = ({ widget, onChange, locale, openImageForm }) => {
  const updateUrls = (urls, key) => {
    let images = [...((widget.data && widget.data.images) || [])];

    if (urls) {
      const length = Math.max(images.length, urls.length);
      for (let index = 0; index < length; index++) {
        const url = urls[index];
        const data = images[index] || {};
        images[index] = {
          ...data,
          [key]: {
            ...((images[index] && images[index][key]) || {}),
            [locale]: url
          },
          width: data.width || '100%',
          height: data.height || '100%'
        };
      }
    }
    onChange({ images });
  };

  const _openImageForm = (key, index) => {
    const props = {
      formatValues: _widget => {
        let images = [...((_widget.data && _widget.data.images) || [])];
        const item = images[index] || {};
        return {
          image: item[key],
          title: item.title,
          width: item.width,
          height: item.height,
          borderRadius: item.borderRadius
        };
      },
      onChange: (_widget, values) => {
        let images = [...((_widget.data && _widget.data.images) || [])];
        images[index] = {
          ...(images[index] || {}),
          ...values
        };
        onChange({ images });
      }
    };

    openImageForm(props);
  };

  const customRenderPreviewItem = key => (Comp, props, index) => {
    return (
      <Comp
        {...props}
        onClick={() => {
          _openImageForm(key, index);
        }}
      />
    );
  };

  const data = (widget.data && widget.data.images) || [];
  const pcImages = data
    .map(v => (v && v.src && v.src[locale]) || '')
    .filter(v => v);
  const mobileImages = data
    .map(v => (v && v.mobileSrc && v.mobileSrc[locale]) || '')
    .filter(v => v);

  const customRender = (urls, key) => ({
    previewItems,
    addbutton,
    modal,
    input
  }) => {
    return (
      <>
        <RowContainer>
          <DragContainer
            className="media_library_container slick_widget_image_tab"
            data={previewItems}
            onDragEnd={result => {
              if (!result.destination) {
                return;
              }
              updateUrls(
                reorder(urls, result.source.index, result.destination.index),
                key
              );
            }}
          />
          {addbutton}
        </RowContainer>
        {modal}
        <div>{input}</div>
      </>
    );
  };

  return (
    <div>
      <h4>
        <FormattedMessage id="widget.pc_images" /> ({pcImages.length})
      </h4>
      <MediaLibrary
        multiple
        urls={pcImages}
        type={['image', 'video']}
        onChange={urls => {
          updateUrls(urls, 'src');
        }}
        customRenderPreviewItem={customRenderPreviewItem('src')}
        customRender={customRender(pcImages, 'src')}
      />
      <br />
      <h4>
        <FormattedMessage id="widget.mobile_images" /> ({mobileImages.length})
      </h4>
      <MediaLibrary
        multiple
        urls={mobileImages}
        type={['image', 'video']}
        onChange={urls => {
          updateUrls(urls, 'mobileSrc');
        }}
        customRenderPreviewItem={customRenderPreviewItem('mobileSrc')}
        customRender={customRender(mobileImages, 'mobileSrc')}
      />
    </div>
  );
};

export const DragContainer = ({ data, onDragEnd, className }) => {
  const renderDraggable = useDraggableInPortal();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={className}
            {...provided.droppableProps}
          >
            {data && data.length
              ? data.map((item, index) => (
                  <Draggable
                    key={`item-${index}`}
                    draggableId={`item-${index}`}
                    index={index}
                  >
                    {renderDraggable((provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        {item}
                      </div>
                    ))}
                  </Draggable>
                ))
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useDraggableInPortal = () => {
  const self = useRef({}).current;

  useEffect(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.pointerEvents = 'none';
    div.style.top = '0';
    div.style.width = '100%';
    div.style.height = '100%';
    self.elt = div;
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, [self]);

  return render => (provided, ...args) => {
    const element = render(provided, ...args);
    if (provided.draggableProps.style.position === 'fixed') {
      return createPortal(element, self.elt);
    }
    return element;
  };
};
export default ImageTab;
