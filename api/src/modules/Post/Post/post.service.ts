// npm
import {Injectable, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import path from 'path';
import moment from 'moment';
import {ObjectId} from 'mongodb';

// core
import {
  MongodbHelper,
  MetaDataModel,
  ForbiddenException,
  NotFoundException,
  BadRequestException
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';
import lib from '@golpasal/lib';
import common from '@golpasal/common';

// models, interfaces
import {IPost, IPostService, IPostModel} from './interfaces';
import {PostCreateModel, PostSearchModel} from './models';

// services
import {IUser} from 'src/modules/User';
import {BlobService} from 'src/modules/File/Blob';
import {TagService} from 'src/modules/Tag/tag.service';
import {FilemetaService} from 'src/modules/File/FileMeta';
import {AWSSQSService} from 'src/modules/Aws/aws.sqs.service';
import {NotificationService} from 'src/modules/Notification/notification.service';

const PostType: any = {};
const {NotificationMediaType} = common.type;

@Injectable()
export class PostService
  extends BaseCRUDService<IPost, PostCreateModel>
  implements IPostService
{
  constructor(
    @InjectModel('Posts') private readonly postRepository: IPostModel,
    private readonly blobService: BlobService,
    private readonly tagService: TagService,
    private readonly fileMetaService: FilemetaService,
    private readonly notificationService: NotificationService,
    private readonly sqsService: AWSSQSService,
    @Inject(REQUEST) request
  ) {
    super(postRepository, request);
  }

  /**
   * cast req.query to where
   * @param query req.query from request
   * @param workspaceId workspace id
   */
  public _castQuery(query: PostSearchModel): object {
    const queryAnd = [];
    const locale = this.getLocale();
    const {
      type,
      searchTerm,
      priority,
      postDate,
      createdAt,
      createdAtFr,
      createdAtTo,
      createdBy,
      workspace,
      isActive,
      excludeIds,
      likes,
      platformTypes
    } = query;

    const utcOffset = this.getUTCOffset();

    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspace;

    if (type) {
      const typeArray = type.split(',');
      queryAnd.push({type: {$in: typeArray}});
    }

    if (Array.isArray(createdBy) && createdBy?.length > 0) {
      queryAnd.push({createdBy: {$in: [createdBy]}});
    }

    if (searchTerm && searchTerm !== 'undefined' && searchTerm !== 'null') {
      const or = [];
      // forward slash all special characters
      const sanitizedQuery = searchTerm.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
      or.push({text: new RegExp(sanitizedQuery, 'i')});
      or.push({
        [`snippets.${locale.getLanguage()}`]: new RegExp(sanitizedQuery, 'i')
      });
      or.push({
        [`content.${locale.getLanguage()}`]: new RegExp(sanitizedQuery, 'i')
      });
      or.push({
        [`title.${locale.getLanguage()}`]: new RegExp(sanitizedQuery, 'i')
      });
      queryAnd.push({$or: or});
    }

    if (priority) {
      queryAnd.push({priority});
    }

    if (Array.isArray(platformTypes) && platformTypes.length > 0) {
      queryAnd.push({
        $or: [
          {platformTypes: {$in: platformTypes}},
          {platformTypes: {$in: [null, []]}}
        ]
      });
    }

    if (postDate) {
      const startTime = postDate.split(',')[0];
      const endTime = postDate.split(',')[1];
      const postDateQuery = MongodbHelper.formatDateQueryRange(
        startTime,
        endTime,
        utcOffset
      );
      if (postDateQuery) {
        queryAnd.push({postDate: postDateQuery});
      }
    }

    if (createdAt) {
      const startTime = createdAt.split(',')[0];
      const endTime = createdAt.split(',')[1];
      const createdAtQuery = MongodbHelper.formatDateQueryRange(
        startTime,
        endTime,
        utcOffset
      );
      if (createdAtQuery) {
        queryAnd.push({createdAt: createdAtQuery});
      }
    }

    if (createdAtFr) {
      // find orders createdAt after createdAtFr
      queryAnd.push({
        createdAt: {
          $gte: moment(createdAtFr)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }

    if (createdAtTo) {
      // find orders createdAt before createdAtTo
      queryAnd.push({
        createdAt: {
          $lte: moment(createdAtTo)
            .utcOffset(utcOffset)
            .endOf('day')
            .toISOString()
        }
      });
    }

    if (isActive || isActive === false) {
      queryAnd.push({isActive});
    }

    if (Array.isArray(excludeIds) && excludeIds?.length > 0) {
      queryAnd.push({_id: {$nin: query.excludeIds}});
    }

    if (Array.isArray(likes) && likes?.length > 0) {
      queryAnd.push({likes: {$in: likes}});
    }
    // query should always have workspace info or the workspace should be null
    queryAnd.push({workspace: new ObjectId(workspaceId) ? workspaceId : null});

    return queryAnd?.length > 0 ? {$and: queryAnd} : {};
  }

  public async findById(_id: string): Promise<IPost> {
    return this.findOne({_id});
  }

  public async findOne(
    query: PostSearchModel & {_id?: string}
  ): Promise<IPost> {
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      query?.workspace;
    // NOTE: conversion required for typescript issue
    const cleanQuery: any = {
      ...query
    };
    return this.postRepository.findOne({...cleanQuery, workspace: workspaceId});
  }

  /**
   * find a post by query
   * @param query req.query
   * @param req req
   */
  public async find(
    query: PostSearchModel = {},
    paginateOptions?: any
  ): Promise<Array<IPost>> {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.findWithPaginate(query);
      // do populates
      result.docs = await this._populate(result.docs, populates || []);
    } else {
      result = await super.find(query, {
        sort: paginateOptions?.sort || '-createdAt',
        lean: true
      });
      // do populates
      result = await this._populate(result, populates || []);
    }

    return result;
  }

  /**
   * create a post
   * @param postCreateModel model for create
   *
   * format for postCreateModel.images in admin
   * {
   *  ...other things in postCreateModel
   *  images: [
   *     {
   *        "uri": "https://youtu.be/SWwTh2vc7Bo"
   *     },
   *     {
   *        "originalName": "name_of_selected_file.jpg"
   *     }
   *  ]
   * }
   */
  public async createPost(
    postCreateModel: PostCreateModel,
    files: Array<any> = []
  ): Promise<IPost> {
    let isVideoPost = false;
    const user = this.getCurrentUser();
    const locale = this.getLocale();
    // eslint-disable-next-line
    const YOUTUBE_REGEX =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;
    // map to model
    postCreateModel = {
      ...postCreateModel,
      workspace: this.getWorkspaceId() || postCreateModel?.workspace,
      type: postCreateModel.type || PostType.BLOG, // default is PostType.BLOG
      createdBy: user?._id?.toHexString(),
      updatedBy: user?._id?.toHexString(),
      queries:
        postCreateModel.queries !== undefined ? postCreateModel.queries : []
    };

    // create FileMeta from post.images
    postCreateModel.images = await Promise.all(
      postCreateModel.images.map(async image => {
        // skip created FileMeta
        const {fileMeta} = image;
        if (fileMeta && typeof fileMeta === 'object' && !fileMeta._id) {
          if (fileMeta.uri) {
            // validate url
            if (
              !(
                YOUTUBE_REGEX.test(fileMeta.uri) ||
                ['.mp4', '.jpg', '.png'].includes(path.extname(fileMeta.uri))
              )
            ) {
              throw new BadRequestException({code: 'err_invalid_url'});
            }
          }

          // create FileMeta
          const newFileMeta = await this.fileMetaService.create(fileMeta);
          return {fileMeta: newFileMeta.toJSON()};
        }
        return image;
      })
    );

    // upload file to cloud
    await Promise.all(
      files.map(async file => {
        // upload destnatio folder based on video/image
        const user = this.getCurrentUser<IUser>();
        const workspace =
          user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
        let folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
        if (file.mimetype.startsWith('video')) {
          isVideoPost = true;
          folder = `${process.env.BLOB_UPLOAD_VIDEO_FOLDER}/${workspace}`;
        }
        // find appropriate FileMeta created above
        const image = postCreateModel.images.find(
          ({fileMeta}) => fileMeta.originalName === file.originalname
        );

        if (image) {
          // upload file and update FileMeta
          await this.blobService.uploadFile(
            file,
            folder,
            [],
            false,
            process.env.BLOB_ENGINE,
            image.fileMeta._id.toString()
          );
        } else {
          // create new fileMeta and push to images
          const fileMeta = await this.blobService.uploadFile(file, folder);
          postCreateModel.images.push({fileMeta});
        }
      })
    );

    // only keep fileMeta._id inside images
    // postCreateModel.images = postCreateModel.images
    //   .map(({fileMeta}) => ({fileMeta: fileMeta._id}));
    postCreateModel.images = postCreateModel.images.map(image => {
      if (typeof image.fileMeta === 'string') {
        return image;
      }
      return {fileMeta: image.fileMeta._id};
    });

    // create post
    const post = await super.create(postCreateModel);
    if (isVideoPost) {
      this.notificationService.push({
        senders: [user._id.toString()],
        toUsers: [{user: user}],
        data: {
          screen: 'PostDetail',
          parameters: {postId: post._id.toString()}
        },
        images: (post && post.images) || [],
        hooks: [],
        body: null,
        title: locale.tAll('msg_create_video'),
        notificationMediaType: NotificationMediaType.MOBILE
      });
    }

    // extra tags from post.content
    let tags = postCreateModel.tags || [];
    const content =
      post.content &&
      (post.content.en || post.content['zh-hk'] || post.content['zh-cn']);
    const tagsFromContent = content.match(/#.*?\S+/g) || [];
    tags = tags.concat(
      tagsFromContent.map(t => {
        const text = t.trim().split('#')[1];
        if (!tags.some(tag => tag.text === text)) return {text};
        return null;
      })
    );
    tags = tags.filter(t => t && t.text);

    const hash = {};
    tags = tags.reduce((preVal, curVal) => {
      hash[curVal.text]
        ? ''
        : (hash[curVal.text] = true && preVal.push(curVal));
      return preVal;
    }, []);

    if (tags?.length) {
      const createTagsPromiseArray = tags.map(tag =>
        this.tagService.create(
          {
            refType: 'Posts',
            ref: post.id,
            text: tag.text,
            workspace: postCreateModel.workspace
          },
          user
        )
      );
      await Promise.all(createTagsPromiseArray);
    }
    return post;
  }

  public async findRelativePosts(
    userId: string,
    type: string = PostType.BLOG
  ): Promise<Array<IPost | null>> {
    // TODO: can be customized right now keeping it simple
    return this.find(
      {createdBy: userId, type, isActive: true},
      {sort: '-createdAt'}
    );
  }

  /**
   *
   * @param uploadFiles need upload files array
   */
  public async uploadFiles(uploadFiles: Array<any>): Promise<any> {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    // upload all files
    const fileMetaIds: string[] = await Promise.all(
      uploadFiles.map(async (file): Promise<string> => {
        const tags = [];
        let folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;

        if (file.mimetype.startsWith('video')) {
          tags.push('video');
          folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
        }

        const fileMeta = await this.blobService.uploadFile(file, folder, tags);
        return String(fileMeta._id);
      })
    );
    return fileMetaIds;
  }

  public async toggleLike(_id: string, userId: string, like?: boolean) {
    // returns post object if found or not throws post not found error
    const post = await this.findOne({_id});
    if (!post) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_post'}
      });
    }
    const userInThelist = post.likes.some(id => id.equals(userId));
    // if it is undefined, if haven’t like -> like now, if liked -> unlike now
    const userLikeAction = like || !userInThelist;

    const postLikes = post?.likes?.map(userId => userId?.toString()) || [];

    let updatedPost: any;
    if (userLikeAction && !userInThelist) {
      updatedPost = await this.update(_id, {likes: [...postLikes, userId]});
    }
    if (!userLikeAction && userInThelist) {
      updatedPost = await this.update(_id, {
        likes: postLikes?.splice(postLikes?.indexOf(userId), 1)
      });
    }
    return updatedPost;
  }

  /**
   * remove image in a post
   */
  public async removeFileByFileMetaId(postId: string, fileMetaId: string) {
    // validate test and fileId
    const post: IPost = await this.findById(postId);
    if (!post) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_post'}
      });
    }
    if (
      post.images.findIndex(image => image.fileMeta.toString() === fileMetaId) <
      -1
    ) {
      throw new ForbiddenException({
        code: 'data__not_match',
        payload: {key1: 'key_post', key2: 'key_file'}
      });
    }
    // remove images
    await this.blobService.delete(fileMetaId, process.env.BLOB_ENGINE);

    // remove fileMetaId from post.images
    const images = post.images.map(image => {
      return {fileMeta: image.fileMeta._id.toString()};
    });
    let index = -1;
    images.forEach((image, i) => {
      if (image.fileMeta === fileMetaId) {
        index = i;
        return;
      }
    });
    if (index > -1) {
      images.splice(index, 1);
    }
    // update post
    return this.updatePost(postId, {images}, []);
  }

  /**
   * update a post
   */
  public async updatePost(
    _id: string,
    model: any,
    files: any
  ): Promise<IPost | null> {
    const user = this.getCurrentUser();
    // eslint-disable-next-line
    const YOUTUBE_REGEX =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;
    // set up where condition of query
    const conditions = {
      $and: []
    } as any;
    conditions.$and.push({_id});

    // find post by this conditions
    const post = await this.findOne(conditions);
    // check post exists
    if (!post) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_post'}
      });
    }

    model.images = await this.uploadPostImages(model.images, files);
    model.updateDate = new Date();
    model.updatedBy = user._id;
    model.workspace = this.getWorkspaceId();

    // update to database and return new version of the doc
    const newPost = await this.postRepository
      .findByIdAndUpdate(_id, model, {new: true})
      .populate({path: 'images.fileMeta'})
      .session(this.getMongoSession())
      .exec();
    const oldTags = await this.tagService.find({
      refTypes: ['Posts'],
      ref: newPost?._id?.toHexString()
    });
    let tags = model?.tags || oldTags || [];
    // delete old tags
    await this.tagService.deleteMany({
      refTypes: ['Posts'],
      ref: post._id.toHexString()
    });
    // extra tags from post.content
    const content =
      newPost.content &&
      (newPost.content.en ||
        newPost.content['zh-hk'] ||
        newPost.content['zh-cn']);
    const tagsFromContent = content.match(/#.*?\S+/g) || [];
    tags = tags.concat(
      tagsFromContent.map(t => {
        const text = t.trim().split('#')[1];
        if (!tags.some(tag => tag.text === text)) return {text};
        return null;
      })
    );
    tags = tags.filter(t => t && t.text);

    const hash = {};
    tags = tags.reduce((preVal, curVal) => {
      hash[curVal.text]
        ? ''
        : (hash[curVal.text] = true && preVal.push(curVal));
      return preVal;
    }, []);

    if (tags?.length) {
      const createTagsPromiseArray = tags.map(tag =>
        this.tagService.create(
          {
            refType: 'Posts',
            ref: post.id,
            text: tag.text,
            workspace: model.workspace
          },
          user
        )
      );
      await Promise.all(createTagsPromiseArray);
    }
    return newPost;
  }

  /**
   * 创建或者更新post时, 上传post file, 返回post.images
   * @param originalImages update之前已经存在的image 或者是创建时选择了media library中的图片
   * @param uploadFiles 选择上传的图片
   */
  private async uploadPostImages(
    originalImages: Array<any>,
    uploadFiles: Array<any>
  ): Promise<Array<any>> {
    let updatedImages = [];
    // eslint-disable-next-line max-len
    const YOUTUBE_REGEX =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;
    // create FileMeta from post.images
    updatedImages = await Promise.all(
      originalImages.map(async image => {
        // skip created FileMeta
        const {fileMeta} = image;
        if (fileMeta && typeof fileMeta === 'object' && !fileMeta._id) {
          if (fileMeta.uri) {
            // validate url
            if (
              !(
                YOUTUBE_REGEX.test(fileMeta.uri) ||
                ['.mp4', '.jpg', '.png'].includes(path.extname(fileMeta.uri))
              )
            ) {
              throw new BadRequestException({code: 'err_invalid_url'});
            }
          }

          // create FileMeta
          const newFileMeta = await this.fileMetaService.create(fileMeta);
          return {fileMeta: newFileMeta.toJSON()};
        }
        return image;
      })
    );

    // upload file to cloud
    await Promise.all(
      uploadFiles.map(async file => {
        const user = this.getCurrentUser<IUser>();
        const workspace =
          user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
        // upload destnatio folder based on video/image
        let folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
        if (file.mimetype.startsWith('video')) {
          folder = `${process.env.BLOB_UPLOAD_VIDEO_FOLDER}/${workspace}`;
        }
        // find appropriate FileMeta created above
        const image = updatedImages.find(
          ({fileMeta}) => fileMeta.originalName === file.originalname
        );

        if (image) {
          // upload file and update FileMeta
          await this.blobService.uploadFile(
            file,
            folder,
            [],
            false,
            process.env.BLOB_ENGINE,
            image.fileMeta._id.toString()
          );
        } else {
          // create new fileMeta and push to images
          const fileMeta = await this.blobService.uploadFile(file, folder);
          updatedImages.push({fileMeta});
        }
      })
    );

    // only keep fileMeta._id inside images
    // eslint-disable-next-line max-len
    // postCreateModel.images = postCreateModel.images.map(({fileMeta}) => ({fileMeta: fileMeta._id}));
    updatedImages = updatedImages.map(image => {
      if (typeof image.fileMeta === 'string') {
        return image;
      }
      return {fileMeta: image.fileMeta._id};
    });
    return updatedImages;
  }

  /**
   * create job for which post not page meta data and put job
   * @param {any} body response body
   */
  public async putJobToUpdateMetadata(): Promise<any> {
    const limit = 100; // default find deals limit 100
    const posts = await this.postRepository
      .aggregate()
      .lookup({
        from: 'Pages',
        localField: '_id',
        foreignField: 'nav.item',
        as: 'page'
      })
      .addFields({pageSize: {$size: '$page'}})
      // keep post that has no page
      .match({pageSize: 0})
      .limit(limit)
      // remove pageSize from result
      .project({pageSize: 0})
      .exec();

    // add jobs to SQS
    return Promise.all(
      posts.map(async post => {
        const baseApiUrl = `${process.env.HOST_API}${
          process.env.HOST_API_USE_PORT === 'true'
            ? ':' + process.env.APP_PORT
            : ''
        }`;
        const messageId = await this.sqsService.sendMessage(
          {},
          {
            method: 'patch',
            url: `${baseApiUrl}/posts/${post._id}/update-metadata`
          },
          // random delay time
          Math.floor(Math.random() * 5)
        );

        return messageId;
      })
    );
  }

  /**
   * get page meta data by post
   * @param {any} post post object which lookuped page
   */
  public getMetaDataByPost(post: any): MetaDataModel {
    const description = post.description;
    const keywords =
      typeof post.title === 'string'
        ? post.title
        : post.title.en + post.title['zh-hk'] + post.title['zh-cn'];
    let ogImage = '';
    const ogUrl = `${process.env.HOST_WEB}/posts/${post._id}`;
    if (!ObjectId.isValid(post?.images?.[0]?.fileMeta)) {
      ogImage =
        post.images?.[0]?.fileMeta?.thumbnailUri ||
        post.images?.[0]?.fileMeta?.uri;
    } else if (post.fileMetas && post.fileMetas[0]) {
      ogImage = post.fileMetas[0].thumbnailUri || post.fileMetas[0].uri;
    }
    // if post page and post page meta exist, also
    // need update page meta version, default is 1
    if (post?.page?.meta) {
      return {
        description,
        keywords,
        'og:image': ogImage,
        'og:url': ogUrl,
        version: post.page.meta.version ? post.page.meta.version + 1 : 1
      };
    } else {
      return {
        description,
        keywords,
        'og:image': ogImage,
        'og:url': ogUrl,
        version: 1
      };
    }
  }

  public getWorkspaceId(): string {
    const currentUser = this.getCurrentUser();
    return (
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace()
    );
  }

  // NOTE: overwrites to intercept and support workspace
  public async findWithCursorPaginate(query: PostSearchModel, paginate?: any) {
    const workspaceId = this.getWorkspaceId();
    return super.findWithCursorPaginate(
      {...query, workspace: workspaceId},
      paginate
    );
  }
}
