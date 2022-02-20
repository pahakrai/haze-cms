import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import { utils } from '@golpasal/editor';

export default {
  key: 'aboutTitle',
  name: 'AboutTitle',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'aboutTitle',
      data: {
        src: {},
        text: {},
        width: '',
        height: ''
      },
      ...obj
    });
  },
  form,
  display
};
