import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import TagImageFormContainer from '../Containers/Tag/TagImageForm';

class Page extends React.PureComponent {
  render() {
    const { intl, text } = this.props;
    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.tag_image' })}>
        <ContentContainer>
          <TagImageFormContainer intl={intl} text={text} />
        </ContentContainer>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    text: ownProps.text
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page))
);
