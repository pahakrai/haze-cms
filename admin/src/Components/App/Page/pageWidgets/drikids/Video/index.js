import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import './style.css';
import { utils } from '@golpasal/editor';

export default {
  key: 'video',
  name: 'Video',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'video',
      data: {
        src: '',
        width: 'auto',
        height: 'auto'
      },
      ...obj
    });
  },
  form,
  display
};
