import {ObjectId} from 'mongodb';

export interface IWebMenuItem {
  _id?: ObjectId;
  to: string;
  icon: string;
  // either localeId or text
  localeId: string;
  text: object;
  exact: boolean;
  hideMenu: boolean;
  route: string;
  // page string key
  component: string;
  // policy action array
  auth?: string[];
  // workspace types
  workspaceTypes?: string[];
  // workspace access
  workspaceAccess?: string[];
  // recursive children menu items
  items: IWebMenuItem[];
  priority: number;
}

export type IWebMenuItemModel = IWebMenuItem;
