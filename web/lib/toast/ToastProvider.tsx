import React from "react";
import { makeStyles, Snackbar, SnackbarProps } from "@material-ui/core";
import clsx from "clsx";
import { ToastContext, OptionsType, ToastContextType } from "./ToastContext";

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2),
    background: "#FFF",
    marginTop: theme.spacing(4)
  },
  header: {},
  title: {
    "&$error": {
      color: theme.palette.error.main
    },
    "&$success": {
      color: theme.palette.success.main
    }
  },
  body: {},
  error: {},
  success: {}
}));

export interface ToastProviderProps {
  children?: React.ReactNode;
  defaultOptions?: OptionsType;
}
export interface ToastProviderStates {
  toastQueue: { options: OptionsType; id: number; show?: boolean }[];
  contextValue: ToastContextType;
}

export class ToastProvider extends React.PureComponent<
  ToastProviderProps,
  ToastProviderStates
> {
  constructor(props) {
    super(props);

    this.state = {
      toastQueue: [],
      contextValue: {
        toast: this.toast,
        close: this.close,
        defaultOptions: { delay: 3000 }
      }
    };
  }
  toast = (options: OptionsType) => {
    const id = Math.random();
    this.setState(
      ({ toastQueue: prevtoastQueue, contextValue: { defaultOptions } }) => ({
        toastQueue: [
          ...prevtoastQueue,
          {
            options: { ...defaultOptions, ...options },
            id,
            show: false
          }
        ]
      }),
      () => setTimeout(() => this.open(id), 0)
    );
  };
  open = (id: number) => {
    this.setState(({ toastQueue: prevtoastQueue }) => ({
      toastQueue: prevtoastQueue.reduce((newQueue, item) => {
        if (item.id === id) {
          const newItem = { ...item, show: true };
          newQueue.push(newItem);
        } else {
          newQueue.push(item);
        }
        return newQueue;
      }, [])
    }));
  };
  close = (id: number) => {
    this.setState(
      ({ toastQueue: prevtoastQueue }) => ({
        toastQueue: prevtoastQueue.reduce((newQueue, item) => {
          if (item.id === id) {
            const newItem = { ...item, show: false };
            newQueue.push(newItem);
          } else {
            newQueue.push(item);
          }
          return newQueue;
        }, [])
      }),
      () => setTimeout(() => this.destroy(id), 2000)
    );
  };
  destroy = (id: number) => {
    this.setState(({ toastQueue: prevtoastQueue }) => ({
      toastQueue: prevtoastQueue.filter((item) => item.id !== id)
    }));
  };
  public render(): React.ReactNode {
    const { children } = this.props;
    const { toastQueue, contextValue } = this.state;
    const { close } = contextValue;

    return (
      <ToastContext.Provider value={contextValue}>
        {children}
        {toastQueue.map(
          ({
            options: { title, content, custom, delay, status },
            id,
            show
          }) => {
            if (custom) {
              return custom;
            }
            return (
              <Toast
                header={title}
                content={content}
                key={id}
                onClose={() => close(id)}
                open={show}
                autoHideDuration={delay}
                status={status}
              />
            );
          }
        )}
      </ToastContext.Provider>
    );
  }
}
interface ToastProps extends SnackbarProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  status?: "success" | "error" | "default";
}
const Toast = ({
  header,
  content,
  id,
  open,
  onClose,
  autoHideDuration,
  status
}: ToastProps) => {
  const classes = useClasses();
  return (
    <Snackbar
      key={id}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <div className={classes.root}>
        <div className={classes.header}>
          <strong
            className={clsx(classes.title, {
              [classes.error]: status === "error",
              [classes.success]: status === "success"
            })}
          >
            {header}
          </strong>
        </div>
        {content && <div className={classes.body}>{content}</div>}
      </div>
    </Snackbar>
  );
};
