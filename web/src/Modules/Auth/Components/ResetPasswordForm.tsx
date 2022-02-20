import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import clsx from "clsx";
import Link from "next/link";
import {
  Button,
  fade,
  InputAdornment,
  makeStyles,
  TextField,
  Link as MLink
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { LockIcon } from "~/src/Components/SvgIcon";

import { useResetPassword } from "../Hooks/useResetPassword";

const useClasses = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  mb_3: {
    marginBottom: theme.spacing(3)
  },
  text_primary_50: {
    color: fade(theme.palette.text.primary, 0.5)
  },
  text_center: {
    textAlign: "center"
  }
}));
interface IResetPassworFields {
  password: string;
  confirm_password: string;
}

export interface ResetPasswordFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  passcodeToken: string;
}

export const ResetPasswordForm = ({
  passcodeToken,
  ...rest
}: ResetPasswordFormProps) => {
  const classes = useClasses();
  const [formError, setFormError] = useState();
  const intl = useIntl();
  const router = useRouter();
  const {
    handleSubmit,
    errors,
    register,
    watch
  } = useForm<IResetPassworFields>();
  const { resetPassword, resetPasswordLoading } = useResetPassword({
    onCompleted: (data) => {
      !!data && router.push("/auth/password-completed");
    },
    onError: (error) => {
      setFormError(
        error?.graphQLErrors?.[0]?.extensions?.message ||
          error?.message?.toString?.()
      );
    }
  });
  const onSubmit = useCallback((data: IResetPassworFields) => {
    resetPassword(passcodeToken, data.password);
  }, []);
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      {formError && (
        <Alert severity="error" className={classes.mb_2}>
          {formError}
        </Alert>
      )}
      <TextField
        name="password"
        type="password"
        placeholder={intl.formatMessage({
          id: "label_password"
        })}
        inputRef={register({
          required: true,
          minLength: 6
        })}
        onChange={useCallback(() => formError && setFormError(null), [
          formError
        ])}
        error={Boolean(errors.password)}
        helperText={
          errors.password?.type == "required"
            ? intl.formatMessage({ id: "error_required" })
            : errors.password?.type == "minLength"
            ? intl.formatMessage({ id: "error_min_length" }, { value: 6 })
            : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon className={classes.text_primary_50} />
            </InputAdornment>
          )
        }}
        fullWidth
        size="small"
        variant="outlined"
        className={classes.mb_2}
      />
      <TextField
        name="confirm_password"
        type="password"
        placeholder={intl.formatMessage({
          id: "label_confirm_password"
        })}
        inputRef={register({
          required: true,
          minLength: 6
        })}
        onChange={useCallback(() => formError && setFormError(null), [
          formError
        ])}
        error={Boolean(errors.confirm_password)}
        helperText={
          errors.confirm_password?.type == "required"
            ? intl.formatMessage({ id: "error_required" })
            : errors.confirm_password?.type == "validate"
            ? intl.formatMessage({ id: "error_confirm_password" })
            : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon className={classes.text_primary_50} />
            </InputAdornment>
          )
        }}
        fullWidth
        size="small"
        variant="outlined"
        className={classes.mb_2}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        disableElevation
        disabled={resetPasswordLoading}
        className={classes.mb_3}
      >
        {intl.formatMessage({
          id: "display_submit"
        })}
      </Button>
      <Link href="/auth/login" passHref>
        <MLink
          target="blank"
          component="h6"
          className={clsx(classes.mb_2, classes.text_center)}
        >
          {intl.formatMessage({ id: "display_login_member" })}
        </MLink>
      </Link>
      <Link href="/auth/sign-up" passHref>
        <MLink
          target="blank"
          component="h6"
          className={clsx(classes.mb_2, classes.text_center)}
        >
          {intl.formatMessage({ id: "display_new_user_signup" })}
        </MLink>
      </Link>
    </form>
  );
};
export default ResetPasswordForm;
