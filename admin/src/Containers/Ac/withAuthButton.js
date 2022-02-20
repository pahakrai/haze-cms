import React from 'react';
import Button from '../../Components/Common/Button';
import withAuthActions from './withAuthActions';
export default requestActions =>
  withAuthActions(requestActions)(
    ({
      disabled,
      updateMode,
      intl,
      component: Comp = Button.Primary,
      children,
      ...props
    }) => (
      <Comp disabled={disabled} type="submit" {...props}>
        {children}
        {updateMode
          ? intl
            ? intl.formatMessage({ id: 'update_btn' })
            : 'Update'
          : intl
          ? intl.formatMessage({ id: 'create_btn' })
          : 'Create'}
      </Comp>
    )
  );
