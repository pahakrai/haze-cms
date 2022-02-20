import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  fade
} from "@material-ui/core";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { EmailIcon } from "~/src/Components/SvgIcon";
import { useSendPasscode } from "../Hooks/useSendPasscode";

const useClasses = makeStyles((theme) => ({
  text_black_50: {
    color: fade(theme.palette.text.primary, 0.5)
  },
  mb_2: {
    marginBottom: theme.spacing(2)
  }
}));
interface IResendConfirmFields {
  email: string;
}

export interface ResendConfirmFormProps {}

export const ResendConfirmForm: React.FC<ResendConfirmFormProps> = () => {
  const [formError, setFormError] = useState();
  const classes = useClasses();
  const router = useRouter();
  const intl = useIntl();
  const { handleSubmit, errors, register } = useForm<IResendConfirmFields>();
  const { sendPasscode, loading } = useSendPasscode({
    onCompleted: () => {
      // TODO jump forgot password success
      router.push(
        "/resend-confirm-notification/[result]",
        "/resend-confirm-notification/completed"
      );
    },
    onError: (error) => {
      setFormError(error);
    }
  });
  const onSubmit = useCallback(
    (data: IResendConfirmFields) => sendPasscode?.(data.email),
    []
  );
  return (
    <form>
      {formError && (
        <Alert severity="error">
          {intl.formatMessage({ id: "error_check_email" })}
        </Alert>
      )}
      <TextField
        name="email"
        placeholder={intl.formatMessage({
          id: "label_email"
        })}
        disabled={loading}
        inputRef={register({
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        })}
        onChange={useCallback(() => formError && setFormError(null), [
          formError
        ])}
        error={Boolean(errors.email)}
        helperText={
          errors.email?.type == "required"
            ? intl.formatMessage({ id: "error_required" })
            : errors.email?.type == "pattern"
            ? intl.formatMessage({ id: "error_email" })
            : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon className={classes.text_black_50} />
            </InputAdornment>
          )
        }}
        fullWidth
        size="small"
        variant="outlined"
        className={classes.mb_2}
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disableElevation
        type="submit"
        disabled={loading}
        onClick={handleSubmit(onSubmit)}
      >
        {intl.formatMessage({ id: "display_submit" })}
      </Button>
    </form>
  );
};

export default ResendConfirmForm;
