import editor from './editor';
import form from './form';
import icon from './icon';
import locale from './locale';
import editorControl from './editorControl';
import display from './display';
import './style.css';
import { utils } from '@golpasal/editor';

export default {
  key: 'introVideoSlide',
  name: 'IntroVideoSlide',
  icon,
  locale,
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: 'introVideoSlide',
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
        // media data
        medias: [
          {
            media: {
              src: {},
              width: '50%',
              height: '300px',
              mobileHeight: '194px',
              fit: 'cover',
              position: 'center'
            },
            title: {
              en: '',
              'zh-hk': '',
              'zh-cn': ''
            },
            description: {
              en: '',
              'zh-hk': '',
              'zh-cn': ''
            },
            titleIcon: {
              src: {},
              width: '30px',
              height: '30px',
              fit: 'cover',
              position: 'center'
            }
          }
        ],
        quantity: 1,
        carouseSpeed: '0',
        chevronWidth: '0',
        slidesToScroll: 1,
        mobileSlidesToScroll: 1,
        mobileQuantity: 1,
        infiniteLoop: false
      },
      ...obj
    });
  },
  form,
  display
};
