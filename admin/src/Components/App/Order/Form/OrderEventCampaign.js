import React, { useMemo } from 'react';
import { Field } from 'redux-form';
import Common from '@golpasal/common';

import SelectEventCampaigns from '../../../../Containers/Form/SelectEventCampaignsNotOrdered';

const { EDUCATION } = Common.type.WorkspaceType;

export const OrderEventCampaign = ({
  workspaceType,
  workspace,
  intl,
  formValueClient
}) => {
  const client = formValueClient;
  const query = useMemo(
    () => ({ workspace, participant: client || undefined }),
    [workspace, client]
  );

  if (workspaceType !== EDUCATION) {
    return <div />;
  }
  return (
    <SelectEventCampaigns
      label={intl.formatMessage({ id: 'course_schedule' }) + ':'}
      name="eventCampaigns"
      query={query}
      placeholder=" "
      containerStyle={{ marginBottom: 10 }}
      disabled={!client}
    />
  );
};

export default props => {
  return <Field {...props} component={OrderEventCampaign} />;
};
