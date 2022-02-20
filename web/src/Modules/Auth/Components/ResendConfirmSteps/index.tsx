import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useIntl } from "react-intl";
import { Steps } from "../ForgotPasswordSteps/Steps";

interface ResendConfirmStepsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  active: number;
}
export const ResendConfirmSteps = ({
  children,
  active,
  ...rest
}: ResendConfirmStepsProps) => {
  const intl = useIntl();
  return (
    <div {...rest}>
      <Steps
        items={[
          {
            label: intl.formatMessage({ id: "display_forgot_password_step1" })
          },
          {
            label: intl.formatMessage({ id: "display_verify_email" })
          }
        ]}
        active={active}
      />
      {children}
    </div>
  );
};
