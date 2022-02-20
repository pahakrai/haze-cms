import {Module, DynamicModule} from '@nestjs/common';

import {CacheService} from './cache.service';
import {CacheModuleOption} from './interfaces';
// import {CACHE_MODULE_OPTION} from './constants';

@Module({})
export class CacheModule {
  /**
   * initailize a dynamic module
   * https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
   *
   * @param options configuration of this module
   */
  static forRoot(options: CacheModuleOption): DynamicModule {
    return {
      global: true,
      module: CacheModule,
      providers: [
        {
          provide: CacheService,
          useFactory: async () => {
            // use factory for dynamic import
            const {CacheService} = await import(`./engine/${options.engine}`);

            return new CacheService(options);
          }
        }
      ],
      exports: [CacheService]
    };
  }
}
