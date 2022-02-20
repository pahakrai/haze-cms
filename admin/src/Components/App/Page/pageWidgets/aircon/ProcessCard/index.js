import { utils } from '@golpasal/editor';

import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import './style.css';

export default {
  key: 'processCard',
  name: 'ProcessCard',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'processCard',
      data: {
        cards: [{}],
        cardStyle: { height: 200 }
      },
      ...obj
    });
  },
  form,
  display
};
