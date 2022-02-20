// import {Inject, Injectable} from '@nestjs/common';
import {createNodeRedisClient, WrappedNodeRedisClient} from 'handy-redis';

import {CacheModuleOption} from '../interfaces';
// import {CACHE_MODULE_OPTION} from '../constants';
import {CacheService as BaseCacheService} from '../cache.service';

export class CacheService extends BaseCacheService {
  private _cache: WrappedNodeRedisClient;
  constructor(private readonly options: CacheModuleOption) {
    super();

    const {url, username, password} = options;
    this._cache = createNodeRedisClient({
      url: `redis://${
        username && password ? `${username}:${password}@` : ''
      }${url}:6379`
    });
  }

  // Override
  public async get<T = string>(key: string): Promise<T> {
    return this._cache.get(key) as any;
  }

  // Override
  public async set(key: string, value: any, ttl?: number) {
    if (ttl > 0) {
      return this._cache.set(key, value, ['PX', ttl]);
    }

    return this._cache.set(key, value);
  }

  // Override
  public async delete(key: string): Promise<any> {
    return this._cache.del(key);
  }
}
