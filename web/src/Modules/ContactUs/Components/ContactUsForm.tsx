import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { Button, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";

import { useToast } from "~/lib/toast";
import { DatePicker } from "~/src/Components/DatePicker";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

import { useCustomerEnquiryCreate } from "../Hooks/useContact";
const useClasses = makeStyles((theme) => ({
  mb_1: {
    marginTop: theme.spacing(2)
  },
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  mb_3: {
    marginBottom: theme.spacing(3),
    marginTop: 30,
    minWidth: 153,
    minHeight: 44
  },
  text_center: {
    textAlign: "center"
  },
  button: {
    minWidth: 153,
    minHeight: 44,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: "#51C1AA",
    color: "#fff"
  }
}));
interface IContactUs {
  email: string;
  name: string;
  phone: string;
  numberOfPerson: string;
  departureDate: string;
  remarks?: string;
}
export interface ContactUsFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}
export const ContactUsForm = ({ className, ...rest }: ContactUsFormProps) => {
  const classes = useClasses();
  const [formError, setFormError] = useState();
  const intl = useIntl();
  const { workspace } = useWorkspace();
  const { toast } = useToast();
  const {
    register,
    control,
    handleSubmit,
    errors,
    reset
  } = useForm<IContactUs>({
    defaultValues: {
      departureDate: dayjs().add(1, "day").format("YYYY/MM/DD")
    }
  });

  const { customerEnquiry, customerEnquiryLoading } = useCustomerEnquiryCreate({
    onCompleted: () => {
      toast({
        title: intl.formatMessage({
          id: "msg_contact_us_success"
        }),
        status: "success"
      });
      reset();
    }
  });
  const onSubmit = (data: IContactUs) => {
    let result = {
      workspace: workspace._id,
      phone: data.phone,
      email: data.email,
      remarks: data.remarks,
      message: `${intl.formatMessage({ id: "display_contact_us_name" })}: ${
        data.name
      }\n${intl.formatMessage({
        id: "display_contact_us_number_of_person"
      })}: ${data.numberOfPerson}\n${intl.formatMessage({
        id: "display_contact_us_departure_date"
      })}: ${data.departureDate}`
    };
    customerEnquiry?.(result);
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      <span>{intl.formatMessage({ id: "display_contact_us_name" })}</span>
      <TextField
        name="name"
        type="name"
        placeholder={intl.formatMessage({
          id: "label_your_name"
        })}
        inputRef={register({ required: true })}
        error={Boolean(errors.name)}
        helperText={
          errors.name ? intl.formatMessage({ id: "error_required" }) : undefined
        }
        onChange={useCallback(() => formError && setFormError(null), [
          formError
        ])}
        fullWidth
        variant="outlined"
        size="small"
        className={classes.mb_2}
      ></TextField>

      <span>{intl.formatMessage({ id: "display_contact_us_email" })}</span>
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

      <span>{intl.formatMessage({ id: "display_contact_us_phone" })}</span>
      <TextField
        name="phone"
        type="phone"
        placeholder={intl.formatMessage({
          id: "label_phone"
        })}
        inputRef={register({ required: true, pattern: /^\d{8}$/ })}
        error={Boolean(errors.phone)}
        helperText={
          errors.phone?.type == "required"
            ? intl.formatMessage({ id: "error_required" })
            : errors.phone?.type == "pattern"
            ? intl.formatMessage({ id: "error_phone_format" })
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

      <span>
        {intl.formatMessage({ id: "display_contact_us_number_of_person" })}
      </span>
      <TextField
        name="numberOfPerson"
        type="numberOfPerson"
        placeholder={intl.formatMessage({
          id: "label_person"
        })}
        inputRef={register({
          required: true,
          pattern: /^[1-9]\d*$/i
        })}
        error={Boolean(errors.numberOfPerson)}
        helperText={
          errors.numberOfPerson?.type == "required"
            ? intl.formatMessage({ id: "error_required" })
            : errors?.numberOfPerson?.type == "pattern"
            ? intl.formatMessage({ id: "error_person_format" })
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

      <span>
        {intl.formatMessage({ id: "display_contact_us_departure_date" })}
      </span>
      <Controller
        name="departureDate"
        control={control}
        rules={{ required: true }}
        render={(props) => (
          <DatePicker
            initialSettings={{
              minDate: dayjs(new Date())
            }}
            onCallback={(start) => {
              const date = start.format("YYYY/MM/DD");
              props?.onChange?.(date);
            }}
          >
            <TextField
              name="departureDate"
              inputRef={register({
                required: true
              })}
              fullWidth
              variant="outlined"
              size="small"
              value={props.value}
              error={Boolean(errors.departureDate)}
              helperText={
                errors.departureDate?.type == "required"
                  ? intl.formatMessage({ id: "error_enter_departureDate" })
                  : undefined
              }
              className={classes.mb_2}
            />
          </DatePicker>
        )}
      ></Controller>

      <span>{intl.formatMessage({ id: "display_contact_us_remarks" })}</span>
      <TextField
        name="remarks"
        multiline
        rows={10}
        inputRef={register({ required: false })}
        fullWidth
        variant="outlined"
        size="small"
        className={classes.mb_2}
      />
      <Button
        variant="contained"
        type="submit"
        disableElevation
        disabled={customerEnquiryLoading}
        className={classes.button}
      >
        {intl.formatMessage({
          id: "display_submit"
        })}
      </Button>
    </form>
  );
};
export default ContactUsForm;
