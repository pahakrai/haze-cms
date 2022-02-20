import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {PaginateOptionsQueryModel, extractPaginateOptions} from 'src/core';

import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {TagCreateModel, TagUpdateModel, TagSearchModel} from './models';
import {Tag, TagModel} from './interfaces';
import {ObjectId} from 'mongodb';

@Injectable({scope: Scope.REQUEST})
export class TagService extends BaseCRUDService<
  Tag,
  TagCreateModel,
  TagUpdateModel,
  TagSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Tags') private readonly tagRepository: TagModel
  ) {
    super(tagRepository, request);
  }

  public _castQuery(searchModel: TagSearchModel) {
    const query: any = {$and: []};
    const {q, ref, text, refTypes, texts, _ids} = searchModel;
    const currentUser = this.getCurrentUser();
    const workspace =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

    if (text || q) {
      const qReg = new RegExp(q || text, 'i');
      const $or = [
        {
          text: qReg
        }
      ];
      query.$and.push({$or});
    }
    if (Array.isArray(texts) && texts.length) {
      query.$and.push({text: {$in: texts}});
    }
    if (ref) {
      query.$and.push({ref: ref});
    }
    if (refTypes?.length > 0) {
      query.$and.push({refType: {$in: refTypes}});
    }
    if (workspace) {
      query.$and.push({workspace: new ObjectId(workspace) || null});
    }
    if (_ids) {
      query.$and.push({_id: {$in: _ids}});
    }

    if (!query.$and.length) delete query.$and;
    return query;
  }

  public async findById(_id: string): Promise<Tag> {
    return this.findOne({_id});
  }

  public async findOne(query: TagSearchModel & {_id?: string}): Promise<Tag> {
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace ||
      query?.workspace;
    // NOTE: conversion required for typescript issue
    const cleanQuery: any = {
      ...query
    };
    return this.tagRepository.findOne(
      {...cleanQuery, workspace: workspaceId},
      {lean: true}
    );
  }

  /**
   * find a post by query
   * @param query req.query
   * @param req req
   */
  public async find(
    query: TagSearchModel,
    paginateOptions?: any
  ): Promise<Array<Tag>> {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.findWithPaginate(query);
      // do populates
      result.docs = await this._populate(result.docs, populates);
    } else {
      result = await super.find(query, {
        sort: paginateOptions?.sort || '-createdAt',
        lean: true
      });
      // do populates
      result = await this._populate(result, populates);
    }

    return result;
  }

  public async getDistinctTags(
    searchModel: TagSearchModel & PaginateOptionsQueryModel
  ) {
    const query = this._castQuery(searchModel);
    const paginateOptions = extractPaginateOptions(searchModel);
    // NOTE: SAMPLE FOR TESTING
    const aggregationQuery = [
      {$match: query},
      {
        $lookup: {
          from: 'TagImages',
          localField: 'text',
          foreignField: 'text',
          as: '_tagImage'
        }
      },
      {
        $lookup: {
          from: 'FileMetas',
          localField: '_tagImage.image',
          foreignField: '_id',
          as: '_file'
        }
      },
      // group by same text and refType and add count
      {
        $group: {
          _id: {
            text: '$text',
            refType: '$refType'
          },
          tagImage: {$first: '$_tagImage'},
          file: {$first: '$_file'},
          totalRefTypeCount: {$sum: 1}
        }
      },
      // after previous grouping, group by same text only and add count
      {
        $group: {
          _id: {text: '$_id.text'},
          totalRefTypeCount: {$sum: '$totalRefTypeCount'},
          tagImage: {$first: '$tagImage'},
          file: {$first: '$file'}
        }
      }
    ];
    let result: any;

    if (
      Boolean(paginateOptions?.limit?.toString()) && // to string as can be 0
      Boolean(paginateOptions?.offset?.toString()) && // to string as can be 0
      Boolean(paginateOptions?.page?.toString()) // to string as can be 0
    ) {
      paginateOptions.sort = '-totalRefTypeCount' || paginateOptions?.sort;
      result = await this.tagRepository.paginate(
        aggregationQuery,
        paginateOptions
      );
      return {
        ...result,
        docs: result.docs.map(tag => ({
          tagImage: tag?.tagImage,
          text: tag?._id?.text,
          count: tag?.totalRefTypeCount,
          file: tag?.file
        }))
      };
    } else {
      result = await this.tagRepository.aggregate(aggregationQuery);
      return result.map(tag => ({
        tagImage: tag?.tagImage,
        text: tag?._id?.text,
        count: tag?.totalRefTypeCount,
        file: tag?.file
      }));
    }
  }
  public getWorkspaceId(): string {
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    return workspaceId;
  }
}
