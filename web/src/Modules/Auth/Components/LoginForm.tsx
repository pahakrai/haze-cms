import React from "react";
import { useIntl } from "react-intl";
import {
  Button,
  makeStyles,
  Link as MLink,
  TextField,
  InputAdornment
} from "@material-ui/core";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useLogin } from "../Hooks/useLogin";
import { useLazyCurrentUser } from "../Hooks/useLazyCurrentUser";
import { verifyUser } from "~/src/Modules/Auth/utils";
import { useAuthConfigs } from "../Hooks/useAuthConfigs";
import { useToast } from "~/lib/toast";
import { EmailIcon, LockIcon } from "~/src/Components/SvgIcon";

import { setToken } from "~/lib/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const useClasses = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  d_flex: {
    display: "flex"
  },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_space_between: {
    justifyContent: "space-between"
  }
}));
interface ILoginForm {
  email: string;
  password: string;
}
export interface LoginFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}
export default function LoginForm({
  className,
  style,
  ...rest
}: LoginFormProps) {
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const { toast } = useToast();
  const _redirect = (router.query.redirect as string) || "/";
  const { getCurrentUser } = useLazyCurrentUser();
  const { authConfigs } = useAuthConfigs();
  const { login, error, loading } = useLogin({
    onCompleted: (userToken) => {
      getCurrentUser({
        context: {
          headers: {
            authorization: `Bearer ${userToken?.access_token}`
          }
        }
      }).then(({ data }) => {
        if (!data) {
          throw Error("not get current user");
        }
        // get auth config
        const authConfig = authConfigs?.[0];
        // if not authConfig , may
        if (!authConfig) {
          throw Error("not get auth config");
        }
        // handle verify user
        verifyUser(
          data.currentUser,
          userToken,
          {
            ...(authConfig as any),
            required: authConfig?.loginRequireVerify
          },
          (params: any) => {
            let content = "";
            if (params?.contactMethod === "emailVerify") {
              content = intl.formatMessage({ id: "msg_verify_email" });
            } else if (params?.contactMethod === "phoneVerify") {
              content = intl.formatMessage({ id: "msg_verify_phone" });
            }
            toast({
              status: "error",
              title: intl.formatMessage({
                id: "display_verify_user_dialog_title"
              }),
              content
            });
          }
        ).then(async () => {
          // login in success
          // persist token
          setToken(userToken);
          router.replace(_redirect);
          // onComplete?.() || router.reload();
          // jump home page
        });
      });
    },
    onError: () => {}
  });
  const { register, handleSubmit, errors } = useForm<ILoginForm>();
  const onSubmit = (data: ILoginForm) => {
    login?.(data.email, data.password);
  };
  return (
    <div style={style}>
      <Head>
        <script src="https://use.fontawesome.com/releases/v5.15.1/js/all.js"></script>
      </Head>
      <form
        noValidate
        autoComplete="off"
        className={clsx(className)}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        <TextField
          className={classes.mb_2}
          name="email"
          fullWidth
          variant="outlined"
          size="small"
          placeholder={intl.formatMessage({
            id: "label_email"
          })}
          inputRef={register({
            required: true
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
          error={Boolean(errors?.email || error)}
          helperText={
            errors?.email?.type === "required"
              ? intl.formatMessage({ id: "error_required" })
              : error
              ? intl.formatMessage({
                  id: "error_incorrect_username_or_password"
                })
              : undefined
          }
        ></TextField>
        <TextField
          className={classes.mb_2}
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          size="small"
          placeholder={intl.formatMessage({ id: "placeholder_password" })}
          inputRef={register({
            required: true
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
          error={Boolean(errors?.password)}
          helperText={
            errors?.password?.type === "required"
              ? intl.formatMessage({ id: "error_required" })
              : undefined
          }
        ></TextField>
        <div
          className={clsx(
            classes.d_flex,
            classes.align_items_center,
            classes.justify_content_space_between,
            classes.mb_2
          )}
        >
          <Link href="/resend-confirm-notification" passHref>
            <MLink color="textSecondary">
              {intl.formatMessage({ id: "display_re_verify_email" })}
            </MLink>
          </Link>
          <Link href="/forgot-password" passHref>
            <MLink color="textSecondary">
              {intl.formatMessage({ id: "display_forgot_password" })}?
            </MLink>
          </Link>
        </div>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          fullWidth
          color="primary"
          disableElevation
        >
          {intl.formatMessage({
            id: "display_submit"
          })}
        </Button>
      </form>
    </div>
  );
}
