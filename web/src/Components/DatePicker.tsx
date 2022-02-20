import DateRangePicker, { Props } from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
// SEE MORE https://www.npmjs.com/package/react-bootstrap-daterangepicker
interface DatePickerProps extends Props {
  children: React.ReactElement;
}
export const DatePicker = ({
  children,
  initialSettings,
  ...rest
}: DatePickerProps) => {
  return (
    <DateRangePicker
      initialSettings={{
        singleDatePicker: true,
        autoApply: true,
        showDropdowns: true,
        locale: { format: "YYYY-MM-DD" },
        ...initialSettings
      }}
      {...rest}
    >
      {children}
    </DateRangePicker>
  );
};
