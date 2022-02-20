import {Injectable} from '@nestjs/common';
import NodeCache from 'node-cache';

import {CacheService as BaseCacheService} from '../cache.service';

@Injectable()
export class CacheService extends BaseCacheService {
  private _cache: NodeCache;
  constructor() {
    super();

    this._cache = new NodeCache();
  }

  // Override
  public async get(key: string) {
    return this._cache.get<string>(key);
  }

  // Override
  public async set(key: string, value: string, ttl?: number) {
    // node-cache ttl is in second, so divided by 1000
    const isSuccess = this._cache.set(key, value, ttl / 1000);

    return isSuccess ? Promise.resolve() : Promise.reject();
  }

  // Override
  public async delete(key: string): Promise<any> {
    return this._cache.del(key);
  }
}
