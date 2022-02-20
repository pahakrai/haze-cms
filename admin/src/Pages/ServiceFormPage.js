import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'

import { getCurrentWorkspace } from '../Redux/Account/selectors'

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer'
import DocumentTitle from '../Components/Common/DocumentTitle'
import ServiceFormContainer from '../Containers/Service/ServiceForm'

class Page extends React.PureComponent {
  render() {
    const { currentWorkspace, intl, serviceId } = this.props
    return (
      <DocumentTitle
        title={intl.formatMessage({
          id:
            currentWorkspace.type === Common.type.WorkspaceType.EDUCATION ||
            currentWorkspace.type === Common.type.WorkspaceType.JOBHUNTING
              ? 'nav.skills'
              : 'nav.service'
        })}
      >
        <ContentContainer>
          <ServiceFormContainer serviceId={serviceId} intl={intl} />
        </ContentContainer>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentWorkspace: getCurrentWorkspace(state)
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page))
)
