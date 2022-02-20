export type CacheEngine = 'memory' | 'redis';

export interface CacheModuleOption {
  /**
   * cache engine, currently support in-memory/redis
   */
  engine: CacheEngine;

  /**
   * redis server URL if engine=redis
   */
  url?: string;

  /**
   * auth username for chache engine(optional)
   */
  username?: string;

  /**
   * auth password for chache engine(optional)
   */
  password?: string;
}
