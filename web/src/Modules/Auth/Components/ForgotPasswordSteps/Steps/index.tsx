import { makeStyles } from "@material-ui/core";

import React from "react";
import { Indicator } from "./Indicator";
import { StepProps, Step } from "./Step";

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
}));
interface StepsProps {
  items: StepProps[];
  active?: number; // active for steps
}

export const Steps = ({ items, active = 1 }: StepsProps) => {
  const classes = useClasses();
  return (
    <div className={classes.root}>
      {items.map((item, idx) => {
        const isStart = idx === 0;
        const _active = idx + 1 === active;
        return (
          <React.Fragment>
            {!isStart && <Indicator active={_active} />}
            <Step
              active={_active}
              value={`${idx + 1}`}
              label={item.label}
            ></Step>
          </React.Fragment>
        );
      })}
    </div>
  );
};
