export interface IPasscode {
  code: string;
  scope: string;
  expiresIn: number;
  expiresAt: Date;
}
