import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import './style.css';
import { utils } from '@golpasal/editor';

export type TextEditorData = {
  text: string
};

export default {
  key: 'textEditor',
  name: 'TextEditor',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'textEditor',
      data: {
        text: ''
      },
      ...obj
    });
  },
  form,
  display
};
