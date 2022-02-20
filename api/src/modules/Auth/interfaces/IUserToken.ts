// structure based on C# which is based on OAuth2
// https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/
// eslint-disable-next-line
// https://docs.microsoft.com/en-us/machine-learning-server/operationalize/how-to-manage-access-tokens

export interface IUserToken {
  userId: string;
  token_type: string;
  // absolute timestamp in seconds
  expires_in: number;
  // delta timestamp in seconds
  expires_on: number;
  access_token: string;
  refresh_token: string;
  // scope the user is granted
  scope: string;
}
