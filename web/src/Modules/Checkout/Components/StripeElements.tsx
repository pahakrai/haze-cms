import React from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useIntl } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent
} from "@stripe/stripe-js";

import StripeInput from "./StripeInput";

const useClasses = makeStyles((theme) => ({
  root: {
    flexDirection: "column"
  },
  mb_2: {
    marginBottom: theme.spacing(2)
  }
}));
interface IStripeElementsForm {
  creditCardNumber: string;
  creditCardExpiry: string;
  creditCardCVV: string;
}
interface StripeElementsProps {
  onPrepared?: (source: string) => void;
}
export const StripeElements = ({ onPrepared }: StripeElementsProps) => {
  const intl = useIntl();
  const classes = useClasses();
  const stripe = useStripe();
  const elements = useElements();
  const HookFormMethods = useForm<IStripeElementsForm>();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    setValue,
    clearErrors,
    setError,
    errors,
    handleSubmit
  } = HookFormMethods;
  const _handleCardNumberChange = (
    event: StripeCardNumberElementChangeEvent
  ) => {
    if (event.error || !event.complete) {
      setValue("creditCardNumber", undefined);
      setError("creditCardNumber", { type: "validate" });
    } else {
      setValue("creditCardNumber", event.brand);
      clearErrors("creditCardNumber");
    }
  };
  const _handleCardExpiryChange = (
    event: StripeCardExpiryElementChangeEvent
  ) => {
    if (event.error || !event.complete) {
      setValue("creditCardExpiry", undefined);
      setError("creditCardExpiry", { type: "validate" });
    } else {
      setValue("creditCardExpiry", "expiry");
      clearErrors("creditCardExpiry");
    }
  };
  const _handleCardCVVChange = (event: StripeCardCvcElementChangeEvent) => {
    if (event.error || !event.complete) {
      setValue("creditCardCVV", undefined);
      setError("creditCardCVV", { type: "validate" });
    } else {
      setValue("creditCardCVV", "cvv");
      clearErrors("creditCardCVV");
    }
  };
  React.useEffect(() => {
    register("creditCardNumber", { required: true });
    register("creditCardExpiry", { required: true });
    register("creditCardCVV", { required: true });
  }, [register]);

  const _handleSubmit = async (data: IStripeElementsForm) => {
    // display payment modal
    setLoading(true);
    const source = await stripe.createSource(
      elements!?.getElement(CardNumberElement),
      {
        type: "card"
      }
    );
    const sourceId = source?.source?.id;
    setLoading(false);
    onPrepared?.(sourceId);
    // if (sourceId && order) {
    //   checkout({
    //     orderId: order._id,
    //     payment: {
    //       paymentMethod: PaymentMethod.CREDIT_CARD_STRIPE,
    //       sourceId: sourceId
    //     }
    //   });
    // } else {
    // }
  };
  return (
    <FormProvider {...HookFormMethods}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(_handleSubmit)}
        className={classes.root}
      >
        <TextField
          className={classes.mb_2}
          fullWidth
          variant="outlined"
          size="small"
          label={intl.formatMessage({
            id: "label_credit_card_number"
          })}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement,
              options: { placeholder: "" }
            }
          }}
          InputLabelProps={{ shrink: true }}
          onChange={(event: any) => _handleCardNumberChange(event)}
          error={errors.creditCardNumber ? true : false}
          helperText={
            errors.creditCardNumber
              ? intl.formatMessage({ id: "error_required" })
              : undefined
          }
        ></TextField>
        <TextField
          className={classes.mb_2}
          fullWidth
          variant="outlined"
          size="small"
          label={intl.formatMessage({ id: "label_expiration" })}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardExpiryElement,
              options: { placeholder: "MM/YY" }
            }
          }}
          InputLabelProps={{ shrink: true }}
          onChange={(event: any) => _handleCardExpiryChange(event)}
          error={errors.creditCardExpiry ? true : false}
          helperText={
            errors.creditCardExpiry
              ? intl.formatMessage({ id: "error_required" })
              : undefined
          }
        ></TextField>
        <TextField
          className={classes.mb_2}
          fullWidth
          variant="outlined"
          size="small"
          label={intl.formatMessage({ id: "label_cvv" })}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardCvcElement,
              options: { placeholder: "" }
            }
          }}
          InputLabelProps={{ shrink: true }}
          onChange={(event: any) => _handleCardCVVChange(event)}
          error={errors.creditCardCVV ? true : false}
          helperText={
            errors.creditCardCVV
              ? intl.formatMessage({ id: "error_required" })
              : undefined
          }
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.mb_2}
          disabled={loading}
        >
          {intl.formatMessage({
            id: "display_checkout"
          })}
        </Button>
      </form>
    </FormProvider>
  );
};
