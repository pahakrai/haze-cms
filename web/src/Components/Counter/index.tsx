import React from "react";
import Max from "lodash/max";
import isNaN from "lodash/isNaN";
import { InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { AddIcon } from "../SvgIcon";
import { ReduceIcon } from "../SvgIcon/Icons/ReduceIcon";

const useClasses = makeStyles(() => ({
  input: {
    textAlign: "center"
  }
}));
interface CounterProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (count: number) => void;
}
export const Counter = ({
  value = 1,
  min = 1,
  max = Infinity,
  onChange
}: CounterProps) => {
  const classes = useClasses();
  const [_value, setValue] = React.useState<any>(value);
  const handleReduce = () => {
    const current = _value - 1;
    const actualValue = Max([min, current]);
    setValue(actualValue);
    handleValueChange(actualValue);
  };
  const handlePlus = () => {
    const current = _value + 1;
    setValue(current);
    handleValueChange(current);
  };
  const handleValueChange = (actualValue: number) => {
    actualValue !== value && onChange?.(actualValue);
  };
  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        size="small"
        InputProps={{
          classes: {
            input: classes.input
          },
          startAdornment: (
            <InputAdornment position="start">
              <ReduceIcon onClick={handleReduce} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <AddIcon onClick={handlePlus} />
            </InputAdornment>
          )
        }}
        value={_value}
        onChange={(event) => {
          const value = event.target.value;
          const parsedValue = Number.parseInt(value);
          setValue(isNaN(parsedValue) ? "" : parsedValue);
        }}
        onBlur={() => {
          // validate current value if value not allowed change to min value
          let actualValue = _value;
          if (isNaN(actualValue)) {
            actualValue = min;
          }
          if (_value <= min || _value < 0) {
            actualValue = min;
          }
          if (_value > max) {
            actualValue = max;
          }
          setValue(actualValue);
          handleValueChange(actualValue);
        }}
      ></TextField>
    </React.Fragment>
  );
};
