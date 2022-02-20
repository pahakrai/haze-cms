import React from 'react';
import { Field } from 'redux-form';

import Modal from '../../Modal';
import WorkspaceSelectTheme from './WorkspaceSelectTheme';

const WorkspaceTheme = ({
  input: { value, onChange, name },
  intl,
  formValueSetting
}) => {
  return (
    <div style={{ paddingBottom: 20 }}>
      <label
        style={{
          padding: '3px 0',
          display: 'inline-block',
          fontWeight: 600,
          color: '#666666',
          fontSize: 14
        }}
      >
        {intl.formatMessage({ id: 'display_theme_current_theme' })}：
        {formValueSetting && formValueSetting.theme
          ? formValueSetting.theme.name
          : ''}
      </label>
      <Modal.Button
        modalStyle={{
          content: { width: '90%', margin: ' 0 auto' }
        }}
        text={intl.formatMessage({
          id: 'display_theme_select_theme'
        })}
        title={intl.formatMessage({
          id: 'display_theme_select_theme'
        })}
        content={closeModal => (
          <WorkspaceSelectTheme
            intl={intl}
            closeModal={closeModal}
            formValueSetting={formValueSetting}
            changeTheme={value => {
              onChange(value);
              closeModal();
            }}
          />
        )}
      />
    </div>
  );
};

export default props => {
  return <Field component={WorkspaceTheme} {...props} />;
};
