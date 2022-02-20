import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useClasses = makeStyles((theme) => ({
  root: {
    borderTop: "1px dashed #dce0e0",
    borderBottom: "1px dashed #dce0e0",
    width: "100%",
    padding: "25px 0 20px 0",
    marginTop: 30,
    marginBottom: 30,
    float: "left"
  },
  [theme.breakpoints.down("sm")]: {
    wrapper: {
      width: "45%",
      float: "left",
      marginRight: "2%",
      marginBottom: "2%",
      position: "relative",
      boxSizing: "border-box"
    }
  },
  [theme.breakpoints.up("md")]: {
    wrapper: {
      width: "22.5%",
      float: "left",
      marginRight: "2%",
      marginBottom: "2%",
      position: "relative",
      boxSizing: "border-box"
    }
  },
  icon: {
    margin: "auto",
    fontSize: 32,
    display: "block",
    width: 32,
    height: 32,
    marginBottom: 10
  },
  content: {
    position: "relative",
    display: "block",
    textAlign: "center",
    fontSize: 14,
    verticalAlign: "middle",
    maxWidth: "100%"
  }
}));
interface ProductSpecsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  intl?: any;
  product?: IProduct;
}

export const ProductIllustration = ({ intl, product }: ProductSpecsProps) => {
  const classes = useClasses();
  return (
    <div className={classes.root}>
      {product?.specs?.map((v) => {
        return (
          <div className={classes.wrapper}>
            <div className={classes.icon}>
              {v.icon && <img height="32" src={v.icon.uri} />}
            </div>

            <div className={classes.content}>
              {v.name}： {v.values[0].name}
            </div>
          </div>
        );
      })}

      {product?.skus?.length > 0 && (
        <div className={classes.wrapper}>
          <div className={classes.icon}>
            <img
              height="32"
              src="https://devcdn.golpasal.com/assets/images/ecomm/5fd83be73db74d57b304cb82/seed/user.png"
            />
          </div>

          <div className={classes.content}>
            {intl.formatMessage({ id: "display_availability" })}：{" "}
            {product?.skus[0].qty}
          </div>
        </div>
      )}
    </div>
  );
};
