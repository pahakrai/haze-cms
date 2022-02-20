import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import './style.css';
import { utils } from '@golpasal/editor';

export default {
  key: 'mediaSlick',
  name: 'MediaSlick',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'mediaSlick',
      inlineStyle: 'height: 400px;',
      data: {
        leftArrow: {
          src: {},
          width: '30px',
          height: '30px',
          fit: 'cover',
          position: 'center'
        },
        rightArrow: {
          src: {},
          width: '30px',
          height: '30px',
          fit: 'cover',
          position: 'center'
        },
        // image data
        images: [
          {
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
        ],
        quantity: 1,
        carouseSpeed: '0',
        chevronWidth: '0',
        slidesToScroll: 1,
        mobileSlidesToScroll: 1,
        mobileQuantity: 1,
        infiniteLoop: true
      },
      ...obj
    });
  },
  form,
  display
};
