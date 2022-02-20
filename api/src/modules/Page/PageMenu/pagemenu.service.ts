'use strict';

import {Injectable} from '@nestjs/common';
import {IPageMenu, IPageMenuModel} from './interfaces';
import {InjectModel} from '@nestjs/mongoose';

// core
import {BaseService, NotFoundException} from 'src/core';

// models
import {
  PageMenuCreateModel,
  PageMenuSearchModel,
  PageMenuUpdateModel
} from './models';
import {PageMenuItemInsertModel} from './models';
import {IPage} from '../Page/interfaces';

@Injectable()
export class PageMenuService extends BaseService<IPage> {
  constructor(
    @InjectModel('PageMenus')
    private readonly pageMenuRepository: IPageMenuModel
  ) {
    super();
  }

  /**
   * create new pageMenu
   * @param pageMenuCreateModel
   */
  public async createPageMenu(
    pageMenuCreateModel: PageMenuCreateModel
  ): Promise<IPageMenu> {
    // map to model
    const newPageMenu: any = {
      ...pageMenuCreateModel,
      items: [],
      mItems: []
      // createdBy: user._id.toString(),
      // updatedBy: user._id.toString()
    };
    const pageMenu = await this.pageMenuRepository.create(newPageMenu);
    return pageMenu;
  }

  /**
   * insert pageMenuItem to
   * @param pageMenuItemInsertModel
   */
  public async insertPageMenuItemTo(
    menuId: string,
    field: string,
    pageMenuItemInsertModel: PageMenuItemInsertModel
  ): Promise<IPageMenu> {
    // update to database
    const pageMenu = await this.pageMenuRepository.findOneAndUpdate(
      {_id: menuId},
      {$push: {[field]: pageMenuItemInsertModel}},
      {new: true}
    );
    return pageMenu;
  }

  /**
   * remove pageMenuItem from menu id and menu item Id
   * @param pageMenuItemInsertModel
   */
  public async removePageMenuItemFromMenuIdAndMenuItemId(
    menuId: string,
    menuItemId: string,
    field: string
  ): Promise<IPageMenu> {
    // update to database
    const pageMenu = await this.pageMenuRepository.findOneAndUpdate(
      {_id: menuId},
      {$pull: {[field]: {_id: menuItemId}}},
      {new: true}
    );
    return pageMenu;
  }

  /**
   * duplicate page menu code
   * @param id page id
   * @param code page code
   */
  public async duplicateCode(id: string, code: string): Promise<boolean> {
    const conditions: any = {
      $and: []
    };
    conditions.$and.push({code});
    if (id && id !== 'undefined' && id !== 'null') {
      conditions.$and.push({_id: {$ne: id}});
    }

    const pageResult = await this.pageMenuRepository.findOne(conditions);
    return pageResult ? true : false;
  }

  /**
   * find a pageMenu by query
   * @param pageMenuSearchModel query
   */
  public async find(pageMenuSearchModel: PageMenuSearchModel): Promise<any> {
    const documentQuery = this.pageMenuRepository.find();
    if (pageMenuSearchModel.q) {
      documentQuery.or([
        {
          name: new RegExp(pageMenuSearchModel.q, 'i')
        }
      ]);
    }
    if (pageMenuSearchModel._ids) {
      documentQuery.where('_id').in(pageMenuSearchModel._ids);
    }
    return documentQuery.exec();
  }

  /**
   * find a pageMenu by _id
   * @param _id _id of pageMenu
   */
  public async findById(
    pageMenuId: string,
    throwNotFoundException = true
  ): Promise<IPageMenu | null> {
    const pageMenu = await this.pageMenuRepository.findById(pageMenuId).exec();
    if (!pageMenu && throwNotFoundException) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_pageMenu'}
      });
    }
    return pageMenu;
  }

  /**
   * find a pageMenu by code
   * @param code code of pageMenu
   */
  public async findByCode(
    pageMenuCode: string,
    throwNotFoundException = true
  ): Promise<IPageMenu | null> {
    const pageMenu = await this.pageMenuRepository
      .findOne({
        code: pageMenuCode
      })
      .exec();
    if (!pageMenu && throwNotFoundException) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_pageMenu'}
      });
    }
    return pageMenu;
  }

  /**
   *  update pageMenu
   */
  public async update(
    _id: string,
    pageMenuUpdateModel: PageMenuUpdateModel
  ): Promise<IPageMenu | null> {
    // find pageMenu by _id
    const pageMenu = await this.pageMenuRepository.findById(_id).exec();
    // check pageMenu exists
    if (!pageMenu._id) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_pageMenu'}
      });
    }
    // update fields
    pageMenu.code = pageMenuUpdateModel.code;
    pageMenu.platform = pageMenuUpdateModel.platform;
    if (pageMenuUpdateModel.items) {
      pageMenu.items = pageMenuUpdateModel.items;
    }

    if (pageMenuUpdateModel.mItems) {
      pageMenu.mItems = pageMenuUpdateModel.mItems;
    }

    // update to db
    await this.pageMenuRepository.findByIdAndUpdate(_id, pageMenu).exec();
    return this.pageMenuRepository.findById(_id).exec();
  }

  /**
   * delete a pageMenu by _id
   * @param _id _id of pageMenu
   * @param req req
   */
  public async deleteById(pageMenuId: string): Promise<IPageMenu | null> {
    const pageMenu = await this.pageMenuRepository.findById(pageMenuId).exec();
    if (!pageMenu) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_pageMenu'}
      });
    }
    await this.pageMenuRepository.findByIdAndDelete(pageMenuId);
    return pageMenu;
  }
}
