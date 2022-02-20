import React from 'react';
import { injectIntl } from 'react-intl';

import { Row, Col } from 'antd';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import PageTemplateListContainer from '../Containers/PageTemplate/PageTemplateList';
import PageTemplateSearch from '../Containers/PageTemplate/PageTemplateSearch';
import PageTemplateCreateButton from '../Containers/PageTemplate/PageTemplateCreateButton';
import SiderLayout from '../Components/Common/SiderLayout';

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
      <DocumentTitle title={intl.formatMessage({ id: 'nav.pageTemplates' })}>
        <ContentContainer>
          <SiderLayout>
            <React.Fragment>
              <PageTemplateSearch
                intl={intl}
                filterValues={this.state.filterValue}
                searchTerm={this.state.searchTerm}
                onChanged={value => {
                  this.setState({
                    searchTerm: value
                  });
                }}
              />
            </React.Fragment>
            <React.Fragment>
              <Row>
                <Col md={12}>
                  <PageTemplateCreateButton intl={intl} />
                </Col>
              </Row>
              <PageTemplateListContainer intl={intl} />
            </React.Fragment>
          </SiderLayout>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
export default injectIntl(Page);
