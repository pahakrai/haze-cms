import MediaSlick from './MediaSlick';
import FoldingCard from "./FoldingCard";
import Video from "./Video";

const PageContentWidgets = {
  // if need add other widget
  // eg : [Locale.key]: Locale
  [MediaSlick.key]: MediaSlick,
  [FoldingCard.key]: FoldingCard,
  [Video.key]: Video
};

export default PageContentWidgets;
