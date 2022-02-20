import React from "react";
import { useIntl } from "react-intl";
import {
  Divider,
  Grid,
  Button,
  makeStyles,
  TextField
} from "@material-ui/core";
import clsx from "clsx";
import { useForm } from "react-hook-form";

import { useToast } from "~/lib/toast";
import { usePostCommentCreate } from "../../Hooks/usePostComment";

const useClases = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2),
    maxWidth: 864,
    margin: "auto"
  },
  submit: {
    marginTop: 15
  }
}));
interface IPostComment {
  comment: string;
  name: string;
  email: string;
  website?: string;
  post: string;
}
export interface PostCommentProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  id?: string;
}
export default function PostComment({
  id = "string",
  className,
  ...rest
}: PostCommentProps) {
  const classes = useClases();
  const intl = useIntl();
  const { toast } = useToast();
  // let rememberMe = false;
  const { postComment, postCommentLoading } = usePostCommentCreate({
    onCompleted: () => {
      // get comment list

      toast({
        title: intl.formatMessage({
          id: "display_post_comment_successfully"
        }),
        status: "success"
      });
    }
  });

  const { register, handleSubmit, errors } = useForm<IPostComment>({
    defaultValues: {}
  });
  const onSubmit = (data: IPostComment) => {
    // if (rememberMe) {
    //   const result = {
    //     name: data.name,
    //     email: data.email,
    //     website: data.website
    //   };
    // }
    data.post = id;
    delete data.name;
    delete data.email;
    delete data.website;

    postComment(data);
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      <Grid item sm={12} className={classes.mb_2}>
        <span>{intl.formatMessage({ id: "display_post_leave_reply" })} *</span>
        <TextField
          name="comment"
          multiline
          rows={10}
          inputRef={register({ required: true })}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(errors.comment)}
          helperText={
            errors.comment
              ? intl.formatMessage({ id: "error_required" })
              : undefined
          }
        />
      </Grid>
      {/* NAME */}
      <Grid container spacing={2} className={classes.mb_2}>
        <Grid item sm={12} md={4}>
          <span>{intl.formatMessage({ id: "display_post_name" })} *</span>
          <TextField
            name="name"
            inputRef={register({ required: true })}
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(errors.name)}
            helperText={
              errors.name
                ? intl.formatMessage({ id: "error_required" })
                : undefined
            }
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <span>{intl.formatMessage({ id: "display_post_email" })} *</span>
          <TextField
            name="email"
            inputRef={register({ required: true })}
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(errors.email)}
            helperText={
              errors.email
                ? intl.formatMessage({ id: "error_required" })
                : undefined
            }
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <span>{intl.formatMessage({ id: "display_post_website" })}</span>
          <TextField name="website" fullWidth variant="outlined" size="small" />
        </Grid>
      </Grid>
      {/* <FormControl focused={false}>
        <FormControlLabel
          inputRef={register({ required: false })}
          control={<Checkbox color="primary" />}
          onChange={() => (rememberMe = !rememberMe)}
          label={
            <Typography variant="body2">
              {intl.formatMessage({ id: "display_post_remember_me" })}
            </Typography>
          }
        />
      </FormControl> */}
      <div className={classes.mb_2}>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disableElevation
          className={classes.submit}
          disabled={postCommentLoading}
        >
          {intl.formatMessage({
            id: "display_post_comment"
          })}
        </Button>
      </div>
    </form>
  );
}
