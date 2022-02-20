import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import './style.css';
import { utils } from '@golpasal/editor';

/**
 * export type ImageData = {
    text: string;
    src: any;
    width: string;
    height: string;
    fit: string;
    position: string;
};
 */

export default {
  key: 'homeIntroCard',
  name: 'HomeIntroCard',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'homeIntroCard',
      data: { cardData: [] },
      ...obj
    });
  },
  form,
  display
};
