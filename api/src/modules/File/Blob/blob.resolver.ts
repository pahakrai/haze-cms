import {Resolver, Args, Mutation} from '@nestjs/graphql';
import {Types} from 'mongoose';
import {UseFilters} from '@nestjs/common';
import {processUpload, GraphQLExceptionFilter, RequireLogin} from 'src/core';
// services
import {BlobService} from './blob.service';

const {ObjectId} = Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

@Resolver('Blob')
@UseFilters(GraphQLExceptionFilter)
export class BlobResolver {
  constructor(private readonly blobService: BlobService) {}

  @Mutation()
  @RequireLogin()
  public async uploadImages(
    @Args('images') images,
    @Args('folder') folder,
    @Args('tags') tags
  ) {
    if (!folder) {
      folder = undefined;
    }
    const uploadedImages = await Promise.all(
      images.map(file => processUpload(file))
    );
    const fileMetas = await this.blobService.uploadFiles(
      uploadedImages,
      folder,
      tags
    );
    return fileMetas;
  }
}
