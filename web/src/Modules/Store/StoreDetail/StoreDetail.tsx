import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
import clsx from "clsx";
import { helpers } from "@golpasal/common";
import { useIntl } from "react-intl";
import { useLocale } from "~/lib/intl";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles, Container, Typography } from "@material-ui/core";
import { useStore } from "~/src/Modules/Store/Hooks/useStore";
import { STORE_ITEM_FIELDS } from "~/src/Modules/Store/Apollo/gql";
import { Map } from "~/src/Modules/Map/Components/Map";

const useClasses = makeStyles((theme) => ({
  map: {
    height: 400
  },
  map_container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  address: {
    fontSize: 18,
    color: "#000",
    fontWeight: 600,
    textAlign: "left",
    display: "flex",
    alignItems: "center"
  },
  mt_5: { marginTop: theme.spacing(5) }
}));

export const StoreDetail = () => {
  const router = useRouter();
  const theme = useTheme();
  const intl = useIntl();
  const { locale } = useLocale();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useClasses({
    isMobile
  });
  const _id = router.query._id as string;
  const { store } = useStore({ _id, field: STORE_ITEM_FIELDS });
  const location = store?.address?.geometry?.coordinates;
  const regions =
    store?.address?.country?.name +
    "/" +
    store?.address?.state?.name +
    "/" +
    store?.address?.city?.name;
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
  const newDay = moment().format("dddd");
  const hour = moment().format("HH");
  //   const isDay = days?.includes(newDay);
  const from = store?.workSchedule?.worktime?.from;
  const to = store?.workSchedule?.worktime?.to;
  //   const isHour = from <= hour && to >= hour;
  const firstDay = days && days[0];
  const lastDay = days && days[days?.length - 1];
  return (
    <Container className={classes.map_container}>
      {location && (
        <Map
          className={clsx(classes.map)}
          defaultCenter={{ lat: location[1], lng: location[0] }}
        />
      )}
      <Typography
        variant="body2"
        color="inherit"
        className={clsx(classes.address, classes.mt_5)}
      >
        {intl.formatMessage({ id: "label_name" })}: {store?.address?.name}
      </Typography>
      <Typography
        variant="body2"
        color="inherit"
        className={clsx(classes.address)}
      >
        {intl.formatMessage({ id: "display_address_region_label" })}: {regions}
      </Typography>
      <Typography
        variant="body2"
        color="inherit"
        className={clsx(classes.address)}
      >
        {intl.formatMessage({ id: "display_address_address1" })}:{" "}
        {store?.address?.address1}
      </Typography>
      <Typography
        variant="body2"
        color="inherit"
        className={clsx(classes.address)}
      >
        {intl.formatMessage({ id: "display_address_address2" })}:{" "}
        {store?.address?.address2}
      </Typography>
      <Typography
        variant="body2"
        color="inherit"
        className={clsx(classes.address)}
      >
        {intl.formatMessage({ id: "label_service_hours" })}:&nbsp;
        {`${firstDay}${intl.formatMessage({
          id: "label_to"
        })}${lastDay} ${from}-${to}`}
      </Typography>
      <Typography
        variant="body2"
        color="inherit"
        className={clsx(classes.address)}
      >
        {intl.formatMessage({ id: "display_deprecatedDate" })}:{" "}
        {store?.deprecatedDate
          ? moment(store?.deprecatedDate).format("YYYY-MM-DD")
          : "-"}
      </Typography>
    </Container>
  );
};

export default StoreDetail;
