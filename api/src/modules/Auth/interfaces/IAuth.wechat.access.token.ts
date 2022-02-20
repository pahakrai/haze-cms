export class WeChatAccessTokenModel {
  access_token: string; // 接口调用凭证
  expires_in: number; // access_token接口调用凭证超时时间，单位（秒）,
  refresh_token: string; // 用户刷新access_token,
  openid: string; // 授权用户唯一标识,
  scope: string; // 用户授权的作用域，使用逗号（,）分隔,
  unionid?: string; // 当且仅当该移动应用已获得该用户的userinfo授权时，才会出现该字段
}
