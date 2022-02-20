import * as jwt from 'jsonwebtoken';
import {v5 as uuidv5} from 'uuid';

export const getSessionKey = (
  userId: string,
  deviceId: string,
  issuedAt: number,
  userKey: string
) => {
  const uuidString = Buffer.from(`${userId}${deviceId}${issuedAt}`).toString(
    'base64'
  );

  return uuidv5(uuidString, userKey);
};

/**
 * generate an JWT token
 *
 * @param userId user _id
 * @param userTypes user types, e.g. member, user, provider
 * @param deviceId logined device id (optional)
 * @param userKey random UUID
 * @param issuedAt issue date (in ms)
 * @param expiresAt token expired at (in ms)
 * @param tokenType access/refresh token
 */
export const generate = (
  userId: string,
  userTypes: string[],
  deviceId: string,
  userKey: string,
  issuedAt: number,
  expiresAt: number,
  // tokenType?: string,
  others: any = {}
) => {
  if (!userId) {
    throw new Error('user id is required parameter');
  }

  // jwt standard is seconds, so transform issuedAt and expiresAt to seconds
  const payload = {
    jwtid: getSessionKey(userId, deviceId, issuedAt / 1000, userKey),
    iat: Math.round(issuedAt / 1000),
    exp: Math.round(expiresAt / 1000),
    sub: userId,
    // type: tokenType,
    userTypes,
    deviceId,
    ...others
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};
