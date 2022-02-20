import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";

import { NavigateNextIcon, NavigateBeforeIcon } from "~/src/Components/SvgIcon";

import { Item } from "./item";

const useClasses = makeStyles((theme) => ({
  gone: {},
  disabled: {
    color: "#E6E6E6"
  },
  icon: {
    margin: "10px 0"
  }
}));

export const CategoryMenu = () => {
  const classes = useClasses();

  const [ref, bounds] = useMeasure();
  const menusRef = React.createRef<HTMLUListElement>();
  const [leftDisabled, setLeftDisabled] = React.useState(false);
  const [rightDisabled, setRightDisabled] = React.useState(false);
  const [gone, setGone] = React.useState(false);
  React.useEffect(() => {
    const _handleScroll = (event: Event) => {
      const element = event.target as Element;
      const scrollLeft = element.scrollLeft;
      const scrollLimit = element.scrollWidth - element.clientWidth;
      if (scrollLeft === scrollLimit) {
        setRightDisabled(true);
      } else {
        setRightDisabled(false);
      }
      if (scrollLeft == 0) {
        setLeftDisabled(true);
      } else {
        setLeftDisabled(false);
      }
    };
    menusRef.current?.addEventListener("scroll", _handleScroll);
    return () => {
      menusRef.current?.removeEventListener("scroll", _handleScroll);
    };
  }, [menusRef.current]);
  React.useEffect(() => {
    if (menusRef.current) {
      const scrollLeft = menusRef.current.scrollLeft;
      const scrollLimit =
        menusRef.current.scrollWidth - menusRef.current.clientWidth;
      if (scrollLimit === 0) {
        setGone(true);
      } else {
        setGone(false);
      }
      if (scrollLeft === scrollLimit) {
        setRightDisabled(true);
      } else {
        setRightDisabled(false);
      }
      if (scrollLeft == 0) {
        setLeftDisabled(true);
      } else {
        setLeftDisabled(false);
      }
    }
  }, [bounds]);
  return (
    <>
      <NavigateBeforeIcon
        className={clsx(classes.icon, {
          [classes.disabled]: leftDisabled,
          [classes.gone]: gone
        })}
        onClick={() => {
          menusRef.current?.scrollTo({
            left: 0
          });
        }}
      ></NavigateBeforeIcon>
      <Item ref={mergeRefs([menusRef, ref])} />
      <NavigateNextIcon
        className={clsx(classes.icon, {
          [classes.disabled]: rightDisabled,
          [classes.gone]: gone
        })}
        onClick={() => {
          menusRef.current?.scrollTo({
            left: menusRef.current.scrollWidth
          });
        }}
      ></NavigateNextIcon>
    </>
  );
};
export default CategoryMenu;
