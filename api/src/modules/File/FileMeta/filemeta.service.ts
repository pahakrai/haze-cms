'use strict';
// npm
import {Injectable, Inject} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {NotFoundException, pubSub} from 'src/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// modules
import {FileMeta} from './interfaces';
import {
  FileMetaCreateModel,
  FileMetaSearchModel,
  FileMetaUpdateModel
} from './models';
import {FileMetaResolver} from './filemeta.resolver';
import {IUser} from '../../User';

@Injectable()
export class FilemetaService extends BaseCRUDService<FileMeta> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('FileMetas')
    private readonly filemetaRepository: Model<FileMeta>,
    private readonly filemetaResolver: FileMetaResolver
  ) {
    super(filemetaRepository, request);
  }

  /**
   * create file
   * @param fileMeta filemeta
   * @param req request
   */
  public async create(
    fileMetaCreateModel: FileMetaCreateModel
  ): Promise<FileMeta> {
    const user = this.getCurrentUser<IUser>();
    const workspaceId = user
      ? user?.currentWorkspace?.toHexString()
      : this.getHeaderWorkspace() || fileMetaCreateModel.workspace;
    const createModel = {
      ...fileMetaCreateModel,
      workspace: workspaceId
    };

    const filemeta = await super.create(createModel, {lean: true});
    return filemeta;
  }

  /**
   * find file meta by id
   * @param fileMetaId filemeta id
   */
  public async findById(fileMetaId: string): Promise<FileMeta> {
    // const user = this.getCurrentUser();

    // TODO: may user.currentWorkspace high than header
    // const workspaceId =
    //   user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

    const filemeta = await this.filemetaRepository.findOne({
      _id: fileMetaId
    });
    return filemeta;
  }

  /**
   * find file by uri
   * @param uri filemeta Uri
   * @param req request
   */
  public async findByUri(uri: string): Promise<any> {
    const conditions: any = {
      $and: []
    };
    const user = this.getCurrentUser();
    // TODO: may user.currentWorkspace high than header
    const workspaceId =
      user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    if (workspaceId) {
      conditions.$and.push({workspace: workspaceId});
    }

    conditions.$and.push({uri});
    const filemeta = await this.filemetaRepository.findOne(conditions).exec();
    if (!filemeta) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'filemeta'}
      });
    }
    return filemeta;
  }

  public _castQuery(searchModel: FileMetaSearchModel) {
    const query: any = {$and: []};
    const user = this.getCurrentUser<IUser>();
    const {
      q,
      _ids,
      workspace,
      serviceType,
      tags,
      folder,
      isSystemFile,
      fileExtension
    } = searchModel;

    // handle workspace
    const workspaceId =
      user?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspace;

    // always pass workspace as query
    query.$and.push({workspace: workspaceId ? workspaceId : null});

    if (serviceType) {
      query.$and.push({serviceType});
    }
    if (tags) {
      query.$and.push({tags});
    }
    if (folder) {
      query.$and.push({folder});
    }
    if (fileExtension) {
      query.$and.push({fileExtension});
    }
    if (isSystemFile) {
      query.$and.push({isSystemFile});
    }

    if (q) {
      const qReg = new RegExp(q, 'i');
      const $or = [
        {
          originalName: qReg
        },
        {
          displayName: qReg
        },
        {
          thumbnailUri: qReg
        },
        {
          uploadedName: qReg
        }
      ];
      query.$and.push({$or});
    }
    if (_ids?.length > 0) {
      query.$and.push({_id: {$in: _ids}});
    }

    if (query?.$and?.length === 0) {
      return {};
    }
    return query;
  }
  /**
   * find filemetas by model
   * @param fileMetaSearchModel FileMetaSearchMode
   */
  public async find(
    fileMetaSearchModel: FileMetaSearchModel
  ): Promise<FileMeta[]> {
    const query = this._castQuery(fileMetaSearchModel);
    const fileMetas = await this.filemetaRepository.find(query).sort({
      createdAt: fileMetaSearchModel?.sort ? fileMetaSearchModel.sort : -1
    });
    return fileMetas;
  }

  /**
   * update a filemeta
   * @param fileMetaId filemeta _id
   * @param fileMetaUpdateModel FileMetaUpdate Model
   */
  public async update(
    fileMetaId: string,
    fileMetaUpdateModel: FileMetaUpdateModel
  ): Promise<FileMeta | null> {
    // get current user
    const user = this.getCurrentUser<IUser>();
    // find filemeta by _id
    const filemeta = await this.filemetaRepository.findById(fileMetaId).exec();
    // check filemeta exists
    if (!filemeta) {
      throw new NotFoundException({code: 'err_filemeta_not_exist'});
    }
    fileMetaUpdateModel = {
      ...fileMetaUpdateModel,
      workspace:
        user.currentWorkspace.toHexString() || fileMetaUpdateModel?.workspace
    };
    // find one and update existing filemeta
    const fileMetaUpdated = super.update(fileMetaId, fileMetaUpdateModel, {
      lean: true
    });

    pubSub.publish('fileMetaUpdated', {fileMetaUpdated});

    return fileMetaUpdated;
  }
}
