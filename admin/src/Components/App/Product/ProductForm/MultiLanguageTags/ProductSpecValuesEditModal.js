import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'

import Modal from '../../../../Modal'
import Button from '../../../../Common/Button'

import Locales, {
  defaultLocale as DEFAULT_LANGUAGE,
  locales as AppSupportLanguages
} from '../../../../../Locales'

import {
  Title,
  Container,
  Description,
  Hr,
  ButtonGroup,
  LanguageGroup,
  Language,
  OptionItem,
  OptionItemLabel,
  OptionItemInput,
  OptionTitle,
  ITEM_WIDTH
} from './EditModal.styled'

class EditModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      values: props.input.value
    }
  }
  formatLanguageName = (language) => {
    const { intl } = this.props
    return Locales[intl.locale.replace('-', '_')][`language.${language}`]
  }
  onSave = () => {
    const {
      input: { onChange },
      onModalClose
    } = this.props
    onChange(this.state.values)
    onModalClose()
  }
  render() {
    const { intl, onModalClose, valueControl, productSpecNnames } = this.props
    const { values: items } = this.state

    return (
      <Container>
        <Title>
          {intl.formatMessage({ id: 'product_spec_option_modal_title' })}
        </Title>
        <Description>
          {intl.formatMessage({ id: 'product_spec_option_modal_description' })}
        </Description>
        <Hr />
        <LanguageGroup>
          <div style={{ width: ITEM_WIDTH.TITLE }} />
          {AppSupportLanguages.map((language) => (
            <Language key={language}>
              {this.formatLanguageName(language)}
              {language === DEFAULT_LANGUAGE
                ? `(${intl.formatMessage({ id: 'default' })})`
                : ''}
            </Language>
          ))}
        </LanguageGroup>
        <Hr style={{ marginBottom: 20 }} />
        <OptionItem>
          <OptionTitle style={{ fontWeight: '500', width: ITEM_WIDTH.TITLE }}>
            {intl.formatMessage({ id: 'product_spec_name' })}
          </OptionTitle>
          {AppSupportLanguages.map((language) => (
            <OptionTitle key={language} style={{ width: ITEM_WIDTH.ITEM }}>
              {productSpecNnames[language]}
            </OptionTitle>
          ))}
        </OptionItem>
        {Array.isArray(items)
          ? items.map((item, index) => {
              const _value = valueControl.get(item)
              return (
                <OptionItem key={index}>
                  <OptionItemLabel>
                    {intl.formatMessage(
                      { id: 'product_spec_option_count_label' },
                      { count: index + 1 }
                    )}
                  </OptionItemLabel>
                  {AppSupportLanguages.map((language) => (
                    <OptionItemInput
                      key={language}
                      value={_value[language]}
                      onChange={(v) =>
                        this.setState(({ values }) => {
                          const newValues = [...values]
                          const newValue = { ..._value, [language]: v }
                          newValues[index] = valueControl.set(
                            newValue,
                            newValues[index]
                          )
                          return {
                            values: newValues
                          }
                        })
                      }
                    />
                  ))}
                </OptionItem>
              )
            })
          : null}
        <ButtonGroup>
          <Button.Default onClick={onModalClose} style={{ marginBottom: 0 }}>
            {intl.formatMessage({ id: 'cancel' })}
          </Button.Default>
          <Button.Primary
            onClick={this.onSave}
            style={{ marginLeft: 15, marginBottom: 0 }}
          >
            {intl.formatMessage({ id: 'save' })}
          </Button.Primary>
        </ButtonGroup>
      </Container>
    )
  }
}

class EditModalModal extends PureComponent {
  render() {
    const { modalOpen, onModalClose, intl, ...props } = this.props

    return (
      <Modal.Default
        contentStyle={{ width: '40%' }}
        shouldOpenModal={modalOpen}
        showHeader={false}
        onModalClose={onModalClose}
        content={(closeModal) => (
          <EditModal intl={intl} onModalClose={onModalClose} {...props} />
        )}
      />
    )
  }
}

export default injectIntl(EditModalModal)
