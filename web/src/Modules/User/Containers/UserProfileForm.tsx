import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  MenuItem
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import dayjs from "dayjs";
import Ecomm, { helpers } from "@golpasal/common";

import {
  CalendarIcon,
  EmailIcon,
  GenderIcon,
  PhoneIcon,
  UserIcon
} from "~/src/Components/SvgIcon";
import { DatePicker } from "~/src/Components/DatePicker";
import { useLocale } from "~/lib/intl";
import { usePhoneRegions } from "../../PhoneRegion/Hooks/usePhoneRegions";
import { useToast } from "~/lib/toast";
import { useUpdateUser } from "../Hooks/useUserProfile";
import clsx from "clsx";

const GenderType = Ecomm.type.GenderType;

const useClasses = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2)
  },
  mt_3: {},
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  text_black_50: {
    color: fade(theme.palette.text.primary, 0.5)
  }
}));
interface ProfileForm {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  phoneRegionCode: string;
  preferences?: { subscriptionNotification: boolean };
}
export interface UserProfileFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  currentUser: IUser;
}

export const UserProfileForm = ({
  currentUser,
  className,
  ...rest
}: UserProfileFormProps) => {
  const classes = useClasses();
  const { toast } = useToast();
  const intl = useIntl();
  const { workspacePhoneRegions } = usePhoneRegions();
  const { current } = useLocale();
  const genders = [GenderType.MALE, GenderType.FEMALE].map((item) => ({
    key: item,
    name: helpers.getConstantByValue(
      "type",
      "GenderType",
      item,
      helpers.getLocale(current)
    ).text
  }));

  const { handleSubmit, register, errors, control } = useForm<ProfileForm>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      gender: currentUser?.gender,
      dob:
        dayjs(new Date(currentUser?.dob)).format("YYYY/MM/DD") ||
        dayjs().format("YYYY/MM/DD"),
      email: currentUser?.email,
      phone: currentUser?.phone,
      phoneRegionCode: currentUser?.phoneRegionCode,
      preferences: {
        subscriptionNotification:
          currentUser?.preferences.subscriptionNotification
      }
    }
  });
  const { updateUserProfile, loading: updateUserProfileLoading } =
    useUpdateUser();

  const onSubmit = handleSubmit((values: ProfileForm) => {
    const submit = async () => {
      const _values = {
        ...values
      };
      try {
        await updateUserProfile({ user: _values });
        toast({
          status: "success",
          title: intl.formatMessage({ id: "display_updated_successfully" })
        });
      } catch (e) {
        toast({
          status: "error",
          title: intl.formatMessage({ id: "display_updated_failure" })
        });
      }
    };
    submit();
  });
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item container xs={12} spacing={2}>
          <Grid item sm={12} md={6}>
            {/* NAME */}
            <TextField
              name="firstName"
              placeholder={intl.formatMessage({ id: "label_firstname" })}
              inputRef={register({ required: true })}
              size={"small"}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UserIcon className={classes.text_black_50} />
                  </InputAdornment>
                )
              }}
              error={Boolean(errors.firstName)}
              helperText={
                Boolean(errors.firstName)
                  ? intl.formatMessage({ id: "error_required" })
                  : undefined
              }
            ></TextField>
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField
              name="lastName"
              placeholder={intl.formatMessage({ id: "label_lastname" })}
              inputRef={register({ required: true })}
              size={"small"}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UserIcon className={classes.text_black_50} />
                  </InputAdornment>
                )
              }}
              error={Boolean(errors.lastName)}
              helperText={
                Boolean(errors.lastName)
                  ? intl.formatMessage({ id: "error_required" })
                  : undefined
              }
            ></TextField>
          </Grid>
        </Grid>
        {/* GENDER */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <TextField
                  name="gender"
                  select
                  fullWidth
                  defaultValue={value}
                  variant="outlined"
                  size="small"
                  onChange={(e) => onChange(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GenderIcon className={classes.text_black_50} />
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
                    <MenuItem key={gender.key} value={gender.key}>
                      {gender.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            ></Controller>
          </Grid>
        </Grid>
        {/* DOB */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
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
                          <CalendarIcon className={classes.text_black_50} />
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
        {/* EMAIL */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              type="email"
              placeholder={intl.formatMessage({ id: "label_email" })}
              disabled
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: ""
                }
              })}
              size={"small"}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className={classes.text_black_50} />
                  </InputAdornment>
                )
              }}
            ></TextField>
          </Grid>
        </Grid>
        {/* PHONE */}
        <Grid item container xs={12} spacing={2}>
          <Grid item md={5} lg={3}>
            <Controller
              name="phoneRegionCode"
              control={control}
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <TextField
                  select
                  size={"small"}
                  variant="outlined"
                  defaultValue={value}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon className={classes.text_black_50} />
                      </InputAdornment>
                    )
                  }}
                  onChange={(event) => onChange(event.target.value)}
                  error={Boolean(errors.phoneRegionCode)}
                  helperText={
                    Boolean(errors.phoneRegionCode)
                      ? intl.formatMessage({ id: "error_required" })
                      : undefined
                  }
                >
                  {workspacePhoneRegions?.map((option) => (
                    <MenuItem
                      key={option?.phoneRegion?.code}
                      value={option?.phoneRegion?.code}
                    >
                      {option?.phoneRegion?.code}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            ></Controller>
          </Grid>
          <Grid item md={7} lg={9}>
            <TextField
              name="phone"
              type="phone"
              placeholder={intl.formatMessage({ id: "label_phone" })}
              size={"small"}
              variant="outlined"
              fullWidth
              inputRef={register({
                required: true
              })}
              error={Boolean(errors.phone)}
              helperText={
                Boolean(errors.phone)
                  ? intl.formatMessage({ id: "error_required" })
                  : undefined
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon className={classes.text_black_50} />
                  </InputAdornment>
                )
              }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="preferences.subscriptionNotification"
            control={control}
            render={({ onChange, value }) => {
              return (
                <FormControlLabel
                  checked={value}
                  control={<Checkbox color="primary" />}
                  label={intl.formatMessage({ id: "label_send_to_email" })}
                  onChange={(event: any) => {
                    const checked = event.target.checked;
                    onChange(checked);
                  }}
                ></FormControlLabel>
              );
            }}
          ></Controller>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
          >
            {intl.formatMessage({ id: "display_save_changes" })}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserProfileForm;
