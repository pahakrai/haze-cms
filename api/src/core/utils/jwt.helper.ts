import * as jwt from 'jsonwebtoken';
import {v5 as uuidv5} from 'uuid';

class JWTHelper {
  secretKey;
  constructor() {
    this.secretKey = process.env.JWT_SECRET; // config.get('jwt:secret');
  }

  public sessionKey(userId, deviceId, issuedAt, userKey) {
    const uuidString = Buffer.from(`${userId}${deviceId}${issuedAt}`).toString(
      'base64'
    );
    const uuid = uuidv5(uuidString, userKey);
    return uuid;
  }

  public generate(
    userId,
    userType,
    deviceId,
    userKey,
    issuedAt,
    expiresAt,
    tokenType
  ) {
    if (!userId) {
      throw new Error('user id is required parameter');
    }
    const payload = {
      jwtid: this.sessionKey(userId, deviceId, issuedAt, userKey),
      iat: issuedAt,
      exp: expiresAt,
      sub: userId,
      type: tokenType,
      userType,
      deviceId
    };
    const secret = this.secret(/* userKey */);
    const token = jwt.sign(payload, secret);
    return token;
  }

  public secret(/* userKey */) {
    // userKey is for user specific secretKey
    return this.secretKey; // + JWT_SECRET_SEPARATOR + userKey;
  }

  // NOTE: for reference only
  // public verify(token, userKey) {
  //   const options = {};
  //   const secret = this.secret(userKey);
  //   const isValid = jwt.verify(token, secret, {
  //    ..options
  //   });
  //   return isValid;
  // }
}

export default new JWTHelper();
