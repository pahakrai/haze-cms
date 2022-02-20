'use strict';

import {Module} from '@nestjs/common';
import {PostModule} from './Post';
import {PostCommentModule} from './PostComment';

@Module({
  imports: [PostModule, PostCommentModule],
  exports: [PostModule, PostCommentModule]
})
export class PostBaseModule {
  constructor() {}
}
