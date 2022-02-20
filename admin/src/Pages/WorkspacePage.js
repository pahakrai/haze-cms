import React from 'react';
import { injectIntl } from 'react-intl';
// import { Row, Col } from 'antd';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import WorkspaceListContainer from '../Containers/Workspace/WorkspaceList';
import WorkspaceSearch from '../Containers/Workspace/WorkspaceSearch';
import WorkspaceFilter from '../Components/App/Workspace/WorkspaceFilter';
// import WorkspaceCreateButton from '../Containers/Workspace/WorkspaceCreateButton';
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
      <DocumentTitle title={intl.formatMessage({ id: 'nav.workspace' })}>
        <ContentContainer>
          <SiderLayout>
            <React.Fragment>
              <WorkspaceSearch
                intl={intl}
                filterValues={this.state.filterValue}
                searchTerm={this.state.searchTerm}
                onChanged={value => {
                  this.setState({
                    searchTerm: value
                  });
                }}
              />
              <WorkspaceFilter
                intl={intl}
                onChanged={filterValue => {
                  this.setState({
                    filterValue: {
                      ...this.state.filterValue,
                      ...filterValue
                    }
                  });
                }}
              />
            </React.Fragment>
            <React.Fragment>
              {/* <Row>
                <Col md={12}>
                  <WorkspaceCreateButton intl={intl} />
                </Col>
              </Row> */}
              <WorkspaceListContainer intl={intl} />
            </React.Fragment>
          </SiderLayout>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
export default injectIntl(Page);
