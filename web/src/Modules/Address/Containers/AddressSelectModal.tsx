import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "~/src/Components/Dialog/DialogTitle";
import AddressList from "./AddressList";

interface AddressSelectModalProps {
  open?: boolean;
  onHide?();
  onDone?(address: IAddress);
}

export const AddressSelectModal = ({
  open,
  onHide,
  onDone
}: AddressSelectModalProps) => {
  const [address, setAddress] = useState<IAddress | undefined>();

  return (
    <Dialog open={open} onClose={onHide} maxWidth="lg" fullWidth>
      <DialogTitle onClose={onHide} style={{ backgroundColor: "#eee" }}>
        <FormattedMessage id="display_address_select" />
      </DialogTitle>
      <DialogContent dividers>
        <AddressList
          selectMode
          selected={[address?._id || ""]}
          onSelect={(address) => setAddress(address)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onDone?.(address)}
          disabled={!address}
        >
          <FormattedMessage id="display_confirm" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressSelectModal;
