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
  key: 'imageTitle',
  name: 'ImageTitle',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'imageTitle',
      data: {
        // row style
        reverse: false,
        // image data
        src: {},
        width: '',
        height: '',
        fit: 'cover',
        position: 'center',
        // title data
        text: ''
      },
      ...obj
    });
  },
  form,
  display
};
