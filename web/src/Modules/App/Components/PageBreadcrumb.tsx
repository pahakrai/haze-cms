import React from "react";
import { Breadcrumbs, Link as MLink, makeStyles } from "@material-ui/core";
import Link from "next/link";

const useClasses = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0`
  }
}));
export interface PageBreadcrumbItem {
  href?: string;
  title?: string;
  active?: boolean;
}
export interface PageBreadcrumbProps {
  links?: PageBreadcrumbItem[];
}
export const PageBreadcrumb = ({ links = [] }: PageBreadcrumbProps) => {
  const classes = useClasses();
  return (
    <Breadcrumbs separator=">" className={classes.root}>
      {links.map((link, idx) => (
        <Link href={link.href} passHref key={idx}>
          <MLink color={link.active ? "textPrimary" : "inherit"}>
            {link.title}
          </MLink>
        </Link>
      ))}
    </Breadcrumbs>
  );
};
