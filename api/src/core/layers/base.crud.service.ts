import {ObjectId} from 'mongodb';
import {
  ClientSession,
  PaginateResult,
  Model as MongooseModel,
  Document as MongooseDocument,
  PaginateModel as MongoosePaginateModel,
  CursorPaginateOptions
} from 'mongoose';
import {Request} from 'express';

import {BaseService} from './base.service';
import {extractPaginateOptions} from '../database';
import {
  MongooseOption,
  MongooseInsertManyOption,
  MongooseUpdateOption
} from '../interfaces';

import {Locale} from '../locale/locale';

type RESTOrGraphQLRequest = Request & {req: any};

type TransactionOptions = {commit?: boolean};

export class BaseCRUDService<
  _Document extends MongooseDocument,
  CreateModel = {},
  UpdateModel = {},
  SearchModel = {}
> extends BaseService<_Document> {
  // RESTful request or GraphQL context
  private _request: any;

  constructor(
    protected repository:
      | MongooseModel<_Document>
      | MongoosePaginateModel<_Document>,
    request?: RESTOrGraphQLRequest
  ) {
    super(repository);

    this._request = request?.req
      ? // GraphQL request
        request.req
      : // RESTful request
        request;
  }

  /**
   * get current user
   */
  protected getCurrentUser<T = any>(): T {
    return this._request?.user ? (this._request.user as T) : undefined;
  }

  /**
   * get current worksapce of user
   */
  protected getCurrentWorkspace<T = any>(): T {
    return this._request?.workspace;
  }

  protected getHeaderWorkspace<T = any>(): T {
    return this._request?.headers?.workspace;
  }

  /**
   * get client side's device ID from header
   */
  protected getDeviceId() {
    return this._request?.header('deviceId') || '';
  }

  /**
   * get client side's locale from request object
   */
  protected getLocale(): Locale {
    return this._request?.locale;
  }

  /**
   * get mongoSession from request object
   */
  protected getMongoSession(): ClientSession {
    return this._request?.mongoSession;
  }

  protected async commitTransaction(): Promise<void> {
    const session = await this.getMongoSession();
    // not using transaction, skip commit
    if (!session) return;

    // commit current transaction
    await session.commitTransaction();

    // start new transaction
    session.startTransaction();
  }

  /**
   * get client side's UTC offset from header
   */
  protected getUTCOffset(defaultOffset = 0) {
    return parseInt(this._request?.header('utcOffset'), 10) || defaultOffset;
  }

  /**
   * whether repository is PaginateModel or Model
   * @param _repository this.reposotory
   */
  protected isPaginateModel(
    _repository:
      | MongooseModel<MongooseDocument>
      | MongoosePaginateModel<MongooseDocument>
  ): _repository is MongoosePaginateModel<MongooseDocument> {
    return 'paginate' in _repository;
  }

  /**
   * create document
   * @param doc new document (single doc)
   * @param options query options (i.e. lean)
   */
  public async create(
    doc: CreateModel,
    options: MongooseOption & TransactionOptions = {}
  ): Promise<_Document> {
    // get mongoDB transaction session
    const session = this.getMongoSession();
    const results = await this.repository.create([doc] as any, {session});

    if (options.commit) {
      await this.commitTransaction();
    }

    return options.lean ? results[0] : results[0];
  }

  /**
   * batch create documents
   * @param docs new documents
   * @param options query options (i.e. lean)
   */
  public async insertMany(
    docs: CreateModel[],
    options: MongooseOption & MongooseInsertManyOption & TransactionOptions = {}
  ): Promise<_Document[]> {
    const {session: _session, lean, ...rest} = options;

    // get mongoDB transaction session
    const session = _session || this.getMongoSession();
    // batch insert odcs
    const results = await this.repository.insertMany(docs, {session, ...rest});

    if (options.commit) {
      await this.commitTransaction();
    }

    if (lean) {
      return results;
    }
    return results;
  }

  /**
   * make changes to a existing document
   * @param _id document id
   * @param updateModel updater
   * @param options query options (i.e. lean)
   */
  public async update(
    _id: string | ObjectId,
    updateModel: UpdateModel,
    options: MongooseOption & MongooseUpdateOption & TransactionOptions = {}
  ): Promise<_Document> {
    const {session: _session, lean, ...rest} = options;

    // get mongoDB transaction session
    const session = _session || this.getMongoSession();

    let query = this.repository
      .findByIdAndUpdate(_id, updateModel, {new: true, ...rest})
      .session(session);

    if (options.commit) {
      await this.commitTransaction();
    }

    if (lean) {
      query = query.lean();
    }

    return query.exec();
  }

  /**
   * update more than one document at the same time and return changes
   *
   * @param conditions mongodb query
   * @param doc updates
   * @param options query options (i.e. lean)
   */
  public async updateMany(
    conditions: any,
    doc: any,
    options: MongooseOption & TransactionOptions = {}
  ): Promise<Array<_Document>> {
    // get mongoDB transaction session
    const session = options.session || this.getMongoSession();

    // step 1: record affected docs' _id
    let affectedDocs: any[] = await this.repository
      .find(conditions)
      .session(session)
      .exec();
    affectedDocs = affectedDocs.map(({_id}) => _id);

    // step 2: exec updateMany
    await this.repository.updateMany(conditions, doc).session(session).exec();

    // step 3: return updated docs
    let query = this.repository
      .find({_id: {$in: affectedDocs}} as any)
      .session(session);

    // step 4: if require commit, commit transaction
    if (options.commit) {
      await this.commitTransaction();
    }

    if (options.lean) {
      query = query.lean();
    }

    return query.exec();
  }

  public async countDocuments(searchModel: SearchModel) {
    // cast query before search
    const conditions = await this._castQuery(searchModel);

    // initialize db query
    return this.repository.countDocuments(conditions).exec();
  }

  /**
   * delete a document from database
   * @param _id document id
   */
  public async delete(
    _id: string | ObjectId,
    options: MongooseOption & TransactionOptions = {}
  ): Promise<_Document> {
    // get mongoDB transaction session
    const session = options.session || this.getMongoSession();

    const result = await this.repository
      .findByIdAndDelete(_id)
      .session(session)
      .exec();

    if (options.commit) {
      await this.commitTransaction();
    }

    return result;
  }

  /**
   * delete multiple documents based on searchModel
   * @param searchModel db query
   */
  public async deleteMany(
    searchModel: SearchModel,
    options: MongooseOption & TransactionOptions = {}
  ) {
    // get mongoDB transaction session
    const session = options.session || this.getMongoSession();
    // cast query before search
    const conditions = await this._castQuery(searchModel);

    await this.repository.deleteMany(conditions, {session}).exec();

    if (options.commit) {
      await this.commitTransaction();
    }
  }

  /**
   * find document by id
   * @param _id document id
   * @param options query options like lean, session
   */
  public async findById(
    _id: string | ObjectId,
    options: MongooseOption = {}
  ): Promise<_Document> {
    let query = this.repository.findById(_id);

    if (options.session) {
      query = query.session(options.session);
    }
    if (options.populates?.length > 0) {
      for (const p of options.populates) {
        query = query.populate(p);
      }
    }
    if (options.lean) {
      query = query.lean();
    }

    return query.exec();
  }

  /**
   * find docouments by query
   * @param query db query
   * @param options query options like lean, limit, sort
   */
  public async find(
    searchModel: SearchModel,
    options: MongooseOption = {}
  ): Promise<_Document[]> {
    // cast query before search
    const conditions = await this._castQuery(searchModel);

    // initialize db query
    let query = this.repository.find(conditions);

    if (options.session) {
      query = query.session(options.session);
    }
    if (options.populates?.length > 0) {
      for (const p of options.populates) {
        query = query.populate(p);
      }
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.select) {
      query = query.select(options.select);
    }
    if (options.sort) {
      query = query.sort(options.sort);
    }
    if (options.lean) {
      query = query.lean();
    }

    // execute query and return result
    return query.exec();
  }

  /**
   * find docoument by query
   * @param searchModel db query
   * @param optionsquery options like lean, limit, sort, session
   *  (only lean and session applied here)
   */
  public async findOne(
    searchModel: SearchModel,
    options: MongooseOption = {}
  ): Promise<_Document> {
    const conditions = await this._castQuery(searchModel);

    // initialize db query
    let query = this.repository.findOne(conditions);

    // handle options
    if (options.session) {
      query = query.session(options.session);
    }
    if (options.populates?.length > 0) {
      for (const p of options.populates) {
        query = query.populate(p);
      }
    }
    if (options.sort) {
      query = query.sort(options.sort);
    }
    if (options.lean) {
      query = query.lean();
    }

    return query.exec();
  }

  public async findWithPaginate(
    query: SearchModel
  ): Promise<PaginateResult<_Document>> {
    const _repo = this.repository;

    if (this.isPaginateModel(_repo)) {
      const where = await this._castQuery(query);
      const paginateOptions = extractPaginateOptions(query);

      return _repo.paginate(where, paginateOptions);
    }

    throw new Error('NOT paginate model');
  }

  public async findWithCursorPaginate(
    searchModel: SearchModel,
    paginationOptions: CursorPaginateOptions
  ) {
    const _repo = this.repository;

    if (this.isPaginateModel(_repo)) {
      const query = await this._castQuery(searchModel);

      return _repo.cursorPaginate(query, paginationOptions);
    }

    throw new Error('NOT paginate model');
  }

  public _castQuery(query: SearchModel): any {
    throw new Error('should be overwritten');
  }
}
