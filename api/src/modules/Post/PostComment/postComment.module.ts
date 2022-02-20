'use strict';

import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PostCommentService} from './postComment.service';
import {PostCommentController} from './postComment.controller';
import {Schema, CollectionName} from './schemas/postComment.schemas';
import {PostCommentResolver} from './postComment.resolver';
import {PostModule} from '../Post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName,
        schema: Schema
      }
    ]),
    PostModule
  ],
  controllers: [PostCommentController],
  providers: [PostCommentService, PostCommentResolver],
  exports: [PostCommentService]
})
export class PostCommentModule {
  constructor() {}
}
