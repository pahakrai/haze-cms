import React, { useState, useCallback, ComponentFactory } from "react";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

import { useToast } from "~/lib/toast";
import { ContentLoader } from "~/src/Components/ContentLoader";
import { useMyAddresss } from "../Hooks/useMyAddresss";
import { useDeleteMyAddress } from "../Hooks/useDeleteMyAddress";
import { useSetMyDefaultAddress } from "../Hooks/useSetMyDefaultAddress";

import AddressListItem from "../Components/AddressListItem";
import AddressAddButton from "../Components/AddressAddButton";
import AddressFormModal from "./AddressFormModal";

interface AddressListProps {
  itemCol?: ComponentFactory<any, any>;
  selectMode?: boolean;
  onSelect?(address: IAddress);
  selected?: string[];
}
interface FormModalProps {
  addressId?: string;
}

const ItemCol = (props: any) => <Grid item {...props} xs={12} sm={6} lg={4} />;
export const AddressList = ({
  itemCol: ItemColComponent = ItemCol,
  onSelect,
  selected,
  selectMode
}: AddressListProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formModalProps, setFormModalProps] = useState<FormModalProps>({});
  const { toast } = useToast();
  const classes = useClasses();

  const {
    addresses,
    refetch: refetchMyAddresss,
    loading: myAddresssLoading
  } = useMyAddresss();
  const { setMyDefaultAddress } = useSetMyDefaultAddress({
    onCompleted: () => refetchMyAddresss()
  });
  const { deleteAddress } = useDeleteMyAddress({
    onCompleted: () => refetchMyAddresss()
  });

  //function
  const onAddButtonClick = useCallback(() => {
    setIsOpenForm(true);
    setFormModalProps({});
  }, []);
  const onAddressItemClick = useCallback((address?: IAddress) => {
    if (selectMode) {
      onSelect(address);
    }
  }, []);
  const onEdit = useCallback((address: IAddress) => {
    setIsOpenForm(true);
    setFormModalProps({ addressId: address?._id });
  }, []);
  const onRemove = useCallback(
    (address: IAddress) => {
      return deleteAddress(address?._id);
    },
    [deleteAddress]
  );
  const setDefaultAddress = useCallback(
    (address: IAddress) => {
      return setMyDefaultAddress(address?._id);
    },
    [setMyDefaultAddress]
  );
  const onHideFormMoadl = useCallback(() => {
    setIsOpenForm(false);
    setFormModalProps({});
  }, []);

  // modal function
  const onDone = useCallback(
    ({ isUpdate }) => {
      const options: any = { status: "success" };
      if (isUpdate) {
        options.title = "display_updated_successfully";
      } else {
        options.title = "display_created_successfully";
      }
      options.title = <FormattedMessage id={options.title} />;
      toast(options);
      onHideFormMoadl();
      refetchMyAddresss();
    },
    [onHideFormMoadl, refetchMyAddresss, toast]
  );
  const onError = useCallback(
    ({ isUpdate }) => {
      const options: any = { status: "error" };
      if (isUpdate) {
        options.title = "display_updated_failure";
      } else {
        options.title = "display_created_failure";
      }
      options.title = <FormattedMessage id={options.title} />;
      toast(options);
    },
    [toast]
  );

  const loading = myAddresssLoading;
  return (
    <div className={classes.address_list}>
      {!loading ? (
        <Grid container spacing={2}>
          <ItemColComponent className={classes.add_button_pc}>
            <AddressAddButton onClick={onAddButtonClick} />
          </ItemColComponent>
          {addresses?.map((address) => {
            return (
              <ItemColComponent key={address._id}>
                <AddressListItem
                  address={address}
                  onClick={onAddressItemClick}
                  onEdit={onEdit}
                  onRemove={onRemove}
                  setDefaultAddress={setDefaultAddress}
                  className={clsx(classes.item, {
                    active: selectMode && selected?.includes(address?._id),
                    pointer: selectMode
                  })}
                  loadingClassName={classes.loading}
                />
              </ItemColComponent>
            );
          })}
          <ItemColComponent className={classes.add_button_mobile}>
            <AddressAddButton onClick={onAddButtonClick} mobile />
          </ItemColComponent>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <ItemColComponent>
            <ContentLoader className={classes.loading} />
          </ItemColComponent>
          <ItemColComponent>
            <ContentLoader className={classes.loading} />
          </ItemColComponent>
          <ItemColComponent>
            <ContentLoader className={classes.loading} />
          </ItemColComponent>
          <ItemColComponent>
            <ContentLoader className={classes.loading} />
          </ItemColComponent>
        </Grid>
      )}
      <AddressFormModal
        open={isOpenForm}
        onHide={onHideFormMoadl}
        onDone={onDone}
        onError={onError}
        {...formModalProps}
      />
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  address_list: { width: "100%" },
  add_button_pc: {},
  add_button_mobile: { display: "none" },
  item: {
    "&.active": {
      borderColor: theme.palette.primary.main
    },
    "&.pointer": {
      cursor: "pointer"
    }
  },
  loading: {
    height: 250,
    position: "relative",
    top: -2
  },
  [theme.breakpoints.down("xs")]: {
    add_button_pc: { display: "none" },
    add_button_mobile: { display: "block" },
    loading: {
      height: 213
    }
  }
}));

export default AddressList;
