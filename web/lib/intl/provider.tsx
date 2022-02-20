import React from "react";
import { IntlProvider as RIntlProvider } from "react-intl";
import { Messages } from "./messages";
import { useLocale } from ".";
import { languageFilter } from "./checkLanguage";
interface IntlProviderProps {
  locale?: string;
  children: React.ReactElement;
}
export const IntlProvider = ({ locale, children }: IntlProviderProps) => {
  const { current } = useLocale();
  const [currentLanguage, setCurrentLanguage] = React.useState(
    languageFilter(locale)
  );
  React.useEffect(() => {
    setCurrentLanguage(current);
  }, [current]);
  return (
    <RIntlProvider
      locale={currentLanguage}
      messages={Messages[currentLanguage]}
    >
      {children}
    </RIntlProvider>
  );
};
