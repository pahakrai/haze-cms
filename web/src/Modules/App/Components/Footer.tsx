import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { useIntl } from "react-intl";
import keys from "lodash/keys";
import Link from "next/link";
import { helpers } from "@golpasal/common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";
import { Container, fade, Grid, Typography } from "@material-ui/core";
import {
  AddressWhiteIcon,
  EmailIcon,
  PhoneIcon,
  TimeIcon
} from "../../../Components/SvgIcon";
import { useLocale } from "~/lib/intl";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

const pjson = require("~/package.json");
const useClasses = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(8)}px 0px`
  },
  brand: {
    display: "flex",
    flexDirection: "row",
    aignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2)
  },
  menus: {
    "& ul": {
      listStyle: "none",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      "& li": {
        color: fade(theme.palette.primary.contrastText, 0.8),
        padding: `${theme.spacing(1)}px 0`,
        "&:nth-child(1)": {
          color: fade(theme.palette.primary.contrastText, 1)
        }
      },
      "& a": {
        cursor: "pointer"
      }
    }
  },
  socials: {
    display: "flex",
    flexDirection: "row",
    aignItems: "center",
    justifyContent: "center",
    "& a": {
      display: "inline-table"
    },
    "& img": {
      width: 32,
      height: 32,
      marginRight: theme.spacing(1)
    }
  },
  copyright: {
    color: fade(theme.palette.primary.contrastText, 1),
    textAlign: "center",
    marginBottom: theme.spacing(3)
  },
  contactIcon: {
    display: "flex",
    paddingBottom: "5px"
  },
  [theme.breakpoints.up("md")]: {
    root: {
      padding: `${theme.spacing(3)}px 0px`
    },
    menus: {
      "& ul": {
        display: "inline-block"
      }
    },
    socials: {
      display: "flex"
    }
  }
}));

interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
export const Footer = () => {
  const { workspace } = useWorkspace();
  const classes = useClasses();
  const intl = useIntl();
  const { locale } = useLocale();
  const menus = [
    {
      href: "/terms",
      text: intl.formatMessage({ id: "display_footer_menu_1" })
    },
    {
      href: "/privacy",
      text: intl.formatMessage({ id: "display_footer_menu_2" })
    }
  ];
  const menus2 = [
    {
      text: `${intl.formatMessage({ id: "label_email" })}: ${
        workspace?.contacts?.[0]?.email
      }`
    },
    {
      text: `${intl.formatMessage({ id: "label_phone" })}: ${
        workspace?.contacts?.[0]?.phoneNo
      }`
    },
    {
      text: `${intl.formatMessage({ id: "label_address" })}: ${
        workspace?.contacts?.[0]?.address
      }`
    }
  ];
  const socials = keys(workspace?.setting?.theme?.icons)
    .map((key) => {
      const imageHref = workspace.setting.theme.icons[key];
      const socialUrl = workspace?.socialLinks[key]?.url;
      return {
        image: imageHref,
        url: socialUrl
      };
    })
    .filter((item) => item.image && item.url);
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={3} className={classes.brand}>
          <img
            alt={workspace?.name}
            src={workspace?.setting?.headerLogo?.uri}
            height="50"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.menus}>
          <ul>
            <li>
              <Typography variant="h6" color="inherit">
                {intl.formatMessage({ id: "display_footer_about_us" })}
              </Typography>
            </li>
            {menus.map((menu, idx) => (
              <Link href={menu.href} key={idx}>
                <li>
                  <a>
                    <Typography variant="body2" color="inherit">
                      {menu.text}
                    </Typography>
                  </a>
                </li>
              </Link>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.menus}>
          <ul>
            <li>
              <Typography variant="h6" color="inherit">
                {intl.formatMessage({ id: "display_footer_contact_us" })}
              </Typography>
            </li>

            {workspace?.contacts?.map((menu, idx) => {
              const days = [];
              menu?.serviceHour?.workdays?.map((v, idx) => {
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
              const isDay = days?.includes(newDay);
              const from = menu?.serviceHour?.worktime?.from;
              const to = menu?.serviceHour?.worktime?.to;
              const isHour = from <= hour && to >= hour;
              const firstDay = days && days[0];
              const lastDay = days && days[days?.length - 1];
              const currentDay = moment().format("dddd");
              const isRange = isDay && isHour;
              {
                return (
                  <li key={idx}>
                    <Typography
                      variant="body2"
                      color="inherit"
                      className={classes.contactIcon}
                    >
                      <EmailIcon size={20} />
                      &nbsp;
                      {intl.formatMessage({ id: "label_email" })}:&nbsp;
                      {menu?.email}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="inherit"
                      className={classes.contactIcon}
                    >
                      <PhoneIcon size={20} /> &nbsp;
                      {intl.formatMessage({ id: "label_phone" })}:&nbsp;
                      {menu?.phoneNo}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="inherit"
                      className={classes.contactIcon}
                    >
                      <AddressWhiteIcon size={20} /> &nbsp;
                      {intl.formatMessage({ id: "label_address" })}:&nbsp;
                      {menu?.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="inherit"
                      className={classes.contactIcon}
                    >
                      <TimeIcon size={20} />
                      &nbsp;
                      {intl.formatMessage({ id: "label_service_hours" })}:&nbsp;
                      {`${firstDay ? firstDay : ""}${
                        firstDay && lastDay
                          ? intl.formatMessage({
                              id: "label_to"
                            })
                          : ""
                      }${lastDay ? lastDay : ""} ${from}-${to} ${currentDay} ${
                        isRange
                          ? intl.formatMessage({
                              id: "label_service_open"
                            })
                          : intl.formatMessage({ id: "label_service_closed" })
                      }`}
                    </Typography>
                  </li>
                );
              }
            })}
          </ul>
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.socials}>
          {socials.map((item, idx) => (
            <a href={item.url} key={idx}>
              <img src={item.image}></img>
            </a>
          ))}
        </Grid>
      </Grid>
      <Typography className={classes.copyright} variant="subtitle2">
        {`${moment().year()} © ${workspace?.name || ""} v${pjson.version}`}
      </Typography>
    </Container>
  );
};
