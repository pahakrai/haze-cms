import React, { useMemo, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router';

import { PolicyActions } from '../../Redux/Policy/actions';
import ResourcesActions from '../../Redux/Resources/actions';
import PolicyFormComponent from '../../Components/App/Policy/PolicyForm';
import FormName from '../../Constants/Form';
import { getPolicyById } from '../../Redux/selectors';
import Loading from '../../Components/Common/Loading';

export const PolicyForm = ({
  form,
  updateMode,
  policyId,
  policy,
  getPolicyById,
  updatePolicy,
  createPolicy,
  removePolicy
}) => {
  const history = useHistory();
  useEffect(() => {
    if (policyId) {
      removePolicy(policyId);
      policyId && getPolicyById(policyId);
    }
  }, [policyId, removePolicy, getPolicyById]);

  const initialValues = useMemo(() => (updateMode ? { ...policy } : {}), [
    policy,
    updateMode
  ]);

  const onSubmit = useCallback(
    _values => {
      const fn = updateMode ? updatePolicy : createPolicy;
      let values = { ..._values };
      if (updateMode) {
        values = {
          _id: values._id,
          workspaceTypes: values.workspaceTypes,
          workspaceAccess: values.workspaceAccess.map(v => v._id)
        };
      }
      fn(values);
    },
    [updateMode, updatePolicy, createPolicy]
  );
  const onSubmitSuccess = useCallback(() => {
    history.push('/policies');
  }, [history]);
  const onSubmitFail = useCallback(() => {}, []);

  return updateMode && !policy ? (
    <Loading isLoading />
  ) : (
    <PolicyFormComponent
      form={form}
      updateMode={updateMode}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    />
  );
};

const mapStateToProps = (state, { policyId }) => {
  const { POLICY_CREATE, POLICY_UPDATE } = FormName;
  const updateMode = Boolean(policyId);
  const form = updateMode ? POLICY_UPDATE : POLICY_CREATE;
  const policy = getPolicyById(state, policyId, { populate: false });
  return {
    form,
    policy,
    updateMode
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createPolicy: PolicyActions.createPolicy,
      updatePolicy: PolicyActions.updatePolicy,
      getPolicyById: PolicyActions.getPolicyById,
      removePolicy: ResourcesActions.removePolicy
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PolicyForm);
