import React from "react";
import { Typography, TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useClasses = makeStyles((theme) => ({
  root: {},
  item: {
    marginBottom: theme.spacing(2)
  }
}));
interface ProductSpecsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  product?: IProduct;
  specs?: { spec: string; value: string }[];
  onSpecChanged?: (spec: string, value: string) => void;
}

export const ProductSpecs = ({
  product,
  onSpecChanged,
  specs = [],
  ...rest
}: ProductSpecsProps) => {
  const classes = useClasses();
  const productSpecs = product?.specs || [];
  return (
    <section {...rest}>
      {productSpecs.map((spec, idx) => {
        const selectedSpec = specs.find((item) => item.spec === spec._id);
        const selectedValue = spec.values.find(
          (item) => item._id === selectedSpec?.value
        );
        const menus = spec.values?.map((item) => ({
          label: item.name || "",
          value: item._id
        }));
        return (
          <div key={idx} className={classes.item}>
            <Typography variant="body2" gutterBottom>
              {spec.name}
            </Typography>
            <TextField
              select
              variant="outlined"
              value={selectedValue?._id || ""}
              fullWidth
              size="small"
              onChange={(event) => {
                const value = event.target.value;
                onSpecChanged?.(spec._id, value);
              }}
            >
              {(menus || []).map((menu, idx) => {
                return (
                  <MenuItem key={menu.value} value={menu.value}>
                    {menu.label}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
        );
      })}
    </section>
  );
};
