import {Injectable, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';

import {structurePaths, StructurePath} from '../matchPath';
import {
  PaginateOptionsQueryModel,
  BadRequestException,
  prepareUrl
} from 'src/core';

import {BaseCRUDService} from 'src/core/layers';

import {IPage, IPageModel, Sitemap} from './interfaces';
import {
  PageCreateModel,
  PageUpdateModel,
  PageSearchModel,
  MetaModel
} from './models';
import {WorkspaceService} from 'src/modules/Workspace/workspace.service';

type SitemapFunction = (structuredPath: StructurePath[]) => Promise<Sitemap[]>;

@Injectable()
export class PageService extends BaseCRUDService<
  IPage,
  PageCreateModel,
  PageUpdateModel,
  PageSearchModel
> {
  private sitemapFns: SitemapFunction[] = [];

  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Pages') private readonly pageRepository: IPageModel,
    private readonly workspaceService: WorkspaceService
  ) {
    super(pageRepository, request);
  }

  public _castQuery(searchModel: PageSearchModel) {
    const queryAnd: any = [];
    const locales = this.getLocale().getAvailableLanguages();

    const {
      q,
      searchTerm,
      type,
      isActive,
      isSystem,
      isTemplate,
      workspace,
      isSection,
      isSeo,
      path
    } = searchModel;

    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspace;

    // always pass workspace as query
    queryAnd.push({workspace: workspaceId ? workspaceId : null});

    if (q || (searchTerm && searchTerm !== 'undefined')) {
      queryAnd.push({
        $or: [
          {
            'meta.description': {$regex: q || searchTerm}
          },
          {
            'meta.keywords': {$regex: q || searchTerm}
          },
          {
            path: {$regex: q || searchTerm}
          },
          ...locales?.map(lan => ({
            [`title.${lan}`]: {$regex: q || searchTerm}
          }))
        ]
      });
    }

    if (type) queryAnd.push({type});

    if (isActive || isActive === false) {
      queryAnd.push({isActive});
    }

    if (isSeo || isSeo === false) {
      queryAnd.push({isSeo});
    }

    if (isSystem || isSystem === false) {
      queryAnd.push({isSystem});
    }

    if (isTemplate || isTemplate === false) {
      queryAnd.push({isTemplate});
    }

    if (isSection || isSection === false) {
      queryAnd.push({isSection});
    }

    if (path) {
      queryAnd.push({path});
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  public _castTemplateQuery(searchModel: PageSearchModel) {
    const queryAnd: any = [];
    const {isActive, isTemplate, workspace} = searchModel;

    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspace;

    if (workspaceId) {
      queryAnd.$or = [];
      queryAnd.$or.push({workspace: workspaceId ? workspaceId : null});
    }

    if (isActive || isActive === false) {
      queryAnd.push({isActive});
    }

    if (isTemplate || isTemplate === false) {
      queryAnd.push({isTemplate});
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  async validateModel(
    pageModel: PageCreateModel | PageUpdateModel,
    pageId?: string
  ): Promise<boolean> {
    const {isSection, isTemplate, path} = pageModel;
    // NOTE: conditions that passes
    // isSection=true, isTemplate=false
    // isSection = false, isTemplate = false
    // isSection = false, isTemplate = true

    // NOTE: conditions that fails
    // isSection=true, isTemplate=true
    if (
      isSection ||
      isSection === false ||
      isTemplate ||
      isTemplate === false
    ) {
      let stConflict = false;
      // page cannot be section and template at once
      if (isSection && isTemplate) {
        stConflict = true;
      }
      // in case of update and partial data
      if (pageId) {
        const page = await this.findOne({_ids: [pageId]});
        // if isSection only provided
        if (isSection && page?.isTemplate) {
          stConflict = true;
        }
        // if isTemplate only provided
        if (isTemplate && page?.isSection) {
          stConflict = true;
        }
      }
      if (stConflict) {
        throw new BadRequestException({
          code: 'err_page_not_allowed_section_template'
        });
      }
    }
    // check duplicate path for the same workspace
    if (path) {
      // findOne supports workspace by default
      const pageWithDuplicatePath = await this.findOne({
        path: pageModel?.path
      });
      if (
        (!pageId && pageWithDuplicatePath) ||
        (pageId &&
          pageWithDuplicatePath &&
          pageId !== pageWithDuplicatePath?._id?.toHexString())
      ) {
        throw new BadRequestException({
          code: 'err_duplicated',
          payload: {key: 'page_path'}
        });
      }
    }

    return true;
  }

  public async create(pageModel: PageCreateModel): Promise<IPage> {
    const page: PageCreateModel = {
      ...pageModel
    };
    // NOTE: validate the model data before create
    await this.validateModel(pageModel);

    // workspace information for page meta defaults
    const workspaceId =
      this.getCurrentUser()?.currentWorkspace || this.getHeaderWorkspace();
    const workspace = await this.workspaceService.findById(workspaceId);

    const updatedMeta: MetaModel = {
      ...page.meta,
      description: page?.meta?.description || '',
      version: page?.meta?.version || 0.1,
      'og:url': prepareUrl(
        page?.meta?.['og:url'] ||
          `${workspace?.webHost || process.env.HOST_WEB}${pageModel?.path}`
      ),
      'og:image': page?.meta?.['og:image'] || ''
    };

    return super.create({...page, meta: updatedMeta});
  }

  /**
   * get template= true  isActive= true page
   * @param pageSearchModel
   */
  public async getTemplateWhenCreatePage(
    pageSearchModel: PageSearchModel,
    paginateOptions: PaginateOptionsQueryModel = {}
  ): Promise<IPage> {
    const query = this._castTemplateQuery({
      ...pageSearchModel
    });
    let results = null;
    if (pageSearchModel.paginate) {
      results = await this.pageRepository.paginate(query, paginateOptions);
    } else {
      results = await this.pageRepository
        .find(query)
        .populate({path: 'layout'});
    }
    return results;
  }

  public async addSitemapFn(fn: SitemapFunction) {
    this.sitemapFns.push(fn);
  }

  /**
   *  duplicate page path
   * @param path page path
   * @param workspace_name workspace name
   */
  public async duplicatePath(
    id: string,
    path: string
    // workspaceName: string
  ): Promise<boolean> {
    const conditions: any = {
      $and: []
    };
    conditions.$and.push({path});
    if (id && id !== 'undefined' && id !== 'null') {
      conditions.$and.push({_id: {$ne: id}});
    }
    // if workspace check the path for the given workspace
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    if (workspaceId) {
      conditions.$and.push({workspace: workspaceId});
    }

    const pageResult = await this.pageRepository.findOne(conditions).populate({
      path: 'layout'
    });
    return pageResult ? true : false;
  }

  public async getSitemap() {
    const locale = this.getLocale();
    // _castQuery supports workspace by default
    const query = this._castQuery({
      isActive: true,
      isTemplate: false,
      isSection: false,
      isSeo: false,
      type: 'content'
    });
    const pages = await this.pageRepository
      .find(query)
      .select('_id title meta path')
      .lean();
    const needfetchList = structurePaths(pages.map(p => p.path));
    let sitemap = [];
    for (const page of pages) {
      const {title, path, ...pageRes} = page;
      sitemap.push({
        ...pageRes,
        name: title[locale.getLanguage()],
        to: path,
        path
      });
    }

    sitemap = sitemap.concat(
      await this.sitemapFns.reduce<Promise<Sitemap[]>>(async (arr, fn) => {
        return (await arr).concat(await fn(needfetchList));
      }, Promise.resolve([]))
    );

    return sitemap;
  }

  /**
   * find a page by query
   * @param pageSearchModel PageSearchModel
   */
  public async getPages(
    pageSearchModel: PageSearchModel,
    paginateOptions: PaginateOptionsQueryModel = {}
  ): Promise<any> {
    // cast query supports workspace by default
    const query = this._castQuery({
      ...pageSearchModel
    });
    let results = null;
    if (pageSearchModel.paginate) {
      results = await this.pageRepository.paginate(query, paginateOptions);
    } else {
      results = await this.pageRepository
        .find(query)
        .populate({path: 'layout'});
    }
    return results;
  }

  public async find(pageSearchModel: PageSearchModel): Promise<Array<IPage>> {
    // NOTE: prepares query with workspace by default
    const query = this._castQuery({});
    const documentQuery = this.pageRepository.find(query);
    if (pageSearchModel.isActive) {
      documentQuery.where('isActive').equals(pageSearchModel.isActive);
    }
    if (pageSearchModel.limit) {
      documentQuery.limit(pageSearchModel.limit);
    }
    if (pageSearchModel.offset) {
      documentQuery.skip(pageSearchModel.offset);
    }
    if (pageSearchModel.path) {
      documentQuery.where('path').equals(pageSearchModel.path);
    }
    return documentQuery && documentQuery.populate({path: 'layout'}).exec();
  }

  /**
   * find a page conditions overriden
   * @param conditions
   */
  public async findOne(
    conditions: PageSearchModel | {_id: string}
  ): Promise<IPage> {
    const currentUser = this.getCurrentUser();
    const workspace: string =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    const page = await this.pageRepository.findOne({...conditions, workspace});
    if (!page) {
      // findOne should never throw error just return undefined
      return undefined;
    }
    // return populated value
    return this._populate(page, ['layout']);
  }

  /**
   * update page overriden
   * @param conditions
   */
  public async update(
    pageId: string,
    updateModel: PageUpdateModel
  ): Promise<IPage> {
    // this.findOne supports workspace by default
    const page = await this.findOne({
      _id: pageId
    });
    if (!page) {
      throw new BadRequestException({
        code: 'err_page_not_found'
      });
    }
    // NOTE: validate the model data before update
    await this.validateModel(updateModel, pageId);
    return super.update(page?._id?.toHexString(), updateModel);
  }

  /**
   * find a page by _id
   */
  public async findById(_id: string): Promise<IPage | null> {
    // override findById to use findOne that supports workspace interception
    return this.findOne({_id});
  }

  /**
   * find a page by path
   */
  public async findByPath(
    path: string,
    workspaceId?: string,
    isSeo?: boolean
  ): Promise<IPage | null> {
    let relativeAddress = path || '/';
    if (/^[^/]/.test(relativeAddress)) {
      relativeAddress = `/${relativeAddress}`;
    }
    const currentUser = this.getCurrentUser();
    const workspace =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspaceId;
    const queryAnd = [];
    queryAnd.push({path: relativeAddress});
    queryAnd.push({workspace: workspace});
    if (isSeo || isSeo === false) {
      queryAnd.push({isSeo});
    }
    const page = await this.pageRepository.findOne(
      queryAnd?.length ? {$and: queryAnd} : {}
    );
    if (!page) {
      return undefined;
    }
    // return populated value
    return this._populate(page, ['layout']);
  }

  /**
   * get multiple pages by path list
   * @param paths path list
   */
  public async findByPaths(paths: string[]) {
    // get user and workspace
    const currentUser = this.getCurrentUser();
    const workspace =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

    // transform paths to relative url format
    const relativePaths = paths.map(p => {
      const path = p || '';
      if (/^[^/]/.test(path)) {
        return `/${path}`;
      }

      return path;
    });

    // query from db
    return this.pageRepository
      .find({
        path: {$in: relativePaths},
        workspace: workspace
      })
      .lean()
      .exec();
  }

  /**
   * user a page
   */
  public async updateById(
    _id: string,
    pageUpdateModel: PageUpdateModel
  ): Promise<IPage | null> {
    // overriden update checks the page and workspace
    const updatedPage = await this.update(_id, pageUpdateModel);
    // return populated value
    return updatedPage && this._populate(updatedPage, ['layout']);
  }

  public getWorkspaceId(): string {
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    return workspaceId;
  }
}
