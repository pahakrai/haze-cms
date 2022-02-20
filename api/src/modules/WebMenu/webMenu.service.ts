import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {
  NotFoundException,
  UnauthorizedException,
  ForbiddenException
} from 'src/core';

import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  WebMenuCreateModel,
  WebMenuUpdateModel,
  WebMenuSearchModel,
  WebMenuItemModel
} from './models';
import {
  IWebMenuModel,
  IWebMenu,
  IWebMenuService,
  IWebMenuItem
} from './interfaces';
import {Workspace} from '../Workspace/interfaces';
import {ACService} from '../Ac/ac.service';
import {IUser} from '../User';

@Injectable({scope: Scope.REQUEST})
export class WebMenuService
  extends BaseCRUDService<
    IWebMenu,
    WebMenuCreateModel,
    WebMenuUpdateModel,
    WebMenuSearchModel
  >
  implements IWebMenuService {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WebMenus') private readonly webMenuRepository: IWebMenuModel,
    private readonly acService: ACService
  ) {
    super(webMenuRepository, request);
  }

  public _castQuery(searchModel: WebMenuSearchModel): any {
    const query: any = {$and: []};
    const {types, code} = searchModel;

    if (code) {
      query.$and.push({code});
    }

    if (Array.isArray(types) && types.length) {
      query.$and.push({code: {$in: [...types]}});
    }

    if (code) {
      query.$and.push({code});
    }

    return query;
  }

  public async _updateMenu(
    menuItems: IWebMenuItem[],
    updateFn: (
      menuItem: IWebMenuItem,
      deleteItem: () => boolean
    ) => Promise<IWebMenuItem | null> | IWebMenuItem | null
  ) {
    // define isDelete to determine whether a menuItem should
    // be deleted after the updateFn()
    let isDelete;
    // loop each menu item from end to start (to allow deleting
    // item without effect subsequent menu items)
    for (let i = menuItems.length - 1; i >= 0; i--) {
      // initially define isDelete to false
      isDelete = false;
      // define delete item function to set isDelete flag
      // to true
      const deleteItemFn = () => (isDelete = true);
      // run custom param updateFn with menu item and delete function
      const updatedMenuItem = await updateFn(menuItems[i], deleteItemFn);
      // if want to delete, remove this current item
      if (isDelete || !updatedMenuItem) {
        menuItems.splice(i, 1);
      } else {
        // assign updated menu item to the array of items
        menuItems[i] = updatedMenuItem;
        // if menu item also has a items field, handle its sub
        // sequent items
        if (menuItems[i].items) {
          menuItems[i].items = await this._updateMenu(
            menuItems[i].items,
            updateFn
          );
        }
      }
    }
    // return final menu item list
    return menuItems;
  }

  public async findWebMenu(query: WebMenuSearchModel): Promise<IWebMenu> {
    // get current user from request
    const currentUser = this.getCurrentUser<IUser>();
    // get the web menu by query
    const webMenu = await this.findOne(query, {lean: true});
    // if web menu not found, just return null
    if (!webMenu) {
      return null;
    }
    // define userActions here to reduce db calls to fetch user ac in
    // isMenuItemAllowed()
    const userActions = {
      allow: currentUser
        ? await this.acService.getUserAllowedActions(
            currentUser.currentWorkspace.toHexString(),
            currentUser._id.toHexString()
          )
        : [],
      deny: currentUser
        ? await this.acService.getUserDeniedActions(
            currentUser.currentWorkspace.toHexString(),
            currentUser._id.toHexString()
          )
        : []
    };
    // update the menu items inside the found web menu
    webMenu.menu = await this._updateMenu(webMenu?.menu, async menuItem => {
      // if hideMenu is undefined
      if (menuItem.hideMenu === undefined) {
        // assign our own hideMenu based on auth and workspace definitions
        menuItem.hideMenu = !(await this.isMenuItemAllowed(
          menuItem,
          currentUser,
          {
            // pass userActions here to reduce amount of times isMenuItemAllowed
            userActions
          }
        ));
      }

      // return null if workspaceType does not match
      const currentWorkspace = await this.getCurrentWorkspace<Workspace>();
      if (
        menuItem.workspaceTypes?.length &&
        !menuItem?.workspaceTypes?.includes(currentWorkspace?.type)
      ) {
        // NOTE: return null if need to remove menuItem
        return null;
      }

      // delete all auth related fields to reduce exposure
      // to front-end
      delete menuItem.auth;
      delete menuItem.workspaceAccess;
      delete menuItem.workspaceTypes;

      // return the curated item
      return menuItem;
    });
    // return filtered webMenu
    return webMenu;
  }

  public async addMenuItem(
    id: string,
    item: WebMenuItemModel
  ): Promise<IWebMenu> {
    const menu = await this.webMenuRepository.findOneAndUpdate(
      {_id: id},
      {$push: {menu: item}},
      {new: true}
    );
    return menu;
  }

  public async updateMenuItem(
    menuId: string,
    itemId: string,
    updatedItem: WebMenuItemModel
  ): Promise<IWebMenu> {
    const webMenu: IWebMenu = await this.webMenuRepository.findById(menuId, {
      lean: true
    });
    const updatedMenuItems = webMenu?.menu?.map(item => {
      if (item._id.toHexString() === itemId) {
        return {...item, ...updatedItem};
      }
      return item;
    });
    const updatedMenu = await this.webMenuRepository.findOneAndUpdate(
      {_id: menuId},
      {$set: {menu: [...updatedMenuItems]}},
      {new: true}
    );
    return updatedMenu;
  }

  public findListItemByPath(
    webMenuItemList: IWebMenuItem[],
    to: string
  ): IWebMenuItem | null {
    for (const menuItem of webMenuItemList) {
      if (menuItem.to) {
        const regex = new RegExp(
          `^${menuItem.to.replace(/:[^/]+/, '.+')}/?$`,
          'i'
        );
        if (regex.test(to)) {
          return menuItem;
        }
      }
      if (menuItem.items) {
        const subResult = this.findListItemByPath(menuItem.items, to);
        if (subResult) {
          return subResult;
        }
      }
    }
    return null;
  }

  public async isMenuItemAllowed(
    webMenuItem: IWebMenuItem,
    user: IUser,
    options?: {userActions?: {allow?: string[]; deny?: string[]}}
  ) {
    // define options
    const opts = {
      ...options
    };

    // define result
    let access = true;

    // if web menu item not found, return null
    if (!webMenuItem) {
      return null;
    }

    // if auth is an array, check to see if user exists,
    // and also compare actions if array has elements
    if (Array.isArray(webMenuItem?.auth)) {
      // if user does not exist, access is false
      if (!user) {
        access = false;
      } else if (webMenuItem.auth.length) {
        // get user's allowed AC actions
        const allowedActions =
          opts?.userActions?.allow ||
          (await this.acService.getUserAllowedActions(
            user.currentWorkspace.toHexString(),
            user._id.toHexString()
          ));
        // get user's denied AC actions
        const deniedActions =
          opts?.userActions?.deny ||
          (await this.acService.getUserDeniedActions(
            user.currentWorkspace.toHexString(),
            user._id.toHexString()
          ));
        // get whether user is allowed all actions
        const isAllowAll = allowedActions.includes('*');
        const isDenyAll = deniedActions.includes('*');

        if (
          // if user's ac does not match any of auth's actions
          webMenuItem?.auth.some(a => {
            if (isAllowAll) {
              return false;
            } else if (isDenyAll) {
              return true;
            } else if (deniedActions.includes(a)) {
              return true;
            } else if (allowedActions.includes(a)) {
              return false;
            } else {
              return true;
            }
          })
        ) {
          // set user access to false
          access = false;
        }
      }
    }

    // if web menu item checks workspaces
    if (
      webMenuItem.workspaceTypes?.length ||
      webMenuItem.workspaceAccess?.length
    ) {
      if (!user) {
        access = false;
      } else {
        // fetch user's current workspace
        const currentWorkspace = await this.getCurrentWorkspace<Workspace>();

        // if workspace doesn't exist, return false
        if (
          (webMenuItem.workspaceAccess?.length &&
            !webMenuItem?.workspaceAccess?.includes(
              currentWorkspace?._id?.toHexString()
            )) ||
          (webMenuItem.workspaceTypes?.length &&
            !webMenuItem?.workspaceTypes?.includes(currentWorkspace?.type))
        ) {
          access = false;
        }
      }
    }

    // all checks passed or return true
    return access;
  }

  public async accessAllowedByAction(
    code: string,
    to: string
  ): Promise<boolean> {
    // get current user
    const user = this.getCurrentUser();

    // get menu item
    const webMenu = await this.findOne({code});

    // update the menu items inside the found web menu
    webMenu.menu = await this._updateMenu(webMenu?.menu, async menuItem => {
      // return null if workspaceType does not match
      const currentWorkspace = await this.getCurrentWorkspace<Workspace>();
      if (
        menuItem.workspaceTypes?.length &&
        !menuItem?.workspaceTypes?.includes(currentWorkspace?.type)
      ) {
        // NOTE: return null if need to remove menuItem
        // to filter by workspaceTypes
        return null;
      }
      // return the curated item
      return menuItem;
    });

    // find web menu's item
    const webMenuItem = this.findListItemByPath(webMenu.menu, to);

    if (!webMenuItem) {
      throw new NotFoundException({});
    }

    const isAllowed = await this.isMenuItemAllowed(webMenuItem, user);
    if (!isAllowed) {
      if (!user) {
        throw new UnauthorizedException({});
      } else {
        throw new ForbiddenException({});
      }
    }

    return true;
  }
}
