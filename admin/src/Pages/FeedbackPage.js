import React from 'react';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import SubscriptionLogListContainer from '../Containers/SubscriptionLog/SubscriptionLogList';
import SubscriptionLogSearchButton from '../Containers/SubscriptionLog/SubscriptionLogSearchButton';
import SubscriptionLogDateFilter from '../Containers/SubscriptionLog/SubscriptionLogDateFilter';
import FilterLayout from '../Components/Common/FilterLayout';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hideSearchSider: false,
      searchTerm: undefined,
      filterValues: {}
    };
  }

  _onChange = value => {
    this.setState(({ filterValues }) => ({
      filterValues: { ...filterValues, ...value }
    }));
  };
  render() {
    const { intl, pagination } = this.props;
    const { filterValues, searchTerm } = this.state;

    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.subscriptionLog' })}>
        <ContentContainer>
          <FilterLayout>
            <SubscriptionLogDateFilter
              intl={intl}
              filterValues={filterValues}
              onClear={() => {
                this.setState({
                  searchTerm: undefined
                });
              }}
              onChanged={value => {
                this.setState({
                  filterValues: value
                });
              }}
            />
            <React.Fragment />
            <React.Fragment />
            <FilterLayout.ButtonFloatLayout>
              <SubscriptionLogSearchButton
                intl={intl}
                filterValues={filterValues}
                searchTerm={searchTerm}
                onChanged={value => {
                  this.setState({
                    searchTerm: value
                  });
                }}
              />
            </FilterLayout.ButtonFloatLayout>
            <React.Fragment>
              <FilterLayout.ButtonFloatLayout marginRight={10}>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {intl.formatMessage(
                    {
                      id: 'display_page.total_record'
                    },
                    {
                      n: pagination.total
                    }
                  )}
                </span>
              </FilterLayout.ButtonFloatLayout>
              <SubscriptionLogListContainer intl={intl} />
            </React.Fragment>
          </FilterLayout>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
const intledPage = injectIntl(Page);
const mapStateToProps = state => ({
  pagination: state.pagination.subscriptionLogs
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(intledPage)
);
