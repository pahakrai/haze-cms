import React, { ReactNode, useContext } from "react";

export interface OptionsType {
  title?: ReactNode;
  content?: ReactNode;
  custom?: ReactNode;
  status?: "success" | "error" | "default";
  delay?: number;
}
export interface ToastContextType {
  defaultOptions?: OptionsType;
  toast(options: OptionsType);
  close(id: number);
}

export const defaultValues: ToastContextType = {
  toast() {},
  close() {}
};

export const ToastContext: React.Context<ToastContextType> = React.createContext(
  defaultValues
);

export const useToast = (): ToastContextType => {
  return useContext(ToastContext);
};
