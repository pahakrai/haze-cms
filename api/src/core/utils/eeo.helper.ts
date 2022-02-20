import {getMD5Hash} from './md5';

/**
 * get eeo-api auth-related body
 *
 * @param secret workspace secret key
 */
export function getEEOAuthHeader(secret: string) {
  const unixEpochNow = Date.now();

  return {
    timeStamp: unixEpochNow,
    'safe-key': getMD5Hash(`${secret}${unixEpochNow}`)
  };
}
