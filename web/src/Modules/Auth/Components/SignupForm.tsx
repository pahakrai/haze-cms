import React from "react";
import { useIntl } from "react-intl";
import {
  Divider,
  Grid,
  Button,
  makeStyles,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  fade,
  MenuItem,
  Typography,
  FormHelperText,
  FormControl,
  Link
} from "@material-ui/core";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import Ecomm, { helpers } from "@golpasal/common";
import { useRouter } from "next/router";

import { useSignupMember } from "../Hooks/useSignupMember";
import { DatePicker } from "~/src/Components/DatePicker";
import {
  CalendarIcon,
  EmailIcon,
  GenderIcon,
  LockIcon,
  UserIcon
} from "~/src/Components/SvgIcon";
import { useLocale } from "~/lib/intl";

const GenderType = Ecomm.type.GenderType;
const useClases = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  my_2: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  text_primary_50: {
    color: fade(theme.palette.text.primary, 0.5)
  }
}));
interface ISignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
  agree: boolean;
}
export interface SignupFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  type?: "member";
}
export default function SignupForm({
  type = "member",
  className,
  ...rest
}: SignupFormProps) {
  const classes = useClases();
  const intl = useIntl();
  const router = useRouter();
  const { current } = useLocale();
  const { signupMember, signupMemberLoading } = useSignupMember({
    onCompleted: () => {
      router.replace(`/auth/sign-up/succeed?type=member`);
    }
  });
  const genders =
    [GenderType.MALE, GenderType.FEMALE].map((item) => ({
      key: item,
      name: helpers.getConstantByValue(
        "type",
        "GenderType",
        item,
        helpers.getLocale(current)
      ).text
    })) || [];
  const { register, handleSubmit, errors, watch, clearErrors, control } =
    useForm<ISignupForm>({
      defaultValues: {
        dob: dayjs().format("YYYY/MM/DD")
      }
    });
  const onSubmit = (data: ISignupForm) => {
    delete data.agree;
    // sign up as member
    signupMember({
      variables: {
        signupModel: {
          user: {
            ...data
          }
        }
      }
    });
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      {/* NAME */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            name="firstName"
            placeholder={intl.formatMessage({ id: "label_firstname" })}
            inputRef={register({ required: true })}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <UserIcon className={classes.text_primary_50} />
                </InputAdornment>
              )
            }}
            error={Boolean(errors.firstName)}
            helperText={
              errors.firstName
                ? intl.formatMessage({ id: "error_required" })
                : undefined
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            name="lastName"
            placeholder={intl.formatMessage({ id: "label_lastname" })}
            inputRef={register({ required: true })}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <UserIcon className={classes.text_primary_50} />
                </InputAdornment>
              )
            }}
            error={Boolean(errors.lastName)}
            helperText={
              errors.lastName
                ? intl.formatMessage({ id: "error_required" })
                : undefined
            }
          />
        </Grid>
        {/* EMAIL */}
        <Grid item xs={12} sm={12}>
          <TextField
            name="email"
            type="email"
            placeholder={intl.formatMessage({ id: "label_email" })}
            inputRef={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: ""
              }
            })}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className={classes.text_primary_50} />
                </InputAdornment>
              )
            }}
            error={Boolean(errors.email)}
            helperText={
              errors.email?.type == "required"
                ? intl.formatMessage({ id: "error_required" })
                : errors.email?.type == "pattern"
                ? intl.formatMessage({ id: "error_email" })
                : undefined
            }
          />
        </Grid>
        {/* PSSWORD */}
        <Grid item xs={12} sm={12}>
          <TextField
            name="password"
            type="password"
            placeholder={intl.formatMessage({
              id: "label_password"
            })}
            inputRef={register({
              required: true,
              minLength: 8
            })}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className={classes.text_primary_50} />
                </InputAdornment>
              )
            }}
            error={Boolean(errors.password)}
            helperText={
              errors.password?.type == "required"
                ? intl.formatMessage({ id: "error_enter_password" })
                : errors.password?.type == "minLength"
                ? intl.formatMessage({ id: "msg_password_length" })
                : undefined
            }
          />
        </Grid>
        {/* GENDER */}
        <Grid item xs={12} sm={12}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={(props) => (
              <TextField
                name="gender"
                select
                fullWidth
                value={props.value}
                defaultValue={props.value || ""}
                variant="outlined"
                size="small"
                onChange={(e) => props.onChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GenderIcon className={classes.text_primary_50} />
                    </InputAdornment>
                  )
                }}
                error={Boolean(errors.gender)}
                helperText={
                  errors.gender?.type == "required"
                    ? intl.formatMessage({ id: "error_plase_select_gender" })
                    : undefined
                }
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.name} value={gender.key}>
                    {gender.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          ></Controller>
        </Grid>
        {/* DOB */}
        <Grid item xs={12} sm={12} className={classes.mb_2}>
          <Controller
            name="dob"
            control={control}
            rules={{ required: true }}
            render={(props) => (
              <DatePicker
                initialSettings={{
                  startDate: dayjs(Date()).format("YYYY/MM/DD"),
                  maxDate: dayjs(Date()).format("YYYY/MM/DD")
                }}
                onCallback={(start) => {
                  // called when date changed(start are moment type)
                  const date = start.format("YYYY/MM/DD");
                  props?.onChange?.(date);
                }}
              >
                <TextField
                  name="dob"
                  inputRef={register({
                    required: true
                  })}
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={props.value}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon className={classes.text_primary_50} />
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(errors.dob)}
                  helperText={
                    errors.dob?.type == "required"
                      ? intl.formatMessage({ id: "error_enter_dob" })
                      : undefined
                  }
                />
              </DatePicker>
            )}
          ></Controller>
        </Grid>
      </Grid>
      <FormControl focused={false}>
        <Typography variant="button">
          {intl.formatMessage({ id: "label_store_information" })}
        </Typography>
        <FormControlLabel
          name="preferences.subscriptionNotification"
          inputRef={register({ required: false })}
          control={<Checkbox color="primary" />}
          label={
            <Typography variant="body2">
              {intl.formatMessage({ id: "label_subscribe_email" })}
            </Typography>
          }
        />
      </FormControl>
      <Divider />
      <FormControl error={Boolean(errors.agree)}>
        <FormControlLabel
          name="agree"
          inputRef={register({ required: true })}
          control={<Checkbox color="primary" />}
          label={
            <Typography variant="body2">
              <span>{intl.formatMessage({ id: "label_agree" })} </span>
              <Link href="/privacy" target="blank">
                {intl.formatMessage({ id: "label_terms_privacy" })}
              </Link>
            </Typography>
          }
        />
        {errors.agree && (
          <FormHelperText>
            {intl.formatMessage({ id: "error_agree" })}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disableElevation
        disabled={signupMemberLoading}
        fullWidth
      >
        {intl.formatMessage({
          id: "display_signup"
        })}
      </Button>
    </form>
  );
}
