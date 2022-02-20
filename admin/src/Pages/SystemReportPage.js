import React from 'react';
import { injectIntl } from 'react-intl';
import { Row, Col } from 'react-flexa';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import SystemReportListContainer from '../Containers/SystemReport/SystemReportList';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hideSearchSider: false,
      searchTerm: null,
      filterValue: {}
    };
  }
  render() {
    const { intl } = this.props;

    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.reports' })}>
        <ContentContainer>
          <React.Fragment>
            <Row>
              <Col md={12} lg={6} style={{ width: '100%' }}>
                <SystemReportListContainer intl={intl} />
              </Col>
            </Row>
          </React.Fragment>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
export default injectIntl(Page);
