import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {ObjectId} from 'mongodb';
import {BaseCRUDService, BadRequestException, MongooseOption} from 'src/core';

// interfaces & models
import {
  RegionCreateModel,
  RegionUpdateModel,
  RegionSearchModel
} from './models';
import {RegionModel, Region} from './interfaces';
import {IUser} from '../User';

import {BlobService} from '../File/Blob';

@Injectable({scope: Scope.REQUEST})
export class RegionService extends BaseCRUDService<
  Region,
  RegionCreateModel,
  RegionUpdateModel,
  RegionSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Regions') private readonly regionRepository: RegionModel,
    private readonly blobService: BlobService
  ) {
    super(regionRepository, request);
  }

  public async _castQuery(searchModel: RegionSearchModel) {
    const {
      q,
      _ids,
      code,
      codes,
      types,
      isAddress,
      parent,
      parentCode,
      isActive,
      subTypes,
      ancestors,
      ancestorCodes
    } = searchModel;
    const query: any = {};
    let workspace: string;
    const user = this.getCurrentUser<IUser>();

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }

    if (_ids) {
      query._id = {$in: _ids};
    }

    if (code) {
      query.code = code;
    }

    if (Array.isArray(codes)) {
      query.code = {$in: codes};
    }

    if (types?.length) {
      query.type = {$in: types};
    }

    if (parent !== undefined) {
      query.parent = parent === 'null' ? null : parent;
    }

    if (parentCode) {
      const parent = await this.findOne({code: parentCode}, {lean: true});
      query.parent = parent._id;
    }

    if (typeof isActive === 'boolean') {
      query.isActive = isActive;
    }

    if (subTypes?.length > 0) {
      query.subTypes = {$in: subTypes};
    }

    if (ancestors?.length > 0) {
      query.ancestors = {$in: ancestors};
    }

    if (Array.isArray(ancestorCodes)) {
      const ancestors = await this.find({codes: ancestorCodes}, {lean: true});
      query.ancestors = {$in: ancestors.map(a => a._id)};
    }

    if (q) {
      query.$or = [
        {
          'name.en': new RegExp(q, 'i')
        },
        {
          'name.zh-hk': new RegExp(q, 'i')
        },
        {
          'name.zh-cn': new RegExp(q, 'i')
        }
      ];
    }
    if (isAddress !== undefined) {
      query.isAddress = isAddress;
    }

    // always pass workspace as query
    query.workspace = new ObjectId(workspace) || null;

    return query;
  }

  // Override
  /**
   * create new region
   * @param model regionCreateModel
   */
  public async createRegion(
    model: RegionCreateModel,
    files: Express.Multer.File[]
  ) {
    const user = this.getCurrentUser<IUser>();

    model.workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${model.workspace}`;
    if (files.length > 0) {
      const regionFile = await this.blobService.uploadFile(files[0], folder);
      model.filemeta = regionFile?._id?.toHexString();
    }

    const region = await this.findOne({
      code: model.code,
      workspace: model.workspace
    });
    if (region) {
      throw new BadRequestException({
        code: 'region_code_exist'
      });
    }

    return super.create(model, {lean: true});
  }

  /**
   * delete a document from database
   * @param _id document id
   */
  public async delete(_id: string) {
    const noOfChildren = await this.regionRepository.countDocuments({
      parent: _id
    });

    if (noOfChildren > 0) {
      throw new BadRequestException({code: 'err_delete_region_with_children'});
    }
    return super.delete(_id);
  }

  // Override
  public async find(query: RegionSearchModel, options?: MongooseOption) {
    let regions = await super.find(query, options);

    if (query.recursive) {
      // recursively fetch childrens
      regions = await Promise.all(
        regions.map(r => this._appendChildren(r, query.isActive))
      );
    }

    return regions;
  }

  /**
   * recursively get all children to form a region tree
   *
   * @param region current region
   */
  private async _appendChildren(region: Region, isActive?: boolean) {
    let children = await this.getChildren(region._id.toHexString(), isActive);

    // recursively get grand children
    if (children.length) {
      children = await Promise.all(
        children.map(r => this._appendChildren(r, isActive))
      );
    }

    // append children into region
    region.children = children;

    return region;
  }

  /**
   * get nearest region of your location
   *
   * @param latitude current location - latitiude
   * @param longitude current location - longitude
   */
  public async findNearestRegion(latitude: number, longitude: number) {
    const result = await this.regionRepository
      .aggregate()
      .near({
        near: [longitude, latitude],
        // only include active region
        query: {isActive: {$eq: true}},
        distanceField: 'distance'
      })
      // NOTE: old code
      // .near({
      //   near: {
      //     type: 'Point',
      //     coordinates: [longitude, latitude]
      //   },
      //   // only include active region
      //   query: {isActive: {$eq: true}},
      //   distanceField: 'distance'
      // })
      .limit(1)
      .project({distance: 0})
      .exec();

    return result[0];
  }

  /**
   * get all children of a region
   * @param _id region id
   * @param isActive whether only get active children
   */
  public async getChildren(parent: string, isActive?: boolean) {
    return super.find({parent, isActive}, {lean: true});
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

    const childrenCount = await this.regionRepository
      .countDocuments(conditions)
      .exec();
    return childrenCount === 0;
  }

  /**
   * update region by _id
   * @param _id         region _id
   * @param updateModel  update doc
   */
  public async updateRegion(
    _id: string,
    updateModel: RegionUpdateModel,
    files: Express.Multer.File[]
  ) {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
    if (files.length > 0) {
      const newFile = await this.blobService.uploadFile(files[0], folder);
      updateModel.filemeta = newFile?._id?.toHexString();
    }

    const region = await this.regionRepository
      .findOneAndUpdate(
        {
          workspace: user?.currentWorkspace || this.getHeaderWorkspace(),
          _id: _id
        },
        updateModel as any,
        {new: true}
      )
      .exec();
    if (!region) {
      throw new BadRequestException({
        code: 'err_region_not_found'
      });
    }
    return region;
  }
}
