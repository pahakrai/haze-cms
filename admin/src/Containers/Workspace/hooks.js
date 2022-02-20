import { useSelector } from 'react-redux';

export const useCurrentWorkspace = () =>
  useSelector(state => {
    const currentWorkspaceId = state.app.workspaceId;
    if (!currentWorkspaceId) return null;
    return state.resources.workspaces[currentWorkspaceId];
  });

export const useWorkspaceCode = () => {
  const currentWorkspace = useCurrentWorkspace();
  const appName = process.env.REACT_APP_NAME;
  return (currentWorkspace && currentWorkspace.code) || appName;
};

export const useWorkspaceName = () => {
  const currentWorkspace = useCurrentWorkspace();
  const appName = process.env.REACT_APP_NAME;
  return (currentWorkspace && currentWorkspace.name) || appName;
};
