interface ICreateApolloLinkOptions {
  getToken?: () =>
    | { access_token?: string; refresh_token?: string }
    | undefined;
  getLanguage?: () => string | undefined;
}
