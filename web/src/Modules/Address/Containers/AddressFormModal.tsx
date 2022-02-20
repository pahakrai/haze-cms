import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useForm, FormProvider } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { useRegions } from "~/src/Modules/Region/Hooks/useRegions";
import DialogTitle from "~/src/Components/Dialog/DialogTitle";

import AddressForm from "./AddressForm";
import { useAddress } from "../Hooks/useAddress";
import { useSubmitAddressHooks } from "./AddressFormUtils";
interface AddressFormModalProps {
  open?: boolean;
  onHide?();
  onDone?({ isUpdate: boolean });
  onError?({ isUpdate: boolean });
  addressId?: string;
}

export const AddressFormModal = ({
  open,
  onHide,
  onDone,
  onError,
  addressId
}: AddressFormModalProps) => {
  const methods = useForm<IAddressFormField>();
  const classes = useClasses();
  const { handleSubmit } = methods;
  const { regionsLoading, regionsRefetch } = useRegions({
    variables: {
      query: {
        isAddress: true,
        isActive: true
      }
    },
    fetchPolicy: "network-only"
  });
  const {
    addMyAddress,
    addMyAddressLoading,
    updateMyAddress,
    updateMyAddressLoading
  } = useSubmitAddressHooks();
  const { loading: addressLoading } = useAddress({
    variables: {
      id: addressId
    },
    skip: !addressId,
    onCompleted: ({ address }) => {
      const newValues = {
        _id: address?._id || "",
        name: address?.name || "",
        country: address?.country?._id || "",
        state: address?.state?._id || "",
        city: address?.city?._id || "",
        address1: address?.address1 || "",
        address2: address?.address2 || "",
        postCode: address?.postCode || "",
        phone: address?.phone || ""
      };
      methods.reset(newValues);
    }
  });
  const onSubmit = handleSubmit((values: IAddressFormField) => {
    const submit = async () => {
      const isUpdate = !!values?._id;
      const _values = {
        ...values
      };
      delete _values?._id;
      try {
        if (isUpdate) {
          await updateMyAddress(values?._id, _values);
        } else {
          await addMyAddress(_values);
        }
        onDone && onDone({ isUpdate });
      } catch (e) {
        onError && onError({ isUpdate });
      }
    };
    submit();
  });

  useEffect(() => {
    !open && methods.reset({});
    if (open) {
      regionsRefetch();
    }
  }, [open]);

  const formLoading =
    addMyAddressLoading || updateMyAddressLoading || addressLoading;

  return (
    <Dialog open={open} onClose={onHide} maxWidth="sm" fullWidth>
      <DialogTitle onClose={onHide} style={{ backgroundColor: "#eee" }}>
        <FormattedMessage
          id={addressId ? "display_address_update" : "display_address_create"}
        />
      </DialogTitle>
      <DialogContent dividers>
        <FormProvider {...methods}>
          {!addressLoading && !regionsLoading ? (
            <AddressForm loading={formLoading} onSubmit={onSubmit} />
          ) : (
            <div className={classes.form_loading}>
              <CircularProgress />
              <span className="text">
                <FormattedMessage id="display_loading" />
                ...
              </span>
            </div>
          )}
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={formLoading}
          onClick={onSubmit}
        >
          <FormattedMessage id="display_submit" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useClasses = makeStyles((theme) => ({
  form_loading: {
    height: "calc(100vh - 64px - 64px - 52px)",
    maxHeight: 452,
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .text": {
      marginLeft: 10
    }
  }
}));

export default AddressFormModal;
