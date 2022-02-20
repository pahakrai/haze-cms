import {Injectable, NestMiddleware} from '@nestjs/common';
import {helpers} from '@golpasal/common';
import {CacheService} from 'src/modules/Cache/cache.service';

export interface Signature {
  access_key_id: string; // from client env
  secret_access_key: string; // from client env and should be base 64
  httpMethod: string;
  relativeAddress: string;
  timestamp: string; // utc standard
  nonce: string;
}

@Injectable()
export class SignatureMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  // resolve(...args: any[]): MiddlewareFunction {
  //   return (req, res, next) => {
  //     const {headers, url, method} = req;
  //     if (process.env.NONCE_CHECK === 'true') {
  //       const access_key_id = headers.access_key_id;
  //       const secret_access_key = headers.secret_access_key;
  //       const signature = headers.signature;
  //       const nonce = headers.nonce;
  //       const timestamp = headers.timestamp;
  //       const relativeAddress = url.replace(/[^\w\s]/gi, '');
  //       const httpMethod = method.toLowerCase();
  //       const isValid = changeCommon.helpers.isValidRequest(signature, {
  //         access_key_id,
  //         secret_access_key,
  //         httpMethod,
  //         relativeAddress,
  //         timestamp,
  //         nonce
  //       });
  //       if (!isValid || !access_key_id || !secret_access_key) {
  //         throw new Error('Invalid Signature!!!');
  //       } else {
  //         // perform next steps if valid
  //         if (process.env.REDIS_ENABLE === 'true' ||
  // process.env.MEMCACHE_ENABLE === 'true') {
  //           try {
  //             return this.cacheService.getSessionKey(nonce).then(ok => {
  //               if (ok) {
  //                 throw new Error('Invalid Header Nonce');
  //               }
  //               this.cacheService.setSessionKey(nonce, true, null).then(
  // () => {
  //                 next();
  //               });
  //             });
  //           } catch (err) {
  //             return Promise.reject(err);
  //           }
  //         } else {
  //           next();
  //         }
  //       }
  //     } else {
  //       next();
  //     }
  //   };
  // }
  async use(req: Request, res: Response, next) {
    const {headers, url, method}: any = req;
    if (process.env.NONCE_CHECK === 'true') {
      const access_key_id = headers.access_key_id;
      const secret_access_key = headers.secret_access_key;
      const signature = headers.signature;
      const nonce = headers.nonce;
      const timestamp = headers.timestamp;
      const relativeAddress = url.replace(/[^\w\s]/gi, '');
      const httpMethod = method.toLowerCase();
      const isValid = helpers.isValidRequest(signature, {
        access_key_id,
        secret_access_key,
        httpMethod,
        relativeAddress,
        timestamp,
        nonce
      });
      if (!isValid || !access_key_id || !secret_access_key) {
        throw new Error('Invalid Signature!!!');
      } else {
        // perform next steps if valid
        if (
          process.env.REDIS_ENABLE === 'true' ||
          process.env.MEMCACHE_ENABLE === 'true'
        ) {
          try {
            return this.cacheService.get(nonce).then(ok => {
              if (ok) {
                throw new Error('Invalid Header Nonce');
              }
              this.cacheService.set(nonce, 'true', null).then(() => {
                next();
              });
            });
          } catch (err) {
            return Promise.reject(err);
          }
        } else {
          next();
        }
      }
    } else {
      next();
    }
  }
}
