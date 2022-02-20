import React, { useState } from "react";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core";

import { ContentLoader } from "~/src/Components/ContentLoader";
import { CheckIcon } from "~/src/Components/SvgIcon";

interface AddressListItemProps {
  address: IAddress;
  onClick?(address?: IAddress);
  className?: string;
  loadingClassName?: string;
  onEdit?(address?: IAddress);
  onRemove?(address?: IAddress): Promise<any>;
  setDefaultAddress?(address?: IAddress): Promise<any>;
}
export const AddressListItem = ({
  address,
  onClick,
  className,
  loadingClassName,
  onEdit,
  onRemove,
  setDefaultAddress
}: AddressListItemProps) => {
  const [loading, setLoading] = useState(false);
  const classes = useClasses();

  const regions =
    [address?.country?.name, address?.state?.name, address?.city?.name]
      .filter((v) => v)
      .join(" / ") || "";
  const address1 = address.address1;
  const address2 = address.address2;
  const postCode = address.postCode;
  const isDefault = address?.isDefault;

  if (loading) {
    return <ContentLoader className={loadingClassName} />;
  }
  const content = (
    <>
      <div className={classes.content}>
        <div className={classes.row}>
          <div className="label">
            <FormattedMessage id="label_name" />：
          </div>
          <div className="value">{address?.name || ""}</div>
        </div>
        <div className={classes.row}>
          <div className="label">
            <FormattedMessage id="display_address_region_label" />：
          </div>
          <div className="value">{regions}</div>
        </div>
        <div className={classes.row}>
          <div className="label">
            <FormattedMessage id="display_address_address1" />：
          </div>
          <div className="value">{address1}</div>
        </div>
        {address2 && (
          <div className={classes.row}>
            <div className="label">
              <FormattedMessage id="display_address_address2" />：
            </div>
            <div className="value">{address2}</div>
          </div>
        )}
        <div className={classes.row}>
          <div className="label">
            <FormattedMessage id="label_phone" />：
          </div>
          <div className="value">{address?.phone || ""}</div>
        </div>
        {postCode && (
          <div className={classes.row}>
            <div className="label">
              <FormattedMessage id="display_post_code" />：
            </div>
            <div className="value">{postCode}</div>
          </div>
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.default_container}>
          {isDefault ? (
            <div className={clsx(classes.default_icon, "active")}>
              <CheckIcon size={20} color="#fff" />
            </div>
          ) : (
            <div
              className={classes.default_icon}
              onClick={async () => {
                setLoading(true);
                await setDefaultAddress?.(address);
                setLoading(false);
              }}
            ></div>
          )}
          <div className="text">
            <FormattedMessage id="display_address_default" />
          </div>
        </div>
        <div className={classes.link_group}>
          <div className="text" onClick={() => onEdit?.(address)}>
            <FormattedMessage id="display_edit" />
          </div>
          <div
            className="text remove"
            onClick={async () => {
              setLoading(true);
              await onRemove?.(address);
            }}
          >
            <FormattedMessage id="display_remove" />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={clsx(classes.container, className)}
      onClick={() => onClick?.(address)}
    >
      {content}
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: 5
  },
  content: {
    paddingBottom: 15,
    wordBreak: "break-word",
    width: "100%",
    height: 209,
    padding: "25px 20px 15px"
  },
  row: {
    marginBottom: 7,
    display: "flex",
    flexDirection: "row",
    "& .label": {
      wordBreak: "keep-all",
      whiteSpace: "nowrap",
      color: "rgb(153, 153, 153)",
      fontSize: 14
    },
    "& .value": {
      fontSize: 14,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    }
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    borderTop: "1px solid #ddd",
    backgroundColor: " #f5f5f5",
    padding: "10.5px 20px"
  },
  default_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& .text": {
      flex: 1,
      fontSize: 14,
      color: "#333"
    }
  },
  default_icon: {
    height: 20,
    width: 20,
    border: "1px solid #ddd",
    borderRadius: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    "&.active": {
      backgroundColor: theme.palette.primary.main
    }
  },
  link_group: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    "& .text": {
      color: theme.palette.primary.main,
      marginRight: 16
    },
    "& .text:last-child": {
      marginRight: 0
    },
    "& .remove": {
      color: "#e64a19"
    }
  },
  [theme.breakpoints.down("xs")]: {
    content: {
      height: 179,
      padding: 14.5
    } as any,
    row: { marginBottom: 4.5 },
    footer: { padding: "5px 10px" },
    default_icon: { height: 18, width: 18 }
  }
}));

export default AddressListItem;
