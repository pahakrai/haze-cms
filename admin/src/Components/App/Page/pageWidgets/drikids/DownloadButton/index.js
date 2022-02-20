import { utils } from '@golpasal/editor';

import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';

export default {
  key: 'downloadButton',
  name: 'DownloadButton',
  icon,
  locale,
  editor,
  editorControl,
  new: (obj, objSettings) => {
    return utils.newWidget({
      type: 'downloadButton',
      data: {
        text: 'Button',
        fontSize: '',
        fontFamily: '',
        icon: {
          url: '',
          width: '20px',
          height: '20px'
        },
        borderRadius: '8px',
        href: '',
        hrefTarget: '_blank',
        color: '#fff',
        supportJump: true,
        backgroundColor:
          (objSettings && objSettings.defaultBackgroundColor) ||
          'rgb(22, 114, 201)'
      },
      ...obj
    });
  },
  form,
  display
};
