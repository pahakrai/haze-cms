import dynamic from "next/dynamic";
export const ReactPage = dynamic<any>(
  () => import("@golpasal/editor").then((m) => m.ReactPage),
  {
    ssr: false
  }
);
export const utils = dynamic(
  () => import("@golpasal/editor").then((m: any) => m.utils),
  {
    ssr: false
  }
);
export { default as PageMeta } from "./PageMeta";

export { default as PageTitle } from "./PageTitle";

export { default as PageWidgets } from "./Widgets";
export { default as PageWidgetSettings } from "./Widgets/WidgetSettings";

export { default as PageSection } from "./PageSection";

// for import css
import "@golpasal/editor/dist/styles.css";
