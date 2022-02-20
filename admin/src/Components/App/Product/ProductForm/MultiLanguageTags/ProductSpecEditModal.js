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
  ITEM_WIDTH
} from './EditModal.styled'

import ProductSpecIcon from './ProductSpecIcon'

class EditModal extends PureComponent {
  constructor(props) {
    super(props)
    let iconFile = []
    let activeIconFile = []
    props.input.value.forEach((v) => {
      iconFile.push(v.icon || null)
      activeIconFile.push(v.activeIcon || null)
    })
    this.state = {
      values: props.input.value,
      icon: iconFile,
      activeIcon: activeIconFile
    }
  }
  state = { value: {} }
  formatLanguageName = (language) => {
    const { intl } = this.props
    return Locales[intl.locale.replace('-', '_')][`language.${language}`]
  }
  onSave = () => {
    const {
      input: { onChange },
      uploadSpecIcon,
      onModalClose
    } = this.props
    const { values, icon, activeIcon } = this.state
    onChange(values)
    uploadSpecIcon(values, icon, activeIcon)
    onModalClose()
  }

  render() {
    const { values: items, icon, activeIcon } = this.state
    const { intl, onModalClose, valueControl } = this.props

    return (
      <Container>
        <Title>{intl.formatMessage({ id: 'product_spec_modal_title' })}</Title>
        <Description>
          {intl.formatMessage({ id: 'product_spec_modal_description' })}
        </Description>
        <Hr />
        <LanguageGroup>
          <div style={{ width: ITEM_WIDTH.TITLE }} />
          <Language>{intl.formatMessage({ id: 'product_spec_icon' })}</Language>
          <Language>
            {intl.formatMessage({ id: 'product_spec_activeIcon' })}
          </Language>
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
        {Array.isArray(items)
          ? items.map((item, index) => {
              const _value = valueControl.get(item)
              return (
                <OptionItem key={index}>
                  <OptionItemLabel>
                    {intl.formatMessage(
                      { id: 'product_spec_count_label' },
                      { count: index }
                    )}
                  </OptionItemLabel>
                  <OptionItemLabel>
                    <ProductSpecIcon
                      intl={intl}
                      input={{
                        value: icon[index],
                        onChange: (v) => {
                          this.setState(({ icon }) => {
                            const newValues = [...icon]
                            newValues[index] = v
                            return {
                              icon: newValues
                            }
                          })
                        }
                      }}
                    />
                  </OptionItemLabel>
                  <OptionItemLabel>
                    <ProductSpecIcon
                      intl={intl}
                      input={{
                        value: activeIcon[index],
                        onChange: (v) => {
                          this.setState(({ activeIcon }) => {
                            const newValues = [...activeIcon]
                            newValues[index] = v
                            return {
                              activeIcon: newValues
                            }
                          })
                        }
                      }}
                    />
                  </OptionItemLabel>
                  {AppSupportLanguages.map((language) => (
                    <OptionItemInput
                      key={language}
                      value={_value[language]}
                      onChange={(v) =>
                        this.setState(({ values }) => {
                          const newValues = [...values]
                          const newValue = { ..._value, [language]: v }
                          newValues[index] = {
                            ...valueControl.set(
                              newValue,
                              newValues[index] || {}
                            )
                          }
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
          <Button.Default onClick={onModalClose}>
            {intl.formatMessage({ id: 'cancel' })}
          </Button.Default>
          <Button.Primary onClick={this.onSave} style={{ marginLeft: 15 }}>
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
        contentStyle={{ width: 1000 }}
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
