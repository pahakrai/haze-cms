import React from 'react';
import { injectIntl } from 'react-intl';

import CouponFormContainer from '../Containers/Coupon/CouponForm';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';

// import Spacer from '../Components/Common/Spacer';

export default injectIntl(({ intl, couponId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'coupon.title' })}>
    <ContentContainer>
      {/* <Breadcrumb
        items={[
          { name: 'Home', to: '/' },
          {
            name: intl.formatMessage({ id: 'coupon.title' }),
            to: '/coupons'
          },
          { name: intl.formatMessage({ id: 'couponDetail.title' }) }
        ]}
      /> */}
      <CouponFormContainer couponId={couponId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
