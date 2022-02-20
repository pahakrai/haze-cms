import {Injectable} from '@nestjs/common';

@Injectable()
export abstract class CacheService {
  /**
   * get value by key from cache
   *
   * @param key cache key
   */
  public get(key: string): Promise<string> {
    throw new Error('should be overwritten');
  }

  /**
   * add to cache
   *
   * @param key cache key
   * @param value cache value
   * @param ttl Time-To-Live, cache will be removed after the ime (in ms)
   */
  public set(key: string, value: string, ttl?: number): Promise<any> {
    throw new Error('should be overwritten');
  }

  /**
   * remove data from cache
   *
   * @param key cache key
   */
  public delete(key: string): Promise<any> {
    throw new Error('should be overwritten');
  }
}
