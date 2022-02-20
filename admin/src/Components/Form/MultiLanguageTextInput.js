import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { hasIn } from 'lodash';
// util

import Locales, {
  defaultLocale as DEFAULT_LANGUAGE,
  locales as AppSupportLanguages
} from '../../Locales';
import EasyTabs from '../Common/EasyTabs';

import TextInput from './TextInput';
import Error from './Error';

import { FieldLabel } from './form.styled';

export const sycnMTField = (value, field, isMT) => {
  if (!isMT) {
    const v = hasIn(value, `[${field}][${DEFAULT_LANGUAGE}]`)
      ? value[field][DEFAULT_LANGUAGE]
      : '';
    value[field] = {
      en: v,
      'zh-cn': v,
      'zh-hk': v,
      vi: v
    };
  }
};
// isMultiLanguage
export const validateMTField = (value, isMultiLanguage) => {
  const isMT = isMultiLanguage;
  let error = undefined;
  if (isMT) {
    AppSupportLanguages.forEach(language => {
      if (isMT && (!value || !value[language])) {
        error = error || {};
        error[language] = true;
      }
    });
  } else {
    if (!value) {
      error = <FormattedMessage id={'error.required'} />;
    }
  }

  return error;
};

class MultiLanguageTextInput extends PureComponent {
  formatLanguageName = language => {
    const { intl } = this.props;
    return Locales[intl.locale.replace('-', '_')][`language.${language}`];
  };
  render() {
    const { name, label, rows, disabled, placeholder } = this.props;
    const isMultiLanguage = AppSupportLanguages.length !== 1;
    return (
      <div style={{ width: '100%' }}>
        {isMultiLanguage && (
          <React.Fragment>
            <FieldLabel>{label}</FieldLabel>
            <EasyTabs
              defaultKey={'0'}
              keys={AppSupportLanguages.map(this.formatLanguageName)}
            >
              {AppSupportLanguages.map(language => (
                <TextInput
                  placeholder={placeholder}
                  key={language}
                  noLabel
                  rows={rows}
                  name={`${name}.${language}`}
                  error={false}
                  disabled={disabled}
                  label={this.formatLanguageName(language)}
                />
              ))}
            </EasyTabs>
            {AppSupportLanguages.map(language => (
              <Error
                key={language}
                touched
                name={`${name}.${language}`}
                customText={() => (
                  <FormattedMessage
                    id={'error.multi_language.is_required'}
                    values={{
                      name: label,
                      language: this.formatLanguageName(language)
                    }}
                  />
                )}
              />
            ))}
          </React.Fragment>
        )}
        {!isMultiLanguage && (
          <React.Fragment>
            <TextInput
              rows={rows}
              name={`${name}.${DEFAULT_LANGUAGE}`}
              // name={name}
              label={label}
              disabled={disabled}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MultiLanguageTextInput;
