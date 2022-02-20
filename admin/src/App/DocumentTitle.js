import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from '../Components/Common/DocumentTitle';
import { useWorkspaceName } from '../Containers/Workspace/hooks';

const _DocumentTitle = ({ intl, ...props }) => {
  const workspaceName =
    useWorkspaceName() || intl.formatMessage({ id: 'app_name' });
  return <DocumentTitle prefix={workspaceName} {...props} />;
};

export default injectIntl(_DocumentTitle);
