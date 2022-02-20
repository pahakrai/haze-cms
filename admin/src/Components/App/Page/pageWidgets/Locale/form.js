/**
 * @class HalfMoonPieForm
 */

import * as React from 'react'
export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange } = this.props
    const {
      data: { availableLocales, currentLocale }
    } = widget

    const items = availableLocales

    // define default item
    const _items = items && items.length ? [...items] : []

    // if the last item is not empty string, add an empty one
    if (_items[_items.length - 1]) _items.push({ label: '', value: '' })

    return (
      <div className={'widget_form widget_list_form'}>
        <div className={`form_field horizontal`}>
          <label>List Type</label>
          <select
            value={currentLocale}
            onChange={(ev) =>
              onChange({
                ...widget,
                data: { ...widget.data, currentLocale: ev.target.value }
              })
            }
          >
            {availableLocales.map((l) => (
              <option key={l.label} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <div className={`form_field horizontal`}>
          <label>List Items</label>
          <div>
            {_items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <div className={`form_field horizontal`}>
                  <label>Text</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(ev) => {
                      onChange({
                        ...widget,
                        data: {
                          ...widget.data,
                          availableLocales: (itemIndex === items.length
                            ? [...items, { label: '', value: '' }]
                            : items
                          ).map((o, oIndex) =>
                            oIndex === itemIndex
                              ? { ...o, label: ev.target.value }
                              : o
                          )
                        }
                      })
                    }}
                  />
                  <input
                    type="text"
                    value={item.label}
                    onChange={(ev) => {
                      onChange({
                        ...widget,
                        data: {
                          ...widget.data,
                          availableLocales: (itemIndex === items.length
                            ? [...items, { label: '', value: '' }]
                            : items
                          ).map((o, oIndex) =>
                            oIndex === itemIndex
                              ? { ...o, value: ev.target.value }
                              : o
                          )
                        }
                      })
                    }}
                  />
                </div>
                {_items.length > 2 && _items.length - 1 !== itemIndex && (
                  // eslint-disable-next-line
                  <a
                    onClick={() => {
                      const newItems = [...items]
                      newItems.splice(itemIndex, 1)
                      onChange({
                        ...widget,
                        data: { ...widget.data, availableLocales: newItems }
                      })
                    }}
                    style={{ color: '#f00' }}
                  >
                    Remove
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
