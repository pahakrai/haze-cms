import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BadRequestException, PaginateOptionsQueryModel} from 'src/core';
import {ObjectId} from 'mongodb';
import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  CategoryCreateModel,
  CategoryUpdateModel,
  CategorySearchModel
} from './models';
import {ICategoryModel, ICategory} from './interfaces';
import {Workspace} from 'src/modules/Workspace/interfaces';
import {IUser} from '../User';

// services
import {BlobService} from '../File/Blob';

@Injectable({scope: Scope.REQUEST})
export class CategoryService extends BaseCRUDService<
  ICategory,
  CategoryCreateModel,
  CategoryUpdateModel,
  CategorySearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Categories')
    private readonly categoryRepository: ICategoryModel,
    private readonly blobService: BlobService
  ) {
    super(categoryRepository, request);
  }

  public _castQuery(searchModel: CategorySearchModel) {
    const query: any = {};
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    const {q, _ids, code, parent, ancestors, isActive, types} = searchModel;

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }

    query.workspace = workspace ? new ObjectId(workspace) : null;
    if (q) {
      const qReg = new RegExp(q, 'i');
      query.$or = [
        {
          'name.en': qReg
        },
        {
          'name.zh-cn': qReg
        },
        {
          'name.zh-hk': qReg
        },
        {
          code: qReg
        }
      ];
    }
    if (_ids) {
      query._id = {$in: _ids};
    }
    if (code) {
      query.code = code;
    }

    if (parent !== undefined) {
      query.parent = parent;
    }

    if (ancestors?.length > 0) {
      query.ancestors = {$in: ancestors};
    }

    if (types?.length > 0) {
      query.type = {$in: types};
    }

    if (typeof isActive === 'boolean') {
      query.isActive = isActive;
    }

    return query;
  }

  // Overide
  public async createCategory(
    body: CategoryCreateModel,
    files: Express.Multer.File[]
  ) {
    let categoryFileMeta = [];
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    if (files.length > 0) {
      categoryFileMeta = await this.blobService.uploadFiles(
        files,
        `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`
      );
    }
    return super.create(
      {
        ...body,
        icon:
          categoryFileMeta.length > 0
            ? categoryFileMeta[0]._id.toHexString()
            : null
      },
      {lean: true}
    );
  }
  // Override
  /**
   * delete a document from database
   * @param _id document id
   */
  public async delete(_id: string) {
    const [noOfChildren, category] = await Promise.all([
      this.repository.countDocuments({
        parent: _id
      }),
      super.findById(_id)
    ]);

    if (noOfChildren > 0) {
      throw new BadRequestException({
        code: 'err_delete_category_with_children'
      });
    }
    if (category?.icon && category?.icon !== null) {
      this.blobService.delete(category.icon, process.env.BLOB_ENGINE);
    }

    return super.delete(_id);
  }

  // Override
  public async find(query: CategorySearchModel) {
    let regions = await super.find(query, {lean: true});

    if (query.recursive) {
      // recursively fetch childrens
      regions = await Promise.all(
        regions.map(r => this._appendChildren(r, query.isActive))
      );
    }

    return regions;
  }

  /**
   * find categories by query
   * @param categorySearchModel CategorySearchModel
   */
  public async getCategories(
    categorySearchModel: CategorySearchModel,
    paginateOptions: PaginateOptionsQueryModel = {}
  ): Promise<any> {
    let workspace = this.getHeaderWorkspace();
    const currentWorkspace = await this.getCurrentWorkspace<Workspace>();

    if (currentWorkspace) {
      workspace = currentWorkspace._id.toHexString();
    } else if (categorySearchModel.workspace) {
      workspace = categorySearchModel.workspace;
    }

    const query = this._castQuery({
      ...categorySearchModel,
      workspace
    });

    let results = null;
    if (categorySearchModel.paginate) {
      results = await this.categoryRepository.paginate(query, paginateOptions);
    } else {
      results = await this.categoryRepository.find(query);
    }
    return results;
  }

  /**
   * find a page by _id
   */
  public async findById(_id: string): Promise<ICategory | null> {
    const currentWorkspace = await this.getCurrentWorkspace<Workspace>();
    const query = this._castQuery({
      _ids: [_id],
      workspace: currentWorkspace?._id?.toHexString()
    });
    return this.findOne(query);
  }

  /**
   * recursively get all children to form a region tree
   *
   * @param category current region
   */
  private async _appendChildren(category: ICategory, isActive?: boolean) {
    let children = await this.getChildren(category._id.toHexString(), isActive);

    // recursively get grand children
    if (children.length) {
      children = await Promise.all(
        children.map(r => this._appendChildren(r, isActive))
      );
    }

    // append children into region
    category.children = children;

    return category;
  }

  /**
   * get all children of a region
   * @param _id region id
   * @param isActive whether only get active children
   */
  public async getChildren(_id: string, isActive?: boolean) {
    return super.find({parent: _id, isActive});
  }

  /**
   * whether this region has children or not
   * @param _id region id
   * @param isActive whether only include active children
   */
  public async isTail(_id: string, isActive?: boolean) {
    const conditions: any = {parent: _id};
    if (typeof isActive === 'boolean') {
      conditions.isActive = isActive;
    }

    const childrenCount = await this.repository
      .countDocuments(conditions)
      .exec();
    return childrenCount === 0;
  }

  public async updateCategory(
    _id,
    updateModel: CategoryUpdateModel,
    files: Express.Multer.File[]
  ) {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    if (files.length > 0) {
      const categoryFileMeta = await this.blobService.uploadFiles(
        files,
        `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`
      );
      updateModel.icon =
        categoryFileMeta.length > 0
          ? categoryFileMeta[0]._id.toHexString()
          : updateModel.icon;
    }

    //find the old category;
    const oldCategory = await super.findById(_id);

    if (oldCategory?.icon?.toString() !== updateModel?.icon) {
      // delete old icon filemeta
      if (oldCategory.icon !== null) {
        this.blobService.delete(oldCategory.icon, process.env.BLOB_ENGINE);
      }
    }

    return super.update(_id, updateModel, {lean: true});
  }
}
