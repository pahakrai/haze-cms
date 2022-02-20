export interface JwtPayload {
  email: string;
  sub: string;
  jti: string;
  aud: string;
  exp: string;
  type: string;
  refresh?: string;
}
