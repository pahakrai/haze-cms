import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  ProductSpecCreateModel,
  ProductSpecUpdateModel,
  ProductSpecSearchModel
} from './models';
import {IProductSpec, IProductSpecModel} from './interfaces';
import {BlobService} from '../../../File/Blob';
import {IUser} from '../../../User';
import {FileMeta} from 'src/modules/File/FileMeta/interfaces';
@Injectable({scope: Scope.REQUEST})
export class ProductSpecService extends BaseCRUDService<
  IProductSpec,
  ProductSpecCreateModel,
  ProductSpecUpdateModel,
  ProductSpecSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('ProductSpecs')
    private readonly productSpecRepository: IProductSpecModel,
    private readonly blobService: BlobService
  ) {
    super(productSpecRepository, request);
  }

  public _castQuery(searchModel: ProductSpecSearchModel) {
    const query: any = {};
    const {product} = searchModel;

    if (product) {
      query.product = product;
    }

    return query;
  }

  /**
   * update productSpec icon
   *
   * @param _id productSpec _id
   * @param files uploaded files
   */
  public async updateIcon(_id: string, updateModel, files) {
    // get current user
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;

    let iconFileMeta: FileMeta[];
    let activeIconFileMeta: FileMeta[];
    if (files?.icon !== undefined) {
      // upload productSpec icon file
      iconFileMeta = await this.blobService.uploadFiles([files?.icon], folder);
    }
    if (files?.activeIcon !== undefined) {
      // upload productSpec activeIcon file
      activeIconFileMeta = await this.blobService.uploadFiles(
        [files?.activeIcon],
        folder
      );
    }

    const productSpecIcon =
      iconFileMeta && iconFileMeta.length > 0
        ? iconFileMeta[0]._id
        : updateModel?.icon;
    const productSpecActiveIcon =
      activeIconFileMeta && activeIconFileMeta.length > 0
        ? activeIconFileMeta[0]._id
        : updateModel?.activeIcon;
    const updateField = await this.productSpecRepository
      .findByIdAndUpdate(
        _id,
        {
          icon: productSpecIcon,
          activeIcon: productSpecActiveIcon
        },
        {
          new: true
        }
      )
      .exec();

    return updateField;
  }
}
