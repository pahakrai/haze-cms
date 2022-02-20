'use strict';

import {Module, forwardRef, OnModuleInit, Inject} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PostService} from './post.service';
import {PostController} from './post.controller';

import {Schema, CollectionName} from './schemas/post.schemas';
import {PostResolver} from './post.resolver';
import {PageService, PageModule} from '../../Page/Page';
import {NotificationModule} from 'src/modules/Notification/notification.module';
// import {Sitemap} from '../../Page/Page/page.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    PageModule,
    forwardRef(() => NotificationModule)
  ],
  controllers: [PostController],
  providers: [PostService, PostResolver],
  exports: [PostService]
})
export class PostModule implements OnModuleInit {
  private readonly postService: PostService;
  private readonly pageService: PageService;
  constructor(
    @Inject('PostService') postService: PostService,
    @Inject('PageService') pageService: PageService
  ) {
    this.postService = postService;
    this.pageService = pageService;
  }

  async onModuleInit() {
    // FIXME: need to setup so page sitemap can have these pages
    // this.pageService.addSitemapFn(async () => {
    //   const posts = await this.postService.find();
    //   return posts.map<Sitemap>(post => ({
    //     name: 'abc',
    //     to: `/news/${post._id}`,
    //     meta: this.postService.getMetaDataByPost(post)
    //   }))
    // })
  }
}
