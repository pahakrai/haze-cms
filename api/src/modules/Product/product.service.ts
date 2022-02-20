import {Injectable, Scope, Inject, BadRequestException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import commonEcomm from '@golpasal/common';
import moment from 'moment';
import {ObjectId} from 'mongodb';
import {CursorPaginateOptions, Types} from 'mongoose';

import {BaseCRUDService} from 'src/core/layers';
import {NotFoundException, extractPaginateOptions} from 'src/core';

// interfaces & models
import {
  ProductCreateModel,
  ProductUpdateModel,
  ProductSearchModel,
  ProductFormUpdateModel,
  ProductFormCreateModel
} from './models';
import {IProductModel, Product} from './interfaces';

// services
import {DataMappingService} from '../DataMapping/dataMapping.service';
import {ProductSkuService} from './submodules/ProductSku/productSku.service';
import {ProductSpecService} from './submodules/ProductSpec/productSpec.service';
import {BlobService} from '../File/Blob';
import {IUser} from '../User';
import {TagService} from '../Tag/tag.service';
import {TagImageService} from '../TagImage/tagImage.service';
const {ProductStatus} = commonEcomm.status;

const SKU_PROJECT = '_SKU_PROJECT';
const TAG_PROJECT = '_tag';

@Injectable({scope: Scope.REQUEST})
export class ProductService extends BaseCRUDService<
  Product,
  ProductCreateModel,
  ProductUpdateModel,
  ProductSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Products')
    private readonly productRepository: IProductModel,
    private readonly blobService: BlobService,
    private readonly dataMappingService: DataMappingService,
    private readonly productSkuService: ProductSkuService,
    private readonly productSpecService: ProductSpecService,
    private readonly tagService: TagService,
    private readonly tagImageService: TagImageService
  ) {
    super(productRepository, request);
    this._addCustomPopulate('price', async (doc: any) => {
      const price = await this.productSkuService.findOne({
        product: doc._id.toHexString(),
        idx: 2
      });
      return {...(doc.toObject?.() || doc), price};
    });
  }

  public _castQuery(searchModel: ProductSearchModel) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    const query: any = {$and: []};
    const {
      _ids,
      q,
      category,
      categories,
      priceFr,
      priceTo,
      platformTypes,
      statuses,
      productExpiryDateFr,
      productExpiryDateTo,
      productionDateFr,
      productionDateTo
    } = searchModel;

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }

    if (q) {
      const qReg = new RegExp(q, 'i');
      const $or = [
        {
          'name.en': qReg
        },
        {
          'name.zh-hk': qReg
        },
        {
          'name.zh-cn': qReg
        },
        {
          'content.en': qReg
        },
        {
          'content.zh-hk': qReg
        },
        {
          'content.zh-cn': qReg
        },
        {
          'description.en': qReg
        },
        {
          'description.zh-hk': qReg
        },
        {
          'description.zh-cn': qReg
        }
      ];
      query.$and.push({$or});
    }

    // always pass workspace as query
    query.$and.push({
      workspace: new ObjectId(workspace) || null
    });

    if (category) {
      query.$and.push({_category: category});
    }

    if (Array.isArray(categories) && categories.length > 0) {
      query.$and.push({_category: {$in: categories}});
    }

    if (platformTypes) {
      query.$and.push({platformTypes: {$in: platformTypes}});
    }

    if (Array.isArray(_ids) && _ids.length > 0) {
      query.$and.push({_id: {$in: _ids}});
    }

    if (Array.isArray(statuses) && statuses.length > 0) {
      query.$and.push({status: {$in: statuses}});
    }

    if (priceFr && priceTo) {
      query.$and.push(
        {'priceRange.min': {$gte: priceFr}},
        {'priceRange.max': {$lte: priceTo}}
      );
    } else {
      const $or = [];
      // if only choose price min
      if (priceFr) {
        $or.push({'priceRange.min': {$gte: priceFr}});
      }
      // if only choose price max
      if (priceTo) {
        $or.push({'priceRange.max': {$lte: priceTo}});
      }
      if ($or.length > 0) {
        query.$and.push({$or});
      }
    }

    const utcOffset = this.getUTCOffset();
    if (productExpiryDateFr) {
      query.$and.push({
        productExpiryDate: {
          $gte: moment(productExpiryDateFr)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }
    if (productExpiryDateTo) {
      query.$and.push({
        productExpiryDate: {
          $lte: moment(productExpiryDateTo)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }
    if (productionDateFr) {
      query.$and.push({
        productionDate: {
          $gte: moment(productionDateFr)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }
    if (productionDateTo) {
      query.$and.push({
        productionDate: {
          $lte: moment(productionDateTo)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }

    if (!query.$and.length) delete query.$and;
    return query;
  }

  public _lookupQuery(searchModel: ProductSearchModel) {
    const queryAnd = this._castQuery(searchModel);
    if (!queryAnd?.$and.length) {
      queryAnd.$and = [];
    }
    const {tag, expiryDateGte, expiryDateLte, tags, placeOfOrigin} =
      searchModel;

    if (tag) {
      const tagReg = new RegExp(tag, 'i');
      queryAnd.$and.push({
        $or: [
          ...(ObjectId.isValid(tag)
            ? [{[`${TAG_PROJECT}._id`]: new ObjectId(tag)}]
            : []),
          {[`${TAG_PROJECT}.text`]: tagReg}
        ]
      });
    }

    if (Array.isArray(tags) && tags.length > 0) {
      queryAnd.$and.push({
        [`${TAG_PROJECT}.text`]: {$in: tags}
      });
    }

    const utcOffset = this.getUTCOffset();
    if (expiryDateGte) {
      queryAnd.$and.push({
        [`${SKU_PROJECT}.expiryDate`]: {
          $gte: moment(expiryDateGte)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }
    if (expiryDateLte) {
      queryAnd.$and.push({
        [`${SKU_PROJECT}.expiryDate`]: {
          $lte: moment(expiryDateLte)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }

    if (!queryAnd.$and.length) delete queryAnd.$and;
    return queryAnd;
  }

  /**
   * find products by query
   * @param productSearchModel ProductSearchModel
   */
  public async getProducts(
    productSearchModel: ProductSearchModel
  ): Promise<any> {
    const query = this._lookupQuery(productSearchModel);
    let result = null;
    const paginateOptions = extractPaginateOptions(productSearchModel);
    if (productSearchModel.paginate) {
      result = await this.productRepository.paginate(
        [
          {
            $lookup: {
              from: 'ProductSkus',
              localField: '_id',
              foreignField: 'product',
              as: `${SKU_PROJECT}`
            }
          },
          {
            $lookup: {
              from: 'Tags',
              localField: '_id',
              foreignField: 'ref',
              as: `${TAG_PROJECT}`
            }
          },
          {
            $match: {
              ...query
            }
          }
        ],
        paginateOptions
      );
    } else {
      result = await this.productRepository
        .aggregate()
        .lookup({
          from: 'ProductSkus',
          localField: '_id',
          foreignField: 'product',
          as: `${SKU_PROJECT}`
        })
        .lookup({
          from: 'Tags',
          localField: '_id',
          foreignField: 'ref',
          as: `${TAG_PROJECT}`
        })
        .match(query)
        .exec();
    }
    return result;
  }

  /**
   * create product, specs and SKUs from admin's product form
   *
   * @param formModel admin's product form
   * @param files uploaded files
   */
  public async createProductWithSKU(
    formModel: ProductFormCreateModel,
    files: Express.Multer.File[]
  ) {
    // get current user
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    // identify product and SKU files
    const productFiles = files.filter(
      // product file fieldname is `product_files`
      ({fieldname}) => fieldname === 'product_files'
    );

    const productMediaList1 = files.filter(
      //  product media fieldname is ''product_medias'
      ({fieldname}) =>
        fieldname.startsWith('mediaList1_') && fieldname.endsWith('_file')
    );

    const productMediaList2 = files.filter(
      ({fieldname}) =>
        fieldname.startsWith('mediaList2_') && fieldname.endsWith('_file')
    );

    const productMediaList3 = files.filter(
      ({fieldname}) =>
        fieldname.startsWith('mediaList3_') && fieldname.endsWith('_file')
    );

    const skuFiles = files.filter(
      ({fieldname}) =>
        // sku file fieldname is `sku_{sku._id}_file`
        fieldname.startsWith('sku_') && fieldname.endsWith('_file')
    );
    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;

    // upload product file
    const productFileMetas = await this.blobService.uploadFiles(
      productFiles,
      folder
    );

    // upload product mediaList1
    const productMediasList1 = await this.blobService.uploadFiles(
      productMediaList1,
      folder
    );

    // upload product mediaList2
    const productMediasList2 = await this.blobService.uploadFiles(
      productMediaList2,
      folder
    );

    // upload product mediaList3
    const productMediasList3 = await this.blobService.uploadFiles(
      productMediaList3,
      folder
    );

    // get lowest/highest price from skus
    const prices = formModel.skus.map(sku => sku.discountAmount || sku.amount);

    // build up product mediaList1
    const mediaList1 = [];
    if (formModel.product.mediaList1) {
      formModel.product.mediaList1?.map(m => {
        const media = productMediaList1.find(file =>
          file.fieldname.includes(m._id)
        );
        const uploadMedia = productMediasList1.find(
          fileMeta => fileMeta.originalName === media?.originalname
        );
        const mediaModel = {
          image: m.image || (uploadMedia?._id as ObjectId).toString() || null,
          description: m.description
        };
        mediaList1.push(mediaModel);
      });
    } else {
      productMediasList1.length > 0
        ? productMediasList1.map(file => {
            const mediaModel = {
              image: (file?._id as ObjectId).toString() || null,
              description: null
            };
            mediaList1.push(mediaModel);
          })
        : null;
    }

    // build up product mediaList2
    const mediaList2 = [];
    if (formModel.product.mediaList2) {
      formModel.product.mediaList2?.map(m => {
        const media = productMediaList2.find(file =>
          file.fieldname.includes(m._id)
        );
        const uploadMedia = productMediasList2.find(
          fileMeta => fileMeta.originalName === media?.originalname
        );
        const mediaModel = {
          image: m.image || (uploadMedia?._id as ObjectId).toString() || null,
          description: m.description
        };
        mediaList2.push(mediaModel);
      });
    } else {
      productMediasList2.length > 0
        ? productMediasList2.map(file => {
            const mediaModel = {
              image: (file?._id as ObjectId).toString() || null,
              description: null
            };
            mediaList2.push(mediaModel);
          })
        : null;
    }

    // build up product mediaList3
    const mediaList3 = [];
    if (formModel.product.mediaList3) {
      formModel.product.mediaList3?.map(m => {
        const media = productMediaList3.find(file =>
          file.fieldname.includes(m._id)
        );
        const uploadMedia = productMediasList3.find(
          fileMeta => fileMeta.originalName === media?.originalname
        );
        const mediaModel = {
          image: m.image || (uploadMedia?._id as ObjectId).toString() || null,
          description: m.description
        };
        mediaList3.push(mediaModel);
      });
    } else {
      productMediasList3.length > 0
        ? productMediasList3.map(file => {
            const mediaModel = {
              image: (file?._id as ObjectId).toString() || null,
              description: null
            };
            mediaList3.push(mediaModel);
          })
        : null;
    }

    const product = await this.create(
      {
        ...formModel.product,
        workspace: user.currentWorkspace.toHexString(),
        images: [
          ...(formModel.product.images ? formModel.product.images : []),
          ...productFileMetas?.map(({_id}: {_id: ObjectId}) => _id.toString())
        ],
        mediaList1: mediaList1,
        mediaList2: mediaList2,
        mediaList3: mediaList3,
        // set min/max price
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        }
      },
      {lean: true}
    );

    // create tags
    const tags = formModel.product.tags || [];
    if (tags.length > 0) {
      await this.createOrderUpdateTags(
        product._id,
        tags,
        user.currentWorkspace.toHexString()
      );
    }

    // create spec
    const productSpecs = await this.productSpecService.insertMany(
      formModel.specs.map(spec => ({
        ...spec,
        product: product._id.toHexString()
      })),
      {lean: true}
    );

    // upload sku files
    const skuFileMetas = await this.blobService.uploadFiles(skuFiles, folder);

    // create sku
    const productSKUs = await this.productSkuService.insertMany(
      formModel.skus.map(sku => {
        const skuFile = skuFiles.find(file => file.fieldname.includes(sku._id));
        const uploadedImage = skuFileMetas.find(
          fileMeta => fileMeta.originalName === skuFile?.originalname
        );

        return {
          ...sku,
          product: product._id.toHexString(),
          image:
            sku.image || (uploadedImage?._id as ObjectId).toString() || null
        };
      }),
      {lean: true}
    );

    return {product, specs: productSpecs, skus: productSKUs};
  }

  // Override
  public async findById(_id: string | ObjectId) {
    const user = this.getCurrentUser();

    // TODO: may user.currentWorkspace high than header
    const workspace =
      user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

    return this.productRepository.findOne({
      _id,
      workspace
    });
  }

  public async getProductByIdAndPlatformTypes(
    _id: string | Types.ObjectId,
    platformTypes: string[]
  ) {
    const user = this.getCurrentUser();
    // TODO: may user.currentWorkspace high than header
    const workspace =
      user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

    return this.productRepository.findOne({
      _id,
      workspace,
      platformTypes: {$in: platformTypes}
    });
  }

  public async findProductsByTag(
    query: ProductSearchModel,
    options: CursorPaginateOptions
  ) {
    const _query = this._lookupQuery(query);
    return this.productRepository.cursorPaginate(
      [
        {
          $lookup: {
            from: 'Tags',
            localField: '_id',
            foreignField: 'ref',
            as: `${TAG_PROJECT}`
          }
        },
        {
          $unwind: `$${TAG_PROJECT}`
        },
        {$match: _query}
      ],
      options
    );
  }

  public async findProductByMayLike(
    searchModel: ProductSearchModel,
    options: CursorPaginateOptions
  ) {
    const _query = this._lookupQuery(searchModel);
    const user = this.getCurrentUser<IUser>();
    _query.$and.push({'_members.user': user._id});
    return this.productRepository.cursorPaginate(
      [
        {
          $lookup: {
            from: 'Categories',
            localField: '_category',
            foreignField: 'code',
            as: '_categories'
          }
        },
        {
          $lookup: {
            from: 'Members',
            localField: '_categories._id',
            foreignField: 'preferences.categories',
            as: '_members'
          }
        },
        {
          $match: _query
        }
      ],
      options
    );
  }

  /**
   * update product, specs and SKUs from admin's product form
   *
   * @param formModel admin's product form
   * @param files uploaded files
   */
  public async updateProductWithSKU(
    _id: string,
    formModel: ProductFormUpdateModel,
    files: Express.Multer.File[]
  ) {
    // get current user
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    // identify product and SKU files
    const productFiles = files.filter(
      // product file fieldname is `product_files`
      ({fieldname}) => fieldname === 'product_files'
    );

    // get mediaList1 files
    const productMediaList1 = files.filter(
      //  product media fieldname is ''product_medias'
      ({fieldname}) =>
        fieldname.startsWith('mediaList1_') && fieldname.endsWith('_file')
    );

    //get mediaList2 files
    const productMediaList2 = files.filter(
      ({fieldname}) =>
        fieldname.startsWith('mediaList2_') && fieldname.endsWith('_file')
    );

    //get mediaList3 files
    const productMediaList3 = files.filter(
      ({fieldname}) =>
        fieldname.startsWith('mediaList3_') && fieldname.endsWith('_file')
    );

    const skuFiles = files.filter(
      ({fieldname}) =>
        // sku file fieldname is `sku_{sku._id}_file`
        fieldname.startsWith('sku_') && fieldname.endsWith('_file')
    );

    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;

    // upload product file
    const productFileMetas = await this.blobService.uploadFiles(
      productFiles,
      folder
    );

    // upload product mediaList1 file
    const productMediasList1 = await this.blobService.uploadFiles(
      productMediaList1,
      folder
    );

    // upload product mediaList2 file
    const productMediasList2 = await this.blobService.uploadFiles(
      productMediaList2,
      folder
    );

    // upload product mediaList2 file
    const productMediasList3 = await this.blobService.uploadFiles(
      productMediaList3,
      folder
    );

    // get lowest/highest price from skus
    const prices = formModel.skus.map(sku => sku.discountAmount || sku.amount);

    // build up product mediaList1
    const mediaList1 = [];
    if (formModel.product.mediaList1) {
      formModel.product.mediaList1?.map(m => {
        const media = productMediaList1.find(file =>
          file.fieldname.includes(m._id)
        );
        const uploadMedia = productMediasList1.find(
          fileMeta => fileMeta.originalName === media?.originalname
        );
        const mediaModel = {
          image: m.image || (uploadMedia?._id as ObjectId).toString() || null,
          description: m.description
        };
        mediaList1.push(mediaModel);
      });
    } else {
      productMediasList1.length > 0
        ? productMediasList1.map(file => {
            const mediaModel = {
              image: (file?._id as ObjectId).toString() || null,
              description: null
            };
            mediaList1.push(mediaModel);
          })
        : null;
    }
    // build up product mediaList2
    const mediaList2 = [];
    if (formModel.product.mediaList2) {
      formModel.product.mediaList2?.map(m => {
        const media = productMediaList2.find(file =>
          file.fieldname.includes(m._id)
        );
        const uploadMedia = productMediasList2.find(
          fileMeta => fileMeta.originalName === media?.originalname
        );
        const mediaModel = {
          image: m.image || (uploadMedia?._id as ObjectId).toString() || null,
          description: m.description
        };
        mediaList2.push(mediaModel);
      });
    } else {
      productMediasList2.length > 0
        ? productMediasList2.map(file => {
            const mediaModel = {
              image: (file?._id as ObjectId).toString() || null,
              description: null
            };
            mediaList2.push(mediaModel);
          })
        : null;
    }

    // build up product mediaList3
    const mediaList3 = [];
    if (formModel.product.mediaList3) {
      formModel.product.mediaList3?.map(m => {
        const media = productMediaList3.find(file =>
          file.fieldname.includes(m._id)
        );
        const uploadMedia = productMediasList3.find(
          fileMeta => fileMeta.originalName === media?.originalname
        );
        const mediaModel = {
          image: m.image || (uploadMedia?._id as ObjectId).toString() || null,
          description: m.description
        };
        mediaList3.push(mediaModel);
      });
    } else {
      productMediasList3.length > 0
        ? productMediasList3.map(file => {
            const mediaModel = {
              image: (file?._id as ObjectId).toString() || null,
              description: null
            };
            mediaList3.push(mediaModel);
          })
        : null;
    }

    const product = await this.update(
      _id,
      {
        ...formModel.product,
        // ensure workspace unchanged by input
        workspace: user.currentWorkspace.toHexString(),
        // merge existing images and new uploaded images
        images: [
          ...(formModel.product.images ? formModel.product.images : []),
          ...productFileMetas?.map(({_id}: {_id: ObjectId}) => _id.toString())
        ],
        mediaList1: mediaList1,
        mediaList2: mediaList2,
        mediaList3: mediaList3,
        // set min/max price
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        }
      },
      {lean: true}
    );

    const tags = formModel.product?.tags;
    if (Array.isArray(tags)) {
      await this.createOrderUpdateTags(
        product._id,
        tags,
        user.currentWorkspace.toHexString()
      );
    }

    // delete existing specs
    await this.productSpecService.deleteMany({product: _id});

    // re-create spec
    const productSpecs = await this.productSpecService.insertMany(
      formModel.specs.map(spec => ({
        ...spec,
        product: product._id.toHexString()
      })),
      {lean: true}
    );

    // upload SKU files
    const skuFileMetas = await this.blobService.uploadFiles(skuFiles, folder);

    // delete existing SKUs
    await this.productSkuService.deleteMany({product: _id});

    // re-create sku
    const productSKUs = await this.productSkuService.insertMany(
      formModel.skus.map(sku => {
        const skuFile = skuFiles.find(file => file.fieldname.includes(sku._id));
        const uploadedImage = skuFileMetas.find(
          fileMeta => fileMeta.originalName === skuFile?.originalname
        );

        return {
          ...sku,
          product: product._id.toHexString(),
          image:
            sku.image || (uploadedImage?._id as ObjectId).toString() || null
        };
      })
    );

    return {product, specs: productSpecs, skus: productSKUs};
  }

  /**
   * update product status
   * @param _id         product id
   * @param status      target status
   */
  public async updateStatus(_id: string, status: number) {
    if (Number(status) === ProductStatus.ACTIVE) {
      const productSku = await this.productSkuService.findOne({product: _id});
      if (!productSku)
        throw new NotFoundException({
          message: 'if change to active,product sku should be at least 1'
        });
    }
    return super.update(_id, {status: status});
  }

  /**
   * create  or update tags from products
   * @param _id         product id
   * @param tags        tags
   * @param workspace   workspace
   */
  public async createOrderUpdateTags(_id, tags, workspace) {
    const dbTags = await this.tagService.find({
      refTypes: ['Products'],
      ref: _id
    });
    const dbTagTexts = dbTags.map(dt => dt.text);
    let newTags = [];
    let delTags = [];
    if (dbTagTexts.length <= tags.length) {
      newTags = tags.filter(t => dbTagTexts.indexOf(t) === -1);
      delTags = dbTagTexts.filter(d => tags.indexOf(d) === -1);
    } else {
      delTags = dbTagTexts.filter(d => tags.indexOf(d) === -1);
    }
    for (const d of delTags) {
      const tag = await this.tagService.find({text: d, workspace: workspace});
      // if the tag is last one, need to delete tag image
      if (tag.length === 1) {
        await this.tagImageService.deleteMany({text: d, workspace: workspace});
      }
      const tags = dbTags.filter(t => t.text === d);
      for (const tag of tags) {
        await this.tagService.delete(tag._id);
      }
    }

    const tagsCreateList = [];
    if (newTags.length > 0) {
      for (let i = 0; i < newTags.length; i++) {
        const tagCreateModel = {
          ref: _id,
          refType: 'Products',
          text: newTags[i],
          workspace
        };
        tagsCreateList.push(tagCreateModel);
      }
      await this.tagService.insertMany(tagsCreateList);
    }
  }

  /**
   * import product by excel
   * @param files
   */
  public async importProducts(files: Express.Multer.File[]) {
    try {
      const user = this.getCurrentUser();

      // TODO: may user.currentWorkspace high than header
      const workspace =
        user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

      // excel data
      const datas = await this.dataMappingService.importDataMappingsFromExcel(
        files[0]
      );
      const createModels = [];
      const map = {};
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        if (!map[data.code]) {
          const formModel: any = {};
          formModel.code = data.code;
          formModel.product = {
            _id: new ObjectId(),
            name: {
              en: data.name_en,
              'zh-cn': data.name_zhcn,
              'zh-hk': data.name_zhhk
            },
            content: {
              en: data.content_en,
              'zh-cn': data.content_zhcn,
              'zh-hk': data.content_zhhk
            },
            description: {
              en: data.description_en,
              'zh-cn': data.description_zhcn,
              'zh-hk': data.description_zhhk
            },
            _category: data.category,
            platformTypes: data.platformTypes.split(','),
            workspace: workspace,
            status: ProductStatus.DRAFT
          };
          // all specs Names
          const specsName = JSON.parse(data.Attribute_Name);
          formModel.specs = [];
          // new specs
          for (const spec of specsName) {
            formModel.specs.push({
              _id: new ObjectId(),
              product: formModel.product._id,
              name: {
                en: spec,
                'zh-cn': spec,
                'zh-hk': spec
              }
            });
          }

          const specsValue = data.Attribute_Values.split('&');
          // if specs name length not equal to specs values
          if (specsName.length !== specsValue.length) {
            throw new BadRequestException({
              code: 'err_specs_by_excel'
            });
          }
          for (let i = 0; i < specsValue.length; i++) {
            formModel.specs[i].values = [];
            for (const v of JSON.parse(specsValue[i])) {
              formModel.specs[i].values.push({
                _id: new ObjectId(),
                name: {
                  en: v,
                  'zh-cn': v,
                  'zh-hk': v
                }
              });
            }
          }
          // qty from excel
          formModel.qty = JSON.parse(data.sku_qty);
          // amount from excel
          formModel.amount = JSON.parse(data.sku_amount);
          // discount Amount from excel
          formModel.discountAmount = JSON.parse(data.sku_discountAmount);
          let skuIdx = 0;
          formModel.skus = [];
          // Use recursive combination sku
          const combine = function (idx, prev) {
            const isLast = idx === formModel.specs.length - 1;
            const spec = formModel.specs[idx].values;
            // Loop through each attribute array
            for (const val of spec) {
              const cur = prev.concat([
                {
                  _id: new ObjectId(),
                  spec: formModel.specs[idx]._id,
                  value: val._id
                }
              ]);
              // if last in array, create new sku
              if (isLast) {
                const sku = {
                  _id: new ObjectId(),
                  product: formModel.product._id,
                  amount:
                    formModel.amount[
                      Math.floor(skuIdx % formModel.amount.length)
                    ],
                  discountAmount:
                    formModel.discountAmount[
                      Math.floor(skuIdx % formModel.discountAmount.length)
                    ],
                  currency: data.sku_currency,
                  idx: skuIdx + 1,
                  code: `${data.sku}_${skuIdx + 1}`,
                  specs: cur,
                  qty: formModel.qty[Math.floor(skuIdx % formModel.qty.length)]
                };
                skuIdx++;
                formModel.skus.push(sku);
              } else {
                combine(idx + 1, cur);
              }
            }
          };
          combine(0, []);
          createModels.push(formModel);
          map[data.code] = data;
        }
      }
      const createList = [];
      // create new product and skus specs
      for (let j = 0; j < createModels.length; j++) {
        createList.push(this.createProductWithSKU(createModels[j], []));
      }
      const result = await Promise.all(createList);
      return result;
    } catch (error) {
      throw new BadRequestException({
        code: 'err_product_excel'
      });
    }
  }

  // Override
  public async findWithCursorPaginate(
    searchModel: ProductSearchModel,
    paginationOptions: CursorPaginateOptions
  ) {
    const query = this._lookupQuery(searchModel);

    return this.productRepository.cursorPaginate(
      [
        {
          $lookup: {
            from: 'ProductSkus',
            localField: '_id',
            foreignField: 'product',
            as: `${SKU_PROJECT}`
          }
        },
        {
          $lookup: {
            from: 'Tags',
            localField: '_id',
            foreignField: 'ref',
            as: `${TAG_PROJECT}`
          }
        },
        {
          $match: {
            ...query
          }
        }
      ],
      paginationOptions
    );
  }
}
