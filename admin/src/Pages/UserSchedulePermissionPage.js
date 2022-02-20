import React from 'react';
import { injectIntl } from 'react-intl';

import FilterLayout from '../Components/Common/FilterLayout';
import UserSchedulePermissionListContainer from '../Containers/UserSchedulePermission/UserSchedulePermissionList';
import UserSchedulePermissionSearchButton from '../Containers/UserSchedulePermission/UserSchedulePermissionSearchButton';
// import UserSchedulePermissionFilterClear from '../Containers/UserSchedulePermission/UserSchedulePermissionFilterClear';
import UserSchedulePermissionFilter from '../Containers/UserSchedulePermission/UserSchedulePermissionFilter';
import UserFilter from '../Containers/UserSchedulePermission/UserFilter';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

class UserSchedulePermissionPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: {}
    };
  }

  _onSearchKeyWordChange = name => {
    const { filterValue } = this.state;
    this.setState({ filterValue: { ...filterValue, name } });
  };
  _onFilterValueChange = newFilterValue => {
    const { filterValue } = this.state;
    this.setState({ filterValue: { ...filterValue, ...newFilterValue } });
  };

  render() {
    const { intl } = this.props;
    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.user-groups' })}>
        <ContentContainer>
          <FilterLayout>
            <UserFilter intl={intl} onChanged={this._onFilterValueChange} />
            <UserSchedulePermissionFilter
              intl={intl}
              onChanged={this._onFilterValueChange}
            />
            <React.Fragment />
            <FilterLayout.ButtonFloatLayout>
              <UserSchedulePermissionSearchButton
                intl={intl}
                filterValues={this.state.filterValue}
                searchTerm={this.state.searchTerm}
                onChanged={value => {
                  this.setState({
                    searchTerm: value
                  });
                }}
              />
              {/* <UserSchedulePermissionFilterClear
                intl={intl}
                onClear={() => {
                  this.setState({
                    searchTerm: undefined
                  });
                }}
                onChanged={value => {
                  this.setState({
                    filterValue: value
                  });
                }}
              /> */}
            </FilterLayout.ButtonFloatLayout>
            <React.Fragment>
              <UserSchedulePermissionListContainer intl={intl} />
            </React.Fragment>
          </FilterLayout>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
export default injectIntl(UserSchedulePermissionPage);
