import {Global, Module, OnModuleInit} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/param.schemas';
import {ParamController} from './param.controller';
import {ParamService} from './param.service';
import {ParamResolver} from './param.resolver';
import {CacheService} from '../Cache/cache.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [ParamController],
  providers: [ParamService, ParamResolver],
  exports: [ParamService]
})
export class ParamModule implements OnModuleInit {
  constructor(
    private readonly cacheService: CacheService,
    private readonly paramService: ParamService
  ) {}

  async onModuleInit() {
    // get all params
    const params = await this.paramService.find({});

    // store their parameters to cache
    for (const {type, parameters} of params) {
      await this.cacheService.set(type, JSON.stringify(parameters), 86400000);
    }
  }
}
