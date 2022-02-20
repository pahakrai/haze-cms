import React from "react";
import { useIntl } from "react-intl";
import Grid from "@material-ui/core/Grid";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { useFormContext, Controller } from "react-hook-form";

import { useRegions } from "~/src/Modules/Region/Hooks/useRegions";

interface AddressFormProps {
  loading?: boolean;
  onSubmit?();
}
export const AddressForm = ({
  loading: formLoading,
  onSubmit
}: AddressFormProps) => {
  const { errors, register } = useFormContext<IAddressFormField>();
  const texts = useFormTexts();

  const requiredError = texts.required;

  const loading = formLoading;
  const inputProps: TextFieldProps = {
    fullWidth: true,
    size: "small",
    required: true,
    disabled: loading,
    variant: "outlined"
  };

  return (
    <form noValidate onSubmit={onSubmit} autoComplete="off">
      <input type="hidden" name="_id" ref={register()} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label={texts.name}
            placeholder={texts.name}
            inputRef={register({ required: true })}
            error={errors.name ? true : false}
            helperText={errors.name?.type == "required" && requiredError}
            {...inputProps}
          />
        </Grid>
        <RegionsSelect
          texts={texts}
          disabled={loading}
          inputProps={inputProps}
        />
        <Grid item xs={12}>
          <TextField
            name="address1"
            label={texts.address1}
            placeholder={texts.address1_placeholder}
            inputRef={register({ required: true })}
            error={errors.address1 ? true : false}
            helperText={errors.address1?.type == "required" && requiredError}
            {...inputProps}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address2"
            label={texts.address2}
            placeholder={texts.address2_placeholder}
            inputRef={register({})}
            error={errors.address2 ? true : false}
            helperText={errors.address2?.type == "required" && requiredError}
            {...inputProps}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            label={texts.phone}
            placeholder={texts.phone_placeholder}
            inputRef={register({ required: true, pattern: /^\d{8}$/ })}
            error={errors.phone ? true : false}
            helperText={
              <>
                {errors.phone?.type == "pattern" && texts.phone_error}
                {errors.phone?.type == "required" && requiredError}
              </>
            }
            {...inputProps}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="postCode"
            label={texts.postCode}
            placeholder={texts.postCode_placeholder}
            inputRef={register({ pattern: /^\d*$/ })}
            error={errors.postCode ? true : false}
            helperText={
              <>
                {errors.postCode?.type == "required" && requiredError}
                {errors.postCode?.type == "pattern" && texts.post_code_error}
              </>
            }
            {...inputProps}
          />
        </Grid>
      </Grid>
    </form>
  );
};

const useFormTexts = (): any => {
  const intl = useIntl();
  const texts = {
    name: "label_name",
    country: "display_address_country",
    city: "display_address_city",
    address1: "display_address_address1",
    address2: "display_address_address2",
    address1_placeholder: "display_address_address1_placeholder",
    address2_placeholder: "display_address_address2_placeholder",
    state: "display_address_state",
    phone: "label_phone",
    postCode: "display_post_code",
    required: "error_required",
    loading: "display_loading",
    pls_select: "display_please_select",
    phone_error: "error_phone_format",
    post_code_error: "error_post_code_format"
  };
  return Object.keys(texts).reduce((results, key) => {
    results[key] = intl.formatMessage({ id: texts[key] });
    return results;
  }, {});
};

const RegionsSelect = ({
  texts,
  disabled,
  inputProps: _inputProps
}: {
  texts: any;
  disabled?: boolean;
  inputProps: TextFieldProps;
}) => {
  const {
    errors,
    watch,
    setValue,
    control
  } = useFormContext<IAddressFormField>();
  const { regions, regionsLoading } = useRegions({
    variables: {
      query: {
        isAddress: true,
        isActive: true
      }
    },
    fetchPolicy: "cache-and-network"
  });

  const { country, state } = watch(["country", "state"]);
  const loadingText = texts.loading;
  const requiredError = texts.required;
  const options = [...regions].map((region) => {
    const childrens = regions.filter((r) => r.parent?._id === region._id);

    return { ...region, childrens: childrens };
  });

  const loading = regionsLoading;
  const inputProps: any = {
    ..._inputProps,
    defaultValue: "",
    disabled: loading || disabled
  };
  const names: Record<string, any> = {
    country: "country",
    state: "state",
    city: "city"
  };

  return (
    <>
      <Grid item xs={12}>
        <Controller
          as={TextField}
          control={control}
          name={names.country}
          label={texts.country}
          placeholder={texts.country}
          error={errors.country ? true : false}
          select
          SelectProps={{
            inputProps: {
              onChange: () => {
                setValue("state", "");
                setValue("city", "");
              }
            }
          }}
          rules={{ required: true }}
          helperText={
            <>{errors.country?.type == "required" && requiredError}</>
          }
          {...inputProps}
        >
          <MenuItem value="">{texts.pls_select}...</MenuItem>
          {options
            .filter((v) => !v.parent)
            .map((v) => (
              <MenuItem value={v._id} key={v._id}>
                {v.name}
              </MenuItem>
            ))}
        </Controller>
      </Grid>
      <Grid item xs={12}>
        <Controller
          as={TextField}
          control={control}
          name={names.state}
          label={texts.state}
          placeholder={texts.state}
          rules={{ required: true }}
          error={errors.state ? true : false}
          select
          helperText={
            <>
              {errors.state?.type == "required" && requiredError}
              {loading && loadingText}
            </>
          }
          SelectProps={{
            inputProps: {
              onChange: () => {
                setValue("city", "");
              }
            }
          }}
          {...inputProps}
        >
          <MenuItem value="">{texts.pls_select}...</MenuItem>
          {options
            ?.find((v) => v._id === country)
            ?.childrens.map((v) => (
              <MenuItem value={v._id} key={v._id}>
                {v.name}
              </MenuItem>
            ))}
        </Controller>
      </Grid>
      <Grid item xs={12}>
        <Controller
          as={TextField}
          control={control}
          name={names.city}
          label={texts.city}
          placeholder={texts.city}
          rules={{ required: true }}
          error={errors.city ? true : false}
          select
          helperText={
            <>
              {errors.city?.type == "required" && requiredError}
              {loading && loadingText}
            </>
          }
          {...inputProps}
        >
          <MenuItem value="">{texts.pls_select}...</MenuItem>
          {options
            ?.find((v) => v._id === state)
            ?.childrens.map((v) => (
              <MenuItem value={v._id} key={v._id}>
                {v.name}
              </MenuItem>
            ))}
        </Controller>
      </Grid>
    </>
  );
};

export default AddressForm;
