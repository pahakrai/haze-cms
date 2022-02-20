import React, { useCallback } from 'react';
import { Field } from 'redux-form';
import Immutable from 'seamless-immutable';
import { FormattedMessage } from 'react-intl';
import { Tabs as AntTabs } from 'antd';

import Locales, {
  defaultLocale as DEFAULT_LANGUAGE,
  locales as AppSupportLanguages
} from '../../Locales';

import { FieldLabel } from './form.styled';

import FieldContainer from './../../Components/Form/FieldContainer';
import Error from './../../Components/Form/Error';
import EditorComponent from './../../Components/Common/Editor';

const TabPane = AntTabs.TabPane;
class TabEditor extends React.PureComponent {
  formatLanguageName = language => {
    const { intl } = this.props;
    return Locales[intl.locale.replace('-', '_')][`language.${language}`];
  };

  handleOnChange = (str, language) => {
    const {
      input: { value, onChange = () => {} },
      isMultiLanguage
    } = this.props;
    if (!isMultiLanguage) {
      onChange(str);
      return;
    }
    const section = Object.assign({ en: '', 'zh-hk': '' }, value);
    section[language] = str;
    onChange && onChange(Immutable(section));
  };

  render() {
    const {
      label,
      input: { value, name },
      isMultiLanguage
    } = this.props;

    if (AppSupportLanguages.length === 1) {
      return (
        <Editor
          value={value[DEFAULT_LANGUAGE] || ''}
          handleOnChange={this.handleOnChange}
          language={DEFAULT_LANGUAGE}
        />
      );
    }

    return (
      <React.Fragment>
        <FieldLabel>{label}</FieldLabel>
        <FieldContainer>
          <AntTabs defaultActiveKey={'0'} style={{ zIndex: 0 }}>
            {AppSupportLanguages.map((language, index) => {
              return (
                <TabPane
                  key={index}
                  forceRender
                  tab={this.formatLanguageName(language)}
                >
                  <Editor
                    value={value[language] || ''}
                    handleOnChange={this.handleOnChange}
                    language={language}
                  />
                </TabPane>
              );
            })}
          </AntTabs>
          {isMultiLanguage ? (
            AppSupportLanguages.map(language => (
              <EditorError
                key={language}
                name={`${name}.${language}`}
                label={label}
                language={language}
                languageName={this.formatLanguageName(language)}
              />
            ))
          ) : (
            <Error touched name={name} />
          )}
        </FieldContainer>
      </React.Fragment>
    );
  }
}

const Editor = ({ handleOnChange, language, value }) => {
  const onChange = useCallback(value => handleOnChange(value, language), [
    handleOnChange,
    language
  ]);
  return (
    <EditorComponent onChange={onChange} value={value} locale={language} />
  );
};
const EditorError = ({ label, name, language, languageName }) => {
  const customText = useCallback(
    () => (
      <FormattedMessage
        id={'error.multi_language.is_required'}
        values={{
          name: label,
          language: languageName
        }}
      />
    ),
    [label, languageName]
  );
  return <Error key={language} touched name={name} customText={customText} />;
};

export default props => {
  return <Field {...props} component={TabEditor} />;
};
