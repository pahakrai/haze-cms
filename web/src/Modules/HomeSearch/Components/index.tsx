import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Grid, Typography, Button, TextField, Hidden } from "@material-ui/core";
import dayjs from "dayjs";

import { DatePicker } from "~/src/Components/DatePicker";

interface IHomeSearch {
  q?: string;
  productionDateFr?: string;
  productionDateTo?: string;
}

const useClasses = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "60%",
    transform: "translate(-50%, -50%)",
    "& h2": {
      textAlign: "center",
      color: "#fff",
      whiteSpace: "nowrap"
    },
    "& h6": {
      textAlign: "center",
      color: "#fff"
    }
  },
  mb_2: {
    marginBottom: theme.spacing(2),
    maxWidth: 864,
    margin: "auto"
  },
  input: {
    backgroundColor: "#fff"
  },
  formControl: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%"
  },
  select: {
    paddingTop: 11
  },
  button: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary
  }
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    margin: 4,
    color: "black"
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: theme.palette.common.white
    }
  }
}));

export default function HomeSearch({}) {
  const helperTextClasses = helperTextStyles();
  const classes = useClasses();
  const intl = useIntl();
  const route = useRouter();
  const { register, handleSubmit, errors, control } = useForm<IHomeSearch>({
    defaultValues: {
      productionDateFr: dayjs().format("YYYY/MM/DD"),
      productionDateTo: dayjs()
        .add(1, "month")
        .endOf("month")
        .format("YYYY/MM/DD")
    }
  });

  const onSubmit = (data: any) => {
    let path = `/products?q=${data.q}&productionDateFr=${data.productionDateFr}&productionDateTo=${data.productionDateTo}`;

    route.push(path);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <Hidden mdUp>
          <Typography variant="subtitle1">
            {intl.formatMessage({ id: "display_home_search_title" })}
          </Typography>
        </Hidden>

        <Hidden smDown>
          <Typography variant="h2">
            {intl.formatMessage({ id: "display_home_search_title" })}
          </Typography>
        </Hidden>

        <Typography variant="subtitle2">
          {intl.formatMessage({ id: "display_home_search_sub_title" })}
        </Typography>

        <Grid
          container
          spacing={3}
          style={{ textAlign: "center", margin: "auto" }}
        >
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <TextField
              name="q"
              inputRef={register({
                required: false
              })}
              placeholder={intl.formatMessage({
                id: "display_home_search_placeholder"
              })}
              InputProps={{
                classes: { input: classes.input }
              }}
              FormHelperTextProps={{ classes: helperTextClasses }}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Controller
              name="productionDateFr"
              control={control}
              render={(props) => (
                <DatePicker
                  initialSettings={{
                    autoUpdateInput: false,
                    autoApply: true
                  }}
                  onCallback={(val) => {
                    props?.onChange?.(val.format("YYYY/MM/DD"));
                  }}
                >
                  <TextField
                    name="productionDateFr"
                    inputRef={register({
                      required: false
                    })}
                    InputProps={{
                      classes: { input: classes.input }
                    }}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </DatePicker>
              )}
            ></Controller>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Controller
              name="productionDateTo"
              control={control}
              render={(props) => (
                <DatePicker
                  initialSettings={{
                    autoUpdateInput: false,
                    autoApply: true
                  }}
                  onCallback={(val) => {
                    props?.onChange?.(val.format("YYYY/MM/DD"));
                  }}
                >
                  <TextField
                    name="productionDateTo"
                    inputRef={register({
                      required: false
                    })}
                    InputProps={{
                      classes: { input: classes.input }
                    }}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </DatePicker>
              )}
            ></Controller>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              className={classes.button}
            >
              {intl.formatMessage({
                id: "display_search"
              })}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}></Grid>
        </Grid>
      </div>
    </form>
  );
}
