import mongoose from 'mongoose';
const {Mixed} = mongoose.Schema.Types;
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'PageMenus';
const PageMenuItem = new mongoose.Schema({
  // display name
  name: LocalizeStringSchema,
  // menu item type
  type: {type: String, required: true},
  // custom fields based on type
  data: {type: Mixed, required: false},
  // link to
  to: {
    link: {type: String, required: true, default: '#'},
    // effect when click, value supports 'standard', 'newTab', 'popup'
    mode: {type: String, required: true}
  },
  effects: {
    // when isAuth = true, it is not show when no logged in
    isAuth: {type: Boolean, required: true, default: false},
    afterClick: {
      visible: {type: Boolean, required: true, default: true}
    }
  },
  // position of item in current menu item array
  idx: {type: Number, required: true, default: 0}
});

PageMenuItem.add({items: [PageMenuItem]});
PageMenuItem.add({mItems: [PageMenuItem]});

export const Schema = new mongoose.Schema(
  {
    // menu code
    code: {type: String, required: true, unique: true},
    // platform
    platform: {type: String, required: false},
    // items (recursive)
    items: [PageMenuItem],
    mItems: [PageMenuItem]
    // // workspace
    // workspace: {type: ObjectId, ref: 'Workspace'}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);

/*
const menuExample = {
  name: 'top-menu',

  items: [
    {
      label: {
        en: 'login'
      },
      type: 'link',
      data: null,
      to: '/login',
      effects: 'popup',
      items: [],
      idx: 0
    },
    {
      label: {
        en: 'about'
      },
      type: 'link',
      data: null,
      to: '#',
      items: [
        {
          label: {
            en: 'about us'
          },
          type: 'link',
          data: null,
          to: '/about',
          idx: 0
        },
        {
          label: {
            en: 'terms'
          },
          type: 'link',
          data: null,
          to: '/terms',
          idx: 1
        },
        {
          label: {
            en: 'privacy'
          },
          type: 'link',
          data: null,
          to: '/privacy',
          idx: 2
        }
      ],
      idx: 1
    },
    {
      label: {
        en: 'posts'
      },
      type: 'link',
      data: null,
      to: '/posts',
      items: [],
      idx: 2
    },
    {
      label: {
        en: 'faq'
      },
      type: 'link',
      data: null,
      to: '/faq',
      items: [],
      idx: 3
    },
    {
      label: {
        en: 'contact'
      },
      type: 'link',
      data: null,
      to: '/contact',
      items: [],
      idx: 4
    }
  ],
  workspace: 'golpasal'
};
*/
