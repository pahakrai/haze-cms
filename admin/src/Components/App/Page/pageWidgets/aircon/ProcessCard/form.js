import * as React from 'react';
import { FormattedMessage, MediaLibrary } from '@golpasal/editor';
import styled from 'styled-components';

import TextInput from '../../Components/TextInput';

export default class Form extends React.PureComponent {
  render() {
    const { widget, onChange, locale } = this.props;
    const cards = widget.data.cards;

    return (
      <div>
        <div className={'widget_form widget_inside_form'}>
          <label>
            <FormattedMessage id="widget.card_height" /> (px)
          </label>
          <TextInput
            value={
              widget.data &&
              widget.data.cardStyle &&
              (widget.data.cardStyle.height || '')
            }
            placeholder="widget.card_height"
            onChange={ev => {
              ev.stopPropagation();
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  cardStyle: {
                    height: ev.target.value
                  }
                }
              });
            }}
          />
        </div>
        {cards.map((card, index) => {
          const change = (key, value) => {
            const newCards = [...cards];
            newCards[index] = { ...card, [key]: value };
            onChange({
              ...widget,
              data: {
                ...widget.data,
                cards: newCards
              }
            });
          };

          return (
            <div key={index}>
              <h4>
                <FormattedMessage id="widget.process_item" /> ({index + 1})
              </h4>
              <div className={'widget_form widget_inside_form'}>
                <label>
                  <FormattedMessage id="widget.image" />
                </label>
                <MediaLibrary
                  multiple={false}
                  urls={
                    card.image && card.image[locale] ? [card.image[locale]] : []
                  }
                  type={['image', 'video']}
                  onChange={urls => {
                    const _value = {
                      ...(card.image || {}),
                      [locale]: (urls && urls[0]) || ''
                    };
                    change('image', _value);
                  }}
                />
              </div>
              <div className={'widget_form widget_inside_form'}>
                <label>
                  <FormattedMessage id="widget.title" />
                </label>
                <TextInput
                  value={(card.title && card.title[locale]) || ''}
                  placeholder="widget.title"
                  onChange={ev => {
                    ev.stopPropagation();
                    change('title', {
                      ...(card.title || {}),
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
                  value={(card.description && card.description[locale]) || ''}
                  placeholder="widget.description"
                  textarea
                  rows="4"
                  onChange={ev => {
                    ev.stopPropagation();
                    change('description', {
                      ...(card.description || {}),
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
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  cards: [...cards, {}]
                }
              });
            }}
          >
            新增流程
          </AddButton>
        </AddButtonContainer>
      </div>
    );
  }
}

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
