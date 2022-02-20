import React from 'react';
import Select from 'react-select';

export default ({ disabled, intl, ...props }) => {
  return (
    <Select
      {...props}
      isDisabled={disabled}
      noOptionsMessage={() => (
        <div> {intl.formatMessage({ id: 'display_no_options' })}</div>
      )}
      styles={{
        control: provided => ({
          ...provided,
          borderWidth: 1,
          borderRadius: 0,
          borderColor: 'rgb(224,224,224)',
          fontWeight: '600',
          color: !disabled ? 'rgba(51,51,51,1)' : '#999999',
          backgroundColor: !disabled ? '#FFF' : ' rgba(0, 0, 0, 0.03)',
          fontSize: 16,
          padding: '2px 0px'
        })
      }}
    />
  );
};
