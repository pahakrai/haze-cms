import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  ServiceCreateModel,
  ServiceUpdateModel,
  ServiceSearchModel
} from './models';
import {ServiceModel, Service} from './interfaces';
import {PricingServiceService} from '../Pricing/submodules/PricingService/pricingService.service';
import {IUser} from '../User';
import {BlobService} from '../File/Blob';
import ObjectId from 'bson-objectid';

@Injectable({scope: Scope.REQUEST})
export class ServiceService extends BaseCRUDService<
  Service,
  ServiceCreateModel,
  ServiceUpdateModel,
  ServiceSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Services') private readonly serviceRepository: ServiceModel,
    private readonly pricingServiceService: PricingServiceService,
    private readonly blobService: BlobService
  ) {
    super(serviceRepository, request);
  }

  public _castQuery(searchModel: ServiceSearchModel) {
    const query: any = {$and: []};
    const {
      q,
      _ids,
      category,
      types,
      units,
      isUserInfo,
      isConfigurable,
      isActive,
      platformTypes
    } = searchModel;

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
    // always pass workspace as query
    query.$and.push({workspace: workspace ? workspace : null});

    if (q) {
      const $or = [
        {'name.en': new RegExp(q, 'i')},
        {'name.zh-hk': new RegExp(q, 'i')},
        {'name.zh-cn': new RegExp(q, 'i')},
        {description: new RegExp(q, 'i')}
      ];
      query.$and.push({$or});
    }

    if (Array.isArray(_ids) && _ids.length > 0) {
      query.$and.push({_id: {$in: _ids}});
    }

    if (category) {
      query.$and.push({_category: category});
    }

    if (types) {
      query.$and.push({type: {$in: types}});
    }

    if (platformTypes) {
      query.$and.push({platformTypes: {$in: platformTypes}});
    }

    if (units) {
      query.$and.push({unit: {$in: units}});
    }

    if (typeof isConfigurable === 'boolean') {
      query.$and.push({isConfigurable: isConfigurable});
    }

    if (typeof isUserInfo === 'boolean') {
      query.$and.push({isUserInfo: isUserInfo});
    }

    if (typeof isActive === 'boolean') {
      query.$and.push({isActive: isActive});
    }

    if (!query.$and.length) delete query.$and;

    return query;
  }

  /**
   *
   * @param createModel
   */
  public async createService(createModel, files: Express.Multer.File[]) {
    if (files.length > 0) {
      const serviceFileMetas = await this.uploadFiles(files);
      createModel.icon =
        serviceFileMetas && serviceFileMetas.length > 0
          ? serviceFileMetas[0]._id
          : new ObjectId();
    }
    return super.create(createModel, {lean: true});
  }

  /**
   * get services that will show in driver's User Profile screen
   */
  public async getServiceShowInUserProfile() {
    return this.find({isActive: true, isUserInfo: true}, {lean: true});
  }

  async getSkillServices() {
    return this.find(
      {types: ['skill'], isActive: true, isUserInfo: false},
      {lean: true}
    );
  }

  public async updateService(id, updateModel, files: Express.Multer.File[]) {
    if (files.length > 0) {
      const serviceFileMetas = await this.uploadFiles(files);
      updateModel.icon =
        serviceFileMetas && serviceFileMetas.length > 0
          ? serviceFileMetas[0]._id
          : new ObjectId();
    }
    return super.update(id, updateModel, {lean: true});
  }

  /**
   * upload file
   * @param files
   */
  public async uploadFiles(files: Express.Multer.File[]) {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    const serviceFileMetas = await this.blobService.uploadFiles(
      files,
      `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`
    );
    return serviceFileMetas;
  }

  public async getPricing(_id: string) {
    let pricingService = await this.pricingServiceService.findOne({
      services: [_id]
    });

    pricingService = await this.pricingServiceService._populate(
      pricingService,
      ['pricing']
    );

    return pricingService;
  }

  public async getPricings(_id: string) {
    let pricingService = await this.pricingServiceService.find({
      services: [_id]
    });

    // get list of prices with different vehicle types
    pricingService = await this.pricingServiceService._populate(
      pricingService,
      ['pricing']
    );

    return pricingService;
  }
}
