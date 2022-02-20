import React from 'react';
import { injectIntl } from 'react-intl';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import PricingListContainer from '../Containers/Pricing/PricingList';
import SiderLayout from '../Components/Common/SiderLayout';
import PricingFilter from '../Containers/Pricing/PricingFilter';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: undefined,
      locTo: undefined,
      locFr: undefined
    };
  }
  _onChanged = value => this.setState({ ...this.state, ...value });
  render() {
    const { intl } = this.props;
    const { vehicleType, locTo, locFr } = this.state;
    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.pricing' })}>
        <ContentContainer>
          <SiderLayout>
            <React.Fragment>
              <PricingFilter
                intl={intl}
                _onChanged={this._onChanged}
                vehicleType={vehicleType}
                locTo={locTo}
                locFr={locFr}
              />
            </React.Fragment>
            <React.Fragment>
              <PricingListContainer
                querys={this.state}
                intl={intl}
                vehicleType={vehicleType}
                locTo={locTo}
                locFr={locFr}
              />
            </React.Fragment>
          </SiderLayout>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
export default injectIntl(Page);
