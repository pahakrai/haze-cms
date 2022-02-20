export class AuthUserTokenRequestModel {
  input: string;
  password: string;
  userTypes: string[];
  workspaceCode?: string;
}
