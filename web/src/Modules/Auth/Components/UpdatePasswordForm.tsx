import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  InputAdornment,
  makeStyles
} from "@material-ui/core";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useUpdatePassword } from "../Hooks/useUpdatePassword";
import { useToast } from "~/lib/toast";
import { LockIcon } from "~/src/Components/SvgIcon";
const useClasses = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2)
  },
  mt_3: {
    marginTop: theme.spacing(3)
  }
}));
interface IUpdatePassword {
  current: string;
  password: string;
  confirm: string;
}
export interface UpdatePasswordFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}
export const UpdatePasswordForm = ({
  className,
  ...rest
}: UpdatePasswordFormProps) => {
  const classes = useClasses();
  const intl = useIntl();
  const router = useRouter();
  const { toast } = useToast();
  const [formError, setFormError] = useState();
  const { updatePassword } = useUpdatePassword({
    onCompleted: () => {
      toast({
        title: intl.formatMessage({
          id: "msg_update_password_success"
        }),
        status: "success"
      });
      router.push("/user/user-profile");
    },
    onError: () => {
      toast({
        title: intl.formatMessage({
          id: "error_current_password_not_match"
        }),
        status: "error"
      });
    }
  });
  const { register, handleSubmit, watch, errors, clearErrors } =
    useForm<IUpdatePassword>();
  const onSubmit = (data: IUpdatePassword) => {
    updatePassword(data.password, data.current);
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(className, classes.root)}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="current"
            type="password"
            placeholder={intl.formatMessage({
              id: "label_current_password"
            })}
            fullWidth
            variant="outlined"
            size="small"
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
            error={Boolean(errors?.current)}
            helperText={
              errors?.current?.type === "required"
                ? intl.formatMessage({ id: "error_required" })
                : undefined
            }
            onChange={useCallback(
              () => formError && setFormError(null),
              [formError]
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            placeholder={intl.formatMessage({
              id: "label_confirm_password"
            })}
            fullWidth
            variant="outlined"
            size="small"
            inputRef={register({
              required: true,
              validate: {
                message: (value: string): any => {
                  return value !== watch("current")
                    ? clearErrors("password")
                    : intl.formatMessage({
                        id: "error_new_password_same_old_password"
                      });
                }
              }
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
                : errors?.password?.type === "message"
                ? intl.formatMessage({
                    id: "error_new_password_same_old_password"
                  })
                : undefined
            }
            onChange={useCallback(
              () => formError && setFormError(null),
              [formError]
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirm"
            type="password"
            placeholder={intl.formatMessage({
              id: "label_confirm_password"
            })}
            fullWidth
            variant="outlined"
            size="small"
            inputRef={register({
              required: true,
              validate: {
                message: (value: string): any => {
                  if (value === watch("password")) {
                    clearErrors("confirm");
                  } else if (!watch("password")) {
                    return intl.formatMessage({
                      id: "error_enter_new_password_first"
                    });
                  } else {
                    return intl.formatMessage({
                      id: "error_password_not_same"
                    });
                  }
                  return value === watch("password")
                    ? clearErrors("confirm")
                    : "confirm password error";
                }
              }
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
            error={Boolean(errors?.confirm)}
            helperText={
              errors?.confirm?.type === "required"
                ? intl.formatMessage({ id: "error_required" })
                : errors?.confirm?.type === "message"
                ? intl.formatMessage({ id: "error_password_not_same" })
                : undefined
            }
          />
        </Grid>
      </Grid>
      {/* <Form.Row>
        <Form.Group as={Col} lg="8" controlId="current">
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <img
                  src={
                    "https://devcdn.golpasal.com/assets/images/ecomm/5ea95dce2b462f77bf7acc02/seed/lock_24.png"
                  }
                  style={{ width: 20, height: 20 }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={intl.formatMessage({
                id: "label_current_password"
              })}
              name="current"
              type="password"
              ref={register({ required: true })}
              isInvalid={errors.current ? true : false}
              onChange={useCallback(() => formError && setFormError(null), [
                formError
              ])}
              required
            />
            {errors.current?.type == "required" && (
              <Form.Control.Feedback type="invalid">
                {intl.formatMessage({ id: "error_required" })}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} lg="8" controlId="password">
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <img
                  src={
                    "https://devcdn.golpasal.com/assets/images/ecomm/5ea95dce2b462f77bf7acc02/seed/lock_24.png"
                  }
                  style={{ width: 20, height: 20 }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={intl.formatMessage({
                id: "label_new_password"
              })}
              name="password"
              type="password"
              ref={register({
                required: true,
                validate: {
                  message: (value: string): any => {
                    return value !== watch("current")
                      ? clearErrors("password")
                      : intl.formatMessage({
                          id: "error_new_password_same_old_password"
                        });
                  }
                }
              })}
              isInvalid={errors.password ? true : false}
              onChange={useCallback(() => formError && setFormError(null), [
                formError
              ])}
              required
            />
            {errors.password?.type == "required" && (
              <Form.Control.Feedback type="invalid">
                {intl.formatMessage({ id: "error_required" })}
              </Form.Control.Feedback>
            )}
            {errors.password?.type == "message" && (
              <Form.Control.Feedback type="invalid">
                {intl.formatMessage({
                  id: "error_new_password_same_old_password"
                })}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} lg="8" controlId="confirm">
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <img
                  src={
                    "https://devcdn.golpasal.com/assets/images/ecomm/5ea95dce2b462f77bf7acc02/seed/lock_24.png"
                  }
                  style={{ width: 20, height: 20 }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={intl.formatMessage({
                id: "label_confirm_password"
              })}
              name="confirm"
              type="password"
              ref={register({
                required: true,
                validate: {
                  message: (value: string): any => {
                    if (value === watch("password")) {
                      clearErrors("confirm");
                    } else if (!watch("password")) {
                      return intl.formatMessage({
                        id: "error_enter_new_password_first"
                      });
                    } else {
                      return intl.formatMessage({
                        id: "error_password_not_same"
                      });
                    }
                    return value === watch("password")
                      ? clearErrors("confirm")
                      : "confirm password error";
                  }
                }
              })}
              required
              isInvalid={errors?.confirm ? true : false}
            />
            {errors.confirm?.type == "required" && (
              <Form.Control.Feedback type="invalid">
                {intl.formatMessage({ id: "error_required" })}
              </Form.Control.Feedback>
            )}
            {errors.confirm?.type == "message" && (
              <Form.Control.Feedback type="invalid">
                {intl.formatMessage({ id: "error_password_not_same" })}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>
      </Form.Row> */}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disableElevation
        className={classes.mt_3}
      >
        {intl.formatMessage({
          id: "display_change_password_submit"
        })}
      </Button>
    </form>
  );
};
export default UpdatePasswordForm;
