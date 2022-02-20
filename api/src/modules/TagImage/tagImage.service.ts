import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {IUser} from '../User';
// interfaces & models
import {
  TagImageCreateModel,
  TagImageUpdateModel,
  TagImageSearchModel
} from './models';

import {TagImage, TagImageModel} from './interfaces';

import {BlobService} from '../File/Blob';
import ObjectId from 'bson-objectid';

@Injectable({scope: Scope.REQUEST})
export class TagImageService extends BaseCRUDService<
  TagImage,
  TagImageCreateModel,
  TagImageUpdateModel,
  TagImageSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('TagImages')
    private readonly tagImageRepository: TagImageModel,
    private readonly blobService: BlobService
  ) {
    super(tagImageRepository, request);
  }

  public _castQuery(searchModel: TagImageSearchModel) {
    const query: any = {$and: []};
    const {q, text} = searchModel;
    const currentUser = this.getCurrentUser();
    const workspace =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    if (q) {
      const qReg = new RegExp(q, 'i');
      const $or = [{text: qReg}];
      query.$and.push({$or});
    }

    if (text) {
      query.$and.push({text: text});
    }
    if (workspace) {
      query.$and.push({workspace: new ObjectId(workspace)});
    }

    if (!query.$and.length) delete query.$and;
    return query;
  }

  public async createTagAndImage(
    body: TagImageCreateModel,
    files: Express.Multer.File[]
  ) {
    // get current user
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
    if (files.length > 0) {
      const tagFile = await this.blobService.uploadFile(files[0], folder);
      body.image = tagFile?._id?.toHexString();
    }

    return super.create({...body, workspace: workspace}, {lean: true});
  }

  public async updateTagAndImage(
    _id: string,
    updateModel: TagImageUpdateModel,
    files: Express.Multer.File[]
  ) {
    // get current user
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;

    if (files.length > 0) {
      const newFile = await this.blobService.uploadFile(files[0], folder);
      updateModel.image = newFile?._id?.toHexString();
    }
    return this.update(_id, {...updateModel}, {lean: true});
  }
}
