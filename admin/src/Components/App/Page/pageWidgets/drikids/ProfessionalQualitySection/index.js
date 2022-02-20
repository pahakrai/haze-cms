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
  key: 'professionalQualitySection',
  name: 'ProfessionalQualitySection',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'professionalQualitySection',
      data: {
        title: '',
        content: '',
        left: {
          src: {},
          width: '',
          height: '',
          fit: 'cover',
          position: 'center',
          title: {
            en: '',
            'zh-hk': '',
            'zh-cn': ''
          }
        },
        center: {
          src: {},
          width: '',
          height: '',
          fit: 'cover',
          position: 'center',
          title: {
            en: '',
            'zh-hk': '',
            'zh-cn': ''
          }
        },
        right: {
          src: {},
          width: '',
          height: '',
          fit: 'cover',
          position: 'center',
          title: {
            en: '',
            'zh-hk': '',
            'zh-cn': ''
          }
        }
      },
      ...obj
    });
  },
  form,
  display
};
