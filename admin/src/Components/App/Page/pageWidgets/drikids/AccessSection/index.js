import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import { utils } from '@golpasal/editor';
import './style.css';

export default {
  key: 'accessSection',
  name: 'AccessSection',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'accessSection',
      data: {
        images: [
          {
            src: {},
            width: '',
            height: '',
            title: {
              en: '',
              'zh-hk': '',
              'zh-cn': ''
            }
          }
        ]
      },
      ...obj
    });
  },
  form,
  display
};
