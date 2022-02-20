import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useIntl } from "react-intl";
import { Steps } from "./Steps";

interface ForgotPasswordStepsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  active: number;
}
export const ForgotPasswordSteps = ({
  children,
  active,
  ...rest
}: ForgotPasswordStepsProps) => {
  const intl = useIntl();
  return (
    <div {...rest}>
      <Steps
        items={[
          {
            label: intl.formatMessage({ id: "display_forgot_password_step1" })
          },
          {
            label: intl.formatMessage({ id: "display_forgot_password_step2" })
          },
          {
            label: intl.formatMessage({ id: "display_forgot_password_step3" })
          }
        ]}
        active={active}
      />
      {children}
    </div>
  );
};
