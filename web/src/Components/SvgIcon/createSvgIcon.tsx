import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useClasses = makeStyles(() => ({
  svg: {
    display: "inline-block",
    fill: "currentColor"
  }
}));
export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
const SVG_BOX = 24;
const SvgIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(
  (
    {
      viewBox = `0 0 ${SVG_BOX} ${SVG_BOX}`,
      className,
      children,
      size = 24,
      ...rest
    },
    ref
  ) => {
    const classes = useClasses();
    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        className={clsx(classes.svg, className)}
        // color={color} // don't use color(level less than class name)
        style={{
          width: size,
          height: size
        }} // style.color high level than class name
        {...rest}
      >
        {children}
      </svg>
    );
  }
);
export const createSvgIcon = (path: React.ReactNode) => {
  const Component = (
    { children, ...rest }: SvgIconProps,
    ref: React.Ref<SVGSVGElement>
  ) => (
    <SvgIcon {...rest} ref={ref}>
      {path}
    </SvgIcon>
  );
  return React.memo(React.forwardRef<SVGSVGElement, SvgIconProps>(Component));
};
