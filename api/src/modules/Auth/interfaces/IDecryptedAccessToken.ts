export interface IDecryptedAccessToken {
  userId: string;
  jwtId: string;
  issuedAt: Date;
  expiresAt: Date;
  tokenType: string;
  userTypes: string[];
  deviceId: string;
}
