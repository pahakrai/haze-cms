import Locale from './Locale';

import TextEditor from './drikids/TextEditor';
import MediaSlick from './drikids/MediaSlick';
import Video from './drikids/Video';
import CollapsePanel from './drikids/CollapsePanel';
import ImageTitle from './drikids/ImageTitle';
import DownloadButton from './drikids/DownloadButton';
import AboutTitle from './drikids/AboutTitle';
import AccessSection from './drikids/AccessSection';
import ProfessionalQualitySection from './drikids/ProfessionalQualitySection';
import CaringForSocietySection from './drikids/CaringForSocietySection';
import HomeIntroCard from './drikids/HomeIntroCard';
import IntroVideoSlide from './drikids/IntroVideoSlide';
import FoldingCard from './pokemon/FoldingCard';
import ProcessCard from './aircon/ProcessCard';

const widgets = {
  [Locale.key]: Locale,
  [TextEditor.key]: TextEditor,
  [MediaSlick.key]: MediaSlick,
  [Video.key]: Video,
  [CollapsePanel.key]: CollapsePanel,
  [ImageTitle.key]: ImageTitle,
  [AboutTitle.key]: AboutTitle,
  [DownloadButton.key]: DownloadButton,
  [ProfessionalQualitySection.key]: ProfessionalQualitySection,
  [AccessSection.key]: AccessSection,
  [CaringForSocietySection.key]: CaringForSocietySection,
  [HomeIntroCard.key]: HomeIntroCard,
  [FoldingCard.key]: FoldingCard,
  [IntroVideoSlide.key]: IntroVideoSlide,
  [ProcessCard.key]: ProcessCard
};

export default widgets;
