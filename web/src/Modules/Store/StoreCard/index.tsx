// DISPLAY(HOME|PRODUCTS) PAGES
import moment from "moment";
import { helpers } from "@golpasal/common";
import { useIntl } from "react-intl";
import { useLocale } from "~/lib/intl";
import StoreCardBase from "./StoreCardBase";

interface StoreCardProps {
  store?: IStore;
  authed?: boolean;
}
export const StoreCard = ({ store }: StoreCardProps) => {
  const intl = useIntl();
  const { locale } = useLocale();
  const days = [];
  store?.workSchedule?.workdays?.map((v, idx) => {
    const day = helpers.getConstantByValue(
      "type",
      "DayOfWeekType",
      v?.toString(),
      helpers.getLocale(locale)
    );
    return days.push(day?.text);
  });
  moment.locale(locale);
  const from = store?.workSchedule?.worktime?.from;
  const to = store?.workSchedule?.worktime?.to;
  const firstDay = days && days[0];
  const lastDay = days && days[days?.length - 1];
  return (
    <StoreCardBase
      title={store.address.name}
      date={`${firstDay}${intl.formatMessage({
        id: "label_to"
      })}${lastDay} ${from}-${to}`}
      address={store?.address?.address1}
    />
  );
};

export default StoreCard;
