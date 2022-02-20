const {
  name: { lc, uc }
} = require('../../constant');

const e = (module.exports = {});

e.content = `
import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ${uc}FormContainer from '../Containers/${uc}/${uc}Form';

export default injectIntl(({ intl, ${lc}Id }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.${lc}s' })}>
    <ContentContainer>
      <${uc}FormContainer ${lc}Id={${lc}Id} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));`.replace(/^\s/, '');
