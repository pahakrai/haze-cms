import React, { useMemo, useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import WorkspaceService from '../../../Services/APIServices/WorkspaceService';

export const LoginFromMode = {
  WORKSPACE_CODE: 'workspace_code',
  LOGIN: 'Login',
  INIT: 'get_one_time_password'
};

export const useLoginFormHooks = ({
  mode,
  setLoginFromMode,
  setHeaderWorkspace
}) => {
  const [workspaceCode, setWorkspaceCode] = useState();
  const [workspaceCodeError, setWorkspaceCodeError] = useState();
  const [getWorkspaceLoading, setGetWorkspaceLoading] = useState(false);
  const [styles, commonInputProps] = useMemo(() => {
    const styles = {
      submitButton: {
        borderRadius: 22,
        border: '1px solid rgba(151,151,151,1)',
        marginTop: 55,
        width: '100%',
        fontFamily: 'sans-serif'
      },
      input: {
        fontSize: 13,
        fontWeight: 'normal',
        borderRadius: 6
      }
    };
    const commonInputProps = {
      style: styles.input
    };
    return [styles, commonInputProps];
  }, []);
  const workspaceCodeInputProps = useMemo(() => {
    return {
      meta: { error: workspaceCodeError, touched: true },
      input: {
        onChange: value => {
          setWorkspaceCode(value);
          setHeaderWorkspace(null);
        }
      },
      onAccessoryClick: () => {
        setLoginFromMode(LoginFromMode.WORKSPACE_CODE);
      },
      accessoryContainerStyle: { right: 16, top: 13 }
    };
  }, [workspaceCodeError, setHeaderWorkspace, setLoginFromMode]);

  const checkWorkspaceCode = useCallback(async () => {
    let workspaceId = '';
    if (getWorkspaceLoading || mode !== LoginFromMode.WORKSPACE_CODE) {
      return;
    }
    // required
    if (!workspaceCode) {
      setWorkspaceCodeError(<FormattedMessage id="error.required" />);
      return;
    }
    setWorkspaceCodeError();
    setGetWorkspaceLoading(true);
    try {
      const result = await WorkspaceService.getWorkspaceByCode(workspaceCode);
      workspaceId = result && result.data && result && result.data._id;
      setHeaderWorkspace(result && result.data);
    } catch (e) {}
    setGetWorkspaceLoading(false);
    if (!workspaceId) {
      setWorkspaceCodeError(
        <FormattedMessage id="login.workspace_code_no_exist" />
      );
    } else {
      setLoginFromMode(LoginFromMode.INIT);
    }
  }, [
    getWorkspaceLoading,
    mode,
    workspaceCode,
    setHeaderWorkspace,
    setLoginFromMode
  ]);

  return {
    checkWorkspaceCode,
    getWorkspaceLoading,
    styles,
    commonInputProps,
    workspaceCode,
    setWorkspaceCode,
    workspaceCodeInputProps: {
      ...workspaceCodeInputProps,
      value: workspaceCode
    }
  };
};
