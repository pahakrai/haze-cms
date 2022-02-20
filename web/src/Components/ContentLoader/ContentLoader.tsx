import React from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

export interface ContentLoaderProps extends SkeletonProps {}

export const ContentLoader = (props: ContentLoaderProps) => (
  <Skeleton {...props} />
);
