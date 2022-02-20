import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import {
  Button,
  makeStyles,
  TextField,
  Link as MLink
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useForgotPassword } from "../Hooks/useForgotPassword";
import Link from "next/link";
const useClasses = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  mb_3: {
    marginBottom: theme.spacing(3)
  },
  text_center: {
    textAlign: "center"
  }
}));
interface IForgotPassword {
  email: string;
}
export interface ForgotPasswordFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}
export const ForgotPasswordForm = ({
  className,
  ...rest
}: ForgotPasswordFormProps) => {
  const classes = useClasses();
  const [formError, setFormError] = useState();
  const intl = useIntl();
  const router = useRouter();
  const { forgotPassword, forgotPasswordLoading } = useForgotPassword({
    onCompleted: () => {
      router.push("/forgot-password/[result]", "/forgot-password/completed");
    },
    onError: (error) => {
      setFormError(error);
    }
  });
  const { register, handleSubmit, errors } = useForm<IForgotPassword>();
  const onSubmit = (data: IForgotPassword) => {
    forgotPassword?.(data.email);
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      {formError && (
        <Alert severity="error" className={classes.mb_2}>
          {intl.formatMessage({ id: "error_check_email" })}
        </Alert>
      )}
      <TextField
        name="email"
        type="email"
        placeholder={intl.formatMessage({
          id: "label_email"
        })}
        inputRef={register({
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        })}
        error={Boolean(errors.email)}
        helperText={
          errors.email?.type == "required"
            ? intl.formatMessage({ id: "error_required" })
            : errors.email?.type == "pattern"
            ? intl.formatMessage({ id: "error_email" })
            : undefined
        }
        onChange={useCallback(() => formError && setFormError(null), [
          formError
        ])}
        fullWidth
        variant="outlined"
        size="small"
        className={classes.mb_2}
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        disableElevation
        disabled={forgotPasswordLoading}
        className={classes.mb_3}
      >
        {intl.formatMessage({
          id: "display_submit"
        })}
      </Button>
      <div className={clsx(classes.mb_2, classes.text_center)}>
        <Link href="/auth/login" passHref>
          <MLink>{intl.formatMessage({ id: "display_login_member" })}</MLink>
        </Link>
      </div>
      <div className={clsx(classes.mb_2, classes.text_center)}>
        <Link href="/auth/sign-up" passHref>
          <MLink>{intl.formatMessage({ id: "display_new_user_signup" })}</MLink>
        </Link>
      </div>
    </form>
  );
};
export default ForgotPasswordForm;
