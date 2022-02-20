import { utils } from '@golpasal/editor';
import editor from './editor';
import form from './form';
import icon from './icon';
import editorControl from './editorControl';
import display from './display';
import './style.css';

export default {
  key: 'locale',
  name: 'Locale Language Change',
  editor,
  icon,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'locale',
      data: {
        availableLocales: [
          { label: 'English', value: 'en' },
          { label: '繁體中文', value: 'zh-hk' }
        ],
        currentLocale: 'zh-hk'
      },
      ...obj
    });
  },
  form,
  display
};
