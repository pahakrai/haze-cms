export interface UserActions {
  allows: Array<string>;
  denies: Array<string>;
}

export const isAclActionAllow = (
  requestPolicies: Array<string>,
  userActions: UserActions = {allows: [], denies: []}
): boolean => {
  if (
    !requestPolicies ||
    !Array.isArray(requestPolicies) ||
    !requestPolicies.length
  )
    return true;
  return (
    Array.isArray(userActions.allows) &&
    Array.isArray(userActions.denies) &&
    requestPolicies.every(
      rq =>
        userActions.allows.some(policy =>
          new RegExp(`^${policy.replace('*', '.*')}$`, 'i').test(rq)
        ) &&
        !userActions.denies.some(policy =>
          new RegExp(`^${policy.replace('*', '.*')}$`, 'i').test(rq)
        )
    )
  );
};
