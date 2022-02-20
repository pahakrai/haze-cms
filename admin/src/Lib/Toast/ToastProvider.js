import React, { useEffect } from 'react';
import {
  ToastProvider as Provider,
  useToasts
} from 'react-toast-notifications';

// options
// appearance: AppearanceTypes;
// autoDismiss?: boolean;
// onDismiss?: (id: string) => void;
// content?: string;
let toastUtils = {
  addToast: () => {},
  removeToast: () => {},
  removeAllToasts: () => {},
  updateToast: () => {},
  toastStack: () => {}
};
export let toast = {
  addToast: (...args) => {
    return toastUtils.addToast(...args);
  },
  removeToast: (...args) => {
    return toastUtils.removeToast(...args);
  },
  removeAllToasts: (...args) => {
    return toastUtils.removeAllToasts(...args);
  },
  updateToast: (...args) => {
    return toastUtils.updateToast(...args);
  },
  toastStack: (...args) => {
    return toastUtils.toastStack(...args);
  }
};

const ToastHandler = props => {
  const {
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    toastStack
  } = useToasts();

  useEffect(() => {
    toastUtils = {
      addToast,
      removeToast,
      removeAllToasts,
      updateToast,
      toastStack
    };
  }, [addToast, removeToast, removeAllToasts, updateToast, toastStack]);

  return null;
};
export const ToastProvider = ({ children, ...props }) => {
  return (
    <Provider
      key="toast_provider"
      autoDismissTimeout={2500}
      placement="top-center"
      {...props}
    >
      {children}
      <ToastHandler {...props} />
    </Provider>
  );
};
