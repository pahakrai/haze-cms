import { useSelector } from 'react-redux';

export const useLoginPageWorkspaceCode = () => {
  return useSelector(state => state.page.loginPageData.workspaceCode);
};

export const useLoginPageWorkspaceName = () => {
  return useSelector(state => state.page.loginPageData.workspaceName);
};
