const {
  name: { lc, uc }
} = require('../../constant');

const e = (module.exports = {});

e.content = `
import React from 'react';
import { injectIntl } from 'react-intl';

import { Row, Col } from 'antd';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ${uc}ListContainer from '../Containers/${uc}/${uc}List';
import ${uc}Search from '../Containers/${uc}/${uc}Search';
import ${uc}CreateButton from '../Containers/${uc}/${uc}CreateButton';
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
      <DocumentTitle title={intl.formatMessage({ id: 'nav.${lc}s' })}>
        <ContentContainer>
          <SiderLayout>
            <React.Fragment>
              <${uc}Search
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
                  <${uc}CreateButton intl={intl} />
                </Col>
              </Row>
              <${uc}ListContainer intl={intl} />
            </React.Fragment>
          </SiderLayout>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
export default injectIntl(Page);
`.replace(/^\s/, '');
