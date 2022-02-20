import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import SalesVolumeFormContainer from '../Containers/SalesVolume/SalesVolumeForm';

export default injectIntl(({ intl, salesVolumeId, location }) => {
  const initialValues = useMemo(() => {
    const query = queryString.parse((location && location.search) || '');
    const values = (query && query.initialValues) || '';
    if (values) {
      return JSON.parse(values);
    } else {
      return {};
    }
  }, [location]);
  return (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.sales_volume' })}>
      <ContentContainer>
        <SalesVolumeFormContainer
          salesVolumeId={salesVolumeId}
          intl={intl}
          initialValues={initialValues}
        />
      </ContentContainer>
    </DocumentTitle>
  );
});
