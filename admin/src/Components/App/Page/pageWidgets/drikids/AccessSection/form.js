import * as React from 'react';
import { widgets, FormattedMessage } from '@golpasal/editor';
import { AiFillFileAdd, AiFillCloseCircle } from 'react-icons/ai';

export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange, locale } = this.props;
    const ImageForm = widgets.image.form;
    return (
      <React.Fragment>
        <div>
          <AiFillFileAdd
            style={{ cursor: 'pointer' }}
            size={50}
            onClick={() =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  images: [
                    {
                      src: {},
                      width: '',
                      height: '',
                      title: {
                        en: '',
                        'zh-hk': '',
                        'zh-cn': ''
                      }
                    },
                    ...(widget.data.images || [])
                  ]
                }
              })
            }
          />
          <br />
          <br />
          {(widget.data.images || []).map((i, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <ImageForm
                {...this.props}
                widget={{ data: { ...i, src: i.src || {} } }}
                onChange={newI => {
                  const newImages = [...(widget.data.images || [])];
                  newImages.splice(index, 1, newI.data);
                  onChange({
                    ...widget,
                    data: {
                      ...widget.data,
                      images: newImages
                    }
                  });
                }}
              />

              <br />
              <div className={'widget_form widget_inside_form'}>
                <label>
                  <FormattedMessage id="widget.text" />
                </label>

                <input
                  style={{
                    display: 'inline-block',
                    marginTop: '2px',
                    marginBottom: '2px',
                    padding: '10px 8px',
                    border: '1px solid #eeeeee',
                    borderRadius: '5px',
                    width: '400px',
                    maxWidth: '100%',
                    outline: 'none',
                    overflow: 'hidden'
                  }}
                  value={i.title[locale] || i.title || ''}
                  onChange={ev => {
                    ev.stopPropagation();
                    const cloneWidget = {
                      ...widget,
                      data: {
                        ...widget.data,
                        images: [...widget.data.images]
                      }
                    };
                    const title = {
                      ...cloneWidget.data.images[index].title,
                      [locale]: ev.target.value
                    };
                    cloneWidget.data.images[index] = {
                      ...i,
                      title
                    };
                    onChange(cloneWidget);
                  }}
                />
              </div>
              <br />

              <AiFillCloseCircle
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  cursor: 'pointer'
                }}
                size={25}
                onClick={() => {
                  const newImages = [...(widget.data.images || [])];
                  newImages.splice(index, 1);
                  onChange({
                    ...widget,
                    data: {
                      ...widget.data,
                      images: newImages
                    }
                  });
                }}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
