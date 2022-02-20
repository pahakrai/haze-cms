/* @flow */

import React from 'react';
import { injectIntl } from 'react-intl';

import SignUpConfirmExpiredPage from '../Components/App/SignUpConfirmExpiredPage';

export default injectIntl(({ intl }) => (
  <SignUpConfirmExpiredPage intl={intl} />
));
