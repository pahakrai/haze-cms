export interface IPasscodeToken {
  token: string;
  scope: string;
  expiresIn: number;
  expiresAt: Date;
}
